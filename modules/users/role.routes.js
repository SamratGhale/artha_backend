const validators = require('./role.validators');
const controllers = require('./role.controllers');
const { ROLE_ADMIN } = require('../../constants/permissions');

const routes = {
  add: ['POST', '', 'Add a new role', ROLE_ADMIN],
  list: ['GET', '', 'Get all the roles', ROLE_ADMIN],
  get: ['GET', '/{id}', 'Get a role by id', ROLE_ADMIN],
  delete: ['DELETE', '/{id}', 'Delete a role by id', ROLE_ADMIN],
  getPermissions: ['GET', '/permissions/{name}', 'Get permissions list by role'],
  addPermissions: ['PATCH', '/permissions/{id}', 'Add permissions to a role', ROLE_ADMIN],
  removePermissions: ['DELETE', '/permissions/{id}', 'Remove permissions from a role', ROLE_ADMIN],
};

/**
 * Register the routes
 * @param {object} app Application.
 */
function register(app) {
  app.register({
    name: 'roles',
    routes,
    validators,
    controllers,
  });
}

module.exports = register;
