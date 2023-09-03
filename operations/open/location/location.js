const { roomsDB } = require("../../../db/mongodb");

const location = async (req, res) => {
  try {
    const location = await roomsDB.find({}).project({ location: 1 }).toArray();
    const locationsArray = location.map((item) => item.location);
    const valuesArray = locationsArray.map((obj) => Object.values(obj));
    const locationData = valuesArray.flat();
    const uniqueArray = [...new Set(locationData)];
    return res.status(200).send({ msg: "Success", data: uniqueArray });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  location,
};
