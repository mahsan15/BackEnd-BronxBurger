const express = require("express");
const router = express.Router();

const burgerService = require("../services/BurgerService.js");

//get all BURGERS
router.get("/", burgerService.getBurgers);

//create a BURGER
router.post("/", burgerService.createABurger);

//READ ONE BURGER
router.get("/:id", burgerService.getABurger);

//UPDATE BURGER
router.put("/:id", burgerService.updateABurger);

//DELETE BURGER
router.delete("/:id", burgerService.deleteABurger);

module.exports = router;
