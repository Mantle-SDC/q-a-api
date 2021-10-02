import { Db, MongoClient } from "mongodb";
import answer from "../models/answer";
import question from "../models/question";
import database from "./database";

const url = "mongodb://localhost:27017";

function MantleDB(): Promise<MongoClient> {
  return new Promise<MongoClient>((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (!client) {
        reject(err);
      } else {
        resolve(client);
      }
    });
  });
}

function createMongoDB(): database {
  const pClient = MantleDB();
  const db = pClient
    .then((client) => client.db("mantle"));
  return {
    getQuestions: async (productId: number) => ((await db)
      .collection("questions-comvbined")
      .find({ product_id: productId })
      .toArray()) as Promise<question[]>,
    getQuestion: async (questionId: number) => ((await db)
      .collection("questions-comvbined")
      .find({ id: questionId })
      .toArray()
    )
      .then((docs) => docs[0] as question),
    saveQuestion: async (productId: number, q: question) => (await db)
      .collection("questions-combined")
      .insertOne(q)
      .then((insert) => insert.insertedId),
    saveAnswer: async (questionId: number, a: answer) => (await db)
      .collection("answers")
      .insertOne(a)
      .then((insert) => insert.insertedId),
  };
}

function getQuestions(db: Db, productId: number) {
  return db.collection("questions")
    .find({ product_id: productId })
    .toArray();
}

function getQuestion(db: Db, questionId: number) {
  return db.collection("questions")
    .find({ id: questionId })
    .toArray();
}

(async () => {
  const client = await MantleDB();
  const db = client.db("mantle");

  // const collections = await db.listCollections().toArray();
  // console.log(collections);

  // const questions = db.collection("questions");
  // console.log(await questions.aggregate().toArray());
  console.time("questions");
  await getQuestions(db, 10);
  console.timeEnd("questions");

  console.time("question");
  await getQuestion(db, 1004);
  console.timeEnd("question");

  client.close();
})();

export default createMongoDB;
