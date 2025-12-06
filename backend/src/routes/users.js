const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");

const router = require("express").Router();

router.get("/users/:id", getUser);

//to add new users... only for admins
router.post("/users", createUser);

//to update users data (like name and email)
router.put("/users", updateUser);

//only admins can delete users
router.delete("/users/:id", deleteUser);
