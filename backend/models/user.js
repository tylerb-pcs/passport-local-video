const mongoose = require("mongoose");
const user = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
});

module.exports = mongoose.model("User", user);
