import queryEmptyLegById from './queryEmptyLegById.graphql';

export default function getEmptyLegById( id , client) {
	return new Promise((resolve, reject) => {
		 client
		.query({
			query: queryEmptyLegById,
		  	variables: {
				id,
			},
		})
		.then(({ data }) => {
			resolve(data.emptyleg);
		});
	});
};