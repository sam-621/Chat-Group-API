import { gql } from 'apollo-server-core';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Query {
    hello: String
  }
`;

export const typeDefs2 = gql`
  type Query {
    hi: String
  }
`;
