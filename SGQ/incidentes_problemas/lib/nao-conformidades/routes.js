const controllers = require('./controllers');

const naoConformidadesRoutes = (router) => {
  router.get('/nao-conformidades', controllers.get);
  router.post('/nao-conformidades', controllers.post);
};

module.exports = naoConformidadesRoutes;