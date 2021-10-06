/* eslint-disable camelcase */
interface QuestionReponse {
  question_id: string,
  question_body: string,
  question_date: string,
  asker_name: string,
  question_helpfulness: number,
  reported: boolean,
  answers: {
    id: string,
    body: string,
    date: string,
    answerer_name: string,
    helpfulness: number,
    photos: {
      id: string,
      url: string,
    }[]
  }[],
}

export default QuestionReponse;
