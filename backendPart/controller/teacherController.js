const Classroom = require("../models/Classroom");

const jwt=require('jsonwebtoken');
const teacher = require("../models/Teacher");
const bcrypt=require("bcryptjs");
const student = require("../models/Student");

const loginTeacher=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const data=await teacher.findOne({email:email});
        if(!data){
            return res.status(400).send({status:false,message:"Invalid email or password"});
        }

        // const mathchPass=await bcrypt.compare(password,data.password);
        if(password !== data.password){
            return res.status(400).send({status:false,message:"Invalid email or password"});
        }
        let user={
            id:data._id,
            name:data.name,
            email:data.email,
            classRoom:data.classRoom,
            role:data.role
        }
        const token=jwt.sign(user,process.env.SECRET_KEY);
        res.status(200).send({status:true,message:"Login successfull",info:data,token:token});
    } catch (error) {
        console.log("loginTeacher :",error.message);
        res.status(500).send({status:false,message:"Internal server error"})
    }
}

const getClassRoom=async(req,res)=>{
    try {
        const {className}=req.body;
        const myClassroom=await Classroom.find({name:className});
        res.status(200).send({status:true,message:"Done",info:myClassroom});
    } catch (error) {
        console.log("getClassRoom :",error.message);
        res.status(500).send({status:false,message:"Internal server error"});
    }
}

const loginStudent=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const data=await student.findOne({email:email});
        if(!data){
            return res.status(400).send({status:false,message:"Invalid email or password"});
        }

        // const mathchPass=await bcrypt.compare(password,data.password);
        if(password !== data.password){
            return res.status(400).send({status:false,message:"Invalid email or password"});
        }
        let user={
            id:data._id,
            name:data.name,
            email:data.email,
            classRoom:data.classRoom,
            rollno:data.rollno,
            role:data.role
        }
        const token=jwt.sign(user,process.env.SECRET_KEY);
        console.log("t data :",data);
        res.status(200).send({status:true,message:"Login successfull",info:data,token:token});
    } catch (error) {
        console.log("loginStudent :",error.message);
        res.status(500).send({status:false,message:"Internal server error"})
    }
}

module.exports={
    getClassRoom,
    loginTeacher,
    loginStudent
}