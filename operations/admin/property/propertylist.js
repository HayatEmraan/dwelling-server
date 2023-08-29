const { propertyDB } = require("../../../db/mongodb");

const propertyList = async (req, res) => {
  try {
    const properties = await propertyDB.find({}).toArray();
    return res.status(200).send({ msg: "Success", data: properties });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  propertyList,
};
