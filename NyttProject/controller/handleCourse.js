
const Course = require("../model/course");
const User = require("../model/user")



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

  console.log(userWithCourseData.shoppingCart)
  res.render("shoppingCart.ejs", {cartItem:userWithCourseData.shoppingCart, err:" " })
}

// 11.50 
// 12:00 lunch 
module.exports= {
    addCourseForm, 
    showCourses,
    addCourseFormSubmit,
    addToShoppingCart
}

// 11.00 