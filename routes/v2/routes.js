const express = require("express");
const { jwtSign } = require("../../middleware/jwt/sign");
const router = express.Router();

router.post("/signature", jwtSign);

module.exports = router;
