const { User } = require("./users/user.controllers");
const { Inventory } = require("./inventory/inventory.controllers");
const { Roles } = require("./users/role.controllers");

module.exports = {
  Inventory,
  User,
  Roles
};
