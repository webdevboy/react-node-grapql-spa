import createFetch from '../createFetch';
import config from '../../config';
var myfetch = require("node-fetch");
// Universal HTTP client
const fetch = createFetch(myfetch, {
	baseUrl: config.api
});

export default fetch;