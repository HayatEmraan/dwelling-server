const { propertyDB } = require("../../../db/mongodb");

const getPostRooms = async (req, res) => {
  try {
    const { uid } = req.uid;
    const rooms = await propertyDB.find({ host: uid }).toArray();
    return res.status(200).send({ msg: "Success", data: rooms });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getPostRooms,
};
