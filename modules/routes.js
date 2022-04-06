const Auth = require('./users/auth.routes')
const User = require('./users/user.routes')
const Role = require('./users/role.routes')
const Inventory = require('./inventory/inventory.routes')
const Invoice = require('./invoice/invoice.routes')

module.exports = {
   Auth,
   Inventory,
   Role,
   User,
   Invoice
}