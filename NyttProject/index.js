const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRouter = require("./router/userRoute");
const homeRouter = require("./router/homeRoute");
const courseRouter = require("./router/courseRoute")

require("dotenv").config();

// JSON parse middleware 

// Cookie parser middleware


const app = express();


// app middlewares 

app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs");

// för att kunna parsa/konvertera json data till js 
app.use(express.json());

// för att kunna parsa/konvertera ejs data till js 
app.use(express.urlencoded({extended:false}))

// för att kunna läsa cookies // behövs npm i cookie-parser
app.use(cookieParser())


//router middlewares 

app.use(userRouter);
app.use(homeRouter);
app.use(courseRouter)






const options = {
    useNewUrlParser: true,
     useUnifiedTopology: true , 
     useFindAndModify: false,
    useCreateIndex: true
}


// Fix warnings from mongo DB

mongoose.connect(process.env.DATABASE_URL, options, (err)=>{

if (err) {
    console.log(err)
    return 
}
    app.listen(process.env.PORT || 8002, ()=>{

        console.log("app is running")
    })

})