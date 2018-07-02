import React from "react";
import Layout from "../../components/Layout";
import MediaCenter from "./MediaCenter";
import MediaCenterEditor from "./MediaCenterEditor";
import gql from "graphql-tag";
import { fetchFiles, getMedia } from "../../actions/media";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { values, find } from "lodash";

export default {

  path: "/media",

  children: [
    {
      path: "",
      name: "Media Library",
      async action({ store, route, query }) {

        const { folder } = query;

        await store.dispatch(showLoading());
        await store.dispatch(fetchFiles(query.folder));
        await store.dispatch(hideLoading());

        return {
          title: "Media Center",
          permission: "manage_media_center",
          component: <Layout><MediaCenter currentRoute={route} folder={folder} /></Layout>,
        };
      },
    },
    {
      path: "/:id",
      name: "Image Editor",
      async action({ store, params, next }) {
        const media = find(values(store.getState().media.byId), { id: params.id });
        if (!media) {
          return await next();
        }

        return {
          title: "Edit Image",
          permission: "manage_media_center",
          component: <Layout><MediaCenterEditor media={media} /></Layout>,
        };
      },
    },
  ],

  async action({ next, store }) {
    const route = await next();
    return route;
  },

};
