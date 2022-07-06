const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5000;
const DB_NAME = "tutorial";

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var VendorRouter = require("./routes/Vendors");
var FoodItemRouter = require("./routes/FoodItem");
var OrderRouter = require("./routes/Orders");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect(
  "mongodb://aryangup:WalterWhite123%23@cluster0-shard-00-00.zb2j6.mongodb.net:27017,cluster0-shard-00-01.zb2j6.mongodb.net:27017,cluster0-shard-00-02.zb2j6.mongodb.net:27017/tutorial?ssl=true&replicaSet=atlas-107ttf-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully !");
});

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/vendor", VendorRouter);
app.use("/FoodItem", FoodItemRouter);
app.use("/Order", OrderRouter);
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
