import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import '../Teacher/teacherdash.css';
import SClassMate from "./SClassMate";
import SClassRoom from "./SClassRoom";

const SDashboard = () => {
    const [classFlag,setClassFlag]=useState(false);
    const [classRoom,setClassRoom]=useState('');
    const [allClasses,setAllClasses]=useState([]);

    const {userData}=useContext(AppContext);


    const getMyClassRoom=async()=>{
        try {
            const classroom=await axios.post("https://backendclassroom.onrender.com/teacher/getclassroom",{className:userData.classRoom});
            setClassRoom(classroom.data.info[0]);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getMyClassRoom();
    },[classFlag,userData])
    return (
        <div className="teacher-dash">
            <div className="cover-page">
                <h2>Hi ! {userData?.name} . Welcome on your dashboard.<Link to='/home'>🏠</Link></h2>
            </div>
             <SClassRoom classRoom={classRoom}/>
             <SClassMate myClass={userData.classRoom}/>
             <div className="site-footer">
                <p>&copy; 2024 learn-tech.com. All rights reserved. Unauthorized duplication or distribution of the content on this site is prohibited.</p>
            </div>
        </div>
    )
}

export default SDashboard;