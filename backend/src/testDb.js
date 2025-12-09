const pool = require("./models/db");
async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT VERSION()");
    console.log(`My SQL VERSION: `, rows[0]["VERSION()"]);
  } catch (err) {
    console.error(`Database Connection failed`, err);
  }
}
testConnection();
