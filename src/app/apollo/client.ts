import { ApolloClient, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { setContext } from '@apollo/client/link/context';

const url = `${process.env.NEXT_PUBLIC_API_URL}/query`

const authLink = setContext((_, { headers }) => {
  let token: string | null = null;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem('token');
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const uploadLink = createUploadLink({
  uri: url,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink),
});
