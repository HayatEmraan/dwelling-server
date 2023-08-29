const express = require("express");
const { getRooms } = require("../../operations/rooms/rooms");
const { getDetails } = require("../../operations/rooms/details");
const { setUser } = require("../../operations/postuser/setuser");
const { exitUser } = require("../../operations/postuser/exituser");
const { getCategoryRooms } = require("../../operations/categories/category");
const { searchResult } = require("../../operations/search/searchresult");
const router = express.Router();

// get rooms
router.get("/getrooms", getRooms);
router.get("/getdetails/:id", getDetails);
router.get("/category/rooms", getCategoryRooms);
router.get("/getsearch", searchResult);

// post user
router.post("/postuser", exitUser, setUser);

module.exports = router;
