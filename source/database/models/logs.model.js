import mongoose from 'mongoose';
import { getCurrentDateTime } from '../../../utils/date.js';

const LogsSchema = new mongoose.Schema(
  {
    action: {
      type: String,
    },
    datetime: {
      type: Date,
    },
    url: {
      type: String,
    },
    method: {
      type: String,
    },
    ip_address: {
      type: String,
    },
    browser: {
      type: String,
    },
    user: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

LogsSchema.pre('save', function (next) {
  this.createdAt = getCurrentDateTime();
  this.updatedAt = getCurrentDateTime();
  next();
});

LogsSchema.pre('countDocuments', function () {
  this.where({ deletedAt: null });
});

LogsSchema.pre('find', function () {
  this.where({ deletedAt: null });
});

LogsSchema.pre('findOne', function () {
  this.where({ deletedAt: null });
});

const Logs = mongoose.model('Logs', LogsSchema);

export default Logs;
