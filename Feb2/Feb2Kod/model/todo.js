const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({
    
    
    name: {type:String, required:true, minlength: 2, maxlength: 30},
    date : {type: Date, default: Date.now}

})


// schema validering 

  // number : min , max

  // required: function () 
     // { return true if user fullfilled our requirements}




// user defined function  

// enga metoder för att kunna få rätt/avancerade queries/frågor: 
// filter(){  }


const Todo = mongoose.model("todo", todoSchema); 

module.exports = Todo; 

