import App from "./app";
import createMongoDB from "./database/MongoDB";
import dbURL from "./env/env";

App(
  createMongoDB(dbURL),
  () => new Date(),
  8080,
  (x) => x,
);
