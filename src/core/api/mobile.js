import emptyLegList from "../legacyMobileApi/emptyLegList/emptyLegList";
import searchFromToSuggester from "../legacyMobileApi/searchFromToSuggester/searchFromToSuggester";
import requestFlightLegacy from "../legacyMobileApi/requestFlight/requestFlightLegacy";
import getNearestAirport from "../legacyMobileApi/searchNearestAirport/searchNearestAirport";
import apolloClient from "../query/db";
import fetch from "../query/fetch";

const mobile = async (req, res, next) => {
  try {
    var sn = req.query.sn;
    var sp = req.query.sp;
    var result;
    var stringIp;
    if (req.headers['x-forwarded-for']) {
      stringIp = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
      stringIp = req.connection.remoteAddress;
    } else {
      stringIp = req.ip;
    }
    const listIp = stringIp.split(':');
    const ip = listIp[listIp.length - 1];
    // const ip = '93.31.234.60';
    // console.log("client IP is:    " + ip);
    const util = require('util')
    console.log("Mobile query:");
    console.log(util.inspect(req.query, {showHidden: false, depth: null}));
    console.log("Mobile body:");
    console.log(util.inspect(req.body, {showHidden: false, depth: null}));

    if (sp === "luna/") {
      if (sn === "NearestAirport") {
        var lng = req.query.lng;
        var lat = req.query.lat;
        var nb = req.query.nb;
        const airport = await getNearestAirport(lat, lng, nb, apolloClient);
        result = airport;
      } else if (sn === "RequestFlight") {
        const pathIpInfo = 'https://ipinfo.io/'+ ip + '/json';
        const ipData = await fetch(pathIpInfo, {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        });
        const data = await ipData.json();

        var login = req.body.login;
        var password = req.body.password;
        var requestFlightForm = req.body.requestFlightForm;
        result = await requestFlightLegacy(data, requestFlightForm, apolloClient, fetch);
      }
      else if ( sn === "SearchFromToSuggester"){
        var input = req.body.searchStartLetters;
        var version = req.body.apiVer;
        result = await searchFromToSuggester(version, input, fetch, apolloClient);
      }
    } else if (sp === "lunaEmptyLegs/") {
      if (sn === "EmptyLegsList3") {
        var mode = req.query.mode;
        result = await emptyLegList(mode, apolloClient);
      }
      else if (sn === "EmptyLegsOfDay") {
        var mode = req.query.mode;
        result = await emptyLegList("EmptyLegsOfDay", apolloClient);
      }
    }
    res.json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export default mobile;
