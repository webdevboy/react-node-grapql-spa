export default {

  path: "/aircrafts",
  name: "Aircrafts",

  // Keep in mind, routes are evaluated in order
  children: [
    // require('./aircraftsManager').default,
    // require('./chatRoom').default,~
    {
      path: "/",
      name: "Manage Fleet",
      async action() {

      },
    },
    {
      path: "/add",
      name: "Add Aircraft",
      async action() {

      },
    },
    {
      path: "/categories",
      name: "Manage Fleet Categories",
      async action() {

      },
    },
    {
      path: "/manufacturers",
      name: "Manage Fleet Manufacturers",
      async action() {

      },
    },
    {
      path: "/",
      name: "Manage Fleet",
      async action() {

      },
    },

  ],

  async action({ next }) {
    const route = await next();
    // check if token is present or redirect to /login

    // Provide default values for title, description etc.
    route.title = "Aircrafts Manager";
    route.description = route.description || "";

    return route;
  },

};
