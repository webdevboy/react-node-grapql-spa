import queryHeroShotPhotos from './queryHeroShotPhotos.graphql';

export default function getHeroshotPhotos( list_id , client) {
	return new Promise((resolve, reject) => {
		 client
		.query({
			query: queryHeroShotPhotos,
			variables: {
				ids: list_id
			},
		})
		.then(({ data }) => {
			resolve(data.aircraftHeroshotPhotos);
		});
	});
};