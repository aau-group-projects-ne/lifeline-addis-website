const {
  getStaff,
  createStaff,
  getAllStaff,
} = require("../controllers/staffController");

const router = require("express").Router();

//to get a list of all the staff members
router.get("/staff", getAllStaff);

//to get a specific staff member
router.get("/staff/:id", getStaff);

//only admin can create a new staff
router.post("/staff", createStaff);
