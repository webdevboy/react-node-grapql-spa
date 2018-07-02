import React from "react";
import Layout from "../../../components/Layout";
import UrlManager from "./UrlManager";
import { fetchRedirections } from "../../../actions/redirections";

export default {

  path: "/url-redirections",

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      permission: 'manage_urls',
      name: 'URL Redirections',
      async action({ route, store }) {
        await store.dispatch(fetchRedirections());
        return {
          title: 'URL Redirections',
          permission: "manage_urls",
          component: (<Layout currentPath={route}><UrlManager currentRoute={route} /></Layout>),
        };
      },

    },
  ],
};
