interface answer {
  id?: number,
  body: string,
  "answerer_name": string,
  helpfulness: number,
  reported: boolean,
  date: Date,
  photos: string[],
}

export default answer;