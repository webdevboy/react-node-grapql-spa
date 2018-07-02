import _ from "lodash";
import { fetchRoles } from "admin/actions/userRoles";
import { setLocale } from "shared/actions/intl";
import { fetchLanguages } from "admin/actions/translations";
import { fetchSettings } from "admin/actions/settings";

// Keep in mind, routes are evaluated in order
const routes = {
  path: "",
  name: "Root",
  children: [
    {
      path: ["", "/dashboard", "/home"],
      name: "Dashboard",
      load: () => import(/* webpackChunkName: 'admin-dashboard' */ "./dashboard"),
    },
    {
      path: "/login",
      name: "Login",
      load: () => import(/* webpackChunkName: 'admin-login' */ "./login"),
    },
    {
      path: "/chat",
      name: "Chat Manager",
      load: () => import(/* webpackChunkName: 'admin-chat' */ "./chat"),
    },

    require("./users").default,
    // path: "/users",
    // name: "Users Manager",
    // load: () => import(/* webpackChunkName: 'admin-users' */"./users"),

    // {
    //   path: "/media",
    //   name: "Media Center",
    //   load: () => import(/* webpackChunkName: 'admin-media' */"./mediacenter"),
    // },
    require("./mediacenter").default,
    {
      path: "/website",
      name: "Website Content",
      children: [
        require("./website/events").default,
        require("./website/posts").default,
        require("./website/fleet").default,
        require("./website/airport").default,
        require("./website/articles").default,
        require("./website/jobs").default,
        require("./website/reviews").default,
        // require("./website/services").default,
        // require("./website/offices").default,
        require("./website/emptylegs").default,
        // require("./website/team-members").default,
      ], // end of childrens from page
    }, // end of pages object
    {
      path: "/tools",
      name: "Tools",
      children: [
        require("./tools/translations").default,
        require("./tools/urls").default,
        require("./tools/sitemap").default,
        require("./tools/settings").default,
        require("./tools/emails").default,
      ],
    },

    //
    // require('./tools/adminTranslations').default,

    // require('./website').default,

    // require('./lunajets/emptylegs').default,
    // require('./lunajets/destinations').default,
    // require('./lunajets/aircrafts').default,

    // require('./lunajets/contacts').default,
    // require('./lunajets/team').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    {
      path: "(.*)",
      name: "404",
      load: () => import(/* webpackChunkName: 'admin-404' */ "./404"),
    },
  ],

  async action({ store, next, client, pathname, locale, route }) {
    // const { user: teste } = store.getState().auth;
    // console.log('teste 0> ',teste);
    const { user } = await store.getState().auth;
    // console.log(user);
    // // Redirect to login page if user is not admin
    // console.log(pathname);
    if (pathname !== "/login") {
      if (!user) {
        return { redirect: "/login" };
      }
    } else if (user && pathname === "/login") {
      return { redirect: "/" };
    }

    if (route.permission) {
        if ( ! _.find(user.role.permissions, { action: 'GOD_MODE' }) || ! _.find(user.role.permissions, { action: route.permission }) ) {
            return { redirect: '/' };
        }
    }

    const child = await next();


    // const settingsById = await store.getState().settings.byId;
    // const defaultLocale = _.find(settingsById, { option: "site_default_locale" });

    // console.log(defaultLocale);
    // await store.dispatch(setLocale({ locale: defaultLocale.value }));

    // const { backdrop, navigation } = store.getState().interface;
    // generate navigation bar for admin
    // child.rootNav = _.reduce(route.children, (nav, val, key) => {
    //   if (val.rootNav) {
    //     nav.push(val);
    //   }
    //   return nav;
    // }, []);

    // const { user } = store.getState().auth;

    // console.log(user);
    // if (!user && route.name !== 'login') {
    //   return { redirect: '/login' };
    // }
    // check for logged in state, otherwise redirect to /login
    // Execute each child route until one of them return the result
    // if (!user && route.name !== 'login') {
    //   return { redirect: '/login' };
    // }

    // if (backdrop) {
    //   store.dispatch(hideBackdrop());
    // }

    // if (navigation) {
    //   store.dispatch(hideNav());
    // }

    

    // // Provide default values for title, description etc.
    // child.title = `${child.title || 'Untitled Page'} - Lunajets Dashboard`;
    // child.description = child.description || '';

    // Provide default values for title, description etc.
    child.title = `${child.title || "Untitled Page"} - Lunajets Dashboard`;
    child.description = child.description || "";

    console.log("MIDDLEWARE END .....");
    return child;
  },
};

// The error page is available by permanent url for development mode
// if (__DEV__) {
//   routes.children.unshift({
//     path: '/error',
//     action: require('./error').default,
//   });
// }

export default routes;
