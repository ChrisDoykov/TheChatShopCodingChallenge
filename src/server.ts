/*
 * Author: Kristiyan Doykov
 * Last updated: 19/08/2022
 * Purpose: Sets up and exports the GraphQL server using Apollo Server.
 */

// Built-ins
const fs = require("fs");
const path = require("path");

// Apollo Server
const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

// Resolvers
const Query = require("./resolvers/Query");

export const createServer = async (options = { port: 4000 }) => {
  // Read the GraphQL schema from the .schema file
  const typeDefs = fs.readFileSync(
    path.join(__dirname, "schema.graphql"),
    "utf8"
  );

  // Setup the resolvers
  const resolvers = {
    Query,
  };

  // Setup the server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  // Start the server
  const res = await server.listen(options);

  if (process.env.ENV_TYPE === "test") {
    console.log(`Server is running on ${res.url}`);
  }

  return server;
};
