const mongoose = require("mongoose");
const commonSchema = require("../../helpers/schema");

const schema = {
  item_name: {
    type: String,
    required: true,
    trim: true,
    description: "Item's name",
  },
  item_price: { type: Number, description: "Item's price", required: true },
  item_code: { type: String, description: "Item's code", unique: true },
  discount: {
    type: Number,
    description: "Item's discount approved",
    default: 0,
  },
  quantity: {
    type: Number,
    description: "Amount of quantity",
    default: 0,
  },
  item_description: {
    type: String,
    description: "description of item",
  },
  category: {
    type: String,
    description: "Item's category",
    default: false,
  },
  vat: {
    type: Number,
    description: "vat amount",
  },
  brand: { type: String, description: "item's brand" },
  addInfo: {
    type: String,
    description: "additional info",
  },
  ...commonSchema,
};

const InventorySchema = mongoose.Schema(schema, {
  collection: "inventory",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

InventorySchema.index({ item_code: 1 }, { unique: true });

module.exports = mongoose.model("inventory", InventorySchema);
