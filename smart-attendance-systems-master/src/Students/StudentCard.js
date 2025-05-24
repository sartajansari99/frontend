import React from 'react';
import './Students.css';

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <div className="avatar" />
      <div className='photo'><img src={`https://finallyback-3.onrender.com/${student.photo}`}alt='sartaj'/></div>
      <h3>{student.name}</h3>
      <p>ID: {student.rfid}</p>
      <p>{student.email}</p>
      <p>Branch : {student.branch}</p>
      <p>Batches : {student.batches}</p>
      
    </div>
  );
};

export default StudentCard;