const guestdashboard = async (req, res) => {
  try {
    const { id } = req.query;
    const findBooking = await bookingDB.findOne({ _id: new ObjectId(id) });
    if (!findBooking) return res.status(404).send({ msg: "Booking not found" });
    await bookingDB.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "confirmed" } }
    );
    return res.status(200).send({ msg: "Success" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};
