import getAllNearbyAirports from '../../query/getAllNearbyAirports';

export default async function searchNearestAirport( lat, long, nb, client) {

	var airports = await getAllNearbyAirports(lat, long, nb, client);
	var jsonAirport = {};
	// If airport valide
	if (airports) {
		jsonAirport.airport = [];
		airports.map(airport => {
			const city = airport.city;
			const country = city.country;
			var jsonAirportContent = {};

			jsonAirportContent["name"] = airport.full_name;
			jsonAirportContent["airportId"] = airport.id.toString();
			jsonAirportContent["icao_code"] = airport.icao;
			jsonAirportContent["iata_code"] = airport.iata;
			jsonAirportContent["airport_name"] = airport.name;
			jsonAirportContent["cityId"] = city.id.toString();
			jsonAirportContent["countryId"] = country.id.toString();
			jsonAirportContent["city_name"] = city.name;
			jsonAirportContent["country_name"] = country.name;
			jsonAirportContent["iso3166"] = 	country.countryCode.toUpperCase();
			jsonAirportContent["latitude_decimal"] = airport.coordinates.split(',')[0];
			jsonAirportContent["longitude_decimal"] = airport.coordinates.split(',')[1];
			jsonAirportContent["airport_distance"] = airport.distance;

			jsonAirport.airport.push(jsonAirportContent);
		})
	}
	return jsonAirport;

};