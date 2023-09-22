const { hostDB } = require("../../../db/mongodb");

const gethosts = async (req, res) => {
  try {
    const hosts = await hostDB.find({}).sort({ _id: -1 }).toArray();
    return res.status(200).send({ msg: "Success", data: hosts });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};
