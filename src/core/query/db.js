import createApolloClient from "../createApolloClient";
import schema from "../../data/schema";

const apolloClient = createApolloClient({
  schema,
});

export default apolloClient;
