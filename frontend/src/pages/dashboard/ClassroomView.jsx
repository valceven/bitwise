import React, { useState } from 'react';

const ClassroomView = ({ classroom }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const lessons = ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4'];

  console.log(classroom);
  
  const handleLeaveClassroom = () => {
    setShowConfirmation(true);
  };

  const confirmLeave = () => {
    console.log("Student left the classroom");
    setShowConfirmation(false);
    // In a real app, you would navigate away or update enrollment status
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">Classroom View</h1>
          <p className="text-gray-700 mb-2">Welcome to the Classroom View page of {classroom.className}!</p>
          <p className="text-lg text-gray-600">Teacher: {classroom.teacherName}</p>
          <p className="text-gray-600 mb-6">{classroom.description}</p>
        </div>
        <button 
          onClick={handleLeaveClassroom}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Leave Classroom
        </button>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <button
            key={index}
            className="w-3/4 text-left bg-black hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
            onClick={() => console.log(`${lesson} clicked`)}
          >
            {lesson}
          </button>
        ))}
      </div>
      
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Leave Classroom?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to leave this classroom? You can rejoin later if needed.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={confirmLeave}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
              >
                Leave Classroom
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassroomView;