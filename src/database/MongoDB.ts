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

(async () => {
  const client = await MantleDB();
  const db = client.db("mantle");
  const collections = await db.listCollections().toArray();
  console.log(collections);

  client.close();
})();

export default MantleDB;
