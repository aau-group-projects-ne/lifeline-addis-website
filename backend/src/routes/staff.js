const router = require("express").Router();

router.get("/staff/:id");

//only admin can create a new staff
router.post("/staff");
