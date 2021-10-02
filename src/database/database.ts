import answer from "../models/answer";
import question from "../models/question";

interface database {
  saveQuestion: (productId: number, q: question) => Promise<number>,
  saveAnswer: (questionId: number, a: answer) => Promise<number>,
  getQuestions: (productId: number) => Promise<question[]>,
  getQuestion: (questionId: number) => Promise<question | null>,
}

export default database;
