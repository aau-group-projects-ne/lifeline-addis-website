const pool = require("../models/db");

exports.getAllPatients = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Patient");
    console.log(rows);
    res.end();
  } catch (err) {
    console.error("Can't fetch the patients");
  }
};
exports.getPatient = (req, res) => {};

exports.getConditions = (req, res) => {};

exports.addCondition = (req, res) => {};

exports.updateCondition = (req, res) => {};
