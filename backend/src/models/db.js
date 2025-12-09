const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "localhost",
  user: "lifeline_user",
  password: "StrongPassword1234@",
  database: "lifeline_addis",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 10,
});
module.exports = pool;
