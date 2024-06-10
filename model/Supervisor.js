const mongoose = require('mongoose');
const Supervisor =new mongoose.Schema(
  {
  name: {
    type:String,
    require:true,
  },
  mobile: {
    type:Number,
    unique: true, // Ensure mobile numbers are unique
    required: true,
  },
  password:{
      type:String,
      required:true,
  }
});
module.exports=mongoose.model("Supervisor",Supervisor);
