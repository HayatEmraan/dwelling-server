const { ObjectId } = require("mongodb");
const { hostDB } = require("../../../db/mongodb");

const searchhost = async (req, res) => {
  try {
    const { query } = req.query;
    const filter = await hostDB
      .find({ _id: new ObjectId(query) })
      .sort({ _id: -1 })
      .toArray();
    return res.status(200).send({ msg: "Success", data: filter });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};
