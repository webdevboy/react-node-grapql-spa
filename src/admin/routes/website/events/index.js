import React from "react";
import Layout from "admin/components/Layout";
import Events from "./Events";
import { fetchTermTaxonomy } from "admin/actions/termTaxonomy";
import PostEditor from "../posts/PostEditor";
import { Query } from "react-apollo";
import QUERY_POST_BY_TYPE from "admin/queries/fetchDataEventPostsManage.graphql";
import QUERY_POST_BY_ID from "../posts/PostEditor/queries/fetchPostById.graphql";
import LoadingSpinner from "admin/components/LoadingSpinner";
import QUERY_PARENT_TRANSLATION from "admin/queries/fetchParentTranslation.graphql";

export default {
  path: "/events",
  name: "Manage Events",
  children: [
    {
      path: "",

      async action({ client, store, query, route }) {
        return {
          permission: "manage_event",
          title: "Manage Events",
          component: (
            <Layout currentPath={route}>
              <Query query={QUERY_POST_BY_TYPE} variables={{ type: "event" }} fetchPolicy="cache-and-network">
                {({ loading, data, refetch, error }) => {
                  if (loading) return <LoadingSpinner />;
                  if (error) return `Error! ${error.message}`;
                  const { posts, cities, countries } = data;
                  return (
                    <Events
                      currentRoute={route}
                      eventsArray={posts}
                      citiesArray={cities}
                      countriesArray={countries}
                      refetch={() => refetch()}
                    />
                  );
                }}
              </Query>
            </Layout>
          )
        };
      }
    },
    {
      path: "/add",
      name: "Add Event",
      async action({ store, route, params }) {
        return {
          title: "Add Event",
          permission: "manage_website_pages",
          component: (
            <Layout>
              <PostEditor currentRoute={route} type="event" post={null} />
            </Layout>
          )
        };
      }
    },
    {
      path: "/edit/:id?/:action?/:langId?",
      name: "Edit Event",
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
          title: "Edit Event",
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
                            type="event"
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
    return await next();
  }
};
