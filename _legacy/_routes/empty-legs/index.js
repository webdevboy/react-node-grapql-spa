export default {
  path: "/empty-legs",
  children: [
    {
      path: "",
      name: "Empty Legs",
      load: () => import(/* webpackChunkName: "client-empty-legs" */"./EmptyLegs"),
    },
    {
      path: "/fly-to-:toDestination",
      name: "Empty Legs Fly To Destination",
      load: () => import(/* webpackChunkName: "client-empty-legs-fly-to" */"./EmptyLegsFlyTo"),
    },
    {
      path: "/fly-to-:toDestination/from-:fromDestination",
      name: "Empty Legs Fly From To Destination",
      load: () => import(/* webpackChunkName: "client-empty-legs-fly-from-to" */"./EmptyLegsFlyFromTo"),
    },
    {
      path: "/empty-leg/:fromDestination/:toDestination/:id/",
      name: "Empty Leg Details",
      load: () => import(/* webpackChunkName: "client-empty-legs-details" */"./EmptyLegsDetails"),
    },
  ],
};
