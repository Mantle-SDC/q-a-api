/* eslint-disable no-underscore-dangle */
import { ObjectId, MongoClient } from "mongodb";
import Answer from "../models/answer";
import Question from "../models/question";
import QuestionReponse from "../models/QuestionReponse";
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
      .collection("questions_combined")
      .find({ product_id: productId })
      .map((d) => ({
        question_id: d._id,
        question_body: d.body,
        question_date: d.iso_date,
        asker_name: d.name,
        question_helpfulness: d.helpful,
        reported: false,
        answers: d.answers_combined,
      }))
      .toArray()) as Promise<QuestionReponse[]>,

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
          { $push: { answers: a } },
        );

      return answerID.toHexString();
    },

    close: async () => (await pClient).close(),
  };

  return result;
}

export default createMongoDB;
