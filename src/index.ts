import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { App } from './modules/app';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const app = new App();
app.bootstrap();
