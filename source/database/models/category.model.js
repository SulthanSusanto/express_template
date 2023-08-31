import mongoose from 'mongoose';
import CustomError from '../../utils/CustomError.js';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    date: Date,
    description: String,
  },
  updatedBy: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      date: Date,
      description: String,
    },
  ],
  isDeleted: { type: Boolean, default: false },
  deletedBy: {
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    date: Date,
    description: String,
  },
});

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  products: [ProductSchema],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    date: Date,
    description: String,
  },
  updatedBy: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      date: Date,
      description: String,
    },
  ],
  isDeleted: { type: Boolean, default: false },
  deletedBy: {
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    date: Date,
    description: String,
  },
});

// eslint-disable-next-line prefer-arrow-callback, no-unused-vars
CategorySchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    if (error.keyValue.name) {
      throw new CustomError(`name must be unique`);
    }
  }
});

CategorySchema.pre('countDocuments', function () {
  this.where({ isDeleted: false });
});

CategorySchema.pre('find', function () {
  this.where({ isDeleted: false });
});

CategorySchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

const Category = mongoose.model('category', CategorySchema);

export default Category;
