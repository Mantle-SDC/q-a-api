import createMongoDB from "./MongoDB";

const url = "mongodb://localhost:27017";

(async () => {
  const db = createMongoDB(url);

  console.time("questions");
  const questions = await db.getQuestion(5);
  console.log(questions?.body);
  console.timeEnd("questions");

  db.close();
})();
