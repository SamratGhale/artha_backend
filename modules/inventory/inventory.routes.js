const controllers = require("./inventory.controllers");
const validators = require("./inventory.validators");

const routes = {
  list: ["GET", "", "List all Items"],
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
    //permissions: ["admin"],
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
  },
  archive: {
    method: "DELETE",
    path: "/{id}",
    description: "Archive the item",
    //permissions: ["admin"],
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
    //permissions: ["admin"],
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
    //permissions: ["admin"],
  },
  getById: {
    method: "GET",
    path: "/{id}",
    description: "Get item by id",
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
