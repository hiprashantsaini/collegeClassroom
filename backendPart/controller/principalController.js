const { default: mongoose } = require("mongoose");
const Classroom = require("../models/Classroom");
const student = require("../models/Student");
const teacher = require("../models/Teacher");
const principal = require("../models/principal");
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');

const loginPrincipal=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const data=await principal.findOne({email:email});
        if(!data){
            return res.status(400).send({status:false,message:"Invalid email or password"});
        }

        const mathchPass=await bcrypt.compare(password,data.password);
        if(!mathchPass){
            return res.status(400).send({status:false,message:"Invalid email or password"});
        }
        let user={
            id:data._id,
            name:data.name,
            email:data.email,
            role:data.role
        }
        const token=jwt.sign(user,process.env.SECRET_KEY);
        res.status(200).send({status:true,message:"Login successfull",info:data,token:token});
    } catch (error) {
        console.log("loginPrincipal :",error.message);
        res.status(500).send({status:false,message:"Internal server error"})
    }
}

const getUserData=async(req,res)=>{
    try {
        const id=req.userId;
        console.log("req.id",req.userId,req.role);
        let data;
        if(req.role === "Principal"){
            data=await principal.findById({_id:id});
        }
        else if(req.role === "Teacher"){
            data=await teacher.findById({_id:id});
        }
        else if(req.role === "Student"){
            data=await student.findById({_id:id});
        }

        if(!data){
            return res.status(404).send({status:false,message:"Data not found. Try with login"});
        }
        res.status(200).send({status:true,message:"LoggedIn successfull!",info:data});
    } catch (error) {
        console.log("getUserData :",error.message);
        res.status(500).send({status:false,message:"Internal server error"});
    }
}



const createTeacher=async(req,res)=>{
    try {
        const {name,email,password,classroom}=req.body;
        const teacherData=await teacher.findOne({email:email})
        // const hpassword=await bcrypt.hash(password,10);
        console.log(teacherData)
        if(teacherData){
           return res.status(400).send({status:false,message:"User already exists"})
        }

        const newTeacher=new teacher({
            name,
            email,
            password,
            classRoom:classroom,
            role:"Teacher"
        })

        const tdata=await newTeacher.save();
        res.status(200).send({status:true,message:"Teacher created successfull!",info:tdata})

    } catch (error) {
        console.log("createTeacher :",error.message);
        res.status(500).send({status:false,message:"Internal server error"})
    }
}

// get all teachers 
const getAllTeachers=async(req,res)=>{
    try {
        const teachers=await teacher.find({});
        res.status(200).send({status:true,info:teachers});
        // console.log("getAllTeachers :",teachers);
    } catch (error) {
        console.log("getAllTeachers :",error.message);
        res.status(500).send({status:false,message:"Internal server error"});
    }
}


// delete teacher 

const deleteTeacher=async(req,res)=>{
    try {
        const id=req.body.id;
        console.log("id:",id);
        const data=await teacher.deleteOne({_id:id});
        // console.log("data :",data);
        res.status(200).send({status:true,message:"Teacher data deleted"});
    } catch (error) {
        console.log("deleteTeacher :",error.message);
        res.status(500).send({status:false,message:"Internal server error"});
    }
}

//update teacher

const updateTeacher=async(req,res)=>{
    try {
        const {id, name, email, password, classroom}=req.body;
        await teacher.findByIdAndUpdate({_id:id},{$set:{name:name,email:email,password:password,classRoom:classroom}});
        res.status(200).send({status:true,message:"Teacher data Updated"});
    } catch (error) {
        console.log("updateTeacher :",error.message);
        res.status(500).send({status:false,message:"Internal server error"});
    }
}

// add new class room 

const addClassRoom=async(req,res)=>{
    try {
        const {className}=req.body;
        const classroom=new Classroom({
            name:className
        })
        const data=await classroom.save();
        res.status(200).send({status:true,message:"Classroom created",info:data});
    } catch (error) {
        console.log("addClassRoom :",error.message);
        res.status(500).send({status:false,message:"Internal server error"});
    }
}

// get all class rooms
const getAllClassRooms=async(req,res)=>{
    try {
        const data=await Classroom.find({});
        res.status(200).send({status:true,info:data});
    } catch (error) {
        console.log("getAllClassRooms :",error.message);
        res.status(500).send({status:false,message:"Internal server error"});
    }
}

// add classroom day 

