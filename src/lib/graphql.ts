import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const network = process.env.NEXT_PUBLIC_APTOS_NETWORK || "testnet";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://api.${network}.aptoslabs.com/v1/graphql`,
  }),
  cache: new InMemoryCache(),
});

export default client;
