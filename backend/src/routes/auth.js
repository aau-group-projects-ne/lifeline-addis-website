const authController = require("../controllers/authController");

const router = require("express").Router();

//anyone can login
router.post("/auth/login", authController.login);

//only admin can add new people
router.post("auth/register", authController.register);

//to logout
router.post("auth/logout", authController.logout);

module.exports = router;
