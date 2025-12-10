const pool = require("../models/db");
//fetches a specific user's full data
exports.getUser = async (req, res) => {
  const { user_id } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM User where user_id = ?", [
      user_id,
    ]);
    res.send(rows[0]);
  } catch (err) {
    console.error("Error fetching user", err);
  }
};

//for a new person to create a new account
exports.createUser = async (req, res) => {
  const { name, user_id, password } = req.body;
  try {
    await pool.query(
      `INSERT INTO User (user_id, name, password)
        VALUES (?, ?, ?);`,
      [user_id, name, password]
    );
  } catch (err) {
    res.send("Error creating user " + err.message);
  }
};

//to update user info
exports.updateUser = (req, res) => {};

//to remove the account completely
exports.deleteUser = (req, res) => {};
