const { ROLE_ADMIN, USER } = require('../../constants/permissions');
const controllers = require('./user.controllers');
const validators = require('./user.validators');

const routes = {
  list: {
    method: 'GET',
    path: '',
    description: 'List all users',
    permissions: [USER.READ, USER.ADMIN]
   },
  register: {
    method: 'POST',
    path: '/register',
    description: 'Add user',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
    permissions: [USER.WRITE, USER.ADMIN]
  },
  login: {
    method: 'POST',
    path: '/login',
    description: 'User Login',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
  },
  changePassword: {
    method: 'PUT',
    path: '/changepassword/{token}',
    description: 'Change User password',
    uploadPayload: {
      output: 'stream',
      parse: true,
      multipart: true,
      allow: 'multipart/form-data',
    },
  },
  archive: {
    method: 'DELETE',
    path: '/{id}',
    description: 'Archive user',
    permissions: [USER.WRITE, USER.ADMIN]
  },
  update: {
    method: 'POST',
    path: '/{id}/update',
    description: 'Update user',
    permissions: [USER.WRITE, USER.ADMIN]
  },
  auth: {
    method: 'GET',
    path: '/auth/access_token={token}',
    description: 'Verify Token',
  },
  findById: {
    method: 'GET',
    path: '/{id}',
    description: 'Get user by id',
    permissions: [USER.READ, USER.ADMIN]
  },
};

function register(app) {
  app.register({
    name: 'User',
    routes,
    validators,
    controllers,
  });
}

module.exports = register;
