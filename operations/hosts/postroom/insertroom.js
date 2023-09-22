const { ObjectId } = require("mongodb");
const { propertyDB, usersDB } = require("../../../db/mongodb");

function generateRandomNumber() {
  const min = 100000000;
  const max = 999999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

const insertRoom = async (req, res) => {
  try {
    const { uid } = req.uid;
    const { _id, name, photoURL } = await usersDB.findOne({
      _id: new ObjectId(uid),
    });

    const startDate = new Date();
    const endDate = new Date();
    if (startDate.toDateString() === endDate.toDateString()) {
      endDate.setDate(endDate.getDate() + 15);
    }
    if (!uid) {
      return res.status(404).send({ msg: "author not found" });
    }
    const propertyID = generateRandomNumber();
    const date = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "UTC",
      hour12: false,
    };

    const formattedDate = date.toLocaleString("en-US", options);
    const createdAt = formattedDate + " " + "(UTC)";
    const room = await propertyDB.insertOne({
      ...req.body,
      dateRange: {
        startDate: startDate,
        endDate: endDate,
      },
      author: {
        _id,
        name,
        photo: photoURL,
      },
      createdAt,
      propertyID,
      host: uid,
      status: "pending",
    });
    return res.status(200).send({ msg: "Success", data: room });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  insertRoom,
};
