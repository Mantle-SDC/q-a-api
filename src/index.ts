import App from "./app";
import createMongoDB from "./database/MongoDB";

App(
  createMongoDB("mongodb://localhost:27017"),
  () => new Date(),
  8080,
  (x) => x,
);
