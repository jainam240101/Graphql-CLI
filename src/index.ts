/** @format */

import "reflect-metadata";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Express, { Application } from "express";
import { createConnection, getConnectionOptions } from "typeorm";
import { UserResolver } from "./Resolvers/Users/Users";

const main = async () => {
  const port = process.env.PORT || 3000;

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...options, name: "default" });
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  const apolloserver = new ApolloServer({
    schema: schema,
    playground: true,
    context: (req: Request) => ({ req }),
  });
  const app: Application = Express();
  apolloserver.applyMiddleware({ app });
  const httpServer = createServer(app);
  apolloserver.installSubscriptionHandlers(httpServer);
  httpServer.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${apolloserver.graphqlPath}`
    );
  });
};

main();
