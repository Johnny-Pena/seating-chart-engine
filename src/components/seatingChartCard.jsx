import React, { useState, useEffect } from 'react';
import ClassDropdown from './classDropDown';
import SaveClassData from './buttons/saveClassData';
import PickRandomStudentButton from './buttons/pickRandonStudentButton';
import { useAuth } from '../context/AuthContext';

const initialStudents = [];

function getColor(index) {
  if (index >= 0 && index < 7) return "bg-yellow-700";
  if (index >= 7 && index < 14) return "bg-green-700";
  if (index >= 14 && index < 21) return "bg-blue-700";
  if (index >= 21 && index < 28) return "bg-red-700";
  return "";
}

function handleDragStart(event, student) {
  event.dataTransfer.setData("text/plain", JSON.stringify(student));
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event, targetIndex, students, setStudents) {
  event.preventDefault();
  const draggedStudent = JSON.parse(event.dataTransfer.getData("text/plain"));
  const draggedIndex = students.findIndex(student => student === draggedStudent);

  if (draggedIndex === -1 || targetIndex === -1) {
    return;
  }

  const updatedStudents = [...students];
  [updatedStudents[draggedIndex], updatedStudents[targetIndex]] = [
    updatedStudents[targetIndex],
    updatedStudents[draggedIndex]
  ];

  setStudents(updatedStudents);
}

export default function SeatingChartCard() {
  const [students, setStudents] = useState(initialStudents);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedClassData, setSelectedClassData] = useState(null);
  const [dayOrder, setDayOrder] = useState([]);
  const [gradeOrder, setGradeOrder] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const { userEmail } = useAuth();

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetch(`https://glistening-griffin-48c083.netlify.app/.netlify/functions/server/userDetails?userEmail=${userEmail}`);
        const data = await response.json();
        if (data) {
          setDayOrder(data.dayOrder || []);
          setGradeOrder(data.gradeOrder || []);
          setClasses(data.classes || []);
        } else {
          console.error('User details not found:', data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
    fetchUserDetails();
  }, [userEmail]);

  const handleClassSelect = (className) => {
    const selectedClassData = classes.find(cls => cls.teacherName === className);
    if (selectedClassData) {
      setStudents(selectedClassData.students);
      setSelectedClass(className);
      setSelectedClassData(selectedClassData);
    }
  };

  const handleDoubleClick = (index) => {
    setEditingIndex(index);
    setEditingValue(students[index]);
  };

  const handleInputChange = (event) => {
    setEditingValue(event.target.value);
  };

  const handleInputBlur = () => {
    const updatedStudents = [...students];
    updatedStudents[editingIndex] = editingValue;
    setStudents(updatedStudents);
    setEditingIndex(null);
    setEditingValue('');
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="w-full max-w-xs mt-8">
        <ClassDropdown
          classes={classes}
          onClassSelect={handleClassSelect}
          dayOrder={dayOrder}
          gradeOrder={gradeOrder}
        />
      </div>
      {/* 7-column grid with responsive gap and badge sizes */}
      <div className="grid grid-cols-7 gap-1 sm:gap-x-4 sm:gap-y-6 p-2 sm:p-4 lg:p-6">
        {students.map((student, index) => (
          <div
            key={index}
            className={`badge badge-md ${getColor(index)} w-16 h-12 sm:w-24 sm:h-14 lg:w-48 lg:h-14 flex items-center justify-center`}
            draggable
            onDragStart={(event) => handleDragStart(event, student)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index, students, setStudents)}
            onDoubleClick={() => handleDoubleClick(index)}
          >
            {editingIndex === index ? (
              <input
                type="text"
                value={editingValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="input input-bordered input-sm w-full max-w-xs"
                autoFocus
              />
            ) : (
              <h2 className="card-title text-xs sm:text-lg lg:text-xl text-white">
                {student}
              </h2>
            )}
          </div>
        ))}
      </div>
      <SaveClassData students={students} selectedClass={selectedClass} classDetails={selectedClassData} />
      <PickRandomStudentButton students={students} selectedClass={selectedClass} />
    </div>
  );
}