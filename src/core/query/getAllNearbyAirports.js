import _ from "lodash";
import queryAllNearbyAirports from './queryAllNearbyAirports.graphql';

export default function getNearestAirport( lat, long, nb, client) {
	var limit;

	if (_.isEmpty(nb)) {
		limit = 1;
	} else {
		limit = nb;
	}

	return new Promise((resolve, reject) => {
		 client
		.query({
			query: queryAllNearbyAirports,
		  	variables: {
				lat,
				long,
				limit
			},
		})
		.then(({ data }) => {
			resolve(data.airports);
		});
	});
};