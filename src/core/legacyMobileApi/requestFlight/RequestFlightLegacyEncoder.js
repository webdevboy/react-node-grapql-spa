import moment from 'moment';
import getGreetingTime from '../../../utils/getGreetingTime';

/**
* Construct a request flight info json object, according to provided info
*/
function constructRFObject(flyFrom, flyTo, flyDate, timeDate, emptyLegId, firstOrSecondLeg) {
	var aRFObject = {};
	if(flyFrom) {
		aRFObject.flyFrom = flyFrom;
	}

	if(flyTo) {
		aRFObject.flyTo = flyTo;
	}

	if(flyDate) {
		//transform the input date string to a formatted date
		//if the flyDate is not a valid date, return 01 Jan 1970
		var formattedDate = moment(flyDate, ["DD-MM-YYYY", "YYYY-MM-DD","MM/DD/YYYY"]).isValid() ? moment(flyDate, ["DD-MM-YYYY", "YYYY-MM-DD","MM/DD/YYYY"]) : moment("01-01-1970");
		aRFObject.flyDate = formattedDate.format("ddd DD MMM YYYY");
	}

	if(timeDate) {
		if (timeDate.length === 2) {
			aRFObject.timeDate = timeDate[0];
		} else {
			aRFObject.timeDate = timeDate;
		}
	}

	if(emptyLegId) {
		aRFObject.emptyLegId = emptyLegId;
	} else {
		aRFObject.emptyLegId = null;
	}

	aRFObject.name = firstOrSecondLeg;

	return aRFObject;
}


function stringifyNumber(n) {
	var special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
	var deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

	if (n < 20) return special[n];
	if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
	return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
}

export default class RequestFlightLegacyEncoder {
	constructor() {
		this.requestFlightInput = {}
	}

	attachInput(input) {
		this.requestFlightInput = input;
	}

	buildErrorMessage() {
		var response = {
			succes: 0,
			requestFlights: null,
			bugs: this.requestFlightInput.errorMessage,
			contactArray: null,
			emptyLeg: null,
			message: null
		};
		return response;
	}

	buildsuccesMessage() {
		var emptyLegData = this.getResponseEmptyLegData();
		var requestFlights = this.getResponseRequestFlights()
		var inputDataForMessage;
		if (this.requestFlightInput.flightData.mode === "EmptyLegRequest") {
			inputDataForMessage = emptyLegData;
		} else {
			inputDataForMessage = requestFlights;
		}

		var message = this.getResponseMessage(this.requestFlightInput.salesForceResponseId, inputDataForMessage, this.requestFlightInput.suggestedCity);
		var contactArray = this.getResponseContactArray();
		var aResponse = {
			succes: 1,
			requestFlights: requestFlights,
			bugs: null,
			contactArray: contactArray,
			emptyLeg: emptyLegData,
			message: message,
		}
		return aResponse;
	}

	buildReply() {
		var response;
		if (this.requestFlightInput.isValid()) {
			response = this.buildsuccesMessage();
		} else {
			response = this.buildErrorMessage();
		}
		return response;
	}

	getResponseEmptyLegData() {
		var emptyLegData = [];
		const emptyLeg = this.requestFlightInput.emptyLeg;
		if (emptyLeg) {
			let emptyLegValue = {};
			var formattedFirstDepartureDate = moment(emptyLeg.from_date, ["YYYY-MM-DDTHH:mm:ss.SSS"]).isValid() ? moment(emptyLeg.from_date, ["YYYY-MM-DDTHH:mm:ss.SSS"]) : moment("01-01-1970");
			var formattedLastDepartureDate = moment(emptyLeg.from_date, ["YYYY-MM-DDTHH:mm:ss.SSS"]).isValid() ? moment(emptyLeg.from_date, ["YYYY-MM-DDTHH:mm:ss.SSS"]) : moment("01-01-1970");
			emptyLegValue.first_depature_time = formattedFirstDepartureDate.format("YYYY-MM-DD HH:MM");
			emptyLegValue.price = emptyLeg.price;
			emptyLegValue.priceConverted = emptyLeg.price;
			emptyLegValue.biggerPriceConverted = emptyLeg.price;
			emptyLegValue.first_departure_time_converted = formattedFirstDepartureDate.format("ddd, DD MMM YYYY").toUpperCase();
			emptyLegValue.last_departure_time_converted = formattedLastDepartureDate.format("ddd, DD MMM YYYY").toUpperCase();
			emptyLegValue.first_departure_time_converted_longer = formattedFirstDepartureDate.format("ddd DD MMM YYYY")
			emptyLegValue.last_departure_time_converted_longer = formattedLastDepartureDate.format("ddd DD MMM YYYY");
			emptyLegValue.first_departure_time_of_day = getGreetingTime(formattedFirstDepartureDate);
			emptyLegValue.last_departure_time_of_day = getGreetingTime(formattedLastDepartureDate);
			emptyLegValue.flightTime = "0H00 MN";
			emptyLegData.push(emptyLegValue);
		}

		return emptyLegData;
	}


