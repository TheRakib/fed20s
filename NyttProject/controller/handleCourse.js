
const { query } = require("express");
const Course = require("../model/course");
const { startSession } = require("../model/user");
const {User} = require("../model/user");

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


  // bild/files -> encode -blob -> sparas i mongoDB 
  // från db blob/encoded -> decode -> visar till användare 

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

    //const price = Number(user.shoppingCart[0].price)
    // skapa stripe session 
    if(!user.shoppingCart || user.shoppingCart.length ===0) return res.redirect("/showCourses")
 const session=    await stripe.checkout.sessions.create({
        success_url: 'http://localhost:8002/shoppingSuccess',
        cancel_url: 'https://example.com/cancel',
        payment_method_types: ['card'],
        line_items: user.shoppingCart.map( course => {

            return {
                name: course.name, 
                amount:  course.price * 100, 
                quantity: 1, 
                currency: "sek"
            }
        }), 
      mode: 'payment',
      
    })

res.render("checkout.ejs" , {cartItem: user.shoppingCart, sessionId: session.id})

}

const shoppingSuccess = async (req, res)=>{

    const user =  await User.findOne({_id: req.user.user._id})
    user.shoppingCart = [];
    user.save();
    console.log(user)
    res.send(" din  varukorg är tomt . Vi skickar din beställning inom 3 dagar")

}


module.exports= {
    addCourseForm, 
    showCourses,
    addCourseFormSubmit,
    addToShoppingCart,
    showInstructorCourses,
    checkout,
    shoppingSuccess
}
