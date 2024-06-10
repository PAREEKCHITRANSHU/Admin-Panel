const mongoose = require("mongoose");
const Admin = new mongoose.Schema({
    username: {
        require: true,
        type: String,
      },
    email: String,
    password: {
    type: String,
    required: true,
  },
  
});
module.exports = mongoose.model("Admin", Admin);