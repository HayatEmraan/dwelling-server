const { propertyDB } = require("../../db/mongodb");

const gettext = async (req, res) => {
  try {
    const startDate = new Date();
    const endDate = new Date();

    if (startDate.toDateString() === endDate.toDateString()) {
      endDate.setDate(endDate.getDate() + 15);
    }
    await propertyDB.insertOne({
      date: {
        startDate: startDate,
        endDate: endDate,
      },
    });
    return res.status(200).send({ msg: "Success" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  gettext,
};
