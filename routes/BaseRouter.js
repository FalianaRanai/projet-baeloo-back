const express = require("express");
const router = express.Router();
const BaseController = require("../controllers/BaseController");
let basecontroller = new BaseController();

router.get("/", basecontroller.get);

module.exports = router;