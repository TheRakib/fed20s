const mongoose = require("mongoose");
const Joi = require('joi');

                                         
// ett team database validering här <--- // backend  (validering här)  <--  // frontend valideraing här ->  // User

//name, email, password , 
// role: Boolean, true -> lärare  
const userSchema = new mongoose.Schema({

    name: {type:String, required:true, unique: true},
    email: {type:String, required:true, unique: true},
    password:{type:String, required:true},
    role: String, 
    token:String,
    tokenExpiration: Date,
    shoppingCart: [
        {
            type:mongoose.Schema.Types.ObjectId, 
            ref: "course"
        }
    ], 
    courseList: [{
        type:mongoose.Schema.Types.ObjectId, 
        ref: "course"
    }] 
})
//hur ska vi lagra detta 
// mongoose enga metoder för att kunna hantera detta 
userSchema.methods.addToCart = function(courseId) {
    // läser hela course objektet och pushar vi in hela 
    // objektet
 // pushar in i shoppingCart 
   this.shoppingCart.push(courseId)
// Filtera data så att användare inte ska kunna lägga till samma course två gånger
   this.save();
 
}
// read från databasen  and write i databasen

// arrow function och this  går inte riktigt bra. 

userSchema.methods.addCourseList = function(courseId){

    this.courseList.push(courseId);
    this.save();

}

function validateUser(user) {
    const schema= Joi.object( {
        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(200).required().email(),
        password: Joi.string().min(8).max(255).required()
    })
return schema.validate(user)
}

const User = mongoose.model("user", userSchema)


module.exports = {
     User,
    validateUser
}

//module.exports.User = User;  
//module.exports.ValidateUser = validateUser; 


// ersätter med den sista objektet. 
//module.exports = User;   //module.exports.User
//module.exports = validateUser;  //module.exports.validateUser

//const {user, validateUser} = require("...user")
