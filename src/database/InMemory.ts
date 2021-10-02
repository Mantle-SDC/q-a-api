import Answer from "../models/answer";
import Question from "../models/question";
import database from "./database";

function InMemory(): database {
  const questions: {
    [productId: number]: Question[],
    all: {
      [questionId: number]: Question,
    }
  } = {
    all: {},
  };
  let currnetQId = 1;
  let currentAId = 1;

  return {
    saveQuestion: (productId, q) => {
      const myQuestion: Question = { ...q };
      if (!questions[productId]) {
        questions[productId] = [];
      }
      myQuestion.id = currnetQId;
      currnetQId += 1;

      questions[productId].push(myQuestion);
      questions.all[myQuestion.id] = myQuestion;

      return Promise.resolve(myQuestion.id);
    },
    saveAnswer: (questionId, a) => {
      const ans: Answer = { ...a };
      ans.id = currentAId;
      questions.all[questionId].answers[ans.id] = ans;
      currentAId += 1;
      return Promise.resolve(ans.id);
    },
    getQuestions: (productId) => Promise.resolve(questions[productId] || []),
    getQuestion: (questionId) => Promise.resolve(questions.all[questionId] || null),

    questionExists: (questionId) => Promise.resolve(Boolean(questions.all[questionId])),

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    close: () => { },
  };
}

export default InMemory;
