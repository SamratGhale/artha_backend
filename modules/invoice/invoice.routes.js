const { INVOICE, ADMIN } = require("../../constants/permissions");
const controllers = require("./invoice.controllers");
const validators = require("./invoice.validators");

const routes = {
    list: ["GET", "", "List all invoices"], //[INVOICE.READ]],
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
        //permissions: [INVOICE.WRITE],
    },
    add: {
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
        //permissions: [INVOICE.REMOVE],
    },
    addItem: {
        method: "POST",
        path: "/{invoice_id}",
        description: "Add new item in invoice",
        uploadPayload: {
            output: "stream",
            parse: true,
            multipart: true,
            allow: "multipart/form-data",
        },
        //permissions: [INVOICE.WRITE],
    },
    getById: {
        method: "GET",
        path: "/{id}",
        description: "Get item by id",
        //permissions: [INVOICE.READ]
    },
}

function register(app) {
  app.register({
    name: "invoice",
    routes,
    validators,
    controllers,
  });
}

module.exports = register;
