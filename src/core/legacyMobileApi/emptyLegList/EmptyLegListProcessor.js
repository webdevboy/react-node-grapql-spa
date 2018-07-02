import _ from "lodash";
import moment from 'moment';
import getEmptyLegsList from '../../query/getEmptyLegsList';
import getHeroshotPhotos from '../../query/getHeroShotPhotos';

export default class EmptyLegListProcessor {
	constructor(emptyLegDecoder, emptyLegEncoder, client) {
		this.client = client;
		this.emptyLegDecoder = emptyLegDecoder;
		this.emptyLegEncoder = emptyLegEncoder;
	}

	getEmptyLegs = async () => {
		const variables = {
      pagination: {
        offset: 0,
        limit: 500
      }
    };
		if (this.emptyLegDecoder.mode === "EmptyLegsOfDay") {
			variables.date = moment();
		}

		var emptyLegs = await getEmptyLegsList(variables, this.client);
		return emptyLegs;
	}

	getHeroshotPhotos = async (aircraftIdList) => {
		var aircraftHeroshotPhoto = {};
		const variables = {};
		variables.list_id = aircraftIdList;

		if (aircraftIdList.length > 0) {
			aircraftHeroshotPhoto = await getHeroshotPhotos(aircraftIdList, this.client);
		}

		return aircraftHeroshotPhoto;
	}

	getResponse = async () => {
		var isError = false;
		var emptyLegs = {};
		var aircraftIdList = [];
		var heroShotPhoto = [];
		var response;
		try {
			// Check validity of request flight input
			if (this.emptyLegDecoder.isValid()) {
				// Get the empty legs
				emptyLegs = await this.getEmptyLegs();
				emptyLegs.map(emptyleg => {
					aircraftIdList.push(emptyleg.aircraft.sfid);
				});

				heroShotPhoto = await this.getHeroshotPhotos(aircraftIdList);
			}
		} catch(e) {
			console.log("Empty Legs List Exception:" + e);
			isError = true;
		}

		// If error by exception or not success with SF, return internal error
		if (isError) {
			this.emptyLegDecoder.setError("Internal Error");
		}

		// Get response
		response = this.emptyLegEncoder.buildReply(emptyLegs, heroShotPhoto);

		return response;
	}
}
