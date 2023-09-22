const { ObjectId } = require("mongodb");
const { usersDB } = require("../../../db/mongodb");

const unblockUser = async (req, res) => {
  try {
    const { id } = req.query;
    const update = await usersDB.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: { blocked: false },
      }
    );
    return res.status(200).send({ msg: "Success", data: update.value });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  unblockUser,
};
