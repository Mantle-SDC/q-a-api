import question from "../models/question";

interface database {
  saveQuestion: (q: question) => void,
  getQuestions: () => question[],
}

export default database;
