const express = require("express");
const Todo = require("../model/todo");
const router = express.Router(); //mini app
// router // app.get  alt.   router.get






// mongodb -> model (find)->  express api (app.get) -> ejs -> slutanvändare

router.get("/", async (req, res)=>{
    
    const data =  await Todo.find()
     
    // data : data :-> data
 
     res.render("index.ejs", {data:data})
 })
 
 
 
 // anvädare formulär -> ejs-> 
 //      ->express api (app.post)-> model(new Model().save)-> mongodb
 
 router.post("/", async (req, res)=>{
 console.log(  req.body.name) 
 await new Todo({
     name:req.body.name
 }).save();
 res.redirect("/")
 
 })
 
 // 10:30 
 
 // edit , 
 
 // app.post() ejs 
 
 
 // ejs views med lista av todos(varje data har unique) + req body med nya data -> express api 
           //-> updatera i database med model-> databasen
 router.get("/edit/:id",  async (req, res)=>{
     // hittar data 
    const todo=  await Todo.findOne({_id:req.params.id})
    console.log(todo)
    res.render("edit.ejs", {todo:todo})
     // vi kommer att skicka datan till en ejs file edit.ejs
     //edit.ejs ett förmulär 
     // post request.
 })
 
 
 
 router.post("/edit", async (req, res)=>{
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
 
 // ejs views med lista av todos(varje data har unique)-> express api 
           //-> radera i database med model-> databasen
 router.get("/delete/:id", async (req, res)=>{
     // raderar 
     await Todo.deleteOne({_id:req.params.id})
     // redirect todo Route: /
     res.redirect("/")
 
 })
 
  

 module.exports = router;
 
 // den kollar om det finns nån database med samma namn som man anger i 
 