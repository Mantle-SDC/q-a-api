import express from "express";
import http from "http";
import baseUrl from "./urls";

const App = ():http.Server => {
  const app = express();

  app.post(baseUrl, (req, res, next) => {
    res.status(400).send();
    next();
  });

  const server = app.listen(8080);

  return server;
};

export default App;
