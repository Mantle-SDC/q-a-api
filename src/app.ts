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
      const qs = db.getQuestions();
      res.status(200).send({
        product_id: req.body.product_id,
        results: qs.map((q) => ({
          question_id: 1,
          question_body: q.body,
          question_date: Date.now().toString(),
          asker_name: q.name,
          question_helpfulness: 0,
          reported: false,
          answers: {},
        })),
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
