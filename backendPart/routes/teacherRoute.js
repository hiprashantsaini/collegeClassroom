const express=require("express");
const teacherController=require('../controller/teacherController');

const troute=express.Router();

troute.post("/getclassroom",teacherController.getClassRoom);

troute.post("/login-teacher",teacherController.loginTeacher);

troute.post("/login-student",teacherController.loginStudent);



module.exports=troute;