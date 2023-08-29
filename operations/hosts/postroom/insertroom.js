const { propertyDB } = require("../../../db/mongodb");

const insertRoom = async (req, res) => {
  try {
    const id = req.uid;
    const room = await propertyDB.insertOne({
      ...req.body,
      host: id,
      status: "pending",
    });
    return res.status(200).send({ msg: "Success", data: room });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  insertRoom,
};
