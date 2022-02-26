const User = require('./users/user.routes')
const Role = require('./users/role.routes')
const Inventory = require('./inventory/inventory.routes')

module.exports={
   Inventory,
   User,
   Role
}