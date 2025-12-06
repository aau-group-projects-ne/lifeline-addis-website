const { login, register, logout } = require("../controllers/authController");

const router = require("express").Router();

//anyone can login
router.post("/auth/login", login);

//only admin can add new people
router.post("auth/register", register);

//to logout
router.post("auth/logout", logout);
