import React from 'react';
import ReactDOM from 'react-dom/server';
import moment from 'moment';
import MobileDetect from 'mobile-detect';
import Intl from 'intl';
import _ from 'lodash';
import { Lead } from '../salesforce';
import {
	SFCountry,
	SFAccount,
	Rate,
	Currency,
	Settings,
	Lead as LeadLogger,
	StringTranslation,
	Language,
	EmailTemplates,
} from '../../data/models';
import { hostname } from '../../config';
import Promise from 'bluebird';

const getEmailTemplates = async (email_ids) =>
	await new Promise.map(email_ids, async ({ email_id, locale }) =>
	 await EmailTemplates.findOne({
			where: {
				email_id,
		 },
		 include: [
			 {
				 model: Language.model,
				 as: 'Language',
				 where: {
					 enabled: true,
					 $or: [
						{ locale },
						{ locale: 'en' }
					]
				 }
			 }
		 ],
		 raw: true,
	 }));


export default async (req, res, next) => {
	try {
		const md = new MobileDetect(req.headers['user-agent']);
		const homeCountry = await SFCountry.findOne({ where: { country_code__c: req.body.ipInfo.country } });

		const legs = req.body.legs.map(trip => {
			const from = (trip.from.__typename === 'SFAirport') ? `${trip.from.icao} ${trip.from.iata} ${trip.from.name}` : trip.from.label.replace(/,/g," ");
			const to = (trip.to.__typename === 'SFAirport') ? `${trip.to.icao} ${trip.to.iata} ${trip.to.name}` : trip.to.label.replace(/,/g," ");
			const date = moment(trip.date).format('YYYY-MM-DD');
			const time = moment(trip.date).format('HH:mm');
			const smokers = (trip.flightOptions.smokers) ? 1 : 0;
			const wifi = (trip.flightOptions.wifi) ? 1 : 0;
			const catering = (trip.flightOptions.catering) ? 1 : 0;
			const transfers = (trip.flightOptions.helicopter)
												? `Helicopter`
												: (trip.flightOptions.limousine)
													? `Car`
													: ``;
			const others = (trip.flightOptions.others) ? 1 : 0;
			const luggage = trip.flightOptions.luggage ? trip.flightOptions.luggage : 0;
			const pets = trip.flightOptions.pets;

			const leg = [
				from,
				to,
				date,
				time,
				trip.pax,
				smokers,
				luggage,
				transfers,
				wifi,
				catering,
				pets,
				others,
				others,
				others,
			];

			return leg.join('#');
		}).join('\n');

		let additionalNotes = `${req.body.contactInfo.additionalNotes.replace('#', ' ')} \n\n`;

		if (req.body.emptyleg) {
			const { id, price, currency: { id: currencyId, currency }, details, until_date, from_airport, to_airport } = req.body.emptyleg;
			const { aircraftPost_title, registration_number } = details;
			const operator = await SFAccount.findOne({ attributes: ['name'], where: { sfid: details.account_sfid } });
			let finalPrice = price;

			if (currency !== 'EUR') {
				const rate = await Rate.model.findOne({
					where: { currency_from_id: currencyId },
					include: [{
						model: Currency.model,
						as: 'to',
						where: {
							currency: 'EUR'
						}
					}]
				});
				finalPrice = price * rate.rate;
			}

			const slugs = await StringTranslation.findAll({
				attributes: ['translation', 'message_id', 'defaultMessage'],
				where: {
					message_id: {
						$in: ['url.emptyLegFlights', 'url.emptyLegFlights.emptyLeg'],
					}
				},
				limit: 2,
				include: [
					{
						model: Language.model,
						as: 'Language',
						where: {
							locale: 'en',
							enabled: true,
						}
					}
				],
				raw: true,
			});

			const slugELF = _.find(slugs, { message_id: "url.emptyLegFlights" });
			const slugEL = _.find(slugs, { message_id: "url.emptyLegFlights.emptyLeg" });
			const nameFrom = from_airport.city['name_en'] || from_airport.city['name'];
			const nameTo = to_airport.city['name_en'] || to_airport.city['name'];
			const slugEmptyleg = `${slugEL.translation||slugEL.defaultMessage}-${nameFrom.replace(/\s/g, "")}-${nameTo.replace(/\s/g, "")}-${id}`;
			const pathUrl = ['','en',`${slugELF.translation||slugELF.defaultMessage}`,slugEmptyleg].join('/');

			finalPrice = new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' }).format(finalPrice);
			additionalNotes += `${operator.name}; ${aircraftPost_title} (${registration_number}); ${finalPrice}; published: ${moment(until_date).format('ll')} \n`;
			additionalNotes += `https://www.${hostname}/${pathUrl}`;
		}

		const quoteSource = (req.body.emptyleg) ? 'EL' : 'F';
		const isMember = 'NM';
		const userAgent = md.userAgent();
		const { ip, city, region, country } = req.body.ipInfo;
		const { title, firstName, lastName, email, phone } = req.body.contactInfo;
		const fullname = firstName ? `${firstName} ${lastName}` : `${lastName}`;

		const requestFlight = {
			Salutation: title || '',
			FirstName: firstName || '',
			LastName: lastName || '',
			Email: email || '',
			phone: phone || '',
			Multi_Leg_Data__c: legs,
			Company: fullname,
			Lead_type__c: 'Passenger',
			Status: 'Pending',
			Quote_msg__c: `${additionalNotes}`,
			Quote_source__c: `${(md.mobile()) ? 'M' : 'W' }${quoteSource}${isMember}`, // missing var to check if is member or not
			Lead_Origin_Country__c: homeCountry.sfid, // sfid country
			Home_Country__c: req.body.browser.locale, // browser locale
			Platform_Language__c: req.body.website.locale.toUpperCase(),
			Lead_Source_Medium__c: 'website',
			Browser_OS__c: userAgent,
			browser_os_device__c: `${req.headers['user-agent']}`,
			Approx_Location__c: `${city}, ${region}, ${country}`,
			// utm_campaign__c
			// utm_medium__c
			// utm_source__c
			// utm_term__c
			GCLID__c: req.cookies['gclid'],
			URL4Google__c: `https://www.google.com/search?q=%22$${encodeURI(fullname)}%22`,
			URL4GoogleImages__c: `https://www.google.com/search?tbm=isch&q=%22${encodeURI(fullname)}%22`,
			URL4GoogleNews__c: `https://www.google.com/search?tbm=nws&q=%22${encodeURI(fullname)}%22`,
			URL4LikedIn__c: `https://www.linkedin.com/pub/dir/${firstName}/${lastName}`,
			URL4approxLocation__c: `http://ipinfo.io/${ip}`
		};

		const leadObject = await Lead.create(requestFlight);

		if (leadObject.err) {
			throw leadObject.err;
		}

		await LeadLogger.model.create({
			lead_sfid: leadObject.id,
			raw_data: {
				body: req.body,
				cookies: req.cookies,
				headers: req.headers,
			},
			request_type: 'request-flight',
			status: 'SUCCESS',
		});

		const { value: default_email } = await Settings.findOne({ attributes: ['value'], where: { option: 'site_default_email' }, raw: true });
		const templates = await getEmailTemplates(
			[
				{
					email_id: 'client_flight_request_confirmation',
					locale: req.body.website.locale || 'en',
				},
				{
					email_id: 'flight_request_notification',
					locale: 'en',
				}
			]
		);
		const client_flight_request_confirmation = _.find(templates, { email_id: 'client_flight_request_confirmation' });
		const flight_request_notification = _.find(templates, { email_id: 'flight_request_notification' });

		console.log('EMAILS');
		console.log(flight_request_notification);

		let advisor_notification = flight_request_notification.content_html;
		let client_confirmation = client_flight_request_confirmation.content_html;

		const flight_request_table = await ReactDOM.renderToString(
			<table>
				<thead>
					<tr>
						<th>FROM</th>
						<th>TO</th>
						<th>DATE</th>
						<th>TIME</th>
						<th>PASSANGERS</th>
					</tr>
				</thead>
				<tbody>
					{
						req.body.legs.map(trip => (
							<tr>
								<td>{(trip.from.__typename === 'SFAirport') ? `${trip.from.icao} ${trip.from.iata} ${trip.from.name}` : trip.from.label.replace(/,/g," ")}</td>
								<td>{(trip.to.__typename === 'SFAirport') ? `${trip.to.icao} ${trip.to.iata} ${trip.to.name}` : trip.to.label.replace(/,/g," ")}</td>
								<td>{moment(trip.date).format('YYYY-MM-DD')}</td>
								<td>{moment(trip.date).format('HH:mm')}</td>
								<td>{trip.pax}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		);

		const advisor_values = {
			source: 'website',
			leadId: leadObject.id,
			googleAds: req.cookies['gclid'] ? true : false,
			title,
			firstname: firstName,
			lastname: lastName,
			email,
			phone,
			ip,
			locationCity: city,
			locationRegion: region,
			locationCountry: country,
			message: `${req.body.contactInfo.additionalNotes.replace('#', ' ')}`,
			quoteTable4SalesAgent: flight_request_table,
			userRegistered: false,
		};

		Object.keys(advisor_values).map((key, index) => {
			const re = new RegExp(`{${key}}`, 'g');
			advisor_notification = advisor_notification.replace(re, advisor_values[key]);
		});

		const client_values = {
			source: 'website',
			title,
			firstname: firstName,
			lastname: lastName,
			requestFlightsEmailClient: flight_request_table,
		};
		Object.keys(client_values).map((key, index) => {
			const re = new RegExp(`{${key}}`, 'g');
			client_confirmation = client_confirmation.replace(re, client_values[key]);
		});

		await req.transporter.sendMail({
			from: default_email,
			to: flight_request_notification.email_to.join(','),
			subject: flight_request_notification.subject,
			html: advisor_notification,
		});

		await req.transporter.sendMail({
			from: default_email,
			to: (!client_flight_request_confirmation.email_to) ? email : client_flight_request_confirmation.email_to.join(','),
			subject: client_flight_request_confirmation.subject,
			html: client_confirmation,
		});


		return res.status(200).json(leadObject);

	} catch (err) {

		await LeadLogger.model.create({
			raw_data: {
				body: req.body,
				cookies: req.cookies,
				headers: req.headers,
				error: err.toString()
			},
			request_type: 'request-flight',
			status: 'ERROR',
		});

		console.error(err);
		return res.status(400).json(err);
	}

};