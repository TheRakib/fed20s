const { 
    addCourseForm, 
    addCourseFormSubmit,
    showCourses, 
    addToShoppingCart,
    showInstructorCourses,
    checkout,
    shoppingSuccess
 } = require("../controller/handleCourse");
const express = require("express");
const verifyInstructor = require("../middleware/verifyInstructor");
const verifyUser = require("../middleware/verifyUser")

const router = express.Router();



router.get("/addCourse", verifyInstructor, addCourseForm);
router.post("/addCourse", verifyInstructor, addCourseFormSubmit);
router.get("/showCourses", verifyUser, showCourses)
router.get("/showShoppingCart", verifyUser, addToShoppingCart)
router.get("/addToCart/:id", verifyUser, addToShoppingCart)
router.get("/showMyCourses", verifyInstructor, showInstructorCourses);

router.get("/checkout", verifyUser, checkout)
router.get("/shoppingSuccess", verifyUser, shoppingSuccess)
module.exports = router;