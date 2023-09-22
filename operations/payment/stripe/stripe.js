const { ObjectId } = require("mongodb");
const {
  usersDB,
  roomsDB,
  pendingPaymentDB,
  paymentDB,
} = require("../../../db/mongodb");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function generateRandomNumber() {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

const stripeConfig = async (req, res) => {
  try {
    return res.status(200).send({
      msg: "Success",
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

const stripePay = async (req, res) => {
  try {
    const { uid } = req?.uid;
    const { roomID, checkIn, checkOut, guest = 1 } = req?.body;
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const timeDifference = endDate?.getTime() - startDate.getTime();
    const numberOfNights = Math?.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const findRoom = await roomsDB.findOne({ _id: new ObjectId(roomID) });
    if (!findRoom) {
      return res.status(404).send({ msg: "Room data not found" });
    }
    const guestInfo = await usersDB.findOne({ _id: new ObjectId(uid) });
    if (!guestInfo) {
      return res.status(404).send({ msg: "Guest data not found" });
    }
    const hostInfo = await usersDB.findOne({
      _id: new ObjectId(findRoom?.host),
    });
    if (!hostInfo) {
      return res.status(404).send({ msg: "Host data not found" });
    }
    const orderID = generateRandomNumber();
    const finalAmount = findRoom?.price + findRoom?.taxes;
    const multiplier = finalAmount * guest * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: multiplier * 100,
      automatic_payment_methods: { enabled: true },
    });

    const paymentData = {
      ...req?.body,
      nights: numberOfNights,
      date: new Date(),
      orderID,
      gateway: "stripe",
      paymentInfo: {
        txid: paymentIntent?.id,
        amount: multiplier,
        currency: "USD",
        product_name: findRoom?.name || "",
        product_category: findRoom?.category || "",
        cus_name: guestInfo?.name || "",
        cus_email: guestInfo?.email || "dwelling@example.com",
        cus_add1: guestInfo?.address || "",
        cus_phone: guestInfo?.phone || "",
        cus_city: guestInfo?.city,
        cus_country: guestInfo?.country || "",
        cus_postcode: guestInfo?.postcode || "",
      },
      status: "pending",
      hostInfo,
      guestInfo,
    };
    await pendingPaymentDB.insertOne(paymentData);
    return res.status(200).send({
      msg: "Success",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

const paymentFailedStripe = async (req, res) => {
  try {
    const { rm } = req.query;
    const findPending = await pendingPaymentDB.findOne({ roomID: rm });
    if (!findPending) {
      return res.status(404).send({ msg: "Payment not found" });
    }
    await pendingPaymentDB.deleteOne({
      roomID: rm,
    });
    return res.status(200).send({ msg: "Success" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

const paymentAcceptStripe = async (req, res) => {
  try {
    const { rm, payment_intent } = req.query;
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    const paymentMethodId = paymentIntent.payment_method;
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    const last4 = paymentMethod.card.last4;
    const brand = paymentMethod.card.brand;
    const findPending = await pendingPaymentDB.findOne({ roomID: rm });
    if (!findPending) {
      return res.status(404).send({ msg: "Payment not found" });
    }
    await pendingPaymentDB.updateOne(
      { roomID: rm },
      {
        $set: {
          status: "success",
          str: {
            last4,
            brand,
          },
        },
      }
    );
    const findPayment = await pendingPaymentDB.findOne({ roomID: rm });
    await paymentDB.insertOne(findPayment);
    await pendingPaymentDB.deleteOne({ roomID: rm });
    return res.redirect(
      `https://dwelling-olive.vercel.app/payment/intent?txid=${payment_intent}&pay=true&rm=${rm}&dwl=ling&ht=bright`
    );
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  stripePay,
  stripeConfig,
  paymentAcceptStripe,
  paymentFailedStripe,
};
