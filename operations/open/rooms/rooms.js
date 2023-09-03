const { roomsDB } = require("../../../db/mongodb");

const getRooms = async (req, res) => {
  try {
    const rooms = await roomsDB
      .find({})
      .project({
        _id: 1,
        name: 1,
        images: 1,
        rating: 1,
        price: 1,
        dateRange: 1,
        taxes: 1,
      })
      .toArray();
    return res.status(200).send({ msg: "Success", data: rooms });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getRooms,
};
