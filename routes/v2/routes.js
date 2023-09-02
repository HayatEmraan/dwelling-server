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
const { updateUser } = require('../../operations/admin/users/updateuser')
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
const router = express.Router();

// jwt signature routes
router.post("/signature", jwtSign);

// admin routes
router.get("/getusers", verifyJWT, verifyId, verifyAdmin, getUsers);
router.patch("/user/update", verifyJWT, verifyId, verifyAdmin, updateUser);
router.patch("/user/block", verifyJWT, verifyId, verifyAdmin, blockUser);

router.get("/properties", verifyJWT, verifyId, verifyAdmin, propertyList);
router.patch(
  "/property/update",
  verifyJWT,
  verifyId,
  verifyAdmin,
  propertyUpdate
);

router.get("/properties/pending", totalProperties);

router.get("/userstats", verifyJWT, verifyId, verifyAdmin, userStats);

// hosts routes / ads provider
router.post("/insertroom", verifyJWT, verifyId, verifyHost, insertRoom);
router.get("/getpostrooms", verifyJWT, verifyId, verifyHost, getPostRooms);

module.exports = router;
