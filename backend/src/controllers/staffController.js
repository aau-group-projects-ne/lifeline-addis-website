const pool = require("../models/db");
exports.getAllStaff = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Staff");
    console.log(rows);
    res.end();
  } catch (err) {
    console.error("Can't fetch the patients");
  }
};
exports.getStaff = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM Patient where user_id = ?", [
      user_id,
    ]);
    console.log(rows);
  } catch (err) {
    console.error(err.message);
  }
};
exports.createStaff = (req, res) => {};
