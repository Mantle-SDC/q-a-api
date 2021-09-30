import App from "./app";
import InMemory from "./database/InMemory";

App(
  InMemory(),
  () => new Date(),
  8080,
);
