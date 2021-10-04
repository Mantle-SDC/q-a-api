import express from "express";
import http from "http";
import { MongoServerError } from "mongodb";
import Database from "./database/database";
import Question from "./models/question";
import baseUrl from "./urls";

function App<T>(
  db: Database<T>,
  dateConstructor: () => Date,
  port: number,
  urlIdParser: (id: string) => T,
): http.Server {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  app.get(baseUrl, async (req, res, next) => {
    if (req.body.product_id) {
      try {
        const qs = await db.getQuestions(req.body.product_id);
        res.status(200).send({
          product_id: req.body.product_id,
          results: qs.map((q) => ({
            question_id: q.id,
            question_body: q.body,
            question_date: q.createdAt,
            asker_name: q.name,
            question_helpfulness: 0,
            reported: false,
            answers: q.answers,
          })),
        });
      } catch (e) {
        res.status(500).send();
        console.error(e);
      }
    } else {
      res.status(400).send();
    }
    next();
  });

  app.post(baseUrl, async (req, res, next) => {
    if (
      Object.keys(req.body).length
      && req.body.name
      && req.body.body
      && req.body.email
      && req.body.product_id
    ) {
      const q: Question = req.body;
      q.createdAt = dateConstructor();
      q.answers = {};
      const qID = await db.saveQuestion(req.body.product_id, q);
      console.log("created: ", qID);
      res.status(201).send({ question_id: qID });
    } else {
      res.status(400).send();
    }
    next();
  });

  app.post(`${baseUrl}/:question_id/answers`, async (req, res, next) => {
    const questionId = urlIdParser(req.params.question_id);
    try {
      const doesExist = (await db.questionExists(questionId));
      console.log("checking:", questionId);
      console.log("does exist", doesExist);
      if (doesExist) {
        const answerId = await db.saveAnswer(questionId, {
          body: req.body.body,
          answerer_name: req.body.name,
          photos: req.body.photos,
          helpfulness: 0,
          date: dateConstructor(),
          reported: false,
        });
        res.status(201).send({ answer_id: answerId });
      } else {
        res.status(400).send();
      }
      next();
    } catch (e) {
      if (e instanceof MongoServerError && e.codeName === "NamespaceNotFound") {
        res.status(400).send();
      } else {
        res.status(500).send();
        console.error(e);
      }
      next();
    }
  });

  const server = app.listen(port);

  return server;
}

export default App;
