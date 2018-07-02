import React from "react";
import fetch from 'isomorphic-fetch'
import Page from "../../components/Page";
import EmptyLegsDestinationDescription from "../../../components/Content/EmptyLegs/EmptyLegsDestinationDescription";
import EmptyLegsResult from "../../../components/Content/EmptyLegs/EmptyLegsResult";
import getAllNearbyAirports from "./getAllNearbyAirports.graphql";
import queryGetEmptyLegs from "./queryGetEmptyLegs.graphql";
import Promise from "bluebird";

const GOOGLE_API_KEY = "AIzaSyDH7XYmx1EiTYlM7GSkqS4FsDetFjr5328";

function forwardGeoCode(input) {
  const location = encodeURI(input);
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?result_type=administrative_area_level_1&address=${location}&key=${GOOGLE_API_KEY}`,
      { timeout: 10000 }
    )
      .then(async (response) => response.json())
      .then(({ results }) => {
        if (results.length) {
          resolve(results);
        } else {
          reject(new Error("No results"));
        }
      });
  });
};
function searchAiports({ lat, lng }, client) {
  return new Promise((resolve, reject) => {
    client
      .query({
        query: getAllNearbyAirports,
        variables: {
          lat,
          long: lng,
        },
      })
      .then(({ data }) => {
        resolve(data.airports);
      });
  });
};
async function action({ client, params, query }) {
  let emptylegsList = [];
  const geocode = await forwardGeoCode(params.toDestination);
  if (geocode) {
    const latlong = geocode[0].geometry.location;
    const airports = await searchAiports(latlong, client);
    const listAirportIds = [];
    airports.forEach((airport) => {
      listAirportIds.push(airport.id);
    });
    const { data: { emptylegs } } = await client.query({
      query: queryGetEmptyLegs,
      variables: {
        list_to_airport_id: listAirportIds
      }
    });
    emptylegsList = emptylegs;
    console.log("EMPTYLEGS FOUND");
    console.log(emptylegsList);
  }
  return {
    title: "Empty Leg",
    component: (
      <Page template="Default">
        <EmptyLegsDestinationDescription destination={params.toDestination}/>
        <EmptyLegsResult isFetching={false} data={emptylegsList} view={"list"} />
      </Page>
    ),
  };
}

export default action;
