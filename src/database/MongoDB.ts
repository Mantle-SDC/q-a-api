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
      .collection("questions")
      .find({ product_id: productId })
      .toArray()) as Promise<question[]>,
    getQuestion: async (questionId: number) => ((await db)
      .collection("questions")
      .find({ id: questionId })
      .toArray()
    )
      .then((docs) => docs[0] as question),
    saveQuestion: async (productId: number, q: question) => (await db)
      .collection("questions")
      .insertOne(q)
      .then((insert) => parseInt(insert.insertedId.toHexString(), 16)),
    saveAnswer: async (questionId: number, a: answer) => (await db)
      .collection("answers")
      .insertOne(a)
      .then((insert) => parseInt(insert.insertedId.toHexString(), 16)),
    close: async () => (await pClient).close(),
  };
}

(async () => {
  const db = createMongoDB();

  console.time("questions");
  const questions = await db.getQuestion(5);
  console.log(questions?.body);
  console.timeEnd("questions");

  db.close();
})();

export default createMongoDB;
