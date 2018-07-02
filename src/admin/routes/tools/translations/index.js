import React from "react";
import Layout from "../../../components/Layout";
import Languages from "./Languages";
import Language from "./Language";

import { fetchLanguages, fetchStrings } from "../../../actions/translations";

export default {

  name: 'Manage Languages',
  path: "/translations",

  children: [
    {
      path: '',
      name: 'Manage Languages',
      async action({
        client, store, query, route,
      }) {
        return {
          permission: "manage_translations",
          title: "Manage Languages",
          component: (<Layout currentPath={route}><Languages currentRoute={route} /></Layout>),
        };
      },
    },
    {
      path: "/:locale",
      async action({
        route, store, params, query,
      }) {

        const onlyMissing = (query.onlyMissing == "true");
        await store.dispatch(fetchStrings(params.locale));

        // .languages.byId[params.id].strings || [];
        // if (!strings.length) {
        //   await store.dispatch(fetchStrings(params.id));
        // }

        // 
        return {
          permission: "manage_translations",
          title: "View Language",
          component: <Layout><Language locale={params.locale} onlyMissing={onlyMissing} currentRoute={route} /></Layout>,
        };
      },
    },
  ],
  async action({ store, next }) {

    await store.dispatch(fetchLanguages());

    const route = await next();
    return route;

  }
};

