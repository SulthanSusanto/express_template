import mongoose from 'mongoose';
import {
  ACCESS,
  REFRESH,
  RESET_PASSWORD,
  VERIFY_EMAIL,
} from '../../../config/token.config.js';
import { getCurrentDateTime } from '../../../utils/date.js';
import db from '../../connection.js';

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [ACCESS, REFRESH, RESET_PASSWORD, VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

tokenSchema.pre('save', function (next) {
  this.createdAt = getCurrentDateTime();
  this.updatedAt = getCurrentDateTime();
  next();
});

tokenSchema.pre('countDocuments', function () {
  this.where({ deletedAt: null });
});

tokenSchema.pre('find', function () {
  this.where({ deletedAt: null });
});

tokenSchema.pre('findOne', function () {
  this.where({ deletedAt: null });
});

const { global } = db();
const Token = global.model('Token', tokenSchema);

export default Token;
