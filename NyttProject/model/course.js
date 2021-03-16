
const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({

    name:{type:String, required:true}, 
    description:String, 
    price :{type:Number, required:true}



})

//10.00

const Course = mongoose.model("course", courseSchema)

module.exports = Course;

//9:30