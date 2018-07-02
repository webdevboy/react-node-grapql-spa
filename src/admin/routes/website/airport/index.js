import React from "react";
import Layout from "admin/components/Layout";
import Airports from "./Airports";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { fetchAirportsByPosts } from "admin/actions/airports";
import { fetchPosts } from "admin/actions/posts";
import { values, filter } from "lodash";
import { fetchTermTaxonomy } from "admin/actions/termTaxonomy";
import PostEditor from "../posts/PostEditor";
import { Query } from "react-apollo";
import QUERY_POST_BY_ID from "../posts/PostEditor/queries/fetchPostById.graphql";
import LoadingSpinner from "admin/components/LoadingSpinner";
import QUERY_PARENT_TRANSLATION from "admin/queries/fetchParentTranslation.graphql";

export default {
  path: "/airports",
  name: "Airport",

  children: [
    {
      path: "",
      name: "Manage Airports",
      async action({ client, store, query, route }) {
        return {
          permission: "manage_airports",
          name: "Manage Airports",
          title: "Manage Airports",
          component: (
            <Layout currentPath={route}>
              <Airports currentRoute={route} />
            </Layout>
          )
        };
      }
    },
    {
      path: "/add",
      name: "Add Airport",
      async action({ store, route, params }) {
        return {
          title: "Add Airport",
          permission: "manage_website_pages",
          component: (
            <Layout>
              <PostEditor currentRoute={route} type={"airport"} post={null} />
            </Layout>
          )
        };
      }
    },
    {
      path: "/edit/:id?/:action?/:langId?",
      name: "Edit Airport",
      async action({ store, route, params }) {
        const postId = params.id;
        let isEdit = false;
        let isTranslate = false;
        let isDuplicate = false;
        if (params.action) {
          if (params.action === "translate") {
            isTranslate = true;
          }
          if (params.action === "duplicate") {
            isDuplicate = true;
          }
        } else {
          isEdit = postId && true;
        }
        return {
          title: "Edit Airport",
          permission: "manage_website_pages",
          component: (
            <Layout>
              <Query query={QUERY_POST_BY_ID} variables={{ id: postId }}>
                {({ loading, data, error }) => {
                  if (loading) return <LoadingSpinner />;
                  if (error) return `Error! ${error.message}`;
                  const { post } = data;
                  return (
                    <Query
                      query={QUERY_PARENT_TRANSLATION}
                      variables={{
                        pathUrl: post.meta.pathUrl ? post.meta.pathUrl : {},
                        language_id: params.langId ? params.langId : post.language.id,
                        old_language_id: post.language.id
                      }}
                      notifyOnNetworkStatusChange={true}
                    >
                      {({ loading, data, error }) => {
                        if (loading) return <LoadingSpinner />;
                        if (error) return `Error! ${error.message}`;
                        const { pathUrl } = data;
                        return (
                          <PostEditor
                            currentRoute={route}
                            type={"airport"}
                            post={post}
                            isEdit={isEdit}
                            isTranslate={isTranslate}
                            isDuplicate={isDuplicate}
                            transLanguage={params.langId}
                            transParent={pathUrl}
                          />
                        );
                      }}
                    </Query>
                  );
                }}
              </Query>
            </Layout>
          )
        };
      }
    }
  ],

  async action({ client, next, store }) {
    await store.dispatch(showLoading());
    await store.dispatch(fetchPosts({ type: "airport", withTaxonomies: true }));

    const filtered = filter(values(store.getState().posts.byId), post => post.type === "airport");
    await store.dispatch(fetchAirportsByPosts(filtered.map(p => p.id)));
    await store.dispatch(fetchTermTaxonomy("article_category"));
    await store.dispatch(hideLoading());

    return await next();
  }
};
