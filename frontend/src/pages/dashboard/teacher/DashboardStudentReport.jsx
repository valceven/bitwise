import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardStudentReportLessons from "./DashboardStudentReportLesson";
import ClassRecord from "./ClassRecord";
import { classroomApi } from "../../../api/classroom/classroomApi";
import { useParams, useNavigate } from "react-router-dom";
import { teacherApi } from "../../../api/teacher/teacherApi";
import { BookOpen, Users, ClipboardList, ChevronRight, ArrowLeft, Award, AlertCircle } from "lucide-react";

const DashboardStudentReport = () => {
  const [classroom, setClassroom] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showingClassRecord, setShowingClassRecord] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lessonProgress, setLessonProgress] = useState({});
  const [error, setError] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const { classCode, lessonId } = useParams();

  useEffect(() => {
    const fetchClassroomByClassCode = async () => {
      setLoading(true);
      try {
        const response = await classroomApi.fetchClassroomByClassCode(classCode);
        setClassroom(response);

        if (response) {
          const progressData = {};
          
          for (let i = 1; i <= 4; i++) {
            try {
              const data = {
                classroomId: response.classroomId,
                lessonId: i,
              };

              console.log("mars", data);
              const lessonResponse = await classroomApi.fetchStudentLessonProgress(data); // Random percentage 0-100
              
              progressData[i] = lessonResponse;
              
            } catch (error) {
              console.error(`Error fetching student lesson progress in lesson ${i}`, error?.message);
              toast.error(`Failed to fetch student lesson progress in lesson ${i}`);
              progressData[i] = 0;
            }
          }
          setLessonProgress(progressData);
        }
      } catch (error) {
        console.error("Error fetching classrooms:", error?.message);
        setError("Failed to fetch classroom data");
        toast.error("Failed to fetch classrooms");
      } finally {
        setLoading(false);
      }
    };

    fetchClassroomByClassCode();
    
    if (lessonId) {
      setSelectedLesson(lessonId);
    } else {
      setSelectedLesson(null);
    }
    
    setShowingClassRecord(false);
  }, [user, classCode, lessonId]);

  const lessons = [
    { 
      text: "Lesson 1", 
      id: "1", 
      description: "Introduction to Boolean Algebra",
      topics: 3,
      completionRate: 85
    },
    { 
      text: "Lesson 2", 
      id: "2", 
      description: "Simplifying Boolean Expressions",
      topics: 3,
      completionRate: 67
    },
    { 
      text: "Lesson 3", 
      id: "3", 
      description: "Boolean Algebra in Programming",
      topics: 1,
      completionRate: 42
    },
    { 
      text: "Lesson 4", 
      id: "4", 
      description: "Boolean Algebra in Logic Circuits",
      topics: 2,
      completionRate: 30
    },
  ];

  const handleRemoveStudent = async (studentId, classroomId) => {
    try {
      toast.info("Removing student...");
      await teacherApi.removeStudentFromClassroom(studentId, classroomId);
      
      setClassroom(prev => ({
        ...prev,
        students: prev.students.filter(student => student.id !== studentId)
      }));
      toast.success("Student removed successfully");
    } catch (error) {
      console.error("Error removing student:", error?.message);
      toast.error("Failed to remove student");
    }
  };

  const handleLessonClick = (lessonId) => {
    const newUrl = `/app/teacher/classroom/${classCode}/lesson/${lessonId}`;
    navigate(newUrl, { replace: false });
  };

  const handleShowClassRecord = () => {
    setShowingClassRecord(true);
  };

  const handleBackFromClassRecord = () => {
    setShowingClassRecord(false);
  };

  useEffect(() => {
    document.title = "Classroom " + classCode;
  }, [classCode]);

  const renderSkeletonLoader = () => (
    <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/5 mb-6"></div>
      
      <div className="flex justify-between mb-6">
        <div className="h-6 bg-gray-200 rounded w-1/6"></div>
        <div className="h-10 bg-gray-200 rounded w-1/5"></div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="h-14 bg-gray-200 rounded mb-3"></div>
        <div className="h-14 bg-gray-200 rounded mb-3"></div>
        <div className="h-14 bg-gray-200 rounded mb-3"></div>
        <div className="h-14 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  const renderClassroomHeader = () => (
    <div className="bg-bluez text-white p-6 rounded-t-xl flex items-center">
      <div className="bg-white/20 p-3 rounded-lg mr-4">
        <BookOpen size={24} />
      </div>
      <div>
        <h2 className="text-2xl font-bold">
          {classroom.className}
        </h2>
        <div className="flex flex-wrap gap-4 mt-1">
          <p className="text-sm text-white/80">
            Class Code: <span className="font-medium text-white">{classroom.classCode}</span>
          </p>
          <p className="text-sm text-white/80">
            Section: <span className="font-medium text-white">{classroom.section}</span>
          </p>
        </div>
      </div>
    </div>
  );

  const renderClassroomStats = () => (
    <div className="p-6 bg-offwhite border-b border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 mr-3">
            <BookOpen size={20} className="text-bluez" />
          </div>
          <div>
            <div className="text-2xl font-bold text-grayz">{lessons.length}</div>
            <div className="text-sm text-gray-500">Lessons</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
          <div className="p-3 rounded-full bg-purple-100 mr-3">
            <ClipboardList size={20} className="text-darkpurple" />
          </div>
          <div>
            <div className="text-2xl font-bold text-grayz">{lessons.reduce((sum, lesson) => sum + lesson.topics, 0)}</div>
            <div className="text-sm text-gray-500">Topics</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
          <div className="p-3 rounded-full bg-green-100 mr-3">
            <Users size={20} className="text-greenz" />
          </div>
          <div>
            <div className="text-2xl font-bold text-grayz">{classroom.students?.length || 0}</div>
            <div className="text-sm text-gray-500">Students</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 mr-3">
            <Award size={20} className="text-yellowz" />
          </div>
          <div>
            <div className="text-2xl font-bold text-grayz">
              {Math.round(Object.values(lessonProgress).reduce((sum, rate) => sum + rate, 0) / Object.values(lessonProgress).length)}%
            </div>
            <div className="text-sm text-gray-500">Avg. Completion</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return renderSkeletonLoader();
    }
    
    if (error) {
      return (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-red-500 mb-4">
            <AlertCircle size={48} className="mx-auto mb-2" />
            <h2 className="text-xl font-semibold">Error Loading Data</h2>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-bluez text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      );
    }
    
    if (showingClassRecord) {
      return (
        <ClassRecord 
          classroom={classroom} 
          onBack={handleBackFromClassRecord}
          onRemoveStudent={handleRemoveStudent}
        />
      );
    }
    
    if (selectedLesson) {
      return (
        <DashboardStudentReportLessons />
      );
    }

    return classroom && (
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
        {renderClassroomHeader()}
        {renderClassroomStats()}
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-grayz flex items-center">
              <BookOpen size={20} className="mr-2 text-bluez" />
              Lessons
            </h3>
            <button
              onClick={handleShowClassRecord}
              className="px-4 py-2 bg-bluez text-white rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <ClipboardList size={18} className="mr-2" />
              View Class Record
            </button>
          </div>

          <div className="max-h-108 overflow-y-auto custom-scrollbar bg-offwhite rounded-lg p-4">
            <div className="grid grid-cols-1 gap-3">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-bluez hover:shadow-md transition cursor-pointer"
                  onClick={() => handleLessonClick(lesson.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-semibold text-grayz">{lesson.text}</h4>
                        <span className="ml-2 text-xs bg-blue-100 text-bluez px-2 py-1 rounded-full">
                          {lesson.topics} Topics
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Completion Rate</span>
                          <span className="font-medium text-grayz">{lessonProgress[lesson.id]}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              lessonProgress[lesson.id] > 75 ? 'bg-greenz' : 
                              lessonProgress[lesson.id] > 50 ? 'bg-yellowz' : 
                              'bg-redz'
                            }`}
                            style={{ width: `${lessonProgress[lesson.id]}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 ml-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-6 h-full overflow-y-auto bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-6">
        {renderContent()}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardStudentReport;