import { ObjectId, MongoClient } from "mongodb";
import Answer from "../models/answer";
import Question from "../models/question";
import Database from "./database";

function MantleDB(url: string): Promise<MongoClient> {
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

function createMongoDB(url: string): Database<string> {
  const pClient = MantleDB(url);
  const db = pClient
    .then((client) => client.db("mantle"));

  const result: Database<string> = {
    getQuestions: async (productId: number) => ((await db)
      .collection("questions")
      .find({ product_id: productId })
      // eslint-disable-next-line no-underscore-dangle
      .map((d) => ({ ...d, id: d._id }))
      .toArray()) as Promise<Question<string>[]>,

    getQuestion: async (questionId: string) => ((await db)
      .collection("questions")
      .find({ id: questionId })
      .toArray()
    )
      .then((docs) => docs[0] as Question<string>),

    saveQuestion: async (productId: number, q: Question<string>) => (await db)
      .collection("questions")
      .insertOne(q)
      .then((insert) => insert.insertedId.toHexString()),

    questionExists: async (questionId: string) => {
      if (!questionId.match(/^[0-9a-f]{24}$/)) {
        return Promise.resolve(false);
      }
      return (await db)
        .collection("questions")
        .findOne({ _id: new ObjectId(questionId) })
        .then((d) => !!d);
    },

    saveAnswer: async (questionId: string, a: Answer<string>) => {
      const answerID = (await (await db)
        .collection("answers")
        .insertOne(a)).insertedId;

      await (await db)
        .collection("questions")
        .updateOne(
          { _id: new ObjectId(questionId) },
          { $push: { answers: answerID } },
        );

      return answerID.toHexString();
    },

    close: async () => (await pClient).close(),
  };

  return result;
}

export default createMongoDB;
