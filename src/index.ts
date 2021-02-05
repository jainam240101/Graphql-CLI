/** @format */

import "reflect-metadata";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Express, { Application } from "express";
import session from "client-sessions";
import { createConnection, getConnectionOptions } from "typeorm";
import { UserResolver } from "./Resolvers/Users/Users";
import cors from "cors";

const main = async () => {
  const port = process.env.PORT || 3000;

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...options, name: "default" });
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const app: Application = Express();
  const apolloserver = new ApolloServer({
    schema: schema,
    playground: true,
    context: (req: Request) => ({ req }),
  });

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:8000",
    })
  );

  app.use(
    session({
      cookieName: "userSession",
      secret: "cat",
      duration: 28 * 24 * 60 * 60 * 1000, // 28 Days
      cookie: {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 Days
        // secure: true,
      },
    })
  );

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
