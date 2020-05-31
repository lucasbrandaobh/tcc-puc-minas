const databaseUri = "mongodb://localhost:27017/incidentesProblemas";
const Db = require('./mongodb');

const dbInstance = new Db();
module.exports = {
  async close() {
    try {
      if (dbInstance) {
        console.info('[MongoDB] Database trying to disconnect');
        await dbInstance.close();
      }
    } catch (e) {
      console.error('Error on close DB: %j', e);
      throw e;
    }
  },
  async connect(uri) {
    const mongoConnectionUri = uri || databaseUri;
    try {
      await dbInstance.connect(mongoConnectionUri);
      console.info('[MongoDB] Database connected');
    } catch (e) {
      console.error('[MongoDB] Database failed to connect - ', e.message);
      throw e;
    }
  },
  getCollection(name) {
    return dbInstance.getCollection(name);
  },
  ObjectId: dbInstance.ObjectId
};
