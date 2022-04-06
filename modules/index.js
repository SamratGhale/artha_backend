const { User } = require("./users/user.controllers");
const { Inventory } = require("./inventory/inventory.controllers");
const { Roles } = require("./users/role.controllers");
const {Invoice} = require("./invoice/invoice.controllers")

module.exports = {
  Inventory,
  User,
  Roles,
  Invoice
};
