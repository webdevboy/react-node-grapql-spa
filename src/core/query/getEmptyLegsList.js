import queryEmptyLegsList from './queryEmptyLegsList.graphql';

export default function getEmptyLegsList( variable , client) {
	return new Promise((resolve, reject) => {
		 client
		.query({
			query: queryEmptyLegsList,
			variables: variable,
		})
		.then(({ data }) => {
			resolve(data.emptylegs);
		});
	});
};