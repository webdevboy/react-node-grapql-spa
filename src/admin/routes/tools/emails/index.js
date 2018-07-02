import React from "react";
import Layout from "admin/components/Layout";
import fetchAllEmptyLegsQuery from "admin/queries/fetchAllEmptyLegs.graphql";
import fetchDataEmptyLegEditor from "admin/queries/fetchDataEmptyLegEditor.graphql";
import fetchDataNewEmptyLegEditor from "admin/queries/fetchDataNewEmptyLegEditor.graphql";
import LoadingSpinner from "admin/components/LoadingSpinner";
import EmailTemplate from "./EmailTemplate";
import EmailTemplates from "./EmailTemplates";
import { Query } from "react-apollo";
import QUERY_TEMPLATE_BY_ID from "admin/queries/fetchEmailTemplateById.graphql";
import QUERY_ALL_TEMPLATE from "admin/queries/fetchAllEmailTemplates.graphql";

export default {
  path: "/email-manager",
  name: "Email Manager",
  children: [
    {
      path: "",
      name: "Manage Email Template",
      async action({ client, store, query, route }) {
        return {
          permission: "manage_empty_legs", // To be changed later
          name: "Email Template Manager",
          title: "Manage Email Template",
          component: (
            <Layout>
              <Query query={QUERY_ALL_TEMPLATE} fetchPolicy="cache-and-network">
                {({ loading, data, refetch, error }) => {
                  if (loading) return <LoadingSpinner />;
                  if (error) return `Error! ${error.message}`;
                  const { templates } = data;
                  return <EmailTemplates currentRoute={route} templatesArray={templates} refetch={() => refetch()} />;
                }}
              </Query>
            </Layout>
          )
        };
      }
    },
    {
      path: "/add",
      name: "Add Email Template",
      async action({ client, store, query, route }) {
        return {
          permission: "manage_empty_legs",
          name: "Add Email Template",
          title: "Add Email Template",
          component: (
            <Layout>
              <EmailTemplate currentRoute={route} />
            </Layout>
          )
        };
      }
    },
    {
      path: "/edit/:id/:action?/:langId?",
      name: "Edit Email Template",
      async action({ client, store, query, route, params }) {
        const emailId = params.id;
        let isEdit = false;
        let isTranslate = false;
        if (params.action) {
          isTranslate = true;
        } else {
          isEdit = emailId && true;
        }
        return {
          title: "Edit Email Template",
          permission: "manage_empty_legs",
          component: (
            <Layout>
              <Query query={QUERY_TEMPLATE_BY_ID} variables={{ id: emailId }} notifyOnNetworkStatusChange={true}>
                {({ loading, data, error }) => {
                  if (loading) return <LoadingSpinner />;
                  if (error) return `Error! ${error.message}`;
                  return (
                    <EmailTemplate
                      currentRoute={route}
                      template={data.template}
                      isEdit={isEdit}
                      isTranslate={isTranslate}
                      transLanguage={params.langId}
                    />
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
    /* const teamMembers = await store.getState().teamMembers.ids;

     if (!teamMembers.length) {
       console.log('Try to fetch Offices');
       await store.dispatch(fetchTeamMembers());
     }

     return await next() */
  }
};
