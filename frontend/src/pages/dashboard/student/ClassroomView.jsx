import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import AnimatedLessonButton from "../../../components/buttons/AnimatedLessonButton.jsx";
import { studentApi } from "../../../api/student/studentApi.js";
import { studentLessonApi } from "../../../api/studentLesson/studentLesson.js";
import gridBox from "../../../assets/gridbox.svg";

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ClassroomView = ({ classroom, user }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedLessonData, setSelectedLessonData] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Slider ref
  const sliderRef = useRef(null);

  // Mock sub-lesson data - now using topic numbers instead of letters
  const subLessonInfo = {
    1: {
      title: "Introduction to Basics",
      description:
        "Learn the fundamental concepts and get started with the core principles of this lesson.",
      duration: "15 min",
      difficulty: "Beginner",
    },
    2: {
      title: "Intermediate Concepts",
      description:
        "Dive deeper into the subject matter and explore more complex applications.",
      duration: "25 min",
      difficulty: "Intermediate",
    },
    3: {
      title: "Advanced Applications",
      description:
        "Master advanced techniques and real-world problem-solving strategies.",
      duration: "30 min",
      difficulty: "Advanced",
    },
    4: {
      title: "Foundation Building",
      description:
        "Build upon previous knowledge with new foundational concepts.",
      duration: "20 min",
      difficulty: "Beginner",
    },
    5: {
      title: "Practical Applications",
      description: "Apply theoretical knowledge to practical scenarios.",
      duration: "35 min",
      difficulty: "Intermediate",
    },
    6: {
      title: "Expert Techniques",
      description:
        "Master expert-level techniques and advanced problem solving.",
      duration: "40 min",
      difficulty: "Advanced",
    },
  };

  // Function to calculate topic number based on lesson index and sub-lesson index
  const getTopicNumber = (lessonIndex, subIndex) => {
    return lessonIndex * 3 + (subIndex + 1);
  };

  // Function to get default topic info if not in subLessonInfo
  const getTopicInfo = (topicNumber) => {
    return (
      subLessonInfo[topicNumber] || {
        title: `Topic ${topicNumber}`,
        description: "Learn important concepts in this topic.",
        duration: "20 min",
        difficulty: "Intermediate",
      }
    );
  };

  // Function to slide to specific lesson
  const slideToLesson = (lessonIndex) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(lessonIndex);
    }
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
        }
      }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessonResponse = await studentLessonApi.fetchStudentLessons(
          user.userID
        );

        console.log(lessonResponse);

        const sortedLessons = lessonResponse.lessons.sort(
          (a, b) => a.lessonId - b.lessonId
        );
        await setLessons(sortedLessons);

        if (lessonResponse.lessons.length > 0) {
          // Set the first topic (topic 1) as selected by default
          const firstLesson = lessonResponse.lessons[0];
          const firstTopicNumber = getTopicNumber(0, 0); // Topic 1
          setSelectedButton(
            `lesson-${firstLesson.lessonId}-sub-${firstTopicNumber}`
          );
          setSelectedLessonData({
            lessonId: firstLesson.lessonId,
            subLesson: firstTopicNumber,
            lessonNumber: 1,
            topicNumber: firstTopicNumber,
          });
        }
      } catch (error) {
        console.error("Error fetching classroom or lessons:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (classroom.classroomId) {
      navigate(`app/classroom/student/${classroom.classCode}`, {
        replace: true,
      });
    }

    fetchData();
  }, []);

  const handleLeaveClassroom = () => {
    setShowConfirmation(true);
  };

  const confirmLeave = async () => {
    try {
      const data = {
        studentId: user.userID,
        classroomId: classroom.classroomId,
      };

      const response = await studentApi.submitLeaveRequest(data);
      if (response) {
        console.log("Submitted Leave Request", response);
        setShowConfirmation(false);
      }
    } catch (error) {
      console.error("Error leaving classroom:", error.message);
    }
  };

  const handleButtonClick = (
    buttonId,
    lessonId,
    subLesson,
    lessonNumber,
    topicNumber
  ) => {
    setSelectedButton(buttonId);
    
    // Slide to center the lesson
    slideToLesson(lessonNumber - 1);
    
    if (subLesson !== null) {
      // If it's a sub-lesson button, update the selected lesson data
      setSelectedLessonData({
        lessonId,
        subLesson,
        lessonNumber,
        topicNumber,
      });
    } else {
      // If it's a main lesson button, select its first topic
      const firstTopicNumber = getTopicNumber(lessonNumber - 1, 0);
      setSelectedButton(`lesson-${lessonId}-sub-${firstTopicNumber}`);
      setSelectedLessonData({
        lessonId,
        subLesson: firstTopicNumber,
        lessonNumber,
        topicNumber: firstTopicNumber,
      });
    }
  };

  const handleEnterLesson = async () => {
    if (!selectedLessonData) return;

    try {
      const data = {
        classroomId: classroom.classroomId,
        studentId: user.userID,
        lessonId: selectedLessonData.lessonId,
      };

      const response = await studentLessonApi.enterLesson(data);
      console.log("MARS", response);

      // Navigate with topic information
      navigate(
        `lesson/${selectedLessonData.lessonId}/topic/${selectedLessonData.topicNumber}`
      );
    } catch (error) {
      console.error("Error entering lesson:", error.message);
    }
  };

  return (
    <div
      className="flex w-full h-full justify-between p-8 px-10 pb-30"
      style={{
        backgroundImage: `url(${gridBox})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <div className="w-1/4 h-min flex flex-col space-y-4">
        {/* Classroom Info Card */}
        <div className="flex space-x-auto overflow-x-auto thin-scrollbar p-8 bg-white rounded-lg shadow-[4px_4px_0px_#0b1e2d] border border-black z-0">
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

        {/* Selected Topic Info Card */}
        {selectedLessonData && (
          <div className="p-6 bg-white rounded-lg shadow-[4px_4px_0px_#0b1e2d] border border-black">
            <h2 className="text-xl font-bold mb-2">
              Lesson {selectedLessonData.lessonNumber} - Topic{" "}
              {selectedLessonData.topicNumber}
            </h2>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              {getTopicInfo(selectedLessonData.topicNumber).title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {getTopicInfo(selectedLessonData.topicNumber).description}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {getTopicInfo(selectedLessonData.topicNumber).duration}
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 20h.01M7 20v-4" />
                  <path d="M12 20v-8" />
                  <path d="M17 20v-12" />
                  <path d="M22 20v-16" />
                </svg>
                {getTopicInfo(selectedLessonData.topicNumber).difficulty}
              </div>
            </div>
            <button
              onClick={handleEnterLesson}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Proceed to Topic
            </button>
          </div>
        )}
      </div>

      {/* React Slick Slider Container */}
      <div className="flex-1 flex flex-col relative ml-8">
        <div className="flex justify-center mb-4">
          <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow">
            Navigate through lessons
          </div>
        </div>
        
        <div className="flex-1 relative roadmap-slider">
          {isLoading ? (
            <div className="text-center text-gray-500 flex items-center justify-center h-full">
              Loading lessons...
            </div>
          ) : (
            <Slider ref={sliderRef} {...sliderSettings}>
              {lessons.map((lesson, index) => (
                <div key={lesson.lessonId} className="px-4">
                  <div className="flex flex-col items-center space-y-4 py-8">
                    {/* Big button */}
                    <AnimatedLessonButton
                      label={"Lesson No " + (index + 1)}
                      onClick={() =>
                        handleButtonClick(
                          `lesson-${lesson.lessonId}-main`,
                          lesson.lessonId,
                          null,
                          index + 1,
                          null
                        )
                      }
                      onEnterLesson={() => {}}
                      isSelected={
                        selectedButton === `lesson-${lesson.lessonId}-main` ||
                        selectedButton?.startsWith(`lesson-${lesson.lessonId}-sub`)
                      }
                      className="w-full max-w-[250px]"
                      locked={false}
                    />

                    {/* Small buttons with topic numbers */}
                    <div className="flex space-x-2 justify-center">
                      {Array.from({ length: 3 }).map((_, idx) => {
                        const topicNumber = getTopicNumber(index, idx);
                        const buttonId = `lesson-${lesson.lessonId}-sub-${topicNumber}`;

                        return (
                          <div
                            key={idx}
                            className="flex justify-center"
                            style={{
                              transform: `translateY(${idx * 8}px) translateX(${(idx - 1) * 15}px)`
                            }}
                          >
                            <AnimatedLessonButton
                              label={`Topic ${topicNumber}`}
                              onClick={() =>
                                handleButtonClick(
                                  buttonId,
                                  lesson.lessonId,
                                  topicNumber,
                                  index + 1,
                                  topicNumber
                                )
                              }
                              onEnterLesson={() => handleEnterLesson()}
                              isSelected={selectedButton === buttonId}
                              className="scale-75 h-15"
                              isLesson={true}
                              locked={false}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>

      {/* Custom CSS for the slider */}
      <style jsx>{`
        .roadmap-slider .slick-dots {
          bottom: -45px;
        }
        
        .roadmap-slider .slick-dots li button:before {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .roadmap-slider .slick-dots li.slick-active button:before {
          color: #3b82f6;
        }
        
        .roadmap-slider .slick-prev,
        .roadmap-slider .slick-next {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          z-index: 10;
        }
        
        .roadmap-slider .slick-prev:before,
        .roadmap-slider .slick-next:before {
          font-size: 20px;
          color: #64748b;
        }
        
        .roadmap-slider .slick-prev {
          left: -50px;
        }
        
        .roadmap-slider .slick-next {
          right: -50px;
        }
        
        .roadmap-slider .slick-slide {
          outline: none;
        }
      `}</style>

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