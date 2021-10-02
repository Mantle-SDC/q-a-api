import { Db, MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";

function MantleDB(): Promise<MongoClient> {
  return new Promise<MongoClient>((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (!client) {
        reject(err);
      } else {
        resolve(client);
      }
    });
  });
}

function getQuestions(db: Db, productId: number) {
  return db.collection("questions")
    .find({ product_id: productId })
    .toArray();
}

function getQuestion(db: Db, questionId: number) {
  return db.collection("questions")
    .find({ id: questionId })
    .toArray();
}

(async () => {
  const client = await MantleDB();
  const db = client.db("mantle");

  // const collections = await db.listCollections().toArray();
  // console.log(collections);

  // const questions = db.collection("questions");
  // console.log(await questions.aggregate().toArray());
  console.time("questions");
  await getQuestions(db, 10);
  console.timeEnd("questions");

  console.time("question");
  await getQuestion(db, 1004);
  console.timeEnd("question");

  client.close();
})();

export default MantleDB;
