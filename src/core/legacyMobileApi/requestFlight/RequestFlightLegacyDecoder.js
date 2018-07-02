import moment from 'moment';

function getValue(key, requestFlightForm) {
	var returnedValue = false;
	requestFlightForm.map( (value) => {
		if (value["name"] === key) {
			returnedValue = value["value"];
		}
	});
	return returnedValue;
}

export default class RequestFlightLegacyDecoder {
	constructor(ipData, requestFlightForm) {

		this.requestFlightForm = requestFlightForm;
		this.ipData = ipData;
		this.contact = this.decodeContact();
		this.flightOptions = this.decodeFlightOption();
		this.flightData = this.decodeFlightData();
		this.errorMessage = this.checkMandatoryField();
		this.emptyLeg = false;
		this.salesForceResponseId = false;
	}

	isValid() {
		return (!Object.keys(this.errorMessage).length);
	}

	setError(error) {
		this.errorMessage.error = error;
	}

	checkMandatoryField() {
		var errorMessage = {};

		if (this.contact.email === false) {
			errorMessage.email="Please enter a valid email";
		}
		if (this.contact.lastName === false) {
			errorMessage.lastname="lastname is required";
		}
		if(this.contact.phone === false){
			errorMessage.phone="phone is required";
		}
		if (this.flightData.emptyLegId === false) {
			if ((this.flightData.flyFrom[0] === false) || (this.flightData.flyTo[0] === false)) {
				errorMessage.data="flight data is required";
			}
		}
		if(this.flightData.flyDate[0] === false){
			errorMessage.data="fly date is required";
		}
		if(this.flightData.flyTime[0] === false){
			errorMessage.data="fly time is required";
		}

		return errorMessage;
	}

	decodeFlightData() {
		var flightData = {};
		flightData.flyDate = [];
		flightData.flyTime = [];
		flightData.flyFrom = [];
		flightData.flyTo = [];
		// Get index 0
		flightData.emptyLegId = getValue("emptyLegId_0" , this.requestFlightForm);
		let numberOfSegment = 0 ;
		let validLeg = true;
		while (validLeg) {
			let flyDate = "flyDate_" + numberOfSegment;
			let timeDate = "timeDate_" + numberOfSegment;
			let flyFrom = "flyFrom_" + numberOfSegment;
			let flyTo = "flyTo_" + numberOfSegment;

			if (getValue(flyDate, this.requestFlightForm)) {
				flightData.flyDate.push(getValue(flyDate, this.requestFlightForm));
				flightData.flyTime.push(getValue(timeDate, this.requestFlightForm));
				flightData.flyFrom.push(getValue(flyFrom, this.requestFlightForm));
				flightData.flyTo.push(getValue(flyTo, this.requestFlightForm));
				numberOfSegment = numberOfSegment + 1;
			} else {
				validLeg = false;
			}
		}

		// Get pax
		try {
			flightData.pax = JSON.parse(getValue("passangers", this.requestFlightForm));
		} catch (e) {
			flightData.pax = getValue("passangers", this.requestFlightForm);
		}


		if (flightData.emptyLegId) {
			flightData.mode = "EmptyLegRequest";
		} else {
			flightData.mode = "FlightRequest";
			flightData.numberOfSegment = numberOfSegment;
		}

		return flightData;
	}

	decodeContact() {
		var contact = {};
		contact.title = getValue("title", this.requestFlightForm);
		contact.firstName = getValue("firstname", this.requestFlightForm);
		contact.lastName = getValue("lastname", this.requestFlightForm);
		contact.email = getValue("email", this.requestFlightForm);
		contact.phone = getValue("phone", this.requestFlightForm);
		contact.additionalNotes = "not SF mob app.";
		return contact;
	}

	decodeFlightOption() {
		var pets, smoking;
		try {
			pets = JSON.parse(getValue("pets", this.requestFlightForm));
		} catch (e) {
			pets = getValue("pets", this.requestFlightForm);
		}

		try {
			smoking = JSON.parse(getValue("smoking", this.requestFlightForm));
		} catch (e) {
			smoking = getValue("smoking", this.requestFlightForm);
		}

		var flightOptions = {
			pets: pets,
			smokers: smoking
		};

		return flightOptions;
	}

	getFlightOption(index) {
		let flightOption = {
			pets: this.flightOptions.pets && this.flightOptions.pets[index] ? this.flightOptions.pets[index] : 0,
			smokers: this.flightOptions.smokers && this.flightOptions.smokers[index] ? this.flightOptions.smokers[index] : false,
		}
		return flightOption;
	}
	getFlightRequest(index) {
		const flightData = this.flightData;

		var flyDate = flightData.flyDate[index];
		var flyTime = flightData.flyTime[index];
		var flyFrom = flightData.flyFrom[index];
		var flyTo = flightData.flyTo[index];
		var pax = flightData.pax && flightData.pax[index] ? flightData.pax[index] : 1;

		var leg = {
			date: flyDate + "T" + flyTime,
			pax: pax,
			from: {
				__typename: 'LocationType',
				label: flyFrom,
			},
			to: {
				__typename: 'LocationType',
				label: flyTo,
			},
			flightOptions: this.getFlightOption(index),
		}
		return leg;
	}

	getSalesForceRequest(legs) {
		var locale = "en";

		var aIpInfo = {
			ip: this.ipData && this.ipData.ip ? this.ipData.ip : '127.0.0.1',
			city: this.ipData && this.ipData.city ? this.ipData.city : undefined,
			region: this.ipData && this.ipData.region ? this.ipData.region : undefined,
			country: this.ipData && this.ipData.country ? this.ipData.country : 'CH',
		};

		var bodyJson = {
			locale: locale,
			contactInfo: this.contact,
			legs: legs,
			ipInfo: aIpInfo,
			website: {
				locale: "en"
			},
			browser: {
				locale: "en"
			},
		};

		if (this.flightData.mode === "EmptyLegRequest") {
			bodyJson.emptyleg = {
				...this.emptyLeg,
				details: {
					...this.emptyLeg.details,
					aircraftPost_title: this.emptyLeg.details && this.emptyLeg.details.aircraft_model_name ? this.emptyLeg.details.aircraft_model_name : ""
				}
			}
		}

		return bodyJson
	}
}
