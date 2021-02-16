const {addCourseForm, addCourseFormSubmit, showCourses, addToShoppingCart } = require("../controller/handleCourse");
const express = require("express");
const verifyInstructor = require("../middleware/verifyInstructor");
const verifyUser = require("../middleware/verifyUser")

const router = express.Router();



router.get("/addCourse",verifyInstructor , addCourseForm);
router.post("/addCourse", verifyInstructor, addCourseFormSubmit);
router.get("/showCourses", verifyUser, showCourses)
router.get("/addToCart/:id",verifyUser, addToShoppingCart )


module.exports = router;