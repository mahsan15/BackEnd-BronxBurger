const mongoose = require("mongoose");

const { Schema } = mongoose;

const burgerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: Array,
    required: true,
  },
  prices: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  bestSeller: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const burger = mongoose.model("Burger", burgerSchema);

module.exports = burger;
