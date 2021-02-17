
const Course = require("../model/course");
const User = require("../model/user")


//instructor -> addar Kurserna -> sparar detta i course collection

// spara kurserna i userInstructorens courseList attributen 







const addCourseForm = (req, res)=>{
    res.render("courseForm.ejs", {err:" "})
}

const addCourseFormSubmit = async(req, res)=>{
 const {name, description, price}=   req.body
 // skapa course i database 
 const course = await new Course({name: name, description:description, price: price}).save();
    
 
 const user = await User.findOne({_id:req.user.user._id})

 user.addCourseList(course._id);
 console.log(user)
 res.redirect("/showCourses")
}


const showInstructorCourses =async (req, res)=>{

//hitta vilken user/Instructor som är inloggad 
// populera courseList 
// visa den till ejs template 

const user = await User.findOne({_id:req.user.user._id}).populate("courseList")

console.log(user.courseList);

res.render("instructorPage.ejs", { courses: user.courseList, err:""})


}


const showCourses = async(req, res)=>{
 const courses = await Course.find()
res.render("showCourse.ejs", {err:" ", courses:courses})
}

const addToShoppingCart = async(req, res) => {
    //req.params.id
    const courseId = req.params.id
    // vi ska spara course Id in i user collection
    const user = await User.findOne({_id:req.user.user._id})
  // console.log(user)
    // hur ska vi spara detta 
   user.addToCart(courseId);
   //console.log(user);
  const userWithCourseData = await User.findOne({_id:req.user.user._id}).populate("shoppingCart");
 // console.log(userWithCourseData.shoppingCart)
  res.render("shoppingCart.ejs", {cartItem:userWithCourseData.shoppingCart, err:" " })
}

module.exports= {
    addCourseForm, 
    showCourses,
    addCourseFormSubmit,
    addToShoppingCart,
    showInstructorCourses
}
