# SQL Schemas

## Question
* question_id; int, primary key
* question_body: string(1000)
* question_date: date
* asker_name: string(60)
* asker_email: string(60)
* question_helpfulness: int
* reported: bool


## Answer
* answer_id: int, primary key
* question_id: int, foreign key, question
* body: string(1000)
* date: date
* answerer_name: string(60)
* answerer_email: string(60)
* helpfulness: int


## Photo
* photo_id: int, primary key
* answer_id: int, foreign key, answer
* url: string
