const repository = require('./repository');

const naoConformidadesController = (() => {
  const get = async (req, res) => {
    try {
      const naoConformidades = await repository.find().toArray();
      res.json(naoConformidades);
    } catch (error) {
      console.error('Erro ao chamar função get de naoConformidades. %o', error);
      res.sendStatus(500);
    }
  };
  const post = async (req, res) => {
    const { body } = req;
    try {
      const resultInsert = await repository.insertOne(body);
      const naoConformidadesInserido = resultInsert.ops[0];
      res.status(201).send(naoConformidadesInserido);
    } catch (error) {
      console.error('Erro ao chamar função post de naoConformidades. %o', error);
      res.sendStatus(500);
    }
  };
  return {
    get,
    post
  };
})();

module.exports = naoConformidadesController;
