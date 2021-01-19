const express = require("express");



// npm i mongoose
// require
const mongoose = require("mongoose");

const app = express();

// warning 
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

// kopplar databasen med connection string 
mongoose.connect("mongodb+srv://fed20s:Fed20s@cluster0.4t6xn.mongodb.net/feddatabase?retryWrites=true&w=majority", 
options, 
(err)=>{
 
console.log(err)

if (err) return ;
console.log("db is connected")
app.listen(8000, ()=>{
    console.log("application is running too")
})


})


// mongo compass 


// vi skapa ett konto i mongo atlas 
   // ta connection string -> min app  +  databasen

