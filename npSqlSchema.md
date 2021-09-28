# SQL Schemas

## Question
* question_id; int
* question_body: string
* question_date: date
* asker_name: string
* question_helpfulness: int
* reported: bool
* answers: map<id, answer>
  * body: string
  * date: date
  * answerer_name: string
  * helpfulness: int
  * photos: list<photo> (max 5)
    * photo_id: int, primary key
    * url: string
