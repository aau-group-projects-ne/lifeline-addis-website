const pool = require("../models/db");
//fetches a specific user's full data
exports.getUser = async (req, res) => {
  const { username } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM User where username = ?", [
      username,
    ]);
    res.send(rows[0]);
  } catch (err) {
    console.err("Error fetching user", err);
  }
};

//for admin to create a new account
exports.createUser = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    await pool.query(
      `INSERT INTO User (username, name, password)
        VALUES (?, ?, ?);`,
      [username, name, password]
    );
  } catch (err) {
    res.send("Error creating user", err);
  }
};

//to update user info
exports.updateUser = (req, res) => {};

//to remove the account completely
exports.deleteUser = (req, res) => {};
