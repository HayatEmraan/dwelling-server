const { ObjectId } = require("mongodb");
const { paymentDB } = require("../../../db/mongodb");

const gdashstats = async (req, res) => {
  try {
    const { uid } = req.uid;
    const approved = await paymentDB.countDocuments({
      update: "approved",
      "guestInfo._id": new ObjectId(uid),
    });
    const pending = await paymentDB.countDocuments({
      $and: [
        {
          update: { $exists: false },
        },
        {
          "guestInfo._id": new ObjectId(uid),
        },
      ],
    });
    const declined = await paymentDB.countDocuments({
      update: "declined",
      "guestInfo._id": new ObjectId(uid),
    });
    const active = await paymentDB.countDocuments({
      update: "approved",
      "guestInfo._id": new ObjectId(uid),
    });

    const filterGatewayStripe = await paymentDB
      .find({
        status: "success",
        gateway: "stripe",
        "guestInfo._id": new ObjectId(uid),
      })
      .toArray();

    const totalStripe = filterGatewayStripe.reduce(
      (a, b) => a + b?.paymentInfo?.amount,
      0
    );

    const filterGatewaySSL = await paymentDB
      .find({
        status: "success",
        gateway: "ssl",
        "guestInfo._id": new ObjectId(uid),
      })
      .toArray();

    const totalSSL = filterGatewaySSL.reduce(
      (a, b) => a + b?.paymentInfo?.amount,
      0
    );
    const spendTotal = totalSSL / 106 + totalStripe;

    return res.status(200).send({
      msg: "Success",
      data: {
        approved,
        pending,
        declined,
        active,
        spend: spendTotal,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = gdashstats;
