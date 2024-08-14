import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import '../Principal/dashboard.css';
import TClassRoom from "./TClassRoom";
import './teacherdash.css';
import TStudents from "./TStudents";

const TDashboard = () => {
    const [classFlag,setClassFlag]=useState(false);
    const [classRoom,setClassRoom]=useState('');

    const [classRooms, setClassRooms] = useState([]);
    const [classRoomFlag, setClassRoomFlag] = useState(false);
    const [allClasses,setAllClasses]=useState([]);
    const {userData}=useContext(AppContext);
    const myClass=userData.classRoom;

    const getAllClassRooms = async () => {
        try {
            const allClass = await axios.get("https://backendclassroom.onrender.com/api/getclass-rooms");
            setClassRooms(allClass.data.info);
            const data=allClass.data.info.map((item)=>{
                return {
                    name:item?.name,
                    id:item._id
                }
            })
            setAllClasses(data);
        } catch (error) {
            console.log("getAllClassRooms in ClassRoom.js  :", error);
        }
    }

    const getMyClassRoom=async()=>{
        try {
            const classroom=await axios.post("https://backendclassroom.onrender.com/teacher/getclassroom",{className:myClass});
            // console.log("classroom :",classroom);
            setClassRoom(classroom.data.info[0]);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllClassRooms();
    }, [classRoomFlag,userData])

    useEffect(()=>{
        getMyClassRoom();
    },[classFlag,userData])
    return (
        <div className="teacher-dash">
            <div className="cover-page">
                <h2>Hi ! {userData?.name} . Welcome on your dashboard.<Link to='/home'>🏠</Link></h2>
            </div>
            <TClassRoom classRoom={classRoom}/>
            
             <TStudents myClass={myClass}/>
             <div className="site-footer">
                <p>&copy; 2024 learn-tech.com. All rights reserved. Unauthorized duplication or distribution of the content on this site is prohibited.</p>
            </div>
        </div>
    )
}

export default TDashboard;