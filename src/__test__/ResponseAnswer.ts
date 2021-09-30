interface ResponseAnswer {
  id: number,
  body: string,
  "answerer_name": string,
  helpfulness: number,
  date: Date,
  photos: string[],
}

export default ResponseAnswer;
