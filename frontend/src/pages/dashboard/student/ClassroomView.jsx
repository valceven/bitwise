import React, { useState, useEffect } from "react";
import AnimatedLessonButton from "../../../components/buttons/AnimatedLessonButton.jsx";
import { studentApi } from "../../../api/student/studentApi.js";
import { lessonApi } from "../../../api/lesson/lessonApi.js";
import gridBox from "../../../assets/gridbox.svg";

const ClassroomView = ({ classroom, user }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState("Lesson 1");
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classroomResponse = await studentApi.fetchClassroom(user.userID);
        console.log("Fetched classroom:", classroomResponse);

        const lessonResponse = await lessonApi.fetchLessons(
          classroomResponse.classroomId
        );
        console.log("Fetched lessons:", lessonResponse);

        if (Array.isArray(lessonResponse.lessons)) {
          setLessons(lessonResponse.lessons);
          if (lessonResponse.lessons.length > 0) {
            setSelectedLesson(lessonResponse.lessons[0].lessonId); // <-- Set first lesson
          }
        } else {
          console.warn("Unexpected lessons format:", lessonResponse);
        }
      } catch (error) {
        console.error("Error fetching classroom or lessons:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLeaveClassroom = () => {
    setShowConfirmation(true); // Just show the confirmation modal
  };

  const confirmLeave = async () => {
    try {
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
    <div
      className="flex w-full h-screen justify-between p-8 px-10"
      style={{
        backgroundImage: `url(${gridBox})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <div className="w-1/4 h-min flex space-x-auto overflow-x-auto thin-scrollbar p-8 bg-white rounded-lg shadow-[4px_4px_0px_#0b1e2d] border border-black z-0">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-blue-600">
            {classroom.className}
          </h1>
          <p className="text-gray-600 text-sm">
            Teacher: {classroom.teacherName}
          </p>
          <p className="text-gray-600 text-sm">{classroom.description}</p>
        </div>
        <button onClick={handleLeaveClassroom} className="mb-auto ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>

      <div className="w-150 flex flex-col z-0 pt-7 mr-20">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading lessons...</div>
        ) : (
          lessons.map((lesson, index) => (
            <div
              key={lesson.lessonId}
              className={`w-3/5 flex mx-auto ${
                index % 2 === 0 ? "justify-start" : "justify-end pr-7"
              }`}
            >
              <AnimatedLessonButton
                label={lesson.title}
                onClick={() => setSelectedLesson(lesson.lessonId)}
                isSelected={selectedLesson === lesson.lessonId}
                className="w-full"
                locked={index !== 0} // Only the first is unlocked
              />
            </div>
          ))
        )}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Leave Classroom?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to leave this classroom? You can rejoin
              later if needed.
            </p>
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