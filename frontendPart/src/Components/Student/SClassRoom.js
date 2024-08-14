import React from 'react';

const SClassRoom = ({classRoom}) => {
    return (
        <div className="teacher-classroom">
            <h2>Your ClassRoom</h2>
            <div className='classrooms-table'>
                <div style={{ display: "flex", alignItems: "center", margin: "5px 5px" }}>
                    <h4>{classRoom?.name}</h4>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Days</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classRoom?.days?.map((el) => {
                                return (
                                    <tr key={el._id}>
                                        <td>{el.day}</td>
                                        <td>{el.startTime}</td>
                                        <td>{el.endTime}</td>
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

export default SClassRoom
