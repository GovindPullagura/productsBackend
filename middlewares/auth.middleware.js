const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "e-comm");
    if (decoded) {
      // console.log(decoded.userID);
      req.body.userID = decoded.userID;
      next();
    } else {
      res.status(400).send({ msg: "Login failed." });
    }
  } else {
    res.status(400).send({ msg: "Login required" });
  }
};

module.exports = { auth };
