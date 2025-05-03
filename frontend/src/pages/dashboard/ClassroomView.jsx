import React, { useState, useEffect } from 'react';
import AnimatedLessonButton from "../../components/buttons/AnimatedLessonButton.jsx";
import { studentApi } from '../../api/student/studentApi.js';
import { lessonApi } from '../../api/lesson/lessonApi.js';

const ClassroomView = ({ classroom , user }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState("Lesson 1");
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await lessonApi.fetchLessons(classroom.classroomId);
        setLessons(response);
        console.log("Fetched lessons:", response);
      } catch (error) {
        console.error("Error fetching lessons:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, [])
  
  const handleLeaveClassroom = () => {
    setShowConfirmation(true); // Just show the confirmation modal
  };
  
  const confirmLeave = async () => {
    try {
      console.log("Leaving classroom with ID:", user);
      const response = await studentApi.leaveClassroom(user.userID);
      if (response) {
        console.log("Successfully left the classroom:", response);
        setShowConfirmation(false);
        // You could also redirect or update the UI here
      }
    } catch (error) {
      console.error("Error leaving classroom:", error.message);
    }
  };
  

  return (
    <div className="flex w-full">
      <div className="w-1/2 flex space-x-auto overflow-x-auto thin-scrollbar h-full border p-8 rounded-xl">
        <div>
          <h1 className="text-3xl font-bold mb-4">{classroom.className}</h1>
          <p className="text-gray-700 mb-2">Welcome to the Classroom View page of {classroom.className}!</p>
          <p className="text-lg text-gray-600">Teacher: {classroom.teacherName}</p>
          <p className="text-gray-600 mb-6">{classroom.description}</p>
        </div>
        <button 
          onClick={handleLeaveClassroom}
          className="bg-red-500 hover:bg-red-600 text-white font-medium text-sm py-2 px-4 mt-auto ml-auto rounded transition-colors h-12"
        >
          Leave Classroom
        </button>
      </div>

      <div className="w-170 space-y-12 flex flex-col justify-center">
        {lessons.map((lesson, index) => (
          <div className="flex justify-center" key={index}>
            <AnimatedLessonButton
              lesson={lesson}
              onClick={() => setSelectedLesson(lesson)}
              isSelected={selectedLesson === lesson}
            />
          </div>
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
