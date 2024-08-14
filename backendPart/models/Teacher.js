const mongoose=require("mongoose");


const teracherSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    // classRoom:{type:mongoose.Schema.Types.ObjectId,ref:'Classroom'},
    role:{type:String,default:"Teacher"},
    classRoom:{type:String}
})

const teacher=new mongoose.model("Teacher",teracherSchema);

module.exports=teacher;