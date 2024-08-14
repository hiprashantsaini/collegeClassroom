import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Teachers({classRooms,setClassRooms,classRoomFlag,allClass,setAllClasses}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [classroom, setClassroom] = useState('');
    const [showAddNew, setShowAddNew] = useState(false);
    const [teacherFlag, setTeacherFlag] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [teacherId, setTeacherId] = useState('');

    const handleCancel = (e) => {
        e.preventDefault();
        setName('');
        setEmail('');
        setPassword('');
        setClassroom('');
        setTeacherId('');
        setShowAddNew(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (teacherId !== '') {
                data = await axios.post("https://backendclassroom.onrender.com/api/update-teacher", { id: teacherId, name, email, password, classroom });
                alert("Teacher has been Updated!");
            } else {
                data = await axios.post("https://backendclassroom.onrender.com/api/create-teacher", { name, email, password, classroom });
                alert("Teacher has been created!");
            }
            setTeacherFlag(!teacherFlag)
            setName('')
            setEmail('')
            setClassroom('')
            setPassword('')
            setTeacherId('');
            setShowAddNew(false);
        } catch (error) {
            if(error.response.status === 400){
              alert("This email already exists");
              setShowAddNew(false);
            }else{
              alert(`${error.message}`);
              setShowAddNew(false);
            }
        }
    }

    const getAllTeachers = async () => {
        try {
            const data = await axios.get("https://backendclassroom.onrender.com/api/get-teachers")
            
            setTeachers(data.data.info);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllTeachers();
    }, [teacherFlag])

    const handleDeleteTeacher = async (id) => {
        try {
            await axios.post("https://backendclassroom.onrender.com/api/delete-teacher", { id: id });
            setTeacherFlag(!teacherFlag);
            alert("Deleted");
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditTeacher = (item) => {
        try {
            setName(item.name);
            setEmail(item.email);
            setPassword(item.password);
            setClassroom(item.classroom);
            setTeacherId(item._id);
            setShowAddNew(true)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='teachers' id='teachers'>
            <h2>Teachers</h2>
            <div className='teacher-table'>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Class Room</th>
                        <th>Actions</th>
                    </tr>
                    {
                        teachers.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.classRoom}</td>
                                    <td><button onClick={() => handleEditTeacher(item)}>Edit</button><button onClick={() => handleDeleteTeacher(item._id)}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <div className='addItem-button'><button onClick={() => setShowAddNew(true)}>ADD A NEW TEACHER</button></div>
            {
                showAddNew && <div className='addNew'>
                    <form onSubmit={handleSubmit}>
                        <input type='text' value={name} placeholder='Enter the name' onChange={(e) => setName(e.target.value)} required />
                        <input type='email' value={email} placeholder='Enter the email' onChange={(e) => setEmail(e.target.value)} required />
                        <input type='password' value={password} placeholder='Enter the password' onChange={(e) => setPassword(e.target.value)} required />
                        <select style={{ padding: "9px 5px", borderRadius: "5px" }} value={classroom} onChange={(e)=>setClassroom(e.target.value)}>
                            <option>Select class room</option>
                            {
                                allClass.map((item)=><option key={item.id} value={item.name}>{item.name}</option>)
                            }
                        </select>
                        {
                            !teacherId ? <button type='submit'>ADD</button>
                                :
                                <button type='submit'>UPDATE</button>
                        }

                        <button onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            }

        </div>
    )
}

export default Teachers