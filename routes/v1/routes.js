const express = require("express");
const { getRooms } = require("../../operations/open/rooms/rooms");
const { getCategoryRooms } = require("../../operations/open/categories/category");
const { searchResult } = require("../../operations/open/search/searchresult");
const { setUser } = require("../../utils/postuser/setuser");
const { exitUser } = require("../../utils/postuser/exituser");
const { getDetails } = require("../../operations/open/rooms/details");
// const {stripeCheckout} = require('../')
const router = express.Router();

// get rooms
router.get("/getrooms", getRooms);
router.get("/getdetails/:id", getDetails);
router.get("/category/rooms", getCategoryRooms);
router.get("/getsearch", searchResult);

// post user
router.post("/postuser", exitUser, setUser);

module.exports = router;
