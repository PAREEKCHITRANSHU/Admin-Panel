const mongoose = require("mongoose");
const Branch = new mongoose.Schema({
  name: String,
  mobile: {
    type: Number,
    unique: true, // Ensure mobile numbers are unique
    required: true,
    maxlength: 10,
  },
  branch: {
    require: true,
    type: String,
  },
});
module.exports = mongoose.model("Branch", Branch);
