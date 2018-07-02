// @flow

import { ApolloClient } from 'apollo-client';
import { ApolloLink, from, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import apolloLogger from 'apollo-link-logger';
import cookies from "js-cookie";
import { uncrunch } from 'graphql-crunch';
import createCache from './createCache';

const token = cookies.get("id_token");

const link = from([
  // new ApolloLink((operation, forward) =>
  //   forward(operation)
  //     .map((response) => {
  //       response.data = uncrunch(response.data);
  //       return response;
  //     })
  // ),
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.warn(`[Network error]: ${networkError}`);
  }),
  ...(__DEV__ ? [apolloLogger] : []),
  new HttpLink({
    uri: '/graphql',
    credentials: 'include',
  }),
]);

const cache = createCache();

export default function createApolloClient() {
  return new ApolloClient({
    link,
    cache: cache.restore(window.App.apolloState),
    queryDeduplication: true,
    connectToDevTools: true,
    ssrMode: true,
  });
}
