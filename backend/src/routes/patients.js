const {
  getPatient,
  getConditions,
  addCondition,
  updateCondition,
  getAllPatients,
} = require("../controllers/patientController");

const router = require("express").Router();

//to get a list of all the patients in db
router.get("/patient", getAllPatients);

//get a specific patient
router.get("/patient/:id", getPatient);

//get all conditions of a specific patient
router.get("patient/:id/conditions", getConditions);

//post a new patient condition
router.post("patient/:id/conditions", addCondition);

//update an existing condition
router.put("patient/:id/conditions/:id", updateCondition);
