import question from "../models/question";
import database from "./database";

function InMemory(): database {
  const questions: {
    [productId: number]: question[],
    all: {
      [questionId: number]: question,
    }
  } = {
    all: {},
  };
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
      questions.all[myQuestion.id] = myQuestion;
      return myQuestion.id;
    },
    getQuestions: (productId) => questions[productId] || [],
    getQuestion: (questionId) => questions.all[questionId] || null,
  };
}

export default InMemory;
