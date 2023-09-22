const { ObjectId } = require("mongodb");
const { paymentDB } = require("../../../db/mongodb");

const guestrefund = async (req, res) => {
  try {
    const { uid } = req.uid;
    const { id } = req.query;
    const { msg } = req.body;
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
          refund: {
            status: true,
            msg,
          },
          update: "refunded",
        },
      }
    );
    return res.status(200).send({ msg: "Success", data: updated });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = guestrefund;
