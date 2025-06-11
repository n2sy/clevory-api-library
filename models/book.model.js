const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      min: 2001,
    },
    genre: {
      type: String,
    },
    avatar: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

BookSchema.query.notDeleted = function () {
  return this.where({ isDeleted: false });
};

BookSchema.query.deleted = function () {
  return this.where({ isDeleted: true });
};

module.exports = mongoose.model("Book", BookSchema);
