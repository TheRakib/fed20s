const {addCourseForm, addCourseFormSubmit, showCourses } = require("../controller/handleCourse");
const express = require("express");
const verifyInstructor = require("../middleware/verifyInstructor");

const router = express.Router();



router.get("/addCourse",verifyInstructor , addCourseForm);
router.post("/addCourse", verifyInstructor, addCourseFormSubmit);
router.get("/showCourses", verifyInstructor, showCourses)



module.exports = router;