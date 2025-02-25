import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddClass = () => {
  const [teacherName, setTeacherName] = useState('');
  const [day, setDay] = useState('');
  const [grade, setGrade] = useState('');
  const [students, setStudents] = useState('');
  const { userEmail } = useAuth();
  const navigate = useNavigate();

  const handleSave = async () => {
    const inputStudents = students.split(/[, ]+/).map((s) => s.trim());
    const formattedStudents = [...inputStudents, ...Array(28 - inputStudents.length).fill('')];

    const newClass = {
      teacherName,
      day,
      grade,
      students: formattedStudents,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/addClass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userEmail, newClass }),
      });

      if (response.ok) {
        console.log('Class added successfully');
        navigate('/seatingChartHomePage'); // Redirect to the home page after saving
      } else {
        console.error('Failed to add class');
      }
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-4">
        <h2 className="text-xl font-bold mb-4">Add Class</h2>
        <div className="form-control mb-4">
          <label className="label">Teacher Name</label>
          <input
            type="text"
            className="input input-bordered"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">Rotation Day</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="" disabled>Select Rotation Day</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div className="form-control mb-4">
          <label className="label">Grade</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="" disabled>Select Grade</option>
            <option value="Kinder">Kinder</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
          </select>
        </div>
        <div className="form-control mb-4">
          <label className="label">Students (comma or space separated)</label>
          <textarea
            className="textarea textarea-bordered"
            value={students}
            onChange={(e) => setStudents(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button className="btn mr-2" onClick={() => navigate('/seatingChartHomePage')}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddClass;