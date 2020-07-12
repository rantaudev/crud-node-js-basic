var express = require("express");
var router = express.Router();

const memberRouter = require("./routes/member.js");

// attach member router
router.use("/members", memberRouter);

module.exports = router;
