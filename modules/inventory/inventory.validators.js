const Joi = require("joi-oid");

module.exports = {
  getById: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  register: {
    payload: Joi.object({
      item_name: Joi.string().description("Item's Name"),
      item_price: Joi.number().description("Item's price"),
      item_code: Joi.number().description("Itemss code"),
      discount: Joi.number().description("discount percent"),
      quantity: Joi.number().description("quantity of items"),
      item_description: Joi.string()
        .optional()
        .description("Item's description"),
      category: Joi.string().optional().description("Item's category"),
      vat: Joi.number().description("Vat amount"),
      brand: Joi.string().optional().description("Brand name"),
      addInfo: Joi.string().optional().description("Additional informations")
    }),
  },
  update: {
    payload: Joi.object({
      item_name: Joi.string().description("Item's Name"),
      item_price: Joi.number().description("Item's price"),
      item_code: Joi.number().description("Itemss code"),
      discount: Joi.number().description("discount percent"),
      quantity: Joi.number().description("quantity of items"),
      item_description: Joi.string()
        .optional()
        .description("Item's description"),
      category: Joi.string().optional().description("Item's category"),
      vat: Joi.number().description("Vat amount"),
      brand: Joi.string().optional().description("Brand name"),
      addInfo: Joi.string().optional().description("Additional informations")
    }),
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  archive: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
  },
  decreaseItem: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
    payload: Joi.object({
      qty: Joi.number(),
    }),
  },
  increaseItem: {
    params: Joi.object({
      id: Joi.objectId(),
    }),
    payload: Joi.object({
      qty: Joi.number(),
    }),
  },
};
