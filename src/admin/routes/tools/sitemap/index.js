import React from "react";
import Layout from "../../../components/Layout";
import Sitemap from "./Sitemap";
import { fetchSitemap } from "../../../actions/sitemap";

export default {
  path: "/sitemap",
  name: 'Sitemap',
  async action({ route, store }) {

    const { ids } = store.getState().sitemap;
    if (!ids.length) {
      await store.dispatch(fetchSitemap());
    }

    return {
      title: 'URL Manager',
      permission: "manage_urls",
      component: (<Layout currentPath={route}><Sitemap currentRoute={route} /></Layout>),
    };
  },
};
