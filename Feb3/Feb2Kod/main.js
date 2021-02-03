
const express = require("express");
const bodyParser = require("body-parser"); // for kunna läsa ejs body data

const mongoose = require("mongoose");
const router = require("./routes/todoRoute");
const userRouter = require("./routes/userRoute")
//const nodeSass = require("node-sass-middleware");
var cookieParser = require('cookie-parser')
// env
require("dotenv").config();


const app = express();
app.use(cookieParser())

// avkommentera den i fall ni använder sass . Glöm ej npm paketet
/* app.use(nodeSass( 
    // src , 
    { 
       src: __dirname + "/scss" ,             // path.join(__dirname, "scss"),
       dest : __dirname+ "/public/style"      // path.join(__dirname , "public")
    }
    // dest
    )) */
//react , postman 
//app.use(express.json()) // json format
app.use(express.static(__dirname + "/public"))
  // __dirname: projektmapp / working directory 
app.use(bodyParser.urlencoded({ extended: false })) // html formulär 




// för att kunna lägga till static files: bilder, style 

app.set("view engine", "ejs")



app.use("/", router)
app.use("/", userRouter)




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