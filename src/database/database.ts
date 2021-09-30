import question from "../models/question";

interface database {
  saveQuestion: (productId: number, q: question) => void,
  getQuestions: (productId: number) => question[],
}

export default database;
