import express from "express";
import http from "http";
import baseUrl from "./urls";

const App = (): http.Server => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  app.post(baseUrl, (req, res, next) => {
    if (Object.keys(req.body).length) {
      res.status(201).send();
      next();
    } else {
      res.status(400).send();
      next();
    }
  });

  const server = app.listen(8080);

  return server;
};

export default App;
