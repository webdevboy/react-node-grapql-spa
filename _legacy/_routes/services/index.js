export default {
  path: "/services",
  children: [
    {
      path: "",
      name: "Services",
      load: () => import(/* webpackChunkName: "client-services" */"./Services"),
    },
    {
      path: "/:reason",
      name: "Service Details",
      load: () => import(/* webpackChunkName: "client-services-details" */"./ServiceDetails"),
    },
  ],
};
