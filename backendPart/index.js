const express=require('express');
const mongoose=require('mongoose');
const cors=require("cors");
const proute = require('./routes/principlaRoute');
const troute = require('./routes/teacherRoute');
const bcrypt=require('bcryptjs');
const principal = require('./models/principal');
require('dotenv').config();
mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.qijrm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const registerAdmin=async()=>{
    const hpass=await bcrypt.hash("Admin",10);
    const principalData=new principal({
        name:"Sharma Ji",
        email:"principal@classroom.com",
        password:hpass,
        role:"Principal"
    })

    await principalData.save();
}

app.use('/api',proute);
app.use('/teacher',troute);
app.listen(8080,(err)=>{
    if(err) throw console.error(err);
    // registerAdmin();
    console.log("Server Started");
})