import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const network = process.env.NEXT_PUBLIC_APTOS_NETWORK || "testnet";
const indexer_url = process.env.NEXT_PUBLIC_INDEXER_GRAPHQL as string;

export const aptosClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://api.${network}.aptoslabs.com/v1/graphql`,
  }),
  cache: new InMemoryCache(),
});

const httpLink = new HttpLink({
  uri: indexer_url,
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: indexer_url.replace("http", "ws"),
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const indexerClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
