const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumbers: {
    type: Array,
  },
  cartItems: [Object],
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const user = mongoose.model("User", UserSchema);

module.exports = user;
