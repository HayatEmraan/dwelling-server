// jwt middleware
const jwt = require("jsonwebtoken");
const { getUser } = require("../../utils/user/user");
require("dotenv").config();

// getuser from db


const jwtSign = async (req, res) => {
  const cookieOptions = {
    maxAge: 3600000,
    secure: true,
    httpOnly: true,
    // domain: "dwelling-bright.vercel.app",
    path: "/",
  };
  try {
    const email = req.headers.authorization.split(" ")[1];
    const user = await getUser(email);
    const uid = user?._id;
    const auid = await jwt.sign({ uid }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    res.cookie("accessToken", auid, cookieOptions);
    return res.status(200).send({ msg: "Cookie has been set." });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  jwtSign,
};
