const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  ContactNumber: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  BatchName: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    require: true,
  },
  Wallet: {
    type: Number,
    required: false,
    default: "0",
  },
  FavouriteFood: {
    type: Array,
    required: false,
    default: [],
  },
});

module.exports = User = mongoose.model("Users", UserSchema);
