import React from "react";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import { fetchPages } from "admin/actions/pages";
import { fetchTermTaxonomy } from "admin/actions/termTaxonomy";
import Layout from "admin/components/Layout";
import PostEditor from "../posts/PostEditor";
import PostManager from "../posts/PostManager";
import { Query } from "react-apollo";
import QUERY_POST_BY_ID from "../posts/PostEditor/queries/fetchPostById.graphql";
import LoadingSpinner from "admin/components/LoadingSpinner";
import CategoryManager from "admin/components/./CategoryManager";
import TagManager from "admin/components/TagManager";
import QUERY_PARENT_TRANSLATION from "admin/queries/fetchParentTranslation.graphql";

import _ from "lodash";

export default {
  path: "/articles",
  children: [
    {
      path: "",
      name: "Article Manager",
      async action({ route, params }) {
        return {
          title: "Article Manager",
          permission: "manage_website_pages",
          component: (
            <Layout>
              <PostManager currentRoute={route} type={"article"} withTaxonomies={true} />
            </Layout>
          )
        };
      }
    },
    {
      path: "/add",
      name: "Add Article",
      async action({ store, route, params }) {
        return {
          title: "Add Article",
          permission: "manage_website_pages",
          component: (
            <Layout>
              <PostEditor currentRoute={route} type={"article"} post={null} />
            </Layout>
          )
        };
      }
    },
    {
      path: "/edit/:id?/:action?/:langId?",
      name: "Edit Article",
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
          title: "Edit Article",
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
                            type={"article"}
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
    },
    {
      path: "/category",
      name: "Category Manager",
      async action({ route, params }) {
        return {
          title: "Category Manager",
          permission: "manage_website_pages",
          component: (
            <Layout>
              <CategoryManager currentRoute={route} type={"article_category"} />
            </Layout>
          )
        };
      }
    },
    {
      path: "/tag",
      name: "Tag Manager",
      async action({ route, params }) {
        return {
          title: "Tag Manager",
          permission: "manage_website_pages",
          component: (
            <Layout>
              <TagManager currentRoute={route} type={"post_tag"} />
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
