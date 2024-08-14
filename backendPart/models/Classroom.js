const mongoose=require("mongoose");

const classSchema=mongoose.Schema({
    name:{type:String,require:true,unique:true},
    days:[{
        day:{type:String},
        startTime:{type:String},
        endTime:{type:String}
    }],
    teacher:{type:mongoose.Schema.Types.ObjectId,ref:'Teacher'}
})

const Classroom=new mongoose.model('Classroom',classSchema);
module.exports=Classroom;