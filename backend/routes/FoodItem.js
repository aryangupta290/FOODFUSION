const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

const FoodItem = require("../models/FoodItem");
const auth = require("../middleware/auth");
const Vendor = require("../models/Vendors");

// GET request
// Getting all the users
router.get("/", function (req, res) {
  FoodItem.find(function (err, items) {
    if (err) {
      return res.status(400).json({ error: err.message });
    } else {
      return res.json(items);
    }
  });
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db
router.post("/add", auth, async (req, res) => {
  // Food item with existing name under same vendor should not exist
  var id = req.id;
  var original = await Vendor.findById(id);
  var VendorEmail = original.Email;

  var Name = req.body.Name;
  var existing = await FoodItem.findOne({ VendorEmail, Name });
  if (existing) {
    return res.status(400).send("Item with same name already exists!");
  }
  const newFoodItem = new FoodItem({
    Name: req.body.Name,
    Price: req.body.Price,
    VendorEmail: VendorEmail,
    VendorName: original.ManagerName,
    Type: req.body.Type,
    AddOn: req.body.AddOn,
    Tags: req.body.Tags,
    ShopName: original.ShopName,
  });

  newFoodItem
    .save()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      return res.status(400).json({ error: err.message });
    });
});

router.post("/update", auth, async (req, res) => {
  try {
    var idd = req.body.idd;
    var original = await FoodItem.findById(idd);
    var originalName = original.Name;
    var newName = req.body.Name;
    var originalVendor = original.VendorEmail;
    var existing = await FoodItem.findOne({
      VendorEmail: originalVendor,
      Name: newName,
    });
    if (existing && newName != originalName) {
      return res.status(400).json("Food item with same name already exists");
    }
    var update = await FoodItem.findByIdAndUpdate(idd, {
      $set: {
        // <-- set stage
        Name: req.body.Name,
        Price: req.body.Price,
        Type: req.body.Type,
        AddOn: req.body.AddOn,
        Tags: req.body.Tags,
      },
    });
    update = await FoodItem.findById(idd);
    return res.status(200).json(update);
  } catch (err) {
   // console.log(err);
    return res.status(500).json({ error: err.message });
  }
});
router.post("/delete", auth, async (req, res) => {
  try {
    // Might have to delete from the favorite tabs also
    var idd = req.body.idd;
    const del = await FoodItem.findByIdAndDelete(idd);
    return res.json(del);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
