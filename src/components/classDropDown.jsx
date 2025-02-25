import React, { useState } from 'react';

const ClassDropdown = ({ classes, onClassSelect, dayOrder, gradeOrder }) => {
  const [selectedClass, setSelectedClass] = useState('');

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedClass(selected);
    onClassSelect(selected);
  };

  const sortClasses = (classes) => {
    return classes.sort((a, b) => {
      const dayIndexA = dayOrder.indexOf(a.day);
      const dayIndexB = dayOrder.indexOf(b.day);
      const gradeIndexA = gradeOrder.indexOf(a.grade);
      const gradeIndexB = gradeOrder.indexOf(b.grade);

      if (dayIndexA !== dayIndexB) {
        return dayIndexA - dayIndexB;
      }
      return gradeIndexA - gradeIndexB;
    });
  };

  const sortedClasses = sortClasses(classes);

  return (
    <div className="mb-4">
      <label htmlFor="class-select" className="block text-lg font-medium mb-2">
        Select a Class:
      </label>
      <select
        id="class-select"
        value={selectedClass}
        onChange={handleChange}
        className="select select-bordered w-full max-w-xs"
      >
        <option value="" disabled>--Choose a class--</option>
        {sortedClasses.map((cls, index) => (
          <option key={index} value={cls.teacherName}>
            {`${cls.day} - ${cls.grade} - ${cls.teacherName}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClassDropdown;