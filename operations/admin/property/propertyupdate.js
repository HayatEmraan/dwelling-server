const { ObjectId } = require("mongodb");
const { propertyDB, roomsDB } = require("../../../db/mongodb");

const propertyUpdate = async (req, res) => {
  try {
    const { id, decision } = req.query;
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { status: decision } };

    const options = {
      returnOriginal: false,
    };
    const properties = await propertyDB.findOneAndUpdate(
      filter,
      update,
      options
    );
    if (properties === null)
      return res.status(404).send({ msg: "Property not found" });
    // if (decision === "approved") await roomsDB.insertOne(properties);

    return res.status(200).send({ msg: "Success", data: properties });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  propertyUpdate,
};
