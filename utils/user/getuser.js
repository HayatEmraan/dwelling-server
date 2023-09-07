const { ObjectId } = require("mongodb");
const { usersDB } = require("../../db/mongodb");

const getUserByCookie = async (req, res) => {
  try {
    const { uid } = req.uid;
    const user = await usersDB.findOne({ _id: new ObjectId(uid) });
    return res.status(200).send({ msg: "Success", data: user });
  } catch (err) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getUserByCookie,
};
