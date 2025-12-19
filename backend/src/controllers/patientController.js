const pool = require("../models/db");

//pull all the different patients
exports.getAllPatients = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Patient");
    console.log(rows);
    res.end();
  } catch (err) {
    console.error("Can't fetch the patients");
  }
};

//gets a specific patient
exports.getPatient = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM Patient where user_id = ?", [
      user_id,
    ]);
    res.send(rows[0]);
  } catch (err) {
    console.error("There seems to be an error fetching patient", err);
    res.send(("There seems to be an error fetching patient", err));
  }
};

exports.getConditions = (req, res) => {};

exports.addCondition = (req, res) => {};

exports.updateCondition = (req, res) => {};
