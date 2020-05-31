const { dropDatabase } = require('./database/drop-database');
const database = require('../lib/database');

before('Sobrescreve a url do banco e add token default', async () => {
  const databaseUri = "mongodb://localhost:27017/incidentesProblemas_test";  
  await database.connect(databaseUri);
});

after('Remove a base de dados usada para testes', async () => {
  await dropDatabase();
  await database.close();
});

