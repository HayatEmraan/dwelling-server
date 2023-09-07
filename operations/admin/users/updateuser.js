const { ObjectId } = require("mongodb");
const { usersDB } = require("../../../db/mongodb");

const updateUser = async (req, res) => {
  try {
    const { id, decision } = req.query;
    const update = await usersDB.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { role: decision } },
      { returnOriginal: false }
    );
    return res.status(200).send({ msg: "Success", data: update.value });
  } catch (error) {
    console.log("this is the error", error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  updateUser,
};
