const { ObjectId } = require("mongodb");
const { usersDB } = require("../../db/mongodb");

const profileImg = async (req, res) => {
  try {
    const { id } = req?.query;
    const { photoURL } = req?.body;
    const user = await usersDB.updateOne(
      { _id: new ObjectId(id) },
      { $set: { photoURL } }
    );
    return res.status(200).send({ msg: "Success", data: user });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  profileImg,
};
