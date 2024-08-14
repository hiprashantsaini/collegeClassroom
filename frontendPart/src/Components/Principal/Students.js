import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Students({ allClass }) {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollno, setRollno] = useState('');
  const [classroom, setClassroom] = useState('');
  const [studentId, setStudentId] = useState('');
  const [showAddNew, setShowAddNew] = useState(false);
  const [studentFlag, setStudentFlag] = useState(false);

  const handleCancel = (e) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setPassword('');
    setClassroom('');
    setShowAddNew(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (studentId !== '') {
        data = await axios.post("https://backendclassroom.onrender.com/api/update-student", { id: studentId, name, email, password, classRoom: classroom, rollno });
        alert("Student has been Updated!");
      } else {
        data = await axios.post("https://backendclassroom.onrender.com/api/create-student", { name, email, password, classRoom: classroom, rollno });
        alert("Student has been created!");
      }
      setStudentFlag(!studentFlag)
      setName('')
      setEmail('')
      setClassroom('')
      setPassword('')
      setStudentId('');
      setRollno('');
      setShowAddNew(false);
    } catch (error) {
      console.log("handlesubmit :", error);
      if (error.response.status === 400) {
        alert("This email already exists");
        setShowAddNew(false)
      } else {
        alert(`${error.message}`);
      }
    }
  }

  const getAllStudents = async () => {
    try {
      const data = await axios.get("https://backendclassroom.onrender.com/api/get-students")
      setStudents(data.data.info);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllStudents();
  }, [studentFlag])

  const handleDeleteStudent = async (id) => {
    try {
      await axios.post("https://backendclassroom.onrender.com/api/delete-student", { id: id });
      setStudentFlag(!studentFlag);
      alert("Deleted");
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditStudent = (item) => {
    try {
      setName(item.name);
      setEmail(item.email);
      setPassword(item.password);
      setClassroom(item.classRoom);
      setRollno(item.rollno);
      setStudentId(item._id);
      setShowAddNew(true)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='students' id='students'>
      <h2>Students</h2>
      <div className='student-table'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Class_Room</th>
              <th>RollNo.</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.classRoom}</td>
                    <td>{item.rollno}</td>
                    <td><button onClick={() => handleEditStudent(item)}>Edit</button><button onClick={() => handleDeleteStudent(item._id)}>Delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <div className="addItem-button"><button onClick={() => setShowAddNew(true)}>ADD A NEW STUDENT</button></div>
      {
        showAddNew && <div className='addNew'>
          <form onSubmit={handleSubmit}>
            <input type='text' value={name} placeholder='Enter the name' onChange={(e) => setName(e.target.value)} required />
            <input type='email' value={email} placeholder='Enter the email' onChange={(e) => setEmail(e.target.value)} required />
            <input type='password' value={password} placeholder='Enter the password' onChange={(e) => setPassword(e.target.value)} required />
            <select style={{ padding: "9px 5px", borderRadius: "5px" }} value={classroom} onChange={(e) => setClassroom(e.target.value)}>
              <option>Select class room</option>
              {
                allClass.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)
              }
            </select>
            <input type='number' value={rollno} placeholder='Enter rollno of student' onChange={(e) => setRollno(e.target.value)} />

            {
              !studentId ? <button type='submit'>ADD</button>
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

export default Students