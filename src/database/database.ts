import answer from "../models/answer";
import question from "../models/question";

interface Database<T> {
  getQuestions: (productId: number) => Promise<question[]>,
  saveQuestion: (productId: number, q: question) => Promise<T>,
  getQuestion: (questionId: T) => Promise<question | null>,
  questionExists: (questionId: T) => Promise<boolean>,

  saveAnswer: (questionId: T, a: answer) => Promise<T>,

  close: () => void,
}

export default Database;
