const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
  ManagerName: {
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
  ShopName: {
    type: String,
    required: true,
    unique: true,
  },
  OpeningTime: {
    type: String,
    required: true,
  },
  ClosingTime: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    require: true,
  },
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
