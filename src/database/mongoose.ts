import { model, connect, Schema } from "mongoose";
import Database from "./database";

const AnswerSchema = new Schema({
  body: String,
  answerer_name: String,
  helpfulness: Number,
  reported: Boolean,
  date: Date,
  photos: [String],
});

const QuestionSchema = new Schema({
  body: String,
  name: String,
  email: String,
  product_id: Number,
  createdAt: Date,
  answers: [AnswerSchema],
});

const AnswerDoc = model("answer", AnswerSchema);
const QuestionDoc = model("answer", QuestionSchema);

function MongooseDB(url: string): Database<string> {
  connect(url);

  return ({
    saveAnswer(questiondId: string, answer: Answer<string>) => {
      (new AnswerDoc(answer)).save();
    },
  });
}

export default MongooseDB;
