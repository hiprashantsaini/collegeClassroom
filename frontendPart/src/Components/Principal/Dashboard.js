import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import ClassRooms from "./ClassRooms";
import './dashboard.css';
import Header from "./Header";
import Students from "./Students";
import Teachers from "./Teachers";

const Dashboard=()=>{
    const [classRooms, setClassRooms] = useState([]);
    const [classRoomFlag, setClassRoomFlag] = useState(false);
    const [allClasses,setAllClasses]=useState([]);

    const {userData}=useContext(AppContext);
    const getAllClassRooms = async () => {
        try {
            const allClass = await axios.get("https://backendclassroom.onrender.com/api/getclass-rooms");
            setClassRooms(allClass.data.info);
            const data=allClass.data.info.map((item)=>{
                return {
                    name:item.name,
                    id:item._id
                }
            })
            setAllClasses(data);
        } catch (error) {
            console.log("getAllClassRooms in ClassRoom.js  :", error);
        }
    }

    useEffect(() => {
        getAllClassRooms();
    }, [classRoomFlag,userData])
    return(
        <div className="dashboard-container">
            <div>
                <h1 style={{textAlign:"center",margin:"5px"}}>Principal Dashboard<Link to='/home'>🏠</Link></h1>
            </div>
            <Header/>
            <Teachers classRooms={classRooms} setClassRooms={setClassRooms} classRoomFlag={classRoomFlag} setClassRoomFlag={setClassRoomFlag} allClass={allClasses} setAllClasses={setAllClasses}/>
            <ClassRooms classRooms={classRooms} setClassRooms={setClassRooms} classRoomFlag={classRoomFlag} setClassRoomFlag={setClassRoomFlag} allClass={allClasses} setAllClasses={setAllClasses}/>
            <Students classRooms={classRooms} setClassRooms={setClassRooms} classRoomFlag={classRoomFlag} setClassRoomFlag={setClassRoomFlag} allClass={allClasses} setAllClasses={setAllClasses}/>
            <div className="site-footer">
                <p>&copy; 2024 learn-tech.com. All rights reserved. Unauthorized duplication or distribution of the content on this site is prohibited.</p>
            </div>
        </div>
    )
}

export default Dashboard;