const { ObjectId } = require("mongodb");
const { usersDB } = require("../../../db/mongodb");

const updateUser = async (req, res) => {
  try {
    const { id, decision } = req.query;
    const update = await usersDB.findOne(
      { _id: new ObjectId(id) },
      {
        $set: { role: decision },
      }
    );
    return res.status(200).send({ msg: "Success", data: update });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  updateUser,
};
