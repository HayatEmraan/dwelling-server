// jwt middleware
const jwt = require("jsonwebtoken");
require("dotenv").config();

// getuser from db
const getUser = require("../../operations/user/user");

const jwtSign = async (req, res) => {
  console.log(req.headers);
  try {
    const email = req.headers.authorization.split(" ")[1];
    const user = await getUser(email);
    const uid = user?._id;
    const token = await jwt.sign(
      { uid },
      "f29bc356cc20fc3a6a8a90ca9fe50fd98e5a0df5a1928d24fd49e7c6b4da0816d8fcc92eb084fd13b96970ce68de7dd7f2238eedcdbe3dac1beb9e66cf2b8fe4",
      {
        expiresIn: "24h",
      }
    );
    res.cookie("token", "jwt");
    return res.status(200).send({ msg: "Cookie has been set." });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  jwtSign,
};
