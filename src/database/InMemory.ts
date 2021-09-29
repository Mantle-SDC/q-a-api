import question from "../models/question";
import database from "./database";

function InMemory(): database {
  const questions: question[] = [];

  return {
    saveQuestion: (q) => {
      questions.push(q);
    },
    getQuestions: () => questions,
  };
}

export default InMemory;
