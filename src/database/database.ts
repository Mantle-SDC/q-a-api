import question from "../models/question";

interface database {
  saveQuestion: (productId: number, q: question) => number,
  getQuestions: (productId: number) => question[],
}

export default database;
