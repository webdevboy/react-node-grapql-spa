import moment from 'moment';
import getContinentNameFromCountry from '../../../utils/getContinentNameFromCountry';
import getGreetingTime from '../../../utils/getGreetingTime';

export default class ResultEncoder {
	constructor() {
	}
	encodeVersion_0 = (result) => {
		const { nearby, location } = result;
		let res = [];
		if (location){
			res.push(location.label);
		}
		nearby.map(airport => {
			const cityName = airport.city ? airport.city.name : "";
			const countryName = airport.city && airport.city.country ? airport.city.country.name : "";
			const label = airport.iata + " " + cityName + ", " + airport.name + ", " + countryName;
			res.push(label);
		});
		return res;
	}

	encodeVersion_1 = (result) => {
		const { nearby, location } = result;
		let res = [];
		if (location){
			const listLoc = location.label.split(", ");
			res.push({
				name: location.label,
				languageId: 1,
				airportId: null,
				cityId: 1,
				cityName: listLoc[0],
				stateId: null,
				stateName: null,
				countryId: 1,
				countryName: listLoc[1],
			});
		}
		nearby.map(airport => {
			const cityName = airport.city ? airport.city.name : "";
			const countryName = airport.city && airport.city.country ? airport.city.country.name : "";
			const label = airport.iata + " " + cityName + ", " + airport.name + ", " + countryName;
			res.push({
				name: label,
				languageId: 1,
				airportId: 1,
				cityId: 1,
				cityName: cityName,
				stateId: null,
				stateName: null,
				countryId: 1,
				countryName: countryName,
			});
		});
		return res;
	}

	encodeVersion_2 = (result) => {
		const { nearby, location } = result;
		let res = [];
		if (location){
			const listLoc = location.label.split(", ");
			res.push({
				name: location.label,
				languageId: 1,
				airportId: null,
				cityId: 1,
				cityName: listLoc[0],
				stateId: null,
				stateName: null,
				countryId: 1,
				countryName: listLoc[1],
				iso3166: location.countryCode,
				latitude_decimal: location.geometry.location.lat,
				longitude_decimal: location.geometry.location.lng
			});
		}
		nearby.map(airport => {
			const cityName = airport.city ? airport.city.name : "";
			const countryName = airport.city && airport.city.country ? airport.city.country.name : "";
			const label = airport.iata + " " + cityName + ", " + airport.name + ", " + countryName;
			const countryCode = airport.city && airport.city.country ? airport.city.country.countryCode : "";
			const coordinates = airport.coordinates ? airport.coordinates.split(",") : [null,null];
			res.push({
				name: label,
				languageId: 1,
				airportId: 1,
				cityId: 1,
				cityName: cityName,
				stateId: null,
				stateName: null,
				countryId: 1,
				countryName: countryName,
				iso3166: countryCode,
				latitude_decimal: coordinates[0],
				longitude_decimal: coordinates[1]
			});
		});
		return res;
	}

	buildReply = (version, result) => {
		let res = [];
		if (!version){
			res = this.encodeVersion_0(result);
		}else	if (version === "1.0"){
			res = this.encodeVersion_1(result);
		}else if (version === "2.0"){
			res = this.encodeVersion_2(result);
		}
		return {suggestions: res};
	}

}