const addClassRoomDay=async(req,res)=>{
    try {
        const {startTime,endTime,classId,day}=req.body;
        const classRoom=await Classroom.findById({_id:classId});
        classRoom.days.push({
            day:day,
            startTime:startTime,
            endTime:endTime
        })

        const data=await classRoom.save();
        res.status(200).send({status:true,message:"Day added",info:data});
    } catch (error) {
        console.log("addClassRoomDay :",error.message);
        res.status(500).send({status:false,message:"Internal server error"}); 
    }
}

// update classroom day 

const updateClassRoomDay=async(req,res)=>{
    try {
        const {startTime,endTime,classId,day,dayId}=req.body;
        const classRoom=await Classroom.findById({_id:classId});
        const classRoomDay=classRoom.days.find((item)=>item._id == dayId);
        if(classRoomDay){
            classRoomDay.day=day;
            classRoomDay.startTime=startTime;
            classRoomDay.endTime=endTime;
        }

        const data=await classRoom.save();

        res.status(200).send({status:true,message:"Day Updated",info:data});
    } catch (error) {
        console.log("updateClassRoomDay :",error.message);
        res.status(500).send({status:false,message:"Internal server error"}); 
    }
}

//delete class day
const deleteClassDay=async(req,res)=>{
    try {
        const {classId,dayId}=req.body;
        const classroom=await Classroom.findById({_id:classId});
        classroom.days=classroom.days.filter((item)=>item._id != dayId );
        await classroom.save();
        res.status(200).send({status:true,message:"Day deleted"});

    } catch (error) {
        console.log("deleteClassDay :",error.message);
        res.status(500).send({status:false,message:"Internal server error"}); 
    }
}
////////////***** Student controllers ******//////////
// create student 
const createStudent=async(req,res)=>{
    try {
        const {name,email,password,classRoom ,rollno}=req.body;
        const studentData=await student.findOne({email:email})
        // const hpassword=await bcrypt.hash(password,10);
        if(studentData){
           return res.status(400).send({status:false,message:"User already exists"});
        }
         
           let newStudent=new student({
                name,
                email,
                password,
                rollno,
                classRoom,
                role:"Student"
            })
        


        const sdata=await newStudent.save();
        res.status(200).send({status:true,message:"Student created successfull!",info:sdata})

    } catch (error) {
        console.log("createStudent :",error.message);
        res.status(500).send({status:false,message:"Internal server error"})
    }
}

// get all students
const getAllStudents=async(req,res)=>{
    try {
        const students=await student.find({});
        res.status(200).send({status:true,info:students});
        // console.log("getAllStudents :",students);
    } catch (error) {
        console.log("getAllStudents  :",error.message);
        res.status(500).send({status:false,message:"Internal server error"});
    }
}

//delete class room
const deleteClassRooms=async(req,res)=>{
    try {
        const {classId}=req.body;
        await Classroom.deleteOne({_id:classId});
        res.status(200).send({status:true,message:"Class deleted"});
    } catch (error) {
        console.log("deleteClassRooms  :",error.message);
        res.status(500).send({status:false,message:"Internal server error"});
    }
}

// delete student 

const deleteStudent=async(req,res)=>{
    try {
        const id=req.body.id;
        console.log("id:",id);
        const data=await student.deleteOne({_id:id});
        // console.log("data :",data);
        res.status(200).send({status:true,message:"Student data deleted"});
    } catch (error) {
        console.log("deleteStudent :",error.message);
        res.status(500).send({status:false,message:"Internal server error"});
    }
}

//update Student

const updateStudent=async(req,res)=>{
    try {
        const {id, name,email,password,classRoom ,rollno}=req.body;
        await student.findByIdAndUpdate({_id:id},{$set:{name:name,email:email,password:password,rollno:rollno,classRoom:classRoom}});
        res.status(200).send({status:true,message:"Student data Updated"});
    } catch (error) {
        console.log("updateTeacher :",error.message);
        res.status(500).send({status:false,message:"Internal server error"});
    }
}
module.exports={
    loginPrincipal,
    getUserData,
    createTeacher,
    getAllTeachers,
    deleteTeacher,
    updateTeacher,
    addClassRoom,
    getAllClassRooms,
    addClassRoomDay,
    updateClassRoomDay,
    deleteClassRooms,
    deleteClassDay,
    createStudent,
    getAllStudents,
    deleteStudent,
    updateStudent
}