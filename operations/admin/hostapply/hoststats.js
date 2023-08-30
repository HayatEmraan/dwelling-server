const { hostDB } = require("../../../db/mongodb");

const hostStats = async (req, res) => {
  try {
    const total = await hostDB.countDocuments({});
    const declined = await hostDB.countDocuments({ status: "declined" });
    const approved = await hostDB.countDocuments({ status: "approved" });
    const pending = await hostDB.countDocuments({ status: "pending" });
    return res.status(200).send({
      msg: "Success",
      data: {
        total,
        declined,
        approved,
        pending,
      },
    });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  hostStats,
};
