const userController = require("../controllers/userController");

const router = require("express").Router();

router.get("/users/:id", userController.getUser);

//to add new users... only for admins
router.post("/users", userController.createUser);

//to update users data (like name and email)
router.put("/users", userController.updateUser);

//only admins can delete users
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
