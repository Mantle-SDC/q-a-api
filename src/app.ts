import express from "express";
import http from "http";
import baseUrl from "./urls";

interface question {
  body: string,
  name: string,
  email: string,
  "product_id": number,
}

const App = (): http.Server => {
  const app = express();
  const questions: question[] = [];

  app.use(express.json());
  app.use(express.urlencoded());

  app.get(baseUrl, (req, res, next) => {
    if (req.body.product_id) {
      res.status(200).send({
        product_id: req.body.product_id,
        results: questions,
      });
    } else {
      res.status(400).send();
    }
    next();
  });

  app.post(baseUrl, (req, res, next) => {
    if (Object.keys(req.body).length) {
      questions.push(req.body);
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
