const { ObjectId } = require("mongodb");
const { usersDB, hostDB } = require("../../../db/mongodb");

const hostApply = async (req, res) => {
  try {
    const { id } = req.user;
    const data = req.body;
    const user = await usersDB.findOne({ _id: new ObjectId(id), role: "user" });
    if (!user) return res.status(401).send({ msg: "Unauthorized access" });
    await hostDB.insertOne({ ...data, status: "pending" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  hostApply,
};
