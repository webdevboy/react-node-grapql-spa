export default {
  path: "/why-lunajets",
  children: [
    {
      path: "/reviews-testimonials",
      name: "Testimonials",
      load: () => import(/* webpackChunkName: "client-why-lunajets-testimonials" */"./Testimonials"),
    },
    {
      path: "/our-history",
      name: "Our History",
      load: () => import(/* webpackChunkName: "client-why-lunajets-history" */"./History"),
    },
    {
      path: "/our-team",
      name: "Our Team",
      load: () => import(/* webpackChunkName: "client-why-lunajets-team" */"./Team"),
    },
    {
      path: "/private-jet-hire-cost",
      children: [
        {
          path: "",
          name: "Jet Cost",
          load: () => import(/* webpackChunkName: "client-why-lunajets-jet-cost" */"./JetCost"),
        },
        {
          path: "/to-:city",
          name: "Jet Cost Destination",
          load: () => import(/* webpackChunkName: "client-why-lunajets-jet-cost-destination" */"./JetCostDestination"),
        },
      ],
    },
  ],
};
