import express from "express";
import http from "http";
import database from "./database/database";
import baseUrl from "./urls";

const App = (db: database): http.Server => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  app.get(baseUrl, (req, res, next) => {
    if (req.body.product_id) {
      res.status(200).send({
        product_id: req.body.product_id,
        results: db.getQuestions(),
      });
    } else {
      res.status(400).send();
    }
    next();
  });

  app.post(baseUrl, (req, res, next) => {
    if (Object.keys(req.body).length) {
      db.saveQuestion(req.body);
      res.status(201).send();
    } else {
      res.status(400).send();
    }
    next();
  });

  const server = app.listen(8080);

  return server;
};

export default App;
