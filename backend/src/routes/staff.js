const staffController = require("../controllers/staffController");

const router = require("express").Router();

//to get a list of all the staff members
router.get("/staff", staffController.getAllStaff);

//to get a specific staff member
router.get("/staff/:id", staffController.getStaff);

//only admin can create a new staff
router.post("/staff", staffController.createStaff);

module.exports = router;
