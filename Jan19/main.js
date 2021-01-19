const express = require("express");
const Task = require("./model/task")



/* 

skapa data : new Modelnamnet(  {  data ....  }).save() C(create)
Läsa data/find data : Modelnamnet.find()        R(read)
update data:          Modelnamnet.update()      U(update)
delete data:          Modelnamnet.deleteOne()      D(delete)


*/ 


// npm i mongoose
// require
const mongoose = require("mongoose");

const app = express();

// postman eller react eller data från liknande client 
   // konverteras av den middleware
app.use( express.json()   )



//Ifall ni använnder ejs , behöver ni bodyparser 


// warning 
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

app.get("/", async (req, res)=>{
  
    //läsa data 

  const task =  await Task.find()
        // Task maps with tasks collection 

    res.send(task)

})


app.post("/", async (req, res)=>{
     // req.body
  const resultat=  await new Task({ 
        name: req.body.name,
        description:req.body.description
    }).save()

    
    //const resultat=  await new Task(  {  name:" Träna"})
    // resultat.save();

    res.send( "object is created successfully" )

   //

})

// ni ska försöka fixa update 
   // plus:  övningupgifterna  
app.put("/:id", async (req, res)=> {
    

    // update 
    res.send(" update succeeded")

})



app.delete("/:id", async(req, res)=>{

    
    // när vi skickar request från klient måste vi ange ObjectId
         //req.params
   const resultat=  await Task.deleteOne( {_id:req.params.id}  )

  // const resultat=  await Task.deleteMany( {name:"Rakib"})

    res.send(resultat)
})



// kopplar databasen med connection string 
mongoose.connect("mongodb+srv://fed20s:Fed20s@cluster0.bpwjg.mongodb.net/todo?retryWrites=true&w=majority", 
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

