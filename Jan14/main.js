const express = require("express");

const mongoose = require("mongoose");

const app = express();



mongoose.connect("mongodb+srv://fed20s:Fed20s@cluster0.4t6xn.mongodb.net/feddatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true ,
    useUnifiedTopology: true 
}, (err)=>{
 
console.log(err)

if (err) return ;
console.log("db is connected")
app.listen(8000, ()=>{
    console.log("application is running too")
})


})

