import question from "../models/question";
import database from "./database";

function InMemory(): database {
  const questions: {
    [productId: number]: question[],
  } = {};
  let currnetId = 1;

  return {
    saveQuestion: (productId, q) => {
      const myQuestion = Object.create(q);
      if (!questions[productId]) {
        questions[productId] = [];
      }
      myQuestion.id = currnetId;
      currnetId += 1;
      questions[productId].push(myQuestion);
    },
    getQuestions: (productId) => questions[productId] || [],
  };
}

export default InMemory;
