const { ObjectId } = require("mongodb");
const { usersDB } = require("../../db/mongodb");

const verifyHost = (req, res, next) => {
  try {
    const { id } = req.user;
    const user = usersDB.findOne({ _id: new ObjectId(id), role: "host" });
    if (!user) return res.status(401).send({ msg: "Unauthorized access" });
    next();
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  verifyHost,
};
