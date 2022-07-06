var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
const mod = 1000000009;
// Load User model
const Vendor = require("../models/Vendors");
const auth = require("../middleware/auth");

// GET request
// Getting all the users
router.post("/", auth, async function (req, res) {
  try {
    var id = req.id;
   // console.log(id);
    var original = await Vendor.findById(id);
    return res.send(original);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.get("/find", (req, res) => {
  Vendor.find(function (err, users) {
    if (err) {
      //console.log(err);
    } else {
   //   console.log(users)
      res.json(users);
    }
  });
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db
router.post("/register", (req, res) => {
  let s = req.body.password;
  var hash = 0;
  var track = 1;
  for (var i = 0; i < s.length; i++) {
    let x = s.charCodeAt(i);
    hash = (hash + x * track) % mod;
    track = track * 26;
    track = track % mod;
  }

  const newVendor = new Vendor({
    ManagerName: req.body.ManagerName,
    Email: req.body.Email,
    ContactNumber: req.body.ContactNumber,
    ShopName: req.body.ShopName,
    OpeningTime: req.body.OpeningTime,
    ClosingTime: req.body.ClosingTime,
    password: hash,
  });

  newVendor
    .save()
    .then((vendor) => {
      res.status(200).json(vendor);
    })
    .catch((err) => {
      return res.status(400).json({ error: err.message });
    });
});

// POST request
// Login

router.post("/login", async (req, res) => {
  const Email = req.body.Email;
  let s = req.body.password;
  var hash = 0;
  let track = 1;
  for (var i = 0; i < s.length; i++) {
    let x = s.charCodeAt(i);
    hash = (hash + x * track) % mod;
    track = track * 26;
    track = track % mod;
  }
  const password = hash;

  await Vendor.findOne({ Email: Email, password: password }).then((vendor) => {
    // Check if user email exists
    if (!vendor) {
      return res.status(401).json({
        Error: "Incorrect Email Id or password",
      });
    } else {
      const token = jwt.sign({ id: vendor._id, type: "Vendor" }, "aryan");
      return res.json({ token, vendor: vendor });
    }
  });
});

router.post("/update", auth, async (req, res) => {
  try {
    var id = req.id;
    var original = await Vendor.findById(id);
    var Email = req.body.Email;
    var existing = await Vendor.findOne({ Email });
    if (existing && original.Email != Email) {
      return res.status(400).json("Account with same email-id already exists");
    }
    var ShopName = req.body.ShopName;
    existing = await Vendor.findOne({ ShopName });
    if (existing && original.ShopName != ShopName) {
      return res.status(400).json("Account with same shop-name already exists");
    }
    const update = await Vendor.findByIdAndUpdate(req.id, {
      $set: {
        // <-- set stage
        ManagerName: req.body.ManagerName,
        Email: req.body.Email,
        ContactNumber: req.body.ContactNumber,
        ShopName: req.body.ShopName,
        OpeningTime: req.body.OpeningTime,
        ClosingTime: req.body.ClosingTime,
      },
    });
    return res.json(update);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
