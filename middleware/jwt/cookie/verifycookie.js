const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyCookies = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    const accessHeader = req.headers.authorization.split(" ")[1];
    if (!accessToken || !accessHeader)
      return res.status(401).send({ msg: "Unauthorized access" });
    const decoded = jwt.verify(
      accessToken || accessHeader,
      process.env.JWT_SECRET_KEY
    );
    req.uid = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ msg: "Unauthorized access" });
  }
};

module.exports = {
  verifyCookies,
};
