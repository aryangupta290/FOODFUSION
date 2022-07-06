const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  BuyerEmail: {
    type: String,
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
  ItemName: {
    type: String,
    required: true,
  },
  TimeOrdered: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: false,
    default: "PLACED",
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Rating: {
    type: String,
    require: false,
  },
  Price: {
    type: Number,
    required: true,
  },
});

module.exports = Order = mongoose.model("Orders", OrderSchema);
