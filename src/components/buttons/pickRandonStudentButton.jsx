import React, { useState } from 'react';

const PickRandomStudentButton = ({ students, selectedClass }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);

  const pickRandomStudent = () => {
    if (!selectedClass) {
      console.error("No class selected");
      return;
    }

    const availableStudents = students.filter(
      student => student && !selectedStudents.includes(student)
    );
    if (availableStudents.length === 0) {
      alert("All students have been selected.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableStudents.length);
    const selectedStudent = availableStudents[randomIndex];
    setSelectedStudents([...selectedStudents, selectedStudent]);

    console.log("Selected student:", selectedStudent);

    // Visual light-up effect using the dedicated 'highlighted' class
    const studentDivs = document.querySelectorAll('.badge');
    let currentIndex = 0;
    const totalStudents = studentDivs.length;
    const selectedStudentIndex = Array.from(studentDivs).findIndex(div =>
      div.textContent.trim() === selectedStudent
    );
    let intervalTime = 140; // Initial interval time

    // Store the original class names for each badge
    const originalClasses = Array.from(studentDivs).map(div => div.className);

    // Generate a random slowdown factor between 3 and 10
    const randomSlowdownStart = Math.floor(Math.random() * 8) + 3;

    function highlightNextStudent() {
      // Restore the previous badge by resetting its className
      if (currentIndex > 0) {
        const previousIndex = (currentIndex - 1) % totalStudents;
        if (studentDivs[previousIndex].textContent.trim() !== "") {
          studentDivs[previousIndex].className = originalClasses[previousIndex];
        }
      }

      // Skip any blank badges
      while (studentDivs[currentIndex % totalStudents].textContent.trim() === "") {
        currentIndex++;
      }

      const currentDiv = studentDivs[currentIndex % totalStudents];

      // Remove the original background class (matching 'bg-*') if it exists
      const originalClassString = originalClasses[currentIndex % totalStudents];
      const bgMatch = originalClassString.match(/bg-\S+/);
      if (bgMatch) {
        currentDiv.classList.remove(bgMatch[0]);
      }

      // Add the dedicated 'highlighted' class to override the background
      currentDiv.classList.add('highlighted');
      currentIndex++;

      // Increase the interval time as we approach the selected student
      const remainingDivs = (totalStudents + selectedStudentIndex + 1) - currentIndex;
      if (remainingDivs <= randomSlowdownStart) {
        intervalTime += 50;
      }

      if (currentIndex === totalStudents + selectedStudentIndex + 1) {
        // When the effect reaches the selected student, ensure the highlight remains for a while
        studentDivs.forEach((div, index) => {
          if (div.textContent.trim() === selectedStudent) {
            // Remove and reapply the highlight to ensure it takes effect
            div.classList.remove('highlighted');
            div.classList.add('highlighted');
            setTimeout(() => {
              div.className = originalClasses[index]; // Restore original classes after 7 seconds
            }, 7000);
          }
        });
      } else {
        setTimeout(highlightNextStudent, intervalTime);
      }
    }

    highlightNextStudent();
  };

  return (
    <button
      id="random-student-generator"
      className="btn btn-primary mt-4"
      onClick={pickRandomStudent}
    >
      Pick Random Student
    </button>
  );
};

export default PickRandomStudentButton;
