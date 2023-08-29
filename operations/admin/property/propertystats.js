const { propertyDB } = require("../../../db/mongodb");

const totalProperties = async (req, res) => {
  try {
    const totalproperties = await propertyDB.countDocuments({});
    const pendingproperties = await propertyDB.countDocuments({
      status: "pending",
    });
    const approvedproperties = await propertyDB.countDocuments({
      status: "approved",
    });
    const rejectedproperties = await propertyDB.countDocuments({
      status: "declined",
    });
    return res.status(200).send({
      msg: "Success",
      data: {
        total: totalproperties,
        pending: pendingproperties,
        approved: approvedproperties,
        declined: rejectedproperties,
      },
    });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  totalProperties,
};
