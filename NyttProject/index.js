const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// JSON parse middleware 

// Cookie parser middleware


const app = express();


// Fix warnings from mongo DB

mongoose.connect(process.env.DATABASE_URL,   (err)=>{

if (err) {
    console.log(err)
    return 
}
    app.listen(8002, ()=>{

        console.log("app is running")
    })

})