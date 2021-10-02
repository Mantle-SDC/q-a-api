import Answer from "./answer";

interface Question {
  id?: number,
  body: string,
  name: string,
  email: string,
  "product_id": number,
  createdAt: Date,
  answers: {
    [answerId: number]: Answer,
  }
}

export default Question;
