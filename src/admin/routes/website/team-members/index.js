import React from "react";
import Layout from "admin/components/Layout";
import TeamMembers from "./TeamMembers";
import TeamMember from "./TeamMember";
import { fetchTeamMembers, fetchTeamMember } from "admin/actions/teamMembers";


export default {

  path: "/team-members",
  name: "Team Members",

  children: [
    {
      path: "/",
      name: "Manage Team Members",
      async action({
        client, store, query, route,
      }) {
        return {
          chunk: "team-members",
          permission: "manage_team_members",
          name: "Team Members",
          title: "Manage Team Members",
          component: (<Layout currentPath={route}><TeamMembers currentRoute={route} /></Layout>),
        };
      },
    },
    {
      path: "/add",
      name: "Add Team Members",
      async action({
        client, store, query, route,
      }) {
        return {
          chunk: "team-members",
          permission: "manage_team_members",
          name: "Add Team Members",
          title: "Add Team Members",
          component: (<Layout currentPath={route}><TeamMember add currentRoute={route} /></Layout>),
        };
      },
    },
    {
      path: "/edit/:id",
      name: "Edit Team Members",
      async action({
        client, store, query, route, params,
      }) {
        const teamMember = await store.getState().teamMembers.byId[params.id];
        if (!teamMember) {
          await store.dispatch(fetchTeamMember(params.id));
        }
        return {
          chunk: "team-members",
          permission: "manage_team_members",
          name: "Edit Team Member",
          title: "Edit Team Member",
          component: <Layout><TeamMember edit id={params.id} currentRoute={route} /></Layout>,
        };
      },
    },

  ],

  async action({ next, store }) {

    const teamMembers = await store.getState().teamMembers.ids;

    if (!teamMembers.length) {
      console.log('Try to fetch Offices');
      await store.dispatch(fetchTeamMembers());
    }

    return await next();
  },

};
