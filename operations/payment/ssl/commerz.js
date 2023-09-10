const { ObjectId } = require("mongodb");
const SSLCommerzPayment = require("sslcommerz-lts");
const { roomsDB, pendingPaymentDB, usersDB } = require("../../../db/mongodb");
const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_SECRET_KEY;
const is_live = false; //true for live, false for sandbox

const randomIXID = new ObjectId().toString().replace(/-/g, "");

const paymentIntentSSL = async (req, res) => {
  const { uid } = req.uid;
  const { roomID, checkIn, checkOut, guest } = req?.body;

  const findRoom = await roomsDB.findOne({ _id: new ObjectId(roomID) });
  if (!findRoom) {
    return res.status(404).send({ msg: "Room data not found" });
  }
  const guestFind = await usersDB.findOne({ _id: new ObjectId(uid) });
  if (!guestFind) {
    return res.status(404).send({ msg: "Guest data not found" });
  }
  const hostID = await usersDB.findOne({ _id: new ObjectId(findRoom?.host) });
  //   if (!hostID) {
  //     return res.status(404).send({ msg: "Host data not found" });
  //   }

  const data = {
    total_amount: (findRoom?.price + findRoom?.taxes) * 106,
    currency: "BDT",
    tran_id: randomIXID,
    success_url: `http://localhost:5000/success?txid=${randomIXID}&rm=${roomID}`,
    fail_url: `http://localhost:5000/failed?txid=${randomIXID}&rm=${roomID}`,
    cancel_url: `http://localhost:5000/failed?txid=${randomIXID}&rm=${roomID}`,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "dwelling - a commerz",
    product_name: findRoom?.name,
    product_category: findRoom?.category,
    product_profile: "general",
    cus_name: guestFind?.name,
    cus_email: guestFind?.email,
    cus_add1: guestFind?.address,
    cus_add2: "",
    cus_city: "",
    cus_state: "",
    cus_postcode: guestFind?.postcode,
    cus_country: guestFind?.country,
    cus_phone: guestFind?.phone,
    cus_fax: "",
    ship_name: "dwelling",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
    };
    

  const paymentData = {
    txid: data?.tran_id,
    amount: data?.total_amount,
    currency: data?.currency,
    product_name: data?.product_name,
    product_category: data?.product_category,
    cus_name: data?.cus_name,
    cus_email: data?.cus_email,
    cus_phone: data?.cus_phone,
    cus_add1: data?.cus_add1,
    cus_city: data.cus_city,
    cus_country: data?.cus_country,
    cus_postcode: data?.cus_postcode,
  };

  const hostInfo = {
    name: hostID?.name,
    email: hostID?.email,
    phone: hostID?.phone,
    address: hostID?.address,
    organization: hostID?.organization,
  };

  const status = {
    status: "pending",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    return res.send({
      url: GatewayPageURL,
      paymentData,
      status,
      hostInfo,
      checkIn,
      checkOut,
      guest,
    });
  });
  //   await pendingPaymentDB.insertOne(
  //     paymentData,
  //     status,
  //     hostInfo,
  //     checkIn,
  //     checkOut,
  //     guest
  //   );
};

const paymentFailedSSL = async (req, res) => {
  const data = req.body;
  res.send(data);
};

const paymentAcceptSSL = async (req, res) => {
  const data = req.body;
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.redirect(GatewayPageURL);
    console.log("Redirecting to: ", GatewayPageURL);
  });
};

module.exports = {
  paymentAcceptSSL,
  paymentIntentSSL,
  paymentFailedSSL,
};
