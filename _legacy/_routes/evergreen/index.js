export default {
  path: "/evergreen",
  name: "evergreen",
  children: [
    {
      path: "",
      load: () => import(/* webpackChunkName: "client-evergreen" */"./Evergreen"),
    },
    {
      path: "/news",
      name: 'evergreen-news',
      children: [
        {
          path: "",
          load: () => import(/* webpackChunkName: "client-evergreen-all-news" */"./AllNews"),
        },
        {
          path: "/:slug",
          name: 'evergreen-news-detail',
          load: () => import(/* webpackChunkName: "client-evergreen-news-details" */"./NewsDetails"),
        },
      ],
    },
    {
      path: "/events",
      name: 'evergreen-events',
      children: [
        {
          path: "",
          load: () => import(/* webpackChunkName: "client-evergreen-all-events" */"./AllEvents"),
        },
        {
          path: "/:slug",
          name: "evergreen-events-detail",
          load: () => import(/* webpackChunkName: "client-evergreen-event-details" */"./EventDetails"),
        },
      ],
    },
  ],
};