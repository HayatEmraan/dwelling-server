const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken)
      return res.status(401).send({ msg: "Unauthorized access" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.uid = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ msg: "Unauthorized access" });
  }
};

module.exports = {
  verifyJWT,
};
