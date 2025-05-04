import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardStudentReportTopics from "./DashboardStudentReportTopics";
import ClassRecord from "./ClassRecord";
import { classroomApi } from "../../api/classroom/classroomApi";
import { useParams } from "react-router-dom";

const DashboardStudentReport = () => {
  const [classroom, setClassroom] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showingClassRecord, setShowingClassRecord] = useState(false);
  const { user } = useUser();

  const { classCode } = useParams();

  useEffect(() => {
    const fetchClassroomByClassCode = async () => {
      try {
        const response = await classroomApi.fetchClassroomByClassCode(classCode);
        console.log(response);
        setClassroom(response);
      } catch (error) {
        console.error("Error fetching classrooms:", error.message);
        toast.error("Failed to fetch classrooms");
      }
    };

    fetchClassroomByClassCode();
  }, [user, classCode]);

  const lessons = [
    { text: "Lesson 1", id: "lesson1" },
    { text: "Lesson 2", id: "lesson2" },
    { text: "Lesson 3", id: "lesson3" },
    { text: "Lesson 4", id: "lesson4" },
  ];

  const handleRemoveStudent = async (studentId) => {
    try {
      await classroomApi.removeStudentFromClassroom(classCode, studentId);
      
      setClassroom(prev => ({
        ...prev,
        students: prev.students.filter(student => student.id !== studentId)
      }));
      
      toast.success("Student removed successfully");
    } catch (error) {
      console.error("Error removing student:", error.message);
      toast.error("Failed to remove student");
    }
  };

  const renderContent = () => {
    if (showingClassRecord) {
      return (
        <ClassRecord 
          classroom={classroom} 
          onBack={() => setShowingClassRecord(false)}
          onRemoveStudent={handleRemoveStudent}
        />
      );
    }
    
    if (selectedLesson) {
      return (
        <DashboardStudentReportTopics
          lessonId={selectedLesson}
          onBack={() => setSelectedLesson(null)}
        />
      );
    }

    return classroom && (
      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {classroom.className}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Class Code: <span className="font-medium">{classroom.classCode}</span>
          </p>
          <p className="text-sm text-gray-500">
            Section: <span className="font-medium">{classroom.section}</span>
          </p>
          <p className="text-sm text-gray-500">
            No. of Students: <span className="font-medium">{classroom.students?.length}</span>
          </p>
        </div>

        <div className="flex justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Lessons</h3>
          <button
            onClick={() => setShowingClassRecord(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            View Class Record
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto custom-scrollbar bg-gray-50 border border-gray-200 rounded-lg p-6">
          <ul className="space-y-2">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="bg-white p-3 rounded-lg border hover:bg-lightpurple transition my-2"
              >
                <button
                  onClick={() => setSelectedLesson(lesson.id)}
                  className="w-full text-left font-medium focus:outline-none"
                >
                  {lesson.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-6 h-130 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        {renderContent()}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardStudentReport;