const express = require("express");
const bodyParser = require("body-parser"); // for kunna läsa ejs body data
const mongoose = require("mongoose")

const app = express();

//react , postman 
//app.use(express.json())
app.use(express.static(__dirname + "/public"))
  // __dirname: projektmapp / working directory 
app.use(bodyParser.urlencoded({ extended: false }))




// för att kunna lägga till static files: bilder, style 

app.set("view engine", "ejs")

// den kollar om det finns nån database med samma namn som man anger i 
// connection string , annars skapar database automatisk

app.get("/", (req, res)=>{


    res.render("index.ejs")
})







mongoose.connect("mongodb+srv://fed20s:Fed20s@cluster0.bpwjg.mongodb.net/fedtest?retryWrites=true&w=majority", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=> {
if (err) return 
app.listen(8000, ()=> {
    console.log("app is running ")
})

})

