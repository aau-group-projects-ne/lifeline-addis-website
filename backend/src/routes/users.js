const router = require('express').Router();


router.get("/users/:id")

//to add new users... only for admins
router.post("/users")

//to update users... only for admins and doctors
router.put("/users")

//only admins can delete users
router.delete("/users/:id")
