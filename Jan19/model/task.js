
// Model :- convention for schemas

// importera mongoose , schema  


const mongoose = require("mongoose");
       //const Schema = require("mongoose").Schema 
       // define schema 
const taskSchema = new mongoose.Schema({    
    // mongo objectId

    // constraints 

    // String, required 
    name: { type: String, required:true}, 
    description: String,
    date: {  type: Date, default: Date.now}

})

// Skapa schema 
const Task  = mongoose.model("task", taskSchema)



// collections / model

    // docs 

// kl.11.05 


 // skapade schema för vår data modellen/  hämnas collections i mongo db

  // define en schema ,  new mongoose.Schema(  { nyklar: datatyper })

  // const Task = mongoose.model("task", taskSchema)

module.exports = Task ;





   
// lägga till flera taskSchema.add();



//const blogSc= new Schema({
