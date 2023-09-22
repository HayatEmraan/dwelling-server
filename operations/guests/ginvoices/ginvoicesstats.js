const { ObjectId } = require("mongodb");
const { paymentDB } = require("../../../db/mongodb");

const handleTotal = async (id) => {
  const filterGatewayStripe = await paymentDB
    .find({
      status: "success",
      gateway: "stripe",
      "guestInfo._id": new ObjectId(id),
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
      "guestInfo._id": new ObjectId(id),
    })
    .toArray();

  const totalSSL = filterGatewaySSL.reduce(
    (a, b) => a + b?.paymentInfo?.amount,
    0
  );
  return totalSSL / 106 + totalStripe;
};

const handleDeclined = async (id) => {
  const filterGatewayStripe = await paymentDB
    .find({
      update: "declined",
      gateway: "stripe",
      "guestInfo._id": new ObjectId(id),
    })
    .toArray();
  const totalStripe = filterGatewayStripe.reduce(
    (a, b) => a + b?.paymentInfo?.amount,
    0
  );

  const filterGatewaySSL = await paymentDB
    .find({
      update: "declined",
      gateway: "ssl",
      "guestInfo._id": new ObjectId(id),
    })
    .toArray();

  const totalSSL = filterGatewaySSL.reduce(
    (a, b) => a + b?.paymentInfo?.amount,
    0
  );
  return totalSSL / 106 + totalStripe;
};
const handleRefund = async (id) => {
  const filterGatewayStripe = await paymentDB
    .find({
      update: "refunded",
      gateway: "stripe",
      "guestInfo._id": new ObjectId(id),
    })
    .toArray();
  const totalStripe = filterGatewayStripe.reduce(
    (a, b) => a + b?.paymentInfo?.amount,
    0
  );

  const filterGatewaySSL = await paymentDB
    .find({
      update: "refunded",
      gateway: "ssl",
      "guestInfo._id": new ObjectId(id),
    })
    .toArray();

  const totalSSL = filterGatewaySSL.reduce(
    (a, b) => a + b?.paymentInfo?.amount,
    0
  );
  return totalSSL / 106 + totalStripe;
};

const ginvoiesstats = async (req, res) => {
  try {
    const { uid } = req.uid;
    const total = await handleTotal(uid);
    const declined = await handleDeclined(uid);
    const refund = await handleRefund(uid);
    return res.status(200).send({
      msg: "Success",
      data: {
        total,
        declined,
        refund,
      },
    });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  ginvoiesstats,
};
