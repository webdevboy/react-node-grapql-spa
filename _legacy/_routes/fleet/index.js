export default {
  path: "/fleet",
  name: "fleet",
  children: [
    {
      path: "",
      load: () => import(/* webpackChunkName: "client-fleet" */ "./Fleet/index.js"),
    },
    {
      path: "/jet-comparator",
      name: "jet-comparator",
      load: () => import(/* webpackChunkName: "client-fleet-jet-comprator" */ "./JetComparator"),
    },
    {
      path: "/:manufacturer",
      name: "manufacturer",
      load: () => import(/* webpackChunkName: "client-fleet-aircraft-manufacturer" */ "./AircraftManufacturer"),
    },
    {
      path: "/:manufacturer/:model",
      name: "jet-detail",
      load: () => import(/* webpackChunkName: "client-fleet-jet-detail" */ "./JetDetail"),
    },
  ],
};
