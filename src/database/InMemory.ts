import question from "../models/question";
import database from "./database";

function InMemory(): database {
  const questions: {
    [productId: number]: question[],
  } = {};

  return {
    saveQuestion: (productId, q) => {
      if (!questions[productId]) {
        questions[productId] = [];
      }
      questions[productId].push(q);
    },
    getQuestions: (productId) => questions[productId] || [],
  };
}

export default InMemory;
