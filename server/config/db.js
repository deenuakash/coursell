const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTION)
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.error("Could not connect to DB:", err));

module.exports = mongoose;
