import answer from "./answer";

interface question {
  id?: number,
  body: string,
  name: string,
  email: string,
  "product_id": number,
  createdAt: Date,
  answers: {
    [answerId: number]: answer,
  }
}

export default question;
