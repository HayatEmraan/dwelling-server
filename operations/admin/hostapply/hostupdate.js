const { ObjectId } = require("mongodb");
const { usersDB } = require("../../../db/mongodb");

const hostUpdate = async (req, res) => {
  try {
    const { id } = req.user;
    const { decision, role } = req.query;
    const user = await usersDB.findOne(
      { _id: new ObjectId(id) },
      {
        $set: { role: role },
      }
    );
    if (!user) return res.status(401).send({ msg: "Unauthorized access" });
    return res.status(200).send({ msg: "Success", data: user });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  hostUpdate,
};