	getResponseRequestFlight(index) {
		const flightData = this.requestFlightInput.flightData;
		var flyDate = flightData.flyDate[index];
		var timeDate = flightData.flyTime[index];
		var flyFrom = flightData.flyFrom[index];
		var flyTo = flightData.flyTo[index];
		var legOrder = stringifyNumber(index + 1).toUpperCase() + " LEG";

		return constructRFObject(flyFrom , flyTo, flyDate, timeDate, null, legOrder);
	}

	getResponseRequestFlights() {
		var requestFlightResponse = [];
		const flightData = this.requestFlightInput.flightData;

		if (flightData.mode === "EmptyLegRequest") {
			var aLeg = constructRFObject(null, null, flightData.flyDate, flightData.flyTime, flightData.emptyLegId, "FIRST LEG");
			requestFlightResponse.push(aLeg);
		} else {
			for (var index = 0; index < flightData.numberOfSegment; index++) {
				var aLeg = this.getResponseRequestFlight(index);
				// Return only the first, second and last legs
				if (index === 0 || index === 1 || index === (flightData.numberOfSegment -1)) {
					requestFlightResponse.push(aLeg);
				}

			}
		}

		return requestFlightResponse;
	}

	getResponseMessage(resultId, inputData, suggestedCity) {
		var responseMessage;
		var jsonParams = {};
		if (this.requestFlightInput.flightData.mode === "EmptyLegRequest") {
			jsonParams = inputData;
			jsonParams[0].titleToList = "Your empty leg request from " + suggestedCity;
			jsonParams[0].titleOnView = "LunaJets - Empty Leg Request Received";
			jsonParams[0].emptyLegId = this.requestFlightInput.flightData.emptyLegId ? this.requestFlightInput.flightData.emptyLegId : false;
			jsonParams[0].lastname = this.requestFlightInput.contact.lastName;
			if (this.requestFlightInput.contact.title) {
				jsonParams[0].title = this.requestFlightInput.contact.title;
			}
			jsonParams[0].requestConfirmation = true;
		} else {
			jsonParams.requestFlights = inputData ;
			jsonParams.titleToList = "Your flight request from " + suggestedCity;
			jsonParams.titleOnView = "LunaJets - Flight Request Received";
			jsonParams.emptyLegId = this.requestFlightInput.flightData.emptyLegId ? this.requestFlightInput.flightData.emptyLegId : false;
			jsonParams.lastname = this.requestFlightInput.contact.lastName;
			if (this.requestFlightInput.contact.title) {
				jsonParams.title = this.requestFlightInput.contact.title;
			}
			jsonParams.requestConfirmation = true;
		}

		responseMessage = {
			jsonParams: jsonParams,
			privateMessageId: resultId,
			publicMessageId: null,
			viewedOnMobile: null
		};

		return responseMessage;
	}

	getResponseContactArray() {
		var contactInfo = {};
		const contact = this.requestFlightInput.contact;

		if (contact.title) {
			contactInfo.title = contact.title;
		}
		if (contact.firstName) {
			contactInfo.firstname = contact.firstName;
		}
		contactInfo.lastname = contact.lastName;
		contactInfo.phone = contact.phone;
		contactInfo.email = contact.email;
		return contactInfo;
	}
}
