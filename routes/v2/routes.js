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
const {
  propertyList,
} = require("../../operations/admin/property/propertylist");
const {
  propertyUpdate,
} = require("../../operations/admin/property/propertyupdate");
const {
  totalProperties,
} = require("../../operations/admin/property/propertystats");
const { userStats } = require("../../operations/admin/users/userstats");
const router = express.Router();

// jwt signature routes
router.post("/signature", jwtSign);

// admin routes
router.get("/getusers", verifyJWT, verifyId, verifyAdmin, getUsers);
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
router.post("/insertroom", verifyJWT, verifyId, insertRoom);
router.get("/getpostrooms", verifyJWT, verifyId, getPostRooms);

module.exports = router;
