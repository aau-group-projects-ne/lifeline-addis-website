const router = require("express").Router();

//anyone can login
router.post("/auth/login");

//only admin can add new people
router.post("auth/register");

//to logout
router.post("auth/logout");
