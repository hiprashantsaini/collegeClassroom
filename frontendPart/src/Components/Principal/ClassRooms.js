import axios from 'axios';
import React, { useState } from 'react';

function ClassRooms({classRooms,setClassRooms,classRoomFlag,setClassRoomFlag,allClass,setAllClasses}) {
    const [addClass, setAddClass] = useState(false);
    const [className, setClassName] = useState('');

    const handleAddClass = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post("https://backendclassroom.onrender.com/api/add-classroom", { className });
            setClassRoomFlag(!classRoomFlag);
            alert("Classroom added");
            setClassName('');
            setAddClass(false);
        } catch (error) {
            console.log("ClassRoom.js :", error);
        }
    }

    return (
        <div className='classroom' id='classroom'>
            <h2>Class Rooms</h2>
            {
               classRooms.map((item)=><ClassRoom key={item._id} item={item} classRoomFlag={classRoomFlag} setClassRoomFlag={setClassRoomFlag}/>)
            }

            {
                addClass && <div className='add-classroom'>
                    <p>Add new classroom</p>
                    <form onSubmit={handleAddClass}>
                        <input type='text' value={className} onChange={(e) => setClassName(e.target.value)} placeholder='Enter classroom name' />
                        <button type='submit'>Add Class</button>
                    </form>
                </div>
            }

            <div className='addItem-button'>
                {
                    !addClass ? <button onClick={() => setAddClass(true)}>ADD A NEW CLASS ROOM</button>
                        :
                        <button onClick={() => {
                            setAddClass(false);
                            setClassName('');
                        }}>Cancel</button>
                }

            </div>

        </div>
    )
}

function ClassRoom({item,classRoomFlag,setClassRoomFlag}){
    const [classId, setClassId] = useState('');
    const [addDay, setAddDay] = useState(false);
    const [day, setDay] = useState('Monday');
    const [startHH, setStartHH] = useState('');
    const [startMM, setStartMM] = useState('');
    const [startAmPm, setStartAmPm] = useState('AM');
    const [endHH, setEndHH] = useState('');
    const [endMM, setEndMM] = useState('');
    const [endAmPm, setEndAmPm] = useState('AM');
    const [editDay,setEditDay]=useState(false);
    const [dayId,setDayId]=useState('');


    const handleAddDay = async (e) => {
        e.preventDefault();
        try {
            let startTime = `${startHH} : ${startMM} ${startAmPm}`;
            let endTime = `${endHH} : ${endMM} ${endAmPm}`;
            const data = await axios.post("https://backendclassroom.onrender.com/api/addclass-day", { startTime, endTime, classId, day });
            alert("Added");
            setAddDay(false);
            setClassRoomFlag(!classRoomFlag);
        } catch (error) {
            console.log("handleAddDay in ClassRoom.js  :", error);
        }
    }

    const handleDayDelete=async(classId,dayId)=>{
       try {
         await axios.post("https://backendclassroom.onrender.com/api/delete-day",{classId,dayId});
         alert("Deleted");
         setAddDay(false);
         setClassRoomFlag(!classRoomFlag);
       } catch (error) {
        console.log("handleDayDelete in ClassRoom.js  :", error);
       }
    }

    const updateClassDay=async(e)=>{
        e.preventDefault();
        try {
            let startTime = `${startHH} : ${startMM} ${startAmPm}`;
            let endTime = `${endHH} : ${endMM} ${endAmPm}`;
            const data = await axios.post("https://backendclassroom.onrender.com/api/updateclass-day", { startTime, endTime, classId, day ,dayId});
            alert("Updated");
            setAddDay(false);
            setClassRoomFlag(!classRoomFlag);
        } catch (error) {
            console.log("handleAddDay in ClassRoom.js  :", error);
        }
    }

   const handleDayEdit=async(classId,dayInfo)=>{
    try {
        setEditDay(true);
        setDayId(dayInfo._id);
        setClassId(classId);
        setDay(dayInfo.day);
        let startTime=dayInfo.startTime.split(' ');
        setStartHH(startTime[0])
        setStartMM(startTime[2])
        setStartAmPm(startTime[3])

        let endTime=dayInfo.endTime.split(' ');
        setEndHH(endTime[0])
        setEndMM(endTime[2])
        setEndAmPm(endTime[3])
        setAddDay(true);
    } catch (error) {
        console.log("handleDayEdit in ClassRoom.js  :", error);
    }
   }

   const handleDeleteClass=async(classId)=>{
    try {
        await axios.post("https://backendclassroom.onrender.com/api/delete-class",{classId});
        alert("Class deleted");
        setClassRoomFlag(!classRoomFlag);

    } catch (error) {
        console.log("handleDayEdit in ClassRoom.js  :", error);
    }
   }
    
    return (
        <div className='classrooms-table'>
            <div style={{display:"flex",alignItems:"center",margin:"5px 5px"}}>
                <h3>{item.name}</h3><button onClick={()=>handleDeleteClass(item._id)}>Delete Class</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Days</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        item?.days?.map((el) => {
                            return(
                            <tr key={el._id}>
                                <td>{el.day}</td>
                                <td>{el.startTime}</td>
                                <td>{el.endTime}</td>
                                <td><button onClick={()=>handleDayEdit(item._id,el)}>Edit</button><button onClick={()=>handleDayDelete(item._id,el._id)}>Delete</button></td>
                            </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            {
                addDay &&
                <div className='addNewClass'>
                    <form onSubmit={handleAddDay}>
                        <div>
                            <span>Day :</span>
                            <select name='day' value={day} onChange={(e) => setDay(e.target.value)} required>
                                <option value='Monday'>Monday</option>
                                <option value='Tuesday'>Tuesday</option>
                                <option value='Wednesday'>Wednesday</option>
                                <option value='Thursday'>Thursday</option>
                                <option value='Friday'>Friday</option>
                                <option value='Saturday'>Saturday</option>
                            </select>
                        </div>

                        <div className='day-time'><span>Start time :</span>
                            <div className='time'>
                                <input type='number' min='0' max='12' placeholder='HH' value={startHH} onChange={(e) => setStartHH(e.target.value)} required />:<input type='number' min='0' max='59' value={startMM} onChange={(e) => setStartMM(e.target.value)} placeholder='mm' required />
                            </div>
                            <select name='startAMPM' onChange={(e) => setStartAmPm(e.target.value)} value={startAmPm} required>
                                <option value='AM'>AM</option>
                                <option value='PM'>PM</option>
                            </select>
                        </div>

                        <div className='day-time'><span>End Time :</span>
                            <div className='time'>
                                <input type='number' min='0' max='12' value={endHH} onChange={(e) => setEndHH(e.target.value)} placeholder='HH' required />:<input type='number' min='0' max='59' value={endMM} onChange={(e) => setEndMM(e.target.value)} placeholder='mm' required />
                            </div>
                            <select name='endAMPM' value={endAmPm} onChange={(e) => setEndAmPm(e.target.value)} required>
                                <option value='AM'>AM</option>
                                <option value='PM'>PM</option>
                            </select>
                        </div>
                        {
                          !editDay ? <button type='submit' onClick={() => {
                            setClassId(item._id)
                        }}>Add</button>
                        :
                        <button onClick={updateClassDay}>Update</button>
                        }

                    </form>
                </div>
            }
            {
                item.days.length <= 6 && <>
                    {
                        !addDay ? <button style={{ margin: "5px 0px" }} onClick={() => setAddDay(true)}>Add Day</button>
                            :
                            <button onClick={() => setAddDay(false)}>Cancel</button>
                    }
                </>
            }

        </div>
    )
}

export default ClassRooms