const { usersDB } = require("../../../db/mongodb");

const userStats = async (req, res) => {
  try {
    const total = await usersDB.countDocuments({});
    const blocked = await usersDB.countDocuments({ blocked: true });
    return res.status(200).send({
      msg: "Success",
      data: {
        total,
        blocked,
      },
    });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  userStats,
};
