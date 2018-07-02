import React from "react";
import mutationActivateAccount from './mutationActivateAccount.gql';

export default {
  /**
   * CUSTOMER AREA
   */
  name: "customer-area",
  path: "/customer-area",
  children: [
    {
      name: "dashboard",
      chunk: "dashboard",
      path: "",
      async action({ params, next, client, theme, store, router, query }) {
        const { templates: Templates } = theme;
        const Template = await Templates["page_customer-area"];
        const section = "dashboard";
        const { auth } = store.getState();

        if (!auth.token || !auth.user.role) {
          return {
            redirect: '/?action=login'
          }
        }

        return {
          meta: {
            title: "Dashboard",
          },
          component: <Template section={section} />,
        };
      },
    },
    {
      name: 'activate',
      path: '/activate',
      async action({ next, client, query }) {
        if (!query.token) {
          const jump = await next();
          return jump;
        }

        const { data: { activateAccount } } = await client.mutate({
          mutation: mutationActivateAccount,
          variables: {
            token: query.token,
          }
        });

        return {
          redirect: `/?account_activation=${(activateAccount.success) ? 1 : 0}`
        }
      }
    },
    {
      name: "new-password",
      chunk: "new-password",
      path: "/new-password",
      async action({ theme, query }) {
        const { templates: Templates } = theme;
        const Template = await Templates["page_new-password"];

        if (!query.token) {
          return {
            redirect: '/?action=login'
          }
        }

        return {
          meta: {
            title: "New Password | Customer Area",
          },
          component: <Template token={query.token} />,
        };
      },
    },
    {
      name: "tabs",
      chunk: "tabs",
      path: "/:section",
      async action({ params, next, client, theme, store, router, query }) {
        const { templates: Templates } = theme;
        const Template = await Templates["page_customer-area"];
        const section = params.section || "dashboard";
        const { auth } = store.getState();

        if (!auth.token || !auth.user.role) {
          return {
            redirect: '/?action=login'
          }
        }

        return {
          meta: {
            title: "Customer Area",
          },
          component: <Template section={section} />,
        };
      },
    },
  ],
};
