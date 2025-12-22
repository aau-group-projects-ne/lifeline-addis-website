const pool = require("../models/db");
exports.login = (req, res) => {
  const { username, password } = req.body;
  res.send(`Welcome ${username} `);
};

exports.register = async (req, res) => {
  const { username, name, age, email, address, password, role } = req.body;
  try {
    await pool.query(
      `INSERT INTO User (user_id, name, age, email, address, password)
        VALUES (?, ?, ?, ?, ?, ?);`,
      [username, name, age, email, address, password]
    );
    if (role == "patient") {
      await pool.query(
        `INSERT INTO PATIENT (name, user_id)
        VALUES (?, ?);`,
        [name, username]
      );
    }
  } catch (err) {
    res.send("Error creating user " + err.message);
  }
};

exports.logout = (req, res) => {};
