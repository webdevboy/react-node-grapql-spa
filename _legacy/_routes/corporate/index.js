export default {
  path: "/corporate",
  name: "corporate",
  children: [
    {
      path: "",
      load: () => import(/* webpackChunkName: "client-corporate" */"./Corporate"),
    },
    {
      path: "/:sector",
      name: "corporate-details",
      load: () => import(/* webpackChunkName: "client-corporate-details" */"./CorporateDetails"),
    },
  ],
}