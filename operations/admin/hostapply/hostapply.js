const { ObjectId } = require("mongodb");
const { usersDB, hostDB } = require("../../../db/mongodb");

function generateRandomNumber() {
  const min = 100000000;
  const max = 999999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

const hostApply = async (req, res) => {
  try {
    const { id } = req.user;
    const data = req.body;
    const hostNumber = generateRandomNumber();
    const user = await usersDB.findOne({ _id: new ObjectId(id), role: "user" });
    if (!user) return res.status(401).send({ msg: "Unauthorized access" });
    await hostDB.insertOne({
      ...data,
      hostID: user._id,
      hostNumber,
      status: "pending",
    });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  hostApply,
};
