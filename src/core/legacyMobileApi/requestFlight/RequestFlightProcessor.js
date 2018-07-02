import _ from "lodash";
import moment from 'moment';
import getAirportsCityWithNamePattern from "../../query/getAirportsCityWithNamePattern";
import getEmptyLegById from '../../query/getEmptyLegById';
import { hostname } from '../../../config';
export default class RequestFlightProcessor {
	constructor(requestFlightDecoder, requestFlightEncoder, client, fetch) {
		this.client = client;
		this.fetch = fetch;
		this.requestFlightDecoder = requestFlightDecoder;
		this.requestFlightEncoder = requestFlightEncoder;
		this.salesForceResponse = {};
	}

	async encodeLegsWithEmptyLeg() {
		const flightData = this.requestFlightDecoder.flightData;
		var emptyLeg = await getEmptyLegById(flightData.emptyLegId, this.client);

		var aLeg = {
			date: flightData.flyDate[0] + "T" + flightData.flyTime[0],
			pax: flightData.pax ? flightData.pax: 1,
			from: {
				__typename: emptyLeg.from_airport.__typename,
				iata: emptyLeg.from_airport.iata,
				icao: emptyLeg.from_airport.icao,
				name: emptyLeg.from_airport.name,
			},
			to: {
				__typename: emptyLeg.to_airport.__typename,
				iata: emptyLeg.to_airport.iata,
				icao: emptyLeg.to_airport.icao,
				name: emptyLeg.to_airport.name,
			},
			flightOptions: this.requestFlightDecoder.getFlightOption(0),
		}

		this.requestFlightDecoder.emptyLeg = emptyLeg;

		var legs = [];
		legs.push(aLeg);
		return legs;
	}

	encodeLegsWithFlightData() {
		var legs = [];
		var numberOfSegment = this.requestFlightDecoder.flightData.numberOfSegment;
		var index = 0;

		for (index = 0; index < numberOfSegment; index++) {
			var aLeg = this.requestFlightDecoder.getFlightRequest(index);
			legs.push(aLeg);
		}

		return legs;
	}

	async encodeLegs() {
		var legs = [];
		if (this.requestFlightDecoder.flightData.mode === "EmptyLegRequest") {
			legs = await this.encodeLegsWithEmptyLeg();
		} else {
			legs = this.encodeLegsWithFlightData();
		}
		return legs;
	}

	async buildSalesForceRequest() {
		var legs = await this.encodeLegs();

		return this.requestFlightDecoder.getSalesForceRequest(legs);
	}

	getResponse = async () => {
		var isError = false;
		var response;
		try {
			// Check validity of request flight input
			if (this.requestFlightDecoder.isValid()) {
				// Call salesforce
				var salesForceRequest = await this.buildSalesForceRequest();

				var basePath = `https://www.${hostname}/api/reqflight`;
				if (__DEV__) {
					basePath = 'https://www.lunatlantic.com/api/reqflight';
				}

				const reqflight = await this.fetch(basePath, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"user-agent": 'Mozilla/5.0 (Linux; U; Android 4.0.3; en-in; SonyEricssonMT11i' +
						' Build/4.1.A.0.562) AppleWebKit/534.30 (KHTML, like Gecko)' +
						' Version/4.0 Mobile Safari/534.30',
					},
					body: JSON.stringify(salesForceRequest),
				  });

				this.salesForceResponse = await reqflight.json();
				// Get suggestedCity
				if (this.salesForceResponse.success) {
					var suggestedCity = await getAirportsCityWithNamePattern(this.requestFlightDecoder.flightData.flyFrom[0], this.client);
					this.requestFlightDecoder.suggestedCity = suggestedCity;
				}
			}
		} catch(e) {
			console.log("Request Flight Exception:" + e);
			isError = true;
		}

		// If error by exception or not success with SF, return internal error
		if (isError || this.salesForceResponse.success === false) {
			this.requestFlightDecoder.setError("Internal Error");
		} else {
			this.requestFlightDecoder.salesForceResponseId = this.salesForceResponse.id;
		}

		// Attach input to encoder
		this.requestFlightEncoder.attachInput(this.requestFlightDecoder);

		// Get response
		response = this.requestFlightEncoder.buildReply();
		return response;
	}
}
