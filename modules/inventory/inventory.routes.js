const { INVENTORY } = require("../../constants/permissions");
const controllers = require("./inventory.controllers");
const validators = require("./inventory.validators");

const routes = {
  list: ["GET", "", "List all Items",[INVENTORY.READ]],
  update: {
    method: "PUT",
    path: "/update/{id}",
    description: "Update item",
    uploadPayload: {
      output: "stream",
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
    permissions: [INVENTORY.WRITE],
  },
  register: {
    method: "POST",
    path: "/register",
    description: "Register new item",
    uploadPayload: {
      output: "stream",
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
    permissions: [INVENTORY.WRITE],
  },
  archive: {
    method: "DELETE",
    path: "/{id}",
    description: "Archive the item",
    permissions: [INVENTORY.REMOVE],
  },
  decreaseItem: {
    method: "PUT",
    path: "/decrease/{id}",
    description: "decrease item quanity",
    uploadPayload: {
      output: "stream",
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
    permissions: [INVENTORY.WRITE],
  },
  increaseItem: {
    method: "PUT",
    path: "/increase/{id}",
    description: "increase item quanity",
    uploadPayload: {
      output: "stream",
      parse: true,
      multipart: true,
      allow: "multipart/form-data",
    },
    permissions: [INVENTORY.WRITE],
  },
  getById: {
    method: "GET",
    path: "/{id}",
    description: "Get item by id",
    permissions: [INVENTORY.READ]
  },
};

function register(app) {
  app.register({
    name: "inventory",
    routes,
    validators,
    controllers,
  });
}

module.exports = register;
