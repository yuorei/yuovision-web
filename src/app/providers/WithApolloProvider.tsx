"use client";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo/client";
import React from "react";
import { AuthProvider } from "./AuthProvider";

export const WithApolloProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthProvider>
  );
};
