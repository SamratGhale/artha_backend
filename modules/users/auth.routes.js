const controllers = require('./user.controllers');
const validators = require('./user.validators');

const routes = {
  login: {
    method: 'POST',
    path: '',
    description: 'Login using username and password',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
  },
  auth: ['GET', '/{token}', 'Get the token data'],
};

function register(app) {
  app.register({
    name: 'auth',
    routes,
    validators,
    controllers,
  });
}

module.exports = register;
