import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
const httplink = new HttpLink({ uri: "http://localhost:4000/grapql" });
const cache = new InMemoryCache();
const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const authlink = new ApolloLink((operation, next) => {
  const authorization = window.localStorage.getItem("token");
  operation.setContext({
    headers: {
      authorization,
    },
  });
  return next(operation);
});
const link = authlink.concat(httplink);
const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
  defaultOptions,
});

export default client;
