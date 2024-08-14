import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import "./home.css";
const Home = () => {
    const [pEmail,setPEmail]=useState('');
    const [pPassword,setPPassword]=useState('');
    const [tEmail,setTEmail]=useState('');
    const [tPassword,setTPassword]=useState('');
    const [sEmail,setSEmail]=useState('');
    const [sPassword,setSPassword]=useState('');
    const {userData,setUserData,isAuthenticated,setIsAuthenticated}=useContext(AppContext);
    const navigate=useNavigate();
    const handleAdminLogin=async(e)=>{
        e.preventDefault();
        try {
            const data=await axios.post("https://backendclassroom.onrender.com/api/login-principal",{email:pEmail,password:pPassword});
            localStorage.setItem("token",data.data?.token);
            setUserData(data.data.info);
            if(data.data.info?.role === 'Principal'){
                setIsAuthenticated(true);
               return navigate('/admin');
            }
            setIsAuthenticated(false);
            alert("You are not admin. Please contact to the admin.")
            return navigate('/home');
        } catch (error) {
            if(error.response?.status == 400){
              return  alert(`${error.response.data?.message}`);
            }
            alert("There is an error. Please contact to the admin or try again.") 
        }
    }
    const handleTeacherLogin=async(e)=>{
        e.preventDefault();
        try {
            const data=await axios.post("https://backendclassroom.onrender.com/teacher/login-teacher",{email:tEmail,password:tPassword});
            localStorage.setItem("token",data.data?.token);
            setUserData(data.data.info);
            if(data.data.info?.role === 'Teacher'){
                setIsAuthenticated(true);
               return navigate('/teacher');
            }
            setIsAuthenticated(false);
            alert("You are not found. Please contact to the admin.")
            return navigate('/home');
        } catch (error) {
            if(error.response?.status == 400){
                return  alert(`${error.response.data?.message}`);
              }
              alert("There is an error. Please contact to the admin or try again.")   
        }
    }

    const handleStudentLogin=async(e)=>{
        e.preventDefault();
        try {
            const data=await axios.post("https://backendclassroom.onrender.com/teacher/login-student",{email:sEmail,password:sPassword});
            localStorage.setItem("token",data.data?.token);
            setUserData(data.data.info);
            if(data.data.info?.role === 'Student'){
                setIsAuthenticated(true);
               return navigate('/student');
            }
            setIsAuthenticated(false);
            alert("You are not found. Please contact to the admin.")
            return navigate('/home');
        } catch (error) {
            if(error.response?.status == 400){
                return  alert(`${error.response.data?.message}`);
              }
              alert("There is an error. Please contact to the admin or try again.")  
        }
    }
    return (
        <div className="home-container">
            <div className="home-header classic-timeless">
                <h4>Education is the foundation of a fulfilling life.</h4>
                <h4>Never stop learning, growing, and reaching for your dreams.</h4>
                <p>No matter what challenges you face, remember that every step you take shapes your future. Your efforts and dedication are the seeds of your success.</p>
                <p>So, keep striving and make every action count.</p>
            </div>

            <div className="all-users">

                <div className="login-form">
                    <h3>Admin/Principal Login</h3>
                    <form onSubmit={handleAdminLogin}>
                        <input type="email" value={pEmail} onChange={(e)=>setPEmail(e.target.value)} required placeholder="Enter email" />
                        <input type="password" value={pPassword} onChange={(e)=>setPPassword(e.target.value)} placeholder="Enter password" />
                        <button type="submit">Login</button>
                    </form>
                </div>

                <div className="login-form">
                    <h3>Teacher Login</h3>
                    <form onSubmit={handleTeacherLogin}>
                        <input type="email" value={tEmail} onChange={(e)=>setTEmail(e.target.value)} required placeholder="Enter email" />
                        <input type="password" value={tPassword} onChange={(e)=>setTPassword(e.target.value)} placeholder="Enter password" />
                        <button type="submit">Login</button>
                    </form>
                </div>

                <div className="login-form">
                    <h3>Student Login</h3>
                    <form onSubmit={handleStudentLogin}>
                        <input type="text" value={sEmail} onChange={(e)=>setSEmail(e.target.value)} required placeholder="Enter email" />
                        <input type="password" value={sPassword} onChange={(e)=>setSPassword(e.target.value)} placeholder="Enter password" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
            <div className="test-project">
                  <div>
                  <h2>You can also use the below details to test the project.</h2>
                  <h3>Admit Login</h3>
                  <p><b>Email :</b>principal@classroom.com</p>
                  <p><b>password :</b>Admin</p>

                  <h3>Teacher Login</h3>
                  <p><b>Email :</b>jon@gmail.com</p>
                  <p><b>Password :</b>jon1122</p>

                  <h3>Student Login</h3>
                  <p><b>Email :</b>jerry@gmail.com</p>
                  <p><b>Password :</b>jerry</p>
                  </div>
            </div>
            <div className="site-footer">
                <p>&copy; 2024 learn-tech.com. All rights reserved. Unauthorized duplication or distribution of the content on this site is prohibited.</p>
            </div>

        </div>
    )
}
export default Home;