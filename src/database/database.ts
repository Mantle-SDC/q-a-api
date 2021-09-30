import answer from "../models/answer";
import question from "../models/question";

interface database {
  saveQuestion: (productId: number, q: question) => number,
  saveAnswer: (questionId: number, a: answer) => number,
  getQuestions: (productId: number) => question[],
  getQuestion: (questionId: number) => question | null,
}

export default database;
