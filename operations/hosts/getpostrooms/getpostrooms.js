const { roomsDB } = require("../../../db/mongodb");

const getPostRooms = async (req, res) => {
  try {
    const id = req.uid;
    const rooms = await roomsDB.find({ host: id }).toArray();
    return res.status(200).send({ msg: "Success", data: rooms });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getPostRooms
}