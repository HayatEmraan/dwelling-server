const express = require("express");
const { jwtSign } = require("../../middleware/jwt/sign");
const { verifyJWT } = require("../../middleware/jwt/verify");
const router = express.Router();

router.post("/signature", jwtSign);

router.get("/getusers", verifyJWT)

module.exports = router;
