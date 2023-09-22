const { ObjectId } = require("mongodb");
const { usersDB, paymentDB } = require("../../../db/mongodb");

const guestreschedule = async (req, res) => {
  try {
    const { uid } = req.uid;
    const { id } = req.query;
    const { start, end } = req.body;
    const findBooking = await paymentDB.findOne({
      status: "success",
      roomID: id,
      "guestInfo._id": new ObjectId(uid),
    });
    if (!findBooking) return res.status(404).send({ msg: "Booking not found" });
    const updated = await paymentDB.updateOne(
      { _id: new ObjectId(findBooking._id) },
      {
        $set: {
          reschedule: true,
          checkIn: start,
          checkOut: end,
          update: "rescheduled",
        },
      }
    );
    return res.status(200).send({ msg: "Success", data: updated });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = guestreschedule;
