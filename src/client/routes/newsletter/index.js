import React from "react";
import mutationConfirmSubscription from './confirmSubscription.gql';
import mutationConfirmUnsubscription from './confirmUnsubscription.gql';

export default {
  path: "/newsletter",
  children: [
    {
      path: "/confirm_subscription",
      async action({ client, next, query }) {

        if (!query.token) {
          const jump = await next();
          return jump;
        }

        const { data: { confirmSubscription } } = await client.mutate({
          mutation: mutationConfirmSubscription,
          variables: {
            token: query.token,
          }
        });

        return {
          redirect: `/?newsletter_subscription=${(confirmSubscription.success) ? 1 : 0}`
        }
        
      }
    },
    {
      path: "/confirm_unsubscription",
      async action({ client, next, query }) {

        if (!query.token) {
          const jump = await next();
          return jump;
        }

        const { data: { confirmUnsubscription } } = await client.mutate({
          mutation: mutationConfirmUnsubscription,
          variables: {
            token: query.token,
          }
        });

        return {
          redirect: `/?newsletter_unsubscription=${(confirmUnsubscription.success) ? 1 : 0}`
        }
        
      }
    },
    {
      path: "/thank-you",
      async action() {

        return {
          meta: {
            title: "Thank you for subscribing",
          },
          component: <h1>Tank you for subscribing</h1>,
        }

      }
    },
  ],
};
