const mongoose=require("mongoose");

const principalSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"Principal"}
})

const principal=new mongoose.model("Principal",principalSchema);

module.exports=principal;