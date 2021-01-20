const express = require("express");
const bodyParser = require("body-parser"); // for kunna läsa ejs body data
const mongoose = require("mongoose");
const Todo = require("./model/todo")

const app = express();

//react , postman 
//app.use(express.json())
app.use(express.static(__dirname + "/public"))
  // __dirname: projektmapp / working directory 
app.use(bodyParser.urlencoded({ extended: false }))




// för att kunna lägga till static files: bilder, style 

app.set("view engine", "ejs")



// mongodb -> model (find)->  express api (app.get) -> ejs -> slutanvändare

app.get("/", async (req, res)=>{
    
   const data =  await Todo.find()
    
   // data : data :-> data

    res.render("index.ejs", {data:data})
})



// anvädare formulär -> ejs-> 
//      ->express api (app.post)-> model(new Model().save)-> mongodb

app.post("/", async (req, res)=>{

console.log(  req.body.name) 

await new Todo({
    name:req.body.name
}).save();

res.redirect("/")


})





// den kollar om det finns nån database med samma namn som man anger i 
// connection string , annars skapar database automatisk
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

