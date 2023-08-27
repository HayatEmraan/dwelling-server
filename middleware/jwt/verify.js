const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(
      token,
      "f29bc356cc20fc3a6a8a90ca9fe50fd98e5a0df5a1928d24fd49e7c6b4da0816d8fcc92eb084fd13b96970ce68de7dd7f2238eedcdbe3dac1beb9e66cf2b8fe4"
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ msg: "Unauthorized access" });
  }
};

module.exports = {
  verifyJWT,
};
