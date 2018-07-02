import moment from 'moment';
import getContinentNameFromCountry from '../../../utils/getContinentNameFromCountry';
import getGreetingTime from '../../../utils/getGreetingTime';

const calcDistance = (lat1, lon1, lat2, lon2, unit) => {
	var radlat1 = Math.PI * lat1 / 180;
	var radlat2 = Math.PI * lat2 / 180;
	var theta = lon1 - lon2;
	var radtheta = Math.PI * theta / 180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180 / Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit === 'm') {
	  dist = dist * 1609.344;
	}
	if (unit === 'K') {
	  dist = dist * 1.609344;
	}
	if (unit === 'N') {
	  dist = dist * 0.8684;
	}
	return dist;
  };

const BASE_SPEED = 900;
const calcTime = (distance, speed = BASE_SPEED) => {
  const flightTime = distance / speed;
  const hours = Math.floor(flightTime);
  const minutes = Math.ceil((flightTime - hours)*60);
  return hours + "H " + minutes + "MN";
}
export default class EmptyLegListEncoder {
	constructor() {
	}

	encodeFlight(emptyLeg, heroShotPhoto) {
		const firstDepartureTime = moment(emptyLeg.from_date, ["YYYY-MM-DDTHH:mm:ss.SSS"]);
		const lastDepartureTime = moment(emptyLeg.until_date, ["YYYY-MM-DDTHH:mm:ss.SSS"]);
		const from_Long = emptyLeg.from_airport.coordinates.split(",")[1];
		const from_Lat = emptyLeg.from_airport.coordinates.split(",")[0];
		const to_Long = emptyLeg.to_airport.coordinates.split(",")[1];
		const to_Lat = emptyLeg.to_airport.coordinates.split(",")[0];
    const speed = emptyLeg.aircraft.speed ? emptyLeg.aircraft.speed : BASE_SPEED;
		const distance = calcDistance(from_Lat, from_Long, to_Lat, to_Long, 'K');
		const flightTime = calcTime(distance,speed);
		const mappedHeroshotPhotoId = heroShotPhoto.find(o => o.id === emptyLeg.aircraft.sfid);

		var flight = {
			emptyLegId: emptyLeg.id.toString(),
			possible_flight_id: emptyLeg.id.toString(),
			first_departure_time: firstDepartureTime.valueOf(),
			firstDepartureTime: firstDepartureTime.valueOf(),
			last_departure_time: lastDepartureTime.valueOf(),
			lastDepartureTime: lastDepartureTime.valueOf(),
			sharingSeats: "0",
			flightTime: flightTime,
			priceConverted: emptyLeg.price.toFixed( 2 ),
			biggerPriceConverted: emptyLeg.price.toFixed( 2 ),
			manufacturer: emptyLeg.aircraft.manufacturer ? emptyLeg.aircraft.manufacturer.name : "",
			model: emptyLeg.aircraft.name,
			range_h: emptyLeg.aircraft.range ? emptyLeg.aircraft.range.toString() : null,
			heroShotPhotoId: mappedHeroshotPhotoId? mappedHeroshotPhotoId.heroshotphoto_id : "889",
			speed_m: emptyLeg.aircraft.speed ? emptyLeg.aircraft.speed.toString() : null,
			total_seats: emptyLeg.details.available_seats.toString(),
			available_seats: emptyLeg.details.available_seats.toString(),
			manufactured: null,
			distance: distance.toString(),
			departure_icao_code: emptyLeg.from_airport.icao,
			departure_iata_code: emptyLeg.from_airport.iata,
			departure_code: emptyLeg.from_airport.iata,
			departure_airport_name: emptyLeg.from_airport.name,
			departure_countryId: emptyLeg.from_airport.city.country.sfid,
			departure_countryName: emptyLeg.from_airport.city.country.name,
			departure_countryIso3166: emptyLeg.from_airport.city.country.countryCode.toUpperCase(),
			departure_cityId: emptyLeg.from_airport.city.sfid,
			departure_cityName: emptyLeg.from_airport.city.name,
			departure_latitude_decimal: from_Lat,
			departure_latitude_radian: (Math.PI * from_Lat / 180).toString(),
			departure_longitude_decimal: from_Long,
			departure_longitude_radian: (Math.PI * from_Long / 180).toString(),
			arrival_icao_code: emptyLeg.to_airport.icao,
			arrival_iata_code: emptyLeg.to_airport.iata,
			arrival_code: emptyLeg.to_airport.iata,
			arrival_airport_name: emptyLeg.to_airport.name,
			arrival_countryId: emptyLeg.to_airport.city.country.sfid,
			arrival_countryName: emptyLeg.to_airport.city.country.name,
			arrival_countryIso3166: emptyLeg.to_airport.city.country.countryCode.toUpperCase(),
			arrival_cityId: emptyLeg.to_airport.city.sfid,
			arrival_cityName: emptyLeg.to_airport.city.name,
			arrival_latitude_decimal: to_Lat,
			arrival_latitude_radian: (Math.PI * to_Lat / 180).toString(),
			arrival_longitude_decimal: to_Long,
			arrival_longitude_radian: (Math.PI * to_Long / 180).toString(),
			aircraftType: emptyLeg.aircraft.category ? emptyLeg.aircraft.category.name : "",
			first_departure_time_of_day: getGreetingTime(firstDepartureTime),
			last_departure_time_of_day: getGreetingTime(lastDepartureTime)
		}

		return flight;
	}

	encodeCitiesPerContinent(citiesPerContinent, emptyLeg) {
		const continentName = getContinentNameFromCountry(emptyLeg.from_airport.city.country.countryCode.toUpperCase());
		var city = {};
		if (continentName) {
			city = {
				id: emptyLeg.from_airport.city.sfid,
				name: emptyLeg.from_airport.city.name,
			};
			if (citiesPerContinent[continentName] === undefined) {
				citiesPerContinent[continentName] = [];
			}
			citiesPerContinent[continentName].push(city);
		}

	}
	buildReply(emptyLegs, heroShotPhoto) {
		var response;
		var flights = [];
		var flightsAssoc = {};
		var emptyLegsAmount = emptyLegs.length;
		var citiesPerContinent = {};
		emptyLegs.map(emptyLeg => {
			var flight = this.encodeFlight(emptyLeg, heroShotPhoto);
			var flightAssoc = {};
			flightsAssoc[emptyLeg.id] = flight;
			flights.push(flight);
			this.encodeCitiesPerContinent(citiesPerContinent, emptyLeg);
		});
		response = {
			flights: flights,
			flightsAssoc: flightsAssoc,
			emptyLegsAmount: emptyLegsAmount,
			citiesPerContinent: citiesPerContinent,
		}
		return response;
	}

}
