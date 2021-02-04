/** @format */

module.exports = [
  {
    name: "development",
    type: "postgres",
    database: "Boilerplates",
    host: "localhost",
    username: "postgres",
    password: "Jainam",
    synchronize: true,
    entities: ["src/entity/*.*"],
    migrations: ["src/migration/*.*"],
    subscribers: ["src/subscriber/*.*"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
  {
    name: "production",
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true, // switch this to false once you have the initial tables created and use migrations instead
    logging: false,
    entities: ["dist/entity/**/*.js"],
    migrations: ["dist/migration/**/*.js"],
    subscribers: ["dist/subscriber/**/*.js"],
    cli: {
      entitiesDir: "dist/entity",
      migrationsDir: "dist/migration",
      subscribersDir: "dist/subscriber",
    },
  },
];
