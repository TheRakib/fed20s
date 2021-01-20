const express = require("express");
const bodyParser = require("body-parser"); // for kunna läsa ejs body data
const mongoose = require("mongoose");
const Todo = require("./model/todo");
require("dotenv").config();


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

// 10:30 

// edit , 

// app.post() ejs 

app.get("/edit/:id",  async (req, res)=>{
    // hittar data 
   const todo=  await Todo.findOne({_id:req.params.id})
   console.log(todo)
   res.render("edit.ejs", {todo:todo})
    // vi kommer att skicka datan till en ejs file edit.ejs
    //edit.ejs ett förmulär 
    // post request.
})



app.post("/edit", async (req, res)=>{
    // req.body.name , req.body.id
console.log(req.body)
await Todo.updateOne( {_id:req.body.id}, {
    name:req.body.name
})
res.redirect("/")
})

//11.30

//delete 

// app.delete -> httpXmlREquest/ axios / fetch -> js/react/vue/angular

// app.get för att kunna göra delete operation i ejs/jade/pug/handlebar/ html
app.get("/delete/:id", async (req, res)=>{
    // raderar 
    await Todo.deleteOne({_id:req.params.id})
    // redirect todo Route: /
    res.redirect("/")

})


// den kollar om det finns nån database med samma namn som man anger i 
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