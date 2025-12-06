const express = require("express");
const authRoute = require("./routes/auth");
const patientsRoute = require("./routes/patients");
const staffRoutes = require("./routes/staff");
const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());

app.use(authRoute);
app.use(userRoutes);

app.use(patientsRoute);
app.use(staffRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
module.exports = app;
