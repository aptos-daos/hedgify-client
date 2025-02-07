"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import { aptosClient, indexerClient } from "@/lib/graphql";

const GraphqlLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={aptosClient}>
      <ApolloProvider client={indexerClient}>{children}</ApolloProvider>
    </ApolloProvider>
  );
};

export default GraphqlLayoutProvider;