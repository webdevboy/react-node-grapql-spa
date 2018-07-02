export const airports = {
  path: "/city-airport-:iata",
  name: "Airports",
  load: () => import(/* webpackChunkName: "client-airports" */"./Airports"),
};

export const airportMap = {
  path: "/airports-next-to-:city",
  name: "Airports Map",
  load: () => import(/* webpackChunkName: "client-airports-map" */"./AirportsMap"),
};