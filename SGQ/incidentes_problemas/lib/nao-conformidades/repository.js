const { getCollection } = require('../database');

const COLLECTION_NAME = 'naoConformidades';

const naoConformidadesRepository = (() => {
  const find = (filter = {}, options = {}) => getCollection(COLLECTION_NAME).find(filter, options);
  const insertOne = (naoConformidade) => getCollection(COLLECTION_NAME).insertOne(naoConformidade);
  
  return {
    find,
    insertOne
  };
})();

module.exports = naoConformidadesRepository;
