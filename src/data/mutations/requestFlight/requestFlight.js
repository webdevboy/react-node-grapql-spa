import Promise from "bluebird";
import moment from 'moment';
import { Lead } from '../../../core/salesforce';
import OutputRequestFlight from '../../types/utils/OutputRequestFlight';
import RequestFlightInput from '../../types/utils/RequestFlightInput';

export default {
  type: OutputRequestFlight,
  args: RequestFlightInput,
  name: 'RequestFlight',
  description: "Submits a request flight",
  resolve(_, args) {
    return new Promise(async (resolve, reject) => {
      try {

        const legs = args.legs.map(trip => {
          const from = (trip.from.__typename === 'AirportType') ? `${trip.from.iata} ${trip.from.icao} ${trip.from.name}` : trip.from.label.replace(/,/g," ");
          const to = (trip.to.__typename === 'AirportType') ? `${trip.to.iata} ${trip.to.icao} ${trip.to.name}` : trip.to.label.replace(/,/g," ");
          const leg = [from, to, `${moment(trip.date).format('YYYY-MM-DD')} ${moment(trip.date).format('HH:mm')}`];
          return leg.join(', ');
        }).join('\n');

        console.log(legs);

        const fullname = args.contactInfo.firstName ? `${args.contactInfo.firstName} ${args.contactInfo.lastName}` : `${args.contactInfo.lastName}`;

        Lead.create({
          Salutation: args.contactInfo.title || '',
          FirstName: args.contactInfo.firstName || '',
          LastName: args.contactInfo.lastName || '',
          Email: args.contactInfo.email || '',
          phone: args.contactInfo.phone || '',
          Multi_Leg_Data__c: legs,
          Company: fullname,
          Lead_type__c: 'Passenger',
          Status: 'Pending',
          Quote_msg__c: args.contactInfo.additionalNotes,
          Quote_source__c: 'WFM',

          opt_wifi__c: args.flightOptions.wifi || 0,
          opt_pets__c: args.flightOptions.pets || 0,
          opt_s_equip__c: args.flightOptions.sports_equipment || 0,
          opt_smokers__c: args.flightOptions.smokers || 0,
          opt_luggage__c: args.flightOptions.luggage || 1,
          // opt_nbr_pets: args.moreOptions.nbr_pets || 0,

          Home_Country__c: args.locale, 				      // browser locale
          Lead_Origin_Country__c: 'a0K5E0000010Iw2', 		  // sfid country
          // approx location
          // utm_campaign__c
          // utm_medium__c
          // utm_source__c
          // utm_term__c
          // GCLID__c
          // browser_os_device__c
          URL4Google__c: `https://www.google.com/search?q=%22$${encodeURI(fullname)}%22`,
          URL4GoogleImages__c: `https://www.google.com/search?tbm=isch&q=%22${encodeURI(fullname)}%22`,
          URL4GoogleNews__c: `https://www.google.com/search?tbm=nws&q=%22${encodeURI(fullname)}%22`,
          URL4LikedIn__c: `https://www.linkedin.com/pub/dir/${args.firstName}/${args.lastName}`,
          URL4approxLocation__c: (args.ipInfo && args.ipInfo.ip) ? `http://ipinfo.io/${args.ipInfo.ip}` : null,
        }, (err, response) => {
          if (err) reject(err);

          console.log(response);

          resolve(response);

        });
      } catch (e) {
        reject(e);
      }
    });
  },
};
