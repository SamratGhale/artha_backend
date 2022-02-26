const Joi = require('joi');
const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  email: { type: String, joi: Joi.string().email().optional().description("Admin email") },
  password: { type: String , required: true},
  role: {type: String , required: false},
  is_approved :{type:Boolean, required: true},
  ...commonSchema,
};

const UserSchema = mongoose.Schema(schema, {
  collection: 'User',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

UserSchema.index({ email : 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);
