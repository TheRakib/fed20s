const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({
    
    name: {type:String, required},
    date : {type: Date, default: date.now}

})

const Todo = mongoose.model("todo", todoSchema); 

module.exports = Todo; 

