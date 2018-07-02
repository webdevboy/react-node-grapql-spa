import React from "react";
import Layout from "admin/components/Layout";

import { fetchPages } from "admin/actions/pages";
import { fetchTermTaxonomy } from "admin/actions/termTaxonomy";
import PostEditor from "../posts/PostEditor";
import PostManager from "../posts/PostManager";
import { Query } from "react-apollo";
import QUERY_POST_BY_TYPE from "../posts/PostManager/queryPostsByType.graphql";
import QUERY_POST_BY_ID from "../posts/PostEditor/queries/fetchPostById.graphql";
import LoadingSpinner from "admin/components/LoadingSpinner";
import QUERY_PARENT_TRANSLATION from "admin/queries/fetchParentTranslation.graphql";

export default {
  path: "/services",
  name: "Service",

  children: [
    {
      path: "",
      name: "Service Manager",
      async action({ route, params }) {
        return {
          title: "Service Manager",
          permission: "manage_website_pages",
          component: (
            <Layout>
              <PostManager currentRoute={route} type={"service"} />
            </Layout>
          )
        };
      }
    },
    {
      path: "/add",
      name: "Add Service",
      async action({ store, route, params }) {
        return {
          title: "Add Service",
          permission: "manage_website_pages",
          component: (
            <Layout>
              <PostEditor currentRoute={route} type={"service"} post={null} />
            </Layout>
          )
        };
      }
    },
    {
      path: "/edit/:id?/:action?/:langId?",
      name: "Edit Service",
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
          title: "Edit Services",
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
                            type={"service"}
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

  async action({ next, store }) {
    await store.dispatch(fetchTermTaxonomy("article_category"));
    const route = await next();
    return route;
  }
};
