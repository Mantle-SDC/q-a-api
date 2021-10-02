import answer from "../models/answer";
import question from "../models/question";

interface Database {
  saveQuestion: (productId: number, q: question) => Promise<number>,
  getQuestions: (productId: number) => Promise<question[]>,
  getQuestion: (questionId: number) => Promise<question | null>,
  questionExists: (questionId: number) => Promise<boolean>,

  saveAnswer: (questionId: number, a: answer) => Promise<number>,

  close: () => void,
}

export default Database;
