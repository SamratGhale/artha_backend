const Joi = require("joi-oid");

module.exports = {
  getById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  add: {
    payload: Joi.object({
      customer_name: Joi.string().description("Item's Name"),
      paid_amount: Joi.number().description("Item's price"),
      payment_method: Joi.string().description("discount percent"),
      staff_id: Joi.objectId().description("quantity of items"),
    }),
  },
  update: {
    payload: Joi.object({
      customer_name: Joi.string().description("Item's Name"),
      paid_amount: Joi.number().description("Item's price"),
      payment_method: Joi.string().description("discount percent"),
      staff_id: Joi.objectId().description("quantity of items"),
    }),
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  addItem:{
    params: Joi.object({
      invoice_id: Joi.objectId().description("Id of invoice"),
    }),
    payload:Joi.object({
        item_id:Joi.objectId().description("Item's id in inventory"),
        cartQuantity: Joi.number().description("quantity of item bought"),
    })
  },
  archive: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
}