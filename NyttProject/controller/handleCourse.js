
const Course = require("../model/course");



const addCourseForm = (req, res)=>{
    res.render("courseForm.ejs", {err:" "})
}

const addCourseFormSubmit = async(req, res)=>{
 const {name, description, price}=   req.body
 // skapa course i database 
 await new Course({name: name, description:description, price: price}).save();
    res.redirect("/showCourses")
}

const showCourses = async(req, res)=>{
 const data = await Course.find()
    //Course.find()
res.render("showCourse.ejs", {err:" ", data:data})
}


module.exports= {
    addCourseForm, 
    showCourses,
    addCourseFormSubmit
}