
const Course = require("../model/course");
const { startSession } = require("../model/user");
const User = require("../model/user")
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

const checkout = async(req, res)=> {
    
    // hitta courses som ska köpas 
     const user = await User.findOne({_id: req.user.user._id}).populate("shoppingCart")

     console.log(user.shoppingCart)
    //  success router, cancel router

    const price = Number(user.shoppingCart[0].price)
    // skapa stripe session 
 const session=    await stripe.checkout.sessions.create({
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
        payment_method_types: ['card'],
        line_items: [
        {price: price , quantity: 1},
       ],
      mode: 'payment',
      
    })

console.log(session)

res.send("testing checkout")

    // skicka session Id till checkout ejs
// 10:30

}

module.exports= {
    addCourseForm, 
    showCourses,
    addCourseFormSubmit,
    addToShoppingCart,
    showInstructorCourses,
    checkout
}
