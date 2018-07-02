import React from "react";
import Layout from "../../../components/Layout";
import Translation from "../../../components/Translation";
import gql from "graphql-tag";
import { setTranslations, setLanguages } from "../../../../redux/actions/admin";


export default {

  path: "/admin-translations",
  children: [
    {
      path: "/",
      async action({ client, store }) {
        await store.dispatch(setLanguages());

        const { data } = await client.query({
          query: gql`{
            getLocales{
              id
              locale
              language
              country
            }
          }`,
        });
        const locales = data.getLocales;

        return {
          chunk: "translation",
          permission: "manage_translations",
          component: <Layout><Translation locales={locales} predicate="admin." /></Layout>,
        };
      },
    },
    {
      path: "/:locale",
      async action({ client, store }, context) {
        await store.dispatch(setLanguages());
        await store.dispatch(setTranslations(context.locale));

        const { data } = await client.query({
          query: gql`{
            getLocales{
              id
              locale
              language
              country
            }
          }`,
        });
        const locales = data.getLocales;

        return {
          chunk: "localeEditor",
          permission: "manage_translations",
          component: <Layout><Translation locale={context.locale} locales={locales} predicate="admin." /></Layout>,
        };
      },
    },
  ],

  async action({ next }) {
    const route = await next();
    return route;
  },

};

