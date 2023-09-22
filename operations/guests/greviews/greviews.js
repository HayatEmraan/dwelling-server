const { ObjectId } = require("mongodb");
const { paymentDB, roomsDB, usersDB } = require("../../../db/mongodb");

const guestreview = async (req, res) => {
  try {
    const { uid } = req.uid;
    const { id } = req.query;
    const { comment, rating } = req.body;
    const finduser = await usersDB.findOne({ _id: new ObjectId(uid) });
    const findBooking = await paymentDB.findOne({
      status: "success",
      roomID: id,
      "guestInfo._id": new ObjectId(uid),
    });
    if (!findBooking) return res.status(404).send({ msg: "Booking not found" });

    const filter = { _id: new ObjectId(findBooking.roomID) };
    const update = {
      $set: {
        reviews: [
          ...(Array.isArray(findBooking.reviews) ? findBooking.reviews : []),
          {
            reviewer_name:
              finduser.name.firstName + " " + finduser.name.lastName,
            date: new Date(),
            photo: finduser.photoURL,
            rating: rating,
            comment: comment,
          },
        ],
      },
    };
    const updated = await roomsDB.updateOne(filter, update);
    return res.status(200).send({ msg: "Success", data: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = guestreview;
