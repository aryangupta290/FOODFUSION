const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.body.Auth;
 // console.log(token);
  if (!token) {
    return res.status(401).json("Access Denied : Token not provided");
  }
  const verify = jwt.verify(token, "aryan");
  if (!verify) {
    return res.status(401).json("Couldn't match token , Entry Denied");
  }
  req.id = verify.id;
  next();
};
module.exports = auth;
