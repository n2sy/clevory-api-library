const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", userController.registerHandler);
router.post("/login", userController.loginHandler);

module.exports = router;
