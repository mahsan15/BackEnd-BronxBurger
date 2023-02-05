const express = require("express");
const router = express.Router();

const userService = require("../services/UserService.js");
//functions to handle different requests
//get all USERS
router.get("/", userService.getUsers);

//create a USER
router.post("/", userService.createAUser);

//login
router.post("/login", userService.userLogin);

//READ ONE USER
router.get("/:id", userService.getAUser);

//UPDATE USER
router.put("/:id", userService.updateAUser);

//UPDATE USER CART
router.put("/logout/:id", userService.updateAUserCart);

//DELETE USER
router.delete("/:id", userService.deleteAUser);

module.exports = router;
