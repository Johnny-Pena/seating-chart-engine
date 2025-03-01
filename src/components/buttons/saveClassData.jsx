import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SaveClassData = ({ students, selectedClass, classDetails }) => {
  const { userEmail, token } = useAuth();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const handleSave = async () => {
    if (!selectedClass) {
      console.error('No class selected');
      setAlertMessage('No class selected');
      setAlertType('alert-error');
      setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 3000);
      return;
    }

    const requestData = {
      userEmail,
      className: selectedClass,
      students,
      teacherName: classDetails.teacherName,
      day: classDetails.day,
      grade: classDetails.grade,
    };

    console.log('Sending saveClassData request:', requestData);

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/saveClassData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the token to the headers
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log('Class data saved successfully');
        setAlertMessage('Class data saved successfully');
        setAlertType('alert-success');
      } else {
        console.error('Failed to save class data');
        setAlertMessage('Failed to save class data');
        setAlertType('alert-error');
      }
    } catch (error) {
      console.error('Error saving class data:', error);
      setAlertMessage('Error saving class data');
      setAlertType('alert-error');
    }

    setTimeout(() => {
      setAlertMessage(null);
      setAlertType(null);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {alertMessage && (
        <div role="alert" className={`alert ${alertType} mb-4`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={alertType === 'alert-success' ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' : 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'}
            />
          </svg>
          <span>{alertMessage}</span>
        </div>
      )}
      <button className="btn btn-primary mt-4 flex items-center" onClick={handleSave}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
        Save Class Data
      </button>
    </div>
  );
};

export default SaveClassData;