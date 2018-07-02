import moment from 'moment';


export default class EmptyLegListDecoder {
	constructor(mode) {
		this.mode = mode;
		this.errorMessage = this.checkMandatoryField();
	}

	isValid() {
		return (!Object.keys(this.errorMessage).length);
	}

	setError(error) {
		this.errorMessage.error = error;
	}

	checkMandatoryField() {
		var errorMessage = {};
		if (this.mode === "all") {
			this.mode = "AllEmptyLegs";
		} else {
			this.mode = "EmptyLegsOfDay";
		}
		return errorMessage;
	}
}
