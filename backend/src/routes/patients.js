const patientController = require("../controllers/patientController");

const router = require("express").Router();

//to get a list of all the patients in db
router.get("/patient", patientController.getAllPatients);

//get a specific patient
router.get("/patient/:user_id", patientController.getPatient);

//get all conditions of a specific patient
router.get("/patient/:id/conditions", patientController.getConditions);

//post a new patient condition
router.post("/patient/:id/conditions", patientController.addCondition);

//update an existing condition
router.put("/patient/:id/conditions/:id", patientController.updateCondition);

module.exports = router;
