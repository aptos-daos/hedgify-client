import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const network = process.env.NEXT_PUBLIC_APTOS_NETWORK || "testnet";
const indexer_url = process.env.NEXT_PUBLIC_INDEXER_GRAPHQL as string

export const aptosClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://api.${network}.aptoslabs.com/v1/graphql`,
  }),
  cache: new InMemoryCache(),
});

export const indexerClient = new ApolloClient({
  link: new HttpLink({
    uri: indexer_url,
    headers: {
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || ''
    }
  }),
  cache: new InMemoryCache(),
});

