import React from "react";
import Page from "../../components/Page";
import background from "../home/gfx/background.jpg";
import AirportDescription from "../../../components/Content/Detail/Airport/AirportDescription";
import EmptyLegsSearchLocation from "../../../components/Content/EmptyLegs/EmptyLegsSearchLocation";
import FixedRatioImage from "components/Primitives/FixedRatioImage";
import queryGetAirport from "./queryGetAirport.graphql";

async function action({ client, params, query }) {
  console.log(params, query);

  const { data: { airport } } = await client.query({
    query: queryGetAirport,
    variables: {
      iata: params.iata.toUpperCase(),
    },
  });

  var airportSfid = -1;
  var cityName = "UNKNOWN";

  if (airport) {
    airportSfid = airport.sfid;
    cityName = airport.name.toUpperCase();
  }

  const headingFromAirport = {
    subtitle: {
      defaultMessage: "Empty Legs",
      id: "client.banner.subtitle.",
      color: "lt-blue",
    },
    paragraph: {
      defaultMessage: "FROM " + cityName + " AIRPORT",
      id: "client.from.airport." + cityName + ".param",
    },
  };

  const headingToAirport = {
    paragraph: {
      defaultMessage: "TO " + cityName + " AIRPORT",
      id: "client.to.airport." + cityName + ".param",
    },
  };

  return {
    title: "Airport Description",
    component: (
      <Page template="Default">
        {/* Desktop banner */}
        <FixedRatioImage className="d-none d-md-block" ratio={0.3} image={{ src: "https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/AIRCR.png" }} />
        {/* Mobile banner */}
        <FixedRatioImage className="d-md-none" ratio={0.8} image={{ src: "https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/AIRCR.png" }} />
        <AirportDescription cityName={cityName} />
        <EmptyLegsSearchLocation fromAirportId={airportSfid} heading={headingFromAirport} />
        <EmptyLegsSearchLocation toAirportId={airportSfid} heading={headingToAirport} />
      </Page>
    ),
  };
}

export default action;
