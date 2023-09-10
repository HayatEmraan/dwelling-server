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
const { paymentIntentSSL } = require("../../operations/payment/ssl/commerz");
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

// hosts routes / ads provider
router.post("/insertroom", verifyJWT, verifyId, verifyHost, insertRoom);
router.get("/getpostrooms", verifyJWT, verifyId, verifyHost, getPostRooms);

// payment interface

router.post("/payment/ssl", verifyJWT, verifyId, paymentIntentSSL);

module.exports = router;
