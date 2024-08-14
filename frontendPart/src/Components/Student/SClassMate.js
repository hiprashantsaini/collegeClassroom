import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';

function SClassMate() {
  const [students, setStudents] = useState([]);
  const [studentFlag, setStudentFlag] = useState(false);
   const {userData}=useContext(AppContext);


  const getAllStudents = async () => {
    try {
      const data = await axios.get("https://backendclassroom.onrender.com/api/get-students")
      let classStudents=data.data.info.filter((item)=>item?.classRoom == userData.classRoom);
      setStudents(classStudents);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllStudents();
  }, [studentFlag,userData])


  return (
    <div className='students' id='students'>
      <h2>Your Classmates</h2>
      <div className='student-table'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Class_Room</th>
              <th>RollNo.</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.classRoom}</td>
                    <td>{item.rollno}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SClassMate;