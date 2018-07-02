import React from "react";
import Pages from "./Pages";
import Page from "./Page";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { fetchPages } from "admin/actions/pages";
import Layout from "admin/components/Layout";

import _ from "lodash";

export default {

  path: "/pages",

  children: [
    {
      path: "",
      name: "Pages",
      async action({ store, route }) {
        return {
          title: "Pages Manager",
          permission: "manage_website_pages",
          component: <Layout><Pages currentRoute={route} /></Layout>,
        };
      },
    },
    {
      path: "/add",
      name: "Creates new page",
      async action({ route }) {
        return {
          title: "New Page",
          permission: "manage_website_pages",
          component: <Layout><Page add currentRoute={route} /></Layout>,
        };
      },
    },
    {
      path: "/edit/:id",
      name: "Edit page",
      async action({ route }) {
        return {
          title: "Edit Page",
          permission: "manage_website_pages",
          component: <Layout><Page edit currentRoute={route} /></Layout>,
        };
      },
    },
    {
      path: "/builder/:id",
      name: "Builder Tool",
      load: () => import(/* webpackChunkName: 'admin-website-pages-builder' */"./builder"),
    },
  ],

  async action({ store, next }) {
    await store.dispatch(showLoading());
    const pages = await store.getState().pages.ids;

    const defaultLocale = await store.getState().intl.locale;
    const localesById = await store.getState().translations.locales.byId;
    const languagesById = await store.getState().translations.languages.byId;

    const locale = _.find(localesById, { locale: defaultLocale });
    const language = _.find(languagesById, { locale: locale.id });

    if (!pages.length) {
      await store.dispatch(fetchPages());
    }

    await store.dispatch(hideLoading());

    return await next();
  },

};
