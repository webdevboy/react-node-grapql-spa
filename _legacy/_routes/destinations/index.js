export default {
  path: "/destinations",
  name: 'destinations',
  children: [
    {
      path: "",
      load: () => import(/* webpackChunkName: "client-destinations" */"./Destinations"),
    },
    {
      path: "/:city",
      name: "destination-details",
      load: () => import(/* webpackChunkName: "client-destinations-details" */"./DestinationDetails"),
    },
  ],
}