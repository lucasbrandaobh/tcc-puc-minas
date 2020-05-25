const express = require('express');
const cors = require('cors');
const pkg = require('../../package.json');

const server = (() => {
  const router = new express.Router();
  const app = express();
  let serverProcess;

  const start = () => new Promise((resolve) => {
    //healthStatusRoutes(router);

    app.set('port', 3001);
    app.use(cors());
    app.use(express.json());
    app.use('/', router);

    serverProcess = app.listen(app.get('port'), () => {
      console.info('------------------------------------------------------------------');
      console.info(`${pkg.name} - Version: ${pkg.version}`);
      console.info('------------------------------------------------------------------');
      console.info(`Express server listening on port: ${serverProcess.address().port}`);
      console.info('------------------------------------------------------------------');

      return resolve(app);
    });
  });

  const stop = () => new Promise((resolve, reject) => {
    if (serverProcess) {
      serverProcess.close((err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    }
  });

  return {
    start,
    stop
  };
})();

module.exports = server;