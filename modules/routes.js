const Auth = require('./users/auth.routes')
const User = require('./users/user.routes')
const Role = require('./users/role.routes')
const Inventory = require('./inventory/inventory.routes')

module.exports={
   Auth,
   Inventory,
   Role,
   User,
}