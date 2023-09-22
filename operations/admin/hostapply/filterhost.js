const { hostDB } = require("../../../db/mongodb");

const filterhost = async (req, res) => {
  try {
    const { query } = req.query;
    const filter = await hostDB
      .find({ status: query })
      .sort({ _id: -1 })
      .toArray();
    return res.status(200).send({ msg: "Success", data: filter });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};
