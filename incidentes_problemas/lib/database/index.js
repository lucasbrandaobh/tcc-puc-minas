const { MongoClient } = require('mongodb');

const database = (() => {
  const databaseUri = "mongodb://localhost:27017";
  const databaseName = "sgq";

  let db;
  let client;
  let collections = [];

  const connect = async () => {
    if (!db) {
      client = await MongoClient.connect(databaseUri, { useNewUrlParser: true });
      db = client.db(databaseName);
    }

    console.info('[MongoDB] Database connected.');

    return db;
  };

  const close = async () => {
    console.info('[MongoDB] Database trying to disconnect');
    if (client) {
      try {
        await client.close();
      } finally {
        db = undefined;
        client = undefined;
        collections = [];
        console.info('[MongoDB] Database disconnected');
      }
    }
  };

  const getCollection = (name) => {
    if (db) {
      let collection = collections[name];
      if (!collection) {
        collection = db.collection(name);
        collections[name] = collection;
      }
      return collection;
    }
  };

  return {
    connect,
    close,
    getCollection
  };
})();

module.exports = database;
