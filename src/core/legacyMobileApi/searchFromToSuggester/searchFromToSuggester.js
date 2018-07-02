import SearchLocation from './searchLocation';
import ResultEncoder from './resultEncoder';

export default async function searchFromToSuggester(version, input, fetch, client) {
	var aSearchEngine = new SearchLocation(fetch, client);
	var aEncoder = new ResultEncoder();
	const result = await aSearchEngine.search(input);
	const response = aEncoder.buildReply(version,result);
	return response;
};