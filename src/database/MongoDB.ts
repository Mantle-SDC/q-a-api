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

function getQuestions(db: Db, productId: number, page: number, count: number) {
  return db.collection("questions")
    .find({})
    .skip(page * count)
    .limit(count)
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
  console.log(await getQuestions(db, 1, 2000, 5));
  console.timeEnd("questions");

  client.close();
})();

export default MantleDB;
