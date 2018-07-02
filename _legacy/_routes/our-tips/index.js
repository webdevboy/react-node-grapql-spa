export default {
  path: "/jet-advices",
  name: 'our-tips',
  children: [
    {
      path: "",
      load: () => import(/* webpackChunkName: "client-tips" */"./OurTips"),
    },
    {
      path: "/:slug",
      name: "our-tips-details",
      load: () => import(/* webpackChunkName: "client-tips-details" */"./OurTipsDetails"),
    },
  ],
};
