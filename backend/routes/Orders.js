const Order = require("../models/Orders");
const User = require("../models/Users");
const Vendor = require("../models/Vendors");
const FoodItem = require("../models/FoodItem");
var jwt = require("jsonwebtoken");
var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");
var nodemailer = require("nodemailer");
// GET request
// Getting all the users
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "email",
    pass: "password",
  },
});

router.get("/", function (req, res) {
  Order.find(function (err, Orders) {
    if (err) {
      return res.status(400).json({ error: err.message });
    } else {
      return res.json(Orders);
    }
  });
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db
router.post("/add", auth, async (req, res) => {
  var id = req.id;
  var buyer = await User.findById(id);
  var cur_money = buyer.Wallet;
  var cost = req.body.Price;
  if (cur_money < cost) {
    return res.json("Insufficient funds");
  }

  const newOrder = new Order({
    BuyerEmail: buyer.Email,
    VendorName: req.body.VendorName,
    ItemName: req.body.ItemName,
    TimeOrdered: req.body.TimeOrdered,
    Quantity: req.body.Quantity,
    Price: req.body.Price,
    VendorEmail: req.body.VendorEmail,
  });

  newOrder
    .save()
    .then((Order) => {
      res.status(200).json(Order);
    })
    .catch((err) => {
      return res.status(400).json({ error: err.message });
    });
});

router.post("/VendorClick", auth, async (req, res) => {
  var id = req.body.id;
  var existing = await Order.findById(id);
  if (existing.Status == "PLACED") {
    var mailOptions = {
      from: "email",
      to: "email",
      subject: "Order Accepted",
      text: `${existing.VendorName} has accepted your order`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    var update = await Order.findByIdAndUpdate(id, {
      $set: {
        Status: "ACCEPTED",
      },
    });
    update = await Order.findById(id);

    return res.json(update);
  } else if (existing.Status == "ACCEPTED") {
    var update = await Order.findByIdAndUpdate(id, {
      $set: {
        Status: "COOKING",
      },
    });
    update = await Order.findById(id);
    return res.json(update);
  } else if (existing.Status == "COOKING") {
    var update = await Order.findByIdAndUpdate(id, {
      $set: {
        Status: "READY_FOR_PICKUP",
      },
    });
    update = await Order.findById(id);
    return res.json(update);
  }
});

router.post("/BuyerClick", auth, async (req, res) => {
  var id = req.body.id;
  var update = await Order.findByIdAndUpdate(id, {
    $set: {
      Status: "COMPLETED",
    },
  });
  var Name = req.body.ItemName;
  var ShopName = req.body.ShopName;
  var vendor = await Vendor.findOne({ ShopName: ShopName });
  var Email = vendor.Email;
  var food = await FoodItem.findOne({ Name: Name, VendorEmail: Email });
  // console.log(123214);
  //console.log(food);
  var num = food.NumTimesSold + 1;
  var id = food._id;
  // check if items exists in mongoDB
  var check = await FoodItem.findById(id);
  if (check) {
    const f_update = await FoodItem.findByIdAndUpdate(id, {
      $set: {
        NumTimesSold: num,
      },
    });
  }
  update = await Order.findById(req.body.id);
  // console.log(update);
  return res.json(update);
}),
  router.post("/Rate", auth, async (req, res) => {
    var id = req.body.id;
    var update = await Order.findByIdAndUpdate(id, {
      $set: {
        Rating: req.body.Rating,
      },
    });
    var ItemName = req.body.ItemName;
    var VendorEmail = req.body.VendorEmail;
    var food = await FoodItem.findOne({
      VendorEmail: VendorEmail,
      Name: ItemName,
    });
    if (food) {
      var rating = food.Rating;
      if (isNaN(rating)) {
        rating = 0;
      }
      var num = food.NumTimesRated;
      if (isNaN(num)) {
        num = 0;
      }
      var rate = rating * num + parseInt(req.body.Rating);
      rate = rate / parseFloat(num + 1);
      update = await FoodItem.findByIdAndUpdate(food._id, {
        $set: {
          Rating: rate,
          NumTimesRated: num + 1,
        },
      });
    }
    update = await Order.findById(req.body.id);
    return res.json(update);
  }),
  router.post("/Reject", auth, async (req, res) => {
    var id = req.body.id;
    console.log(id);
    console.log(21231);
    var update = await Order.findByIdAndUpdate(id, {
      $set: {
        Status: "REJECTED",
      },
    });
    var existing = await Order.findById(id);
    var mailOptions = {
      from: "email",
      to: "email",
      subject: "Order Rejected",
      text: `${existing.VendorName} has rejected your order`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    var original = await Order.findById(id);
    var buyer = original.BuyerEmail;
    var b = await User.findOne({ Email: buyer });
    var cur_money = b.Wallet;
    var cost = original.Price;
    cur_money = cur_money - cost;
    var update = await User.findByIdAndUpdate(b._id, {
      $set: {
        Wallet: cur_money,
      },
    });

    console.log(update);
    update = await Order.findById(id);
    console.log(update);
    return res.json(update);
  });

module.exports = router;
