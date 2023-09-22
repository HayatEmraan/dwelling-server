const { ObjectId } = require("mongodb");
const { paymentDB } = require("../../../db/mongodb");

const updatebooking = async (req, res) => {
  try {
    const { id, decision } = req.query;
    const findBooking = await paymentDB.findOne({ _id: new ObjectId(id) });
    if (!findBooking) return res.status(404).send({ msg: "Booking not found" });
    await paymentDB.updateOne(
      { _id: new ObjectId(id) },
      { $set: { update: decision } }
    );
    return res.status(200).send({ msg: "Success" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  updatebooking,
};
