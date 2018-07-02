export default {

  path: "/destinations",

  // Keep in mind, routes are evaluated in order
  children: [
    require("./destinationsManager").default,
    // require('./chatRoom').default,
  ],

  async action({ next }) {
    const route = await next();
    // check if token is present or redirect to /login

    // Provide default values for title, description etc.
    route.title = "Destinations Manager";
    route.description = route.description || "";

    return route;
  },

};
