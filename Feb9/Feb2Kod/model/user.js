const mongoose = require("mongoose");

const  userSchema = new mongoose.Schema({
    name: {type: String , required:true, unique:true},
    email: {type: String , required:true, unique:true},
    password: {type:String, required:true}, 
    token: String, 
    tokenExpiration: Date
})




// joi npm 
const User = mongoose.model("user", userSchema);
  
module.exports = User; 

