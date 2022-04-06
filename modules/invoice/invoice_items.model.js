const mongoose = require("mongoose");
const commonSchema = require("../../helpers/schema");
const { ObjectId } = require('mongoose').Schema;

const schema = {
  invoice_id: {
    type: ObjectId,
    ref:"Invoice",
    required: true,
    description: "Invoice id",
  },
  item_id: {
    type:ObjectId,
    ref: "Inventory",
    required: true,
    description: "Item Id"
  },
  cartQuantity:{
    type:Number,
    default: 0,
    required: true,
    description: "Item purchaced"
  },
  total:{
    type:Number,
    default: 0,
    required: true,
    description: "Total amount"
  },
  ...commonSchema,
};

const InvoiceItemSchema = mongoose.Schema(schema, {
  collection: "Invoice_Item",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model("Invoice_Item", InvoiceItemSchema);