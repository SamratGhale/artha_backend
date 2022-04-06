const { number } = require("joi");
const mongoose = require("mongoose");
const commonSchema = require("../../helpers/schema");
const { ObjectId } = require('mongoose').Schema;

const schema = {
  customer_name: {
    type: String,
    required: false,
    trim: true,
    description: "Customer's name",
  },
  paid_amount: {
    type: Number,
    required: true,
    default: 0,
    description: "Paid amount"
  },
  payment_method: {
    type: String,
    default: 0,
    required: true,
    description: "Payment Method"
  },
  staff_id: {
    type: ObjectId,
    ref: "User",
    required: true,
    description: "Object Id"
  },
  ...commonSchema,
};

const InvoiceSchema = mongoose.Schema(schema, {
  collection: "Invoice",
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
