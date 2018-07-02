import _ from "lodash";
import RequestFlightLegacyDecoder from "./RequestFlightLegacyDecoder";
import RequestFlightLegacyEncoder from "./RequestFlightLegacyEncoder";
import RequestFlightProcessor from "./RequestFlightProcessor";

export default async function requestFlightLegacy(ipData, requestFlightForm, client, fetch ) {
	var aInput = new RequestFlightLegacyDecoder(ipData, requestFlightForm);
	var aEncoder = new RequestFlightLegacyEncoder();
	var aRequest = new RequestFlightProcessor(aInput, aEncoder, client, fetch);
	var result = await aRequest.getResponse();
	return result;
};