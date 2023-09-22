const { propertyDB } = require("../../../db/mongodb");

const postroomstats = async (req, res) => {
  try {
    const { uid } = req.uid;
    const total = await propertyDB.countDocuments({ host: uid });
    const pending = await propertyDB.countDocuments({
      status: "pending",
      host: uid,
    });
    const approved = await propertyDB.countDocuments({
      status: "approved",
      host: uid,
    });
    const rejected = await propertyDB.countDocuments({
      status: "declined",
      host: uid,
    });
    return res.status(200).send({
      msg: "Success",
      data: {
        total: total,
        pending: pending,
        approved: approved,
        declined: rejected,
      },
    });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  postroomstats,
};
