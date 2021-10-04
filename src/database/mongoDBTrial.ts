/* eslint-disable no-console */
import createMongoDB from "./MongoDB";

const url = "mongodb://localhost:27017";

(async () => {
  const db = createMongoDB(url);

  const questionID = await db.saveQuestion(1, {
    name: "Trevor Settles",
    body: "Is it clothing",
    email: "trevor@settles.com",
    product_id: 1,
    createdAt: new Date(),
    answers: {},
  });
  console.log(questionID);

  console.log(await db.questionExists(questionID));

  db.close();
})();
