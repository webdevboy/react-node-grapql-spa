import React from "react";
import { fetchTermTaxonomy } from "admin/actions/termTaxonomy";
import Layout from "admin/components/Layout";
import Posts from "./Posts";
import PostEditor from "./PostEditor";
import { Query } from "react-apollo";
import QUERY_POST_BY_ID from "./PostEditor/queries/fetchPostById.graphql";
import LoadingSpinner from "admin/components/LoadingSpinner";
import QUERY_PARENT_TRANSLATION from "admin/queries/fetchParentTranslation.graphql";

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
          component: (
            <Layout>
              <Posts currentRoute={route} />
            </Layout>
          )
        };
      }
    },
    {
      path: "/add",
      name: "Add Page",
      async action({ store, route, params }) {
        return {
          title: `Add Page`,
          permission: "manage_website_pages",
          component: (
            <Layout>
              <PostEditor currentRoute={route} />
            </Layout>
          )
        };
      }
    },
    {
      path: "/edit/:id?/:action?/:langId?",
      name: "Edit Page",
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
          title: "Edit Page",
          permission: "manage_website_pages",
          component: (
            <Layout>
              <Query query={QUERY_POST_BY_ID} variables={{ id: postId }} notifyOnNetworkStatusChange={true}>
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
                        old_language_id:post.language.id,
                      }}
                      notifyOnNetworkStatusChange={true}
                    >
                      {({ loading, data, error }) => {
                        if (loading) return <LoadingSpinner />;
                        if (error) return `Error! ${error.message}`;
                        const {pathUrl} = data;
                        return (
                          <PostEditor
                            currentRoute={route}
                            type={"page"}
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

  async action({ store, next }) {
    await store.dispatch(fetchTermTaxonomy("article_category"));
    return await next();
  }
};
