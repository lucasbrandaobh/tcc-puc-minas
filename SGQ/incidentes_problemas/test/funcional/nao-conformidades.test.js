const request = require('supertest');
const { assert } = require('chai');
const { dropCollections } = require('../database/drop-collection');
const { getCollection } = require('../../lib/database');
const Server = require('../../lib/server');
const { fixtures } = require('../utils')

const instanceServer = new Server();

describe('Não Conformidades: Testes funcionais', () => {
  let app;
  before(async () => {
    instanceServer.defineConfig();
    ({ app } = instanceServer);
  });
  after(async () => {
    await instanceServer.stop();
  });
  afterEach(async () => {
    await dropCollections(['naoConformidades']);
  });
  it('GET 200, Obter não conformidades da base com sucesso.', async () => {
    const naoConformidade = fixtures.naoConformidade.create();
    await getCollection('naoConformidades').insertOne(naoConformidade);
    const { body, statusCode } = await request(app).get('/nao-conformidades')
    assert.strictEqual(statusCode, 200);
    assert.strictEqual(body.length, 1);
  });
  it('POST 201, Inserir conformidades na base com sucesso.', async () => {
    const naoConformidade = fixtures.naoConformidade.create();
    const { body, statusCode } = await request(app)
      .post('/nao-conformidades')
      .send(naoConformidade)
    assert.strictEqual(statusCode, 201);
  });
});
