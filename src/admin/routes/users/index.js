import React from "react";
import Users from "./Users";
import Accounts from "./Accounts";
import User from "./User";
import Roles from "./Roles";
import Role from "./Role";
import Layout from "../../components/Layout";
import { fetchUsers, fetchUser } from "admin/actions/users";
import { fetchRoles, fetchRole } from "admin/actions/userRoles";
import { fetchPermissions } from "admin/actions/userPermissions";
import { fetchAccounts } from "admin/actions/accounts";

export default {

  path: "/users",
  name: "Users",

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: "",
      name: "Manage Users",
      async action({ route, store, query }) {
        if (query.type === "account") {
          return {
            permission: "manage_users",
            title: "Manage Users",
            component: <Layout currentRoute={route}><Accounts currentRoute={route} /></Layout>,
          };
        }
        return {
          permission: "manage_users",
          title: "Manage Users",
          component: <Layout currentRoute={route}><Users currentRoute={route} /></Layout>,
        };
      },
    },
    {
      path: "/add",
      name: "Add User",
      async action({ route }) {
        return {
          permission: "manage_users",
          title: "Add User",
          component: <Layout currentRoute={route}><User add currentRoute={route} /></Layout>,
        };
      },
    },
    {
      path: "/edit/:id",
      name: "Edit User",
      async action({ params, store, route }) {
        const user = await store.getState().users.byId[params.id];
        if (!user) {
          await store.dispatch(fetchUser(params.id));
        }
        return {
          permission: "manage_users",
          title: "Edit User",
          component: <Layout><User edit id={params.id} currentRoute={route} /></Layout>,
        };
      },
    },

    /**
     * ROLES
     */
    {
      path: "/roles",
      children: [
        {
          path: "",
          name: "Manage Roles",
          async action({ route, store }) {
            return {
              permission: "manage_roles",
              title: "Manage Roles",
              component: <Layout><Roles currentRoute={route} /></Layout>,
            };
          },
        },
        {
          path: "/add",
          name: "Create Role",
          async action({ route, store }) {
            return {
              permission: "manage_roles",
              title: "Create Role",
              component: <Layout><Role add currentRoute={route} /></Layout>,
            };
          },
        },
        {
          path: "/edit/:id",
          name: "Edit Role",
          async action({ route, params, store }) {
            const role = await store.getState().roles.byId[params.id];
            if (!role) {
              await store.dispatch(fetchRole(params.id));
            }
            return {
              permission: "manage_roles",
              title: "Edit Role",
              component: <Layout><Role edit id={params.id} currentRoute={route} /></Layout>,
            };
          },
        },
      ],
      async action({ store, next }) {
        const roles = await store.getState().roles.ids;
        if (!roles.length) {
          await store.dispatch(fetchRoles());
        }
        const permissions = await store.getState().roles.permissions.ids;
        if (!permissions.length) {
          await store.dispatch(fetchPermissions());
        }
        return await next();
      },
    },
  ],

  async action({ store, next, query }) {
    if (query.type === "account") {
      const accounts = await store.getState().accounts.ids;
      if (!accounts.length) {
        await store.dispatch(fetchAccounts());
      }
    } else {
      const users = await store.getState().users.ids;
      if (!users.length) {
        await store.dispatch(fetchUsers());
      }
    }
    const roles = await store.getState().roles.ids;
    if (!roles.length) {
      await store.dispatch(fetchRoles());
    }
    return await next();
  },
};
