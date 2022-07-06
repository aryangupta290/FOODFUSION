const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodItemSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  VendorName: {
    type: String,
    required: true,
  },
  VendorEmail: {
    type: String,
    required: true,
  },
  ShopName: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
    require: false,
    default: "0",
  },
  AddOn: {
    type: String,
    required: false,
    default: "",
  },
  Tags: {
    type: String,
    required: false,
    default: "",
  },
  NumTimesSold: {
    type: Number,
    required: false,
    default: "0",
  },
  NumTimesRated: {
    type: Number,
    required: false,
    default: "0",
  },
});

module.exports = FoodItem = mongoose.model("FoodItem", FoodItemSchema);
