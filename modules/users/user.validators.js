const Joi = require('joi-oid');

module.exports = {
  getById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  register: {
    payload: Joi.object({
      email: Joi.string().optional().description('user email'),
      password: Joi.string().optional().description('user password'),
      role: Joi.string().optional().description("user role")
    }),
  },
  login: {
    payload: Joi.object({
      email: Joi.string().optional().description('user email'),
      password: Joi.string().optional().description('user password'),
    }),
  },
  changePassword: {
    payload: Joi.object({
      oldPassword : Joi.string().description('user email'),
      newPassword: Joi.string().description('user password'),
    }),
  },
  archive: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
    payload: Joi.object({
      email: Joi.string().optional().description('user email'),
      password: Joi.string().optional().description('user password'),
      role: Joi.string().optional().description("user role")
    }),
  },
  auth: {
    params: Joi.object({
      token: Joi.string(),
    }),
  },
  findById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  findByRoles: {
    params: Joi.object({
      role: Joi.string(),
    }),
  },
};
