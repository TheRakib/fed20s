const express = require("express");
const Todo = require("../model/todo");
const router = express.Router(); 
const verifyToken = require("./middleware/userVerify")


//mini app
// router // app.get  alt.   router.get

// mongodb -> model (find)->  express api (app.get) -> ejs -> slutanvändare
//await Todo.find().skip(2).limit(3).select({date:1})
//await Todo.find().sort({name:-1})  /descending , asending 
//.count()



 

router.get("/", verifyToken,  async (req, res)=>{


    console.log(req.user)
    // query string 
    // man kan lägga till flera 
   
    const sorted = + req.query.sorted || 1
    const page = +req.query.page || 1;
    // .sort({name: page})
    
try{
     // hur många data vi har 
     const totalData = await Todo.find().countDocuments();
     // hur många task skulle visas per gång / per sida
     const dataToShowPerReq = 2;
     // hur många delar/sidor vi skulle ha 
    
     
      //totalPages
     const totalDataPart = Math.ceil(totalData/dataToShowPerReq);
     
     const dataToShow= dataToShowPerReq * page
     // lista todos  
     // http://localhost:8000/?page=-1&sorted=1
    const data =  await Todo.find().limit(dataToShow).sort({name: sorted})
      res.render("index.ejs", 
      { data,
        totalData,
        totalDataPart, 
        dataToShow,
        dataToShowPerReq,
        errors:"empty"} )
    
}

catch(err){
    res.render("error.ejs", {error:err})
} 
 })
 
 //toedit.ejs :- clona index.ejs -> nya -> index.ejs 
 
 // anvädare formulär -> ejs-> 
 //      ->express api (app.post)-> model(new Model().save)-> mongodb
 
router.post("/", async (req, res)=>{
 console.log(  req.body.name) 
 try{
 await new Todo({
     name:req.body.name
 }).save();
 res.redirect("/")
}
catch(err){
    res.render("error.ejs" , {error: err})
}
 })


 

 
 // ejs views med lista av todos(varje data har unique) + req body med nya data -> express api 
           //-> updatera i database med model-> databasen
 router.get("/edit/:id",  async (req, res)=>{
     // hittar data 

     console.log(req.query)
    const todo=  await Todo.findOne({_id:req.params.id})
    console.log(todo)

    // skicka in hela data listan , + id som kommer via req.params.id
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
 
 //kl.10.00