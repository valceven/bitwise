import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { teacherApi } from "../../api/teacher/teacherApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardStudentReportTopics from "./DashboardStudentReportTopics";
import { Filter } from "lucide-react";

const DashboardStudentReport = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const { user } = useUser();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await teacherApi.fetchClassroomList(user.userID);
        setClassrooms(response);
      } catch (error) {
        console.error("Error fetching classrooms:", error.message);
        toast.error("Failed to fetch classrooms");
      }
    };

    if (user.userID && user.userType === 2) {
      fetchClassrooms();
    }
  }, [user]);

  const lessons = [
    { text: "Lesson 1", id: "lesson1" },
    { text: "Lesson 2", id: "lesson2" },
    { text: "Lesson 3", id: "lesson3" },
    { text: "Lesson 4", id: "lesson4" },
  ];

  // Get unique sections for dropdown
  const sections = Array.from(new Set(classrooms.map(c => c.section)));
  const filteredClassrooms =
    filter === "all" ? classrooms : classrooms.filter(c => c.section === filter);

  return (
    <div className="w-full p-6 h-130 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Section Filter */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-1 text-sm"
          >
            <option value="all">All Sections</option>
            {sections.map((section, idx) => (
              <option key={idx} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        {/* Render Lessons or Topics */}
        {selectedLesson ? (
          <DashboardStudentReportTopics
            lessonId={selectedLesson}
            onBack={() => setSelectedLesson(null)}
          />
        ) : (
          filteredClassrooms.map((classroom, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-md rounded-xl p-8"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {classroom.className || `Classroom ${index + 1}`}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Class Code: <span className="font-medium">{classroom.classCode}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Section: <span className="font-medium">{classroom.section}</span>
                </p>
                <p className="text-sm text-gray-500">
                  No. of Students: <span className="font-medium">{classroom.students.length}</span>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Lessons</h3>
                <div className="max-h-96 overflow-y-auto custom-scrollbar bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <ul className="space-y-2">
                    {lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="bg-white p-3 rounded-lg border hover:bg-lightpurple transition my-2"
                      >
                        <button
                          onClick={() => setSelectedLesson(lesson.id)}
                          className="w-full text-left font-medium focus:outline-none "
                        >
                          {lesson.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardStudentReport;
