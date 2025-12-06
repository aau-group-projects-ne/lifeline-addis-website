const router = require("express").Router();

//get a specific patient
router.get("/patient/:id");

//get all conditions of a specific patient
router.get("patient/:id/conditions");

//post a new patient condition
router.post("patient/:id/conditions");

//update an existing condition
router.put("patient/:id/conditions/:id");
