import answer from "../models/answer";
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
  let currnetQId = 1;
  let currentAId = 1;

  return {
    saveQuestion: (productId, q) => {
      const myQuestion: question = { ...q };
      if (!questions[productId]) {
        questions[productId] = [];
      }
      myQuestion.id = currnetQId;
      currnetQId += 1;

      questions[productId].push(myQuestion);
      questions.all[myQuestion.id] = myQuestion;

      return myQuestion.id;
    },
    saveAnswer: (questionId, a) => {
      const ans: answer = { ...a };
      ans.id = currentAId;
      questions.all[questionId].answers[ans.id] = ans;
      currentAId += 1;
      return ans.id;
    },
    getQuestions: (productId) => questions[productId] || [],
    getQuestion: (questionId) => questions.all[questionId] || null,
  };
}

export default InMemory;
