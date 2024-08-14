const mongoose=require("mongoose");

const stuSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    rollno:{type:String},
    classRoom:{type:String},
    role:{type:String,default:"Student"}

})

const student=new mongoose.model("Student",stuSchema);

module.exports=student;