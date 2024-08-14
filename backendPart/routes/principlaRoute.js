const express=require("express");
const principalController=require("../controller/principalController");
const auth=require("../authentication/auth");

const proute=express.Router();

proute.post("/login-principal",principalController.loginPrincipal);

proute.post("/verify-token",auth.isLogin,principalController.getUserData);


proute.post("/create-teacher",principalController.createTeacher);

proute.get("/get-teachers",principalController.getAllTeachers);

proute.post("/delete-teacher",principalController.deleteTeacher);

proute.post("/update-teacher",principalController.updateTeacher);

proute.post("/add-classroom",principalController.addClassRoom);

proute.get("/getclass-rooms",principalController.getAllClassRooms);

proute.post("/delete-class",principalController.deleteClassRooms);


proute.post("/addclass-day",principalController.addClassRoomDay);

proute.post("/delete-day",principalController.deleteClassDay);

proute.post("/updateclass-day",principalController.updateClassRoomDay);

// students routes 
proute.post("/create-student",principalController.createStudent);

proute.get("/get-students",principalController.getAllStudents);

proute.post("/delete-student",principalController.deleteStudent);

proute.post("/update-student",principalController.updateStudent);







module.exports=proute;
