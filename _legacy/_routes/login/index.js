export default {
  path: "/login",
  name: "Login",
  load: () => import(/* webpackChunkName: "client-evergreen" */"./PageLogin"),
};