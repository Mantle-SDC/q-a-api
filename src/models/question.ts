import Answer from "./answer";

interface Question<T> {
  id?: T,
  body: string,
  name: string,
  email: string,
  "product_id": number,
  createdAt: Date,
  answers: Array<Answer<T>>,
}

export default Question;
