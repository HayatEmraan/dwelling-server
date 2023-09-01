const { ObjectId } = require("mongodb");
const { roomsDB } = require("../../../db/mongodb");

const getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.cookies.accessToken, "this is the access token");
    const details = await roomsDB.findOne({ _id: new ObjectId(id) });
    return res.status(200).send({ msg: "Success", data: details });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  getDetails,
};
