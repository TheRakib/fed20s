const express = require("express");
const bodyParser = require("body-parser"); // for kunna läsa ejs body data
const mongoose = require("mongoose");
const router = require("./routes/todoRoute")
require("dotenv").config();


const app = express();

//react , postman 
//app.use(express.json()) // json format
app.use(express.static(__dirname + "/public"))
  // __dirname: projektmapp / working directory 
app.use(bodyParser.urlencoded({ extended: false })) // html formulär 




// för att kunna lägga till static files: bilder, style 

app.set("view engine", "ejs")



app.use("/", router)


// connection string , annars skapar database automatisk
  // process.env.DATABASE_URL
mongoose.connect(process.env.DATABASE_URL, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=> {
if (err) return 
app.listen(process.env.PORT || 8001, ()=> {
    console.log("app is running ")
})
})


// problem solving -> data structure & algorithm - tools 
// freecodecamp
// code wars 