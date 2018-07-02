export default {

  path: "/emptylegs",

  name: "Empty Legs",

  // Keep in mind, routes are evaluated in order
  children: [
    // require('./emptyLegsManager').default,
    // require('./chatRoom').default,

    {
      path: "/",
      name: "Manage Empty Legs",
      async action() {

      },
    },

    {
      path: "/add",
      name: "Add Empty Leg",
      async action() {

      },
    },

  ],

  async action({ next }) {
    const route = await next();
    // check if token is present or redirect to /login

    // Provide default values for title, description etc.
    route.title = `${route.title || "Untitled Page"} - Admin`;
    route.description = route.description || "";

    return route;
  },

};
