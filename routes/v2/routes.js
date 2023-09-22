const express = require("express");
const { verifyJWT } = require("../../middleware/jwt/verify");
const { insertRoom } = require("../../operations/hosts/postroom/insertroom");
const { jwtSign } = require("../../middleware/jwt/sign");
const { verifyId } = require("../../middleware/verifyid/verifyid");
const {
  getPostRooms,
} = require("../../operations/hosts/getpostrooms/getpostrooms");
const { verifyAdmin } = require("../../middleware/admin/vadmin");
const { getUsers } = require("../../operations/admin/users/users");
const { updateUser } = require("../../operations/admin/users/updateuser");
const {
  propertyList,
} = require("../../operations/admin/property/propertylist");
const {
  propertyUpdate,
} = require("../../operations/admin/property/propertyupdate");
const {
  totalProperties,
} = require("../../operations/admin/property/propertystats");
const { blockUser } = require("../../operations/admin/users/blockuser");
const { verifyHost } = require("../../middleware/host/vhost");
const { userStats } = require("../../operations/admin/users/userstats");
const { searchUser } = require("../../operations/admin/users/searchuser");
const { usersFilter } = require("../../operations/admin/users/userfilter");
const { unblockUser } = require("../../operations/admin/users/unblockuser");
const { getUserByCookie } = require("../../utils/user/getuser");
const {
  filterProperty,
} = require("../../operations/admin/property/filterproperty");
const {
  searchProperty,
} = require("../../operations/admin/property/searchproperty");
const {
  paymentIntentSSL,
  paymentAcceptSSL,
  paymentFailedSSL,
} = require("../../operations/payment/ssl/commerz");
const { verifyCookies } = require("../../middleware/jwt/cookie/verifycookie");
const {
  stripePay,
  stripeConfig,
  paymentAcceptStripe,
  paymentFailedStripe,
} = require("../../operations/payment/stripe/stripe");
const { profileImg } = require("../../operations/profile/profileimg");
const { profileUpdate } = require("../../operations/profile/profileupdate");
const getbookings = require("../../operations/admin/booking/getbookings");
const gethosts = require("../../operations/admin/host/gethosts");
const searchhost = require("../../operations/admin/host/searchhost");
const getinvoices = require("../../operations/admin/invoice/getinvoices");
const searchinvoices = require("../../operations/admin/invoice/searchinvoices");
const {
  filterinvoices,
} = require("../../operations/admin/invoice/filterinvoices");
const totalstats = require("../../operations/admin/invoice/totalstats");
const {
  filterbookings,
} = require("../../operations/admin/booking/filterbookings");
const {
  updatebooking,
} = require("../../operations/admin/booking/updatebooking");
const guestinvoices = require("../../operations/guests/ginvoices/ginvoices");
const guestbooking = require("../../operations/guests/gbooking/gbooking");
const guestrefund = require("../../operations/guests/grefund/grefund");
const guestreschedule = require("../../operations/guests/reschedule/reschedule");
const { verifyGuest } = require("../../middleware/guest/vguest");
const gsearchinvoice = require("../../operations/guests/ginvoices/gsinvoice");
const guestreview = require("../../operations/guests/greviews/greviews");
const gdashstats = require("../../operations/guests/gdashstats/gdashstats");
const {
  ginvoiesstats,
} = require("../../operations/guests/ginvoices/ginvoicesstats");
const {
  postroomstats,
} = require("../../operations/hosts/postroomstats/postroomstats");
const router = express.Router();

// jwt signature routes
router.post("/signature", jwtSign);

// admin routes
router.get("/getusers", verifyJWT, verifyId, verifyAdmin, getUsers);
router.patch("/user/update", verifyJWT, verifyId, verifyAdmin, updateUser);
router.get("/userstats", verifyJWT, verifyId, verifyAdmin, userStats);
router.get("/searchuser", verifyJWT, verifyId, verifyAdmin, searchUser);
router.get("/usersfilter", verifyJWT, verifyId, verifyAdmin, usersFilter);
router.patch("/user/block", verifyJWT, verifyId, verifyAdmin, blockUser);
router.patch("/user/unblock", verifyJWT, verifyId, verifyAdmin, unblockUser);

// get user by cookies
router.get("/user/getuserbycookie", verifyJWT, getUserByCookie);

router.get("/properties", verifyJWT, verifyId, verifyAdmin, propertyList);
router.patch(
  "/property/update",
  verifyJWT,
  verifyId,
  verifyAdmin,
  propertyUpdate
);
router.get(
  "/properties/stats",
  verifyJWT,
  verifyId,
  verifyAdmin,
  totalProperties
);
router.get(
  "/filterproperties",
  verifyJWT,
  verifyId,
  verifyAdmin,
  filterProperty
);
router.get("/searchproperty", verifyJWT, verifyId, verifyAdmin, searchProperty);

// booking routes
router.get("/getbookings", verifyJWT, verifyId, verifyAdmin, getbookings);
router.get("/filterbookings", verifyJWT, verifyId, verifyAdmin, filterbookings);
router.patch("/updatebooking", verifyJWT, verifyId, verifyAdmin, updatebooking);

// host routes - admin
router.get("/gethosts", verifyJWT, verifyId, verifyAdmin, gethosts);
router.get("/searchhost", verifyJWT, verifyId, verifyAdmin, searchhost);

// invoice routes - admin
router.get("/getinvoices", verifyJWT, verifyId, verifyAdmin, getinvoices);
router.get("/searchinvoies", verifyJWT, verifyId, verifyAdmin, searchinvoices);
router.get("/filterinvoices", verifyJWT, verifyId, verifyAdmin, filterinvoices);
router.get("/invoicesstats", verifyJWT, verifyId, verifyAdmin, totalstats);

router.get("/gbookings", verifyJWT, verifyId, verifyGuest, guestbooking);

// ivnvoices routes - guest
router.get("/ginvoices", verifyJWT, verifyId, verifyGuest, guestinvoices);
router.get("/gsinvoice", verifyJWT, verifyId, verifyGuest, gsearchinvoice);
router.get("/gsstats", verifyJWT, verifyId, verifyGuest, ginvoiesstats);

router.patch("/grefund", verifyJWT, verifyId, verifyGuest, guestrefund);
router.patch("/reschedule", verifyJWT, verifyId, verifyGuest, guestreschedule);
router.patch("/review", verifyJWT, verifyId, verifyGuest, guestreview);

router.get("/gdashstats", verifyJWT, verifyId, verifyGuest, gdashstats);

// hosts routes / ads provider
router.post("/insertroom", verifyJWT, verifyId, verifyHost, insertRoom);
router.get("/getpostrooms", verifyJWT, verifyId, verifyHost, getPostRooms);
router.get("/getroomstats", verifyJWT, verifyId, verifyHost, postroomstats);

// payment interface

// ssl commerz payment
router.post("/payment/ssl", verifyJWT, verifyId, paymentIntentSSL);
router.post("/payment/success/intent", paymentAcceptSSL);
router.post("/payment/failed/intent", paymentFailedSSL);

// stripe payment
router.post("/payment/stripe", verifyJWT, verifyId, stripePay);
router.get("/payment/strip/config", verifyJWT, verifyId, stripeConfig);
router.get("/payment/failed/stripe", paymentFailedStripe);
router.get("/payment/success/stripe", paymentAcceptStripe);

// update user img & info
router.patch("/user/updateimg", verifyJWT, verifyId, profileImg);
router.patch("/user/updateinfo", verifyJWT, verifyId, profileUpdate);

module.exports = router;
