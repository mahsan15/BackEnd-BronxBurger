const express = require("express");
const router = express.Router();

const orderService = require("../services/OrderService.js");

//create a USER
router.post("/", orderService.createAnOrder);

module.exports = router;
