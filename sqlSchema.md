# SQL Schemas

## Question
* question_id; int, primary key
* question_body: string
* question_date: date
* asker_name: string
* question_helpfulness: int
* reported: bool


## Answer
* answer_id: int, primary key
* question_id: int, foreign key, question
* body: string
* date: date
* answerer_name: string
* helpfulness: int


## Photo
* photo_id: int, primary key
* answer_id: int, foreign key, answer
* url: string
