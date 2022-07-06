var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
const mod = 1000000007;
// Load User model
const User = require("../models/Users");
const auth = require("../middleware/auth");

// GET request
// Getting all the users
router.post("/", auth, async function (req, res) {
  try {
    var id = req.id;
    // console.log(id);
    var original = await User.findById(id);
    return res.json(original);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
router.get("/find", (req, res) => {
  User.find(function (err, users) {
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
  let track = 1;
  for (var i = 0; i < s.length; i++) {
    let x = s.charCodeAt(i);
    hash = (hash + x * track) % mod;
    track = track * 26;
    track = track % mod;
  }

  const newUser = new User({
    Name: req.body.Name,
    Email: req.body.Email,
    ContactNumber: req.body.ContactNumber,
    Age: req.body.Age,
    BatchName: req.body.BatchName,
    password: hash,
  });

  newUser
    .save()
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
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
  // Find user by email
  await User.findOne({ Email: Email, password: password }).then((user) => {
    // Check if user email exists
    if (!user) {
      return res.status(401).json({
        Error: "Incorrect Email Id or password",
      });
    } else {
      const token = jwt.sign({ id: user._id, type: "Buyer" }, "aryan");
      return res.json({ token, user: user });
    }
  });
});

// Editing a profile
router.post("/update", auth, async (req, res) => {
  try {
    var id = req.id;
    var original = await User.findById(id);
    var Email = req.body.Email;
    var existing = await User.findOne({ Email });
    if (existing && original.Email != Email) {
      return res.status(400).json("Account with same email-id already exists");
    }
    const update = await User.findByIdAndUpdate(req.id, {
      $set: {
        // <-- set stage
        Name: req.body.Name,
        Email: req.body.Email,
        ContactNumber: req.body.ContactNumber,
        Age: req.body.Age,
        BatchName: req.body.BatchName,
      },
    });
    return res.json(update);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Adding Money into the Wallet

router.post("/AddMoney", auth, async (req, res) => {
  try {
    var id = req.id;
    var original = await User.findById(id);
    var money = original.Wallet;
    var x = parseInt(req.body.add);
    money = money + x;
    var update = await User.findByIdAndUpdate(req.id, {
      $set: {
        Wallet: money,
      },
    });
    update = await User.findById(req.id);
    return res.json(update);
  } catch (err) {
    // console.log(err);
    return res.status(400).json({ error: err.message });
  }
});
router.post("/UpdateMoney", auth, async (req, res) => {
  try {
    var id = req.id;
    var original = await User.findById(id);
    // var money = original.Wallet;
    // var x = parseInt(req.body.add);
    //money = money + x;
    var update = await User.findByIdAndUpdate(req.id, {
      $set: {
        Wallet: req.body.Wallet,
      },
    });
    update = await User.findById(req.id);
    return res.json(update);
  } catch (err) {
    // console.log(err);
    return res.status(400).json({ error: err.message });
  }
});

// Adding New Food Item

router.post("/addfood", auth, async (req, res) => {
  try {
    var id = req.id;
    console.log(id);
    var original = await User.findById(id);
    var FavFood = original.FavouriteFood;
    FavFood.push(req.body.add);
    const update = await User.findByIdAndUpdate(req.id, {
      $set: {
        FavouriteFood: FavFood,
      },
    });
    return res.json(update);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
});
router.post("/removefood", auth, async (req, res) => {
  try {
    var id = req.id;
    var original = await User.findById(id);
    var FavFood = original.FavouriteFood;
    const index = FavFood.indexOf(req.body.remove);
    if (index > -1) {
      FavFood.splice(index, 1); // 2nd parameter means remove one item only
    }
    const update = await User.findByIdAndUpdate(req.id, {
      $set: {
        FavouriteFood: FavFood,
      },
    });
    return res.json(update);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
module.exports = router;
