import Answer from "../models/answer";
import Question from "../models/question";
import QuestionReponse from "../models/QuestionReponse";

interface Database<T extends string | number> {
  getQuestions: (productId: number) => Promise<QuestionReponse[]>,
  saveQuestion: (productId: number, q: Question<T>) => Promise<T>,
  getQuestion: (questionId: T) => Promise<Question<T> | null>,
  questionExists: (questionId: T) => Promise<boolean>,

  saveAnswer: (questionId: T, a: Answer<T>) => Promise<T>,

  close: () => void,
}

export default Database;
