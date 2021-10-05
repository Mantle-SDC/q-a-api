import { model, connect, Schema } from "mongoose";
import Answer from "../models/answer";
import Question from "../models/question";
import Database from "./database";

const AnswerSchema = new Schema<Answer<string>>({
  body: String,
  date: Date,
  answerer_name: String,
  helpfulness: Number,
  photos: [{
    url: String,
  }],
  reported: Boolean,
});

const QuestionSchema = new Schema<Question<string>>({
  product_id: Number,
  question_body: String,
  question_date: Date,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
  answers: [AnswerSchema],
});

const AnswerDoc = model<Answer<string>>("answer", AnswerSchema);
const QuestionDoc = model<Question<string>>("question", QuestionSchema);

function MongooseDB(url: string): Database<string> {
  connect(url);

  return ({
    getQuestions: (productId: number): Promise<Question<string>[]> => { },
    saveQuestion: (productId: number, q: Question<string>): Promise<string> => { },
    getQuestion: (questionId: string): Promise<Question<string> | null> => { },
    questionExists: async (questionId: string): Promise<boolean> => {
      const k = await QuestionDoc.findById(questionId).exec();
      return Boolean(k);
    },

    saveAnswer: async (questiondId: string, answer: Answer<string>) => {
      const a = new AnswerDoc(answer);
      const savedAnswer = await a.save();
      // eslint-disable-next-line no-underscore-dangle
      return savedAnswer._id.toHexString();
    },

    close: () => { },
  });
}

export default MongooseDB;
