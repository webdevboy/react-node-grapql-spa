import React from "react";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import { fetchPosts } from "admin/actions/posts";
import Layout from "admin/components/Layout";
import Categories from "./Categories";

import _ from "lodash";

export default {
  path: "/categories",

  children: [
    {
      path: "",
      name: "Categories",
      async action({ store, route }) {
        return {
          title: "Categories Manager",
          permission: "manage_website_pages",
          component: <Layout><Categories currentRoute={route} /></Layout>,
        };
      },
    }
  ],

  async action({ store, next }) {
    await store.dispatch(showLoading());
	/*
    const posts = await store.getState().posts.ids;

    const defaultLocale = await store.getState().intl.locale;
    const localesById = await store.getState().translations.locales.byId;
    const languagesById = await store.getState().translations.languages.byId;

    const locale = _.find(localesById, { locale: defaultLocale });
    const language = _.find(languagesById, { locale: locale.id });

    if (!posts.length) {
       await store.dispatch(fetchPosts());
    }
	*/
    await store.dispatch(hideLoading());

    return await next();
  },
};
