import React from "react";
import Layout from "admin/components/Layout";
import EmptyLegs from "./EmptyLegs";
import EmptyLeg from "./EmptyLeg";
import { Query } from "react-apollo";
import fetchAllEmptyLegsQuery from "admin/queries/fetchAllEmptyLegs.graphql";
import fetchDataEmptyLegEditor from "admin/queries/fetchDataEmptyLegEditor.graphql"
import fetchDataNewEmptyLegEditor from "admin/queries/fetchDataNewEmptyLegEditor.graphql"
import LoadingSpinner from "admin/components/LoadingSpinner";

export default {

  path: "/empty-legs",
  name: "Empty Legs",
  children: [
    {
      permission: 'manage_empty_legs',
      path: "",
      name: "Manage Empty Legs",
      async action({client, store, query, route}) {
        return {
          name: "Empty Legs",
          title: "Manage Empty Lggs",
          component: (
          <Layout currentPath={route}>
            <Query query={fetchAllEmptyLegsQuery} variables={{}} fetchPolicy='cache-and-network'>
              {({ loading, data, refetch, error }) => {
                if (loading) return <LoadingSpinner />;
                if (error) return `Error! ${error.message}`;
                const { emptylegs, messages } = data;
                return <EmptyLegs currentRoute={route} emptyLegsArray={emptylegs} messages={messages} refetch={() => refetch()}/>
              }}
            </Query>
          </Layout>),
        };
      },
    },
    {
      permission: 'manage_empty_legs',
      path: "/add",
      name: "Add Empty Leg",
      async action({ client, store, query, route }) {
        return {
          name: "Add Empty Legs",
          title: "Add Empty Legs",
          component: (
            <Layout>
              <Query query={fetchDataNewEmptyLegEditor} >
              {({ loading, data, error }) => {
                  if (loading) return <LoadingSpinner />;
                  if (error) return `Error! ${error.message}`;
                  return (
                    <EmptyLeg
                      currentRoute={route}
                      currenciesArray={data.currencies}
                    />
                  );
                }}
                </Query>
            </Layout>),
        };
      },
    },
    {
      path: "/edit/:id",
      name: "Edit Empty Leg",
      async action({client, store, query, route, params }) {
        const emptyLegId = params.id;
        return {
          title: 'Edit Empty Leg',
          permission: "manage_empty_legs",
          component: (
            <Layout>
              <Query query={fetchDataEmptyLegEditor} variables={{ id: emptyLegId }}>
                {({ loading, data, error }) => {
                  if (loading) return <LoadingSpinner />;
                  if (error) return `Error! ${error.message}`;
                  return (
                    <EmptyLeg
                      edit
                      currentRoute={route}
                      id = {emptyLegId}
                      type="event"
                      emptyLeg={data.emptyLeg}
                      currenciesArray={data.currencies}
                    />
                  );
                }}
              </Query>
            </Layout>
          ),
        };
      },
    },

  ],

  async action({ next, store }) {

    /* const teamMembers = await store.getState().teamMembers.ids;

     if (!teamMembers.length) {
       console.log('Try to fetch Offices');
       await store.dispatch(fetchTeamMembers());
     }

     return await next() */
  },

};
