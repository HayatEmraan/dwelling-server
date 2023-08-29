const { getUser } = require("../user/user");

const exitUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUser(email);
    if (user) return res.status(409).send({ msg: "User already exists" });
    return next();
  } catch (error) {
    return res.status(500).send({ msg: "Internal server error" });
  }
};

module.exports = {
  exitUser,
}