import EmptyLegListDecoder from './EmptyLegListDecoder';
import EmptyLegListEncoder from './EmptyLegListEncoder';
import EmptyLegListProcessor from './EmptyLegListProcessor';

export default async function emptyLegList(mode, client) {
	var aDecoder = new EmptyLegListDecoder(mode);
	var aEncoder = new EmptyLegListEncoder();
	var aRequest = new EmptyLegListProcessor(aDecoder, aEncoder, client);

	var result = await aRequest.getResponse();
	return result;
};