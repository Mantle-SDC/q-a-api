import { Db, MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbPromise = () => new Promise<Db>((resolve, reject) => {
  MongoClient.connect(url, (err, client) => {
    if (!client) {
      reject(err);
    } else {
      resolve(client.db("mantle"));
    }
  });
});

(async () => {
  const db = await dbPromise();
  db.listCollections().toArray()
    .then(console.log);
})();
