import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import AnimatedLessonButton from "../../../components/buttons/AnimatedLessonButton.jsx";
import AnimatedAssessmentButton from "../../../components/buttons/AnimatedAssessmentButton.jsx";
import { studentApi } from "../../../api/student/studentApi.js";
import { studentClassroomApi } from "../../../api/studentClassroom/studentClassroomApi.js";
import { studentLessonApi } from "../../../api/studentLesson/studentLesson.js";
import gridBox from "../../../assets/gridbox.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { studentTopicApi } from "../../../api/studentTopic/studentTopicApi.js";
import { studentAssessmentApi } from "../../../api/studentAssessment/studentAssessmentApi.js";

const ClassroomView = ({ classroom, user }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedLessonData, setSelectedLessonData] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapResponse, setRoadmapResponse] = useState({});
  const [assessments, setAsessments] = useState({});

  // Swiper instance ref
  const swiperRef = useRef(null);

  // Lesson configuration - defines topics per lesson
  const lessonConfig = [
    { topicCount: 3, assessmentCount: 3 }, // Lesson 1: topics 1,2,3
    { topicCount: 3, assessmentCount: 3 }, // Lesson 2: topics 4,5,6
    { topicCount: 1, assessmentCount: 1 }, // Lesson 3: topic 7
    { topicCount: 2, assessmentCount: 2 }, // Lesson 4: topics 8,9
  ];

  // Mock sub-lesson data - now using sequential topic numbers 1-9
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
    7: {
      title: "Specialized Knowledge",
      description: "Focus on specialized applications and unique scenarios.",
      duration: "30 min",
      difficulty: "Advanced",
    },
    8: {
      title: "Integration Skills",
      description: "Learn to integrate multiple concepts effectively.",
      duration: "25 min",
      difficulty: "Intermediate",
    },
    9: {
      title: "Mastery Level",
      description: "Achieve mastery through comprehensive understanding.",
      duration: "45 min",
      difficulty: "Expert",
    },
  };

  // Function to get the starting topic number for a lesson
  const getLessonStartTopic = (lessonIndex) => {
    let startTopic = 1;
    for (let i = 0; i < lessonIndex; i++) {
      startTopic += lessonConfig[i].topicCount;
    }
    return startTopic;
  };

  // Function to get topic numbers for a specific lesson
  const getLessonTopics = (lessonIndex) => {
    const startTopic = getLessonStartTopic(lessonIndex);
    const topicCount = lessonConfig[lessonIndex].topicCount;
    return Array.from({ length: topicCount }, (_, i) => startTopic + i);
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

  // Function to check if a lesson is unlocked
  const isLessonUnlocked = (lessonIndex) => {
    // If roadmapResponse is empty or no progress data, only lesson 1 is unlocked
    if (
      !roadmapResponse?.progress ||
      (!roadmapResponse.progress.completedLessons?.length &&
        !roadmapResponse.progress.completedTopics?.length &&
        !roadmapResponse.progress.completedAssessments?.length)
    ) {
      return lessonIndex === 0;
    }

    if (lessonIndex === 0) return true; // Lesson 1 always unlocked

    // Check if previous lesson is complete (last assessment of previous lesson is complete)
    const prevLessonIndex = lessonIndex - 1;
    const prevLessonAssessmentCount =
      lessonConfig[prevLessonIndex].assessmentCount;
    const prevLessonStartTopic = getLessonStartTopic(prevLessonIndex);
    const lastAssessmentOfPrevLesson =
      prevLessonStartTopic + prevLessonAssessmentCount - 1;

    // Check if the last assessment of the previous lesson is completed
    return (
      roadmapResponse.progress.completedAssessments?.includes(
        lastAssessmentOfPrevLesson
      ) || false
    );
  };

  // Function to check if a topic is unlocked
  const isTopicUnlocked = (topicNumber, lessonIndex) => {
    // If lesson is locked, all topics are locked
    if (!isLessonUnlocked(lessonIndex)) return false;

    // If roadmapResponse is empty, only topic 1 is unlocked
    if (
      !roadmapResponse?.progress ||
      (!roadmapResponse.progress.completedLessons?.length &&
        !roadmapResponse.progress.completedTopics?.length &&
        !roadmapResponse.progress.completedAssessments?.length)
    ) {
      return topicNumber === 1;
    }

    // Topic 1 is always unlocked if lesson is unlocked
    if (topicNumber === 1) return true;

    // Check if previous topic's assessment is completed
    const prevAssessmentNumber = topicNumber - 1;
    return (
      roadmapResponse.progress.completedAssessments?.includes(
        prevAssessmentNumber
      ) || false
    );
  };

  // Function to check if an assessment is unlocked
  const isAssessmentUnlocked = (assessmentNumber, lessonIndex) => {
    // If lesson is locked, all assessments are locked
    if (!isLessonUnlocked(lessonIndex)) return false;

    // If roadmapResponse is empty, only assessment 1 is unlocked if topic 1 is completed
    if (
      !roadmapResponse?.progress ||
      (!roadmapResponse.progress.completedLessons?.length &&
        !roadmapResponse.progress.completedTopics?.length &&
        !roadmapResponse.progress.completedAssessments?.length)
    ) {
      if (assessmentNumber === 1) {
        return roadmapResponse.progress?.completedTopics?.includes(1) || false;
      }
      return false;
    }

    // Assessment is unlocked if corresponding topic is completed
    return (
      roadmapResponse.progress.completedTopics?.includes(assessmentNumber) ||
      false
    );
  };

  // Function to check if an item is completed
  const isTopicCompleted = (topicNumber) => {
    return (
      roadmapResponse.progress?.completedTopics?.includes(topicNumber) || false
    );
  };

  const isAssessmentCompleted = (assessmentNumber) => {
    return (
      roadmapResponse.progress?.completedAssessments?.includes(
        assessmentNumber
      ) || false
    );
  };

  // Function to slide to specific lesson
  const slideToLesson = (lessonIndex) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(lessonIndex, 800); // 800ms animation
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assessmentResponse = await studentAssessmentApi.getStudentAssessments(user.userID);
        setAsessments(assessmentResponse);

        const response = await studentClassroomApi.fetchRoadmapProgress(
          user.userID
        );
        setRoadmapResponse(response);

        console.log("Roadmap Progress:", response);

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
          setSelectedButton(`lesson-${firstLesson.lessonId}-topic-1`);
          setSelectedLessonData({
            lessonId: firstLesson.lessonId,
            topicNumber: 1,
            lessonNumber: 1,
            type: "topic",
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

      console.log(data);

      const response = await studentApi.submitLeaveRequest(data);
      if (response) {
        console.log("Submitted Leave Request", response);
        setShowConfirmation(false);
      }
    } catch (error) {
      console.error("Error leaving classroom:", error.message);
    }
  };

  const isLessonCompleted = (lessonIndex) => {
    const lessonTopics = getLessonTopics(lessonIndex);
    const lessonAssessmentCount = lessonConfig[lessonIndex].assessmentCount;
    const startTopic = getLessonStartTopic(lessonIndex);

    // Check if all topics in this lesson are completed
    const allTopicsCompleted = lessonTopics.every((topicNumber) =>
      isTopicCompleted(topicNumber)
    );

    // Check if all assessments in this lesson are completed
    const allAssessmentsCompleted = Array.from(
      { length: lessonAssessmentCount },
      (_, i) => startTopic + i
    ).every((assessmentNumber) => isAssessmentCompleted(assessmentNumber));

    return allTopicsCompleted && allAssessmentsCompleted;
  };

  const handleButtonClick = (
    buttonId,
    lessonId,
    itemNumber,
    lessonNumber,
    type
  ) => {
    setSelectedButton(buttonId);

    // Slide to center the lesson
    slideToLesson(lessonNumber - 1);

    setSelectedLessonData({
      lessonId,
      topicNumber: type === "topic" ? itemNumber : null,
      assessmentNumber: type === "assessment" ? itemNumber : null,
      lessonNumber,
      type,
    });
  };

  const handleEnterLesson = async () => {
    if (!selectedLessonData) return;

    try {
      const data = {
        classroomId: classroom.classroomId,
        studentId: user.userID,
        lessonId: selectedLessonData.lessonId,
      };

      await studentLessonApi.enterLesson(data);

      if (selectedLessonData.type === "topic") {

        const enterTopicData = {
          classroomId: classroom.classroomId,
          studentId: user.userID,
          lessonId: selectedLessonData.topicNumber
        };
        
        try  {
          const topicResponse = await studentTopicApi.enterTopic(enterTopicData);
          if (topicResponse) {
            navigate(
              `lesson/${selectedLessonData.lessonId}/topic/${selectedLessonData.topicNumber}`
            );
          }
        } catch (errorz) {
          console.error("Error entering topic:", errorz.message);
        }
      } else if (selectedLessonData.type === "assessment") {

        try {
          const assessmentResponse = await studentAssessmentApi.enterAssessment(assessments[selectedLessonData.assessmentNumber - 1]);
          if (assessmentResponse) {
            navigate(
              `lesson/${selectedLessonData.lessonId}/assessment/${selectedLessonData.assessmentNumber}`
            );
          }
        } catch (error) {
          console.error("Error entering assessnebt:", error.message);
        }
      }
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

        {/* Selected Item Info Card */}
        {selectedLessonData && (
          <div className="p-6 bg-white rounded-lg shadow-[4px_4px_0px_#0b1e2d] border border-black">
            {selectedLessonData.type === "topic" ? (
              <>
                <h2 className="text-xl font-bold mb-2">
                  Lesson {selectedLessonData.lessonNumber} - Topic{" "}
                  {selectedLessonData.topicNumber}
                </h2>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#6e61ff" }}
                >
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
                {isTopicCompleted(selectedLessonData.topicNumber) && (
                  <div className="mb-4 p-2 bg-green-100 text-green-800 rounded-lg text-sm flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Completed
                  </div>
                )}
                <button
                  onClick={handleEnterLesson}
                  className="w-full text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                  style={{
                    backgroundColor: "#6e61ff",
                    ":hover": { backgroundColor: "#5b4ecc" },
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#5b4ecc")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#6e61ff")
                  }
                >
                  {isTopicCompleted(selectedLessonData.topicNumber)
                    ? "Review Topic"
                    : "Proceed to Topic"}
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-2">
                  Assessment {selectedLessonData.assessmentNumber}
                </h2>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  Topic {selectedLessonData.assessmentNumber} Assessment
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Test your understanding of the concepts learned in Topic{" "}
                  {selectedLessonData.assessmentNumber}.
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
                    10 min
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
                      <path d="M9 11H7a2 2 0 000 4h2m6-4h2a2 2 0 110 4h-2m-6-4h6" />
                    </svg>
                    Assessment
                  </div>
                </div>
                {isAssessmentCompleted(selectedLessonData.assessmentNumber) && (
                  <div className="mb-4 p-2 bg-green-100 text-green-800 rounded-lg text-sm flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Completed
                  </div>
                )}
                <button
                  onClick={handleEnterLesson}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                >
                  {isAssessmentCompleted(selectedLessonData.assessmentNumber)
                    ? "Review Assessment"
                    : "Start Assessment"}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col relative ml-8 w-3/4 h-full">
        <div className="flex justify-center mb-4">
          <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow">
            Navigate through lessons • Follow the roadmap
          </div>
        </div>

        <div className="flex-1 relative">
          {isLoading ? (
            <div className="text-center text-gray-500 flex items-center justify-center h-full">
              Loading lessons...
            </div>
          ) : (
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, FreeMode]}
              spaceBetween={50}
              slidesPerView={"auto"}
              centeredSlides={true}
              freeMode={true}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="w-full h-full"
              style={{
                paddingBottom: "50px",
              }}
            >
              {lessons.map((lesson, lessonIndex) => {
                const lessonTopics = getLessonTopics(lessonIndex);
                const isMainLessonUnlocked = isLessonUnlocked(lessonIndex);

                return (
                  <SwiperSlide key={lesson.lessonId} style={{ width: "auto" }}>
                    <div className="flex flex-col items-center space-y-4 px-8 relative py-15">
                      {/* Big lesson button */}
                      <AnimatedLessonButton
                        label={"Lesson No " + (lessonIndex + 1)}
                        onClick={() => {
                          if (isMainLessonUnlocked) {
                            // Select first topic of this lesson
                            const firstTopic = lessonTopics[0];
                            handleButtonClick(
                              `lesson-${lesson.lessonId}-topic-${firstTopic}`,
                              lesson.lessonId,
                              firstTopic,
                              lessonIndex + 1,
                              "topic"
                            );
                          }
                        }}
                        onEnterLesson={() => {}}
                        isSelected={selectedButton?.startsWith(
                          `lesson-${lesson.lessonId}`
                        )}
                        className="w-full min-w-[200px]"
                        locked={!isMainLessonUnlocked}
                        isCompleted={isLessonCompleted(lessonIndex)} // Add this line
                      />

                      {/* Topics and Assessments with connecting lines */}
                      <div className="flex flex-col space-y-6 items-center relative">
                        {/* SVG for connecting lines */}
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none z-0"
                          style={{ overflow: "visible" }}
                        >
                          {lessonTopics.map((topicNumber, topicIndex) => {
                            if (topicIndex === lessonTopics.length - 1)
                              return null; // Don't draw line after last topic

                            // Better positioning calculations that match the flex layout
                            const rowSpacing = 96; // space-y-6 = 24px + button height + margins ≈ 96px
                            const currentRowY = 60 + topicIndex * rowSpacing; // Start offset + row spacing
                            const nextRowY = currentRowY + rowSpacing;

                            // Horizontal positioning - adjust these values based on your button widths
                            const topicCenterX = 60; // Center of topic button (adjust as needed)
                            const assessmentCenterX = 160; // Center of assessment button (adjust as needed)
                            const connectionPointX = 110; // Middle point between buttons

                            return (
                              <g key={`line-${topicNumber}`}>
                                {/* Line from topic to assessment (horizontal) */}
                                <line
                                  x1={topicCenterX + 40} // Right edge of topic button
                                  y1={currentRowY}
                                  x2={assessmentCenterX - 25} // Left edge of assessment button
                                  y2={currentRowY}
                                  stroke={
                                    isTopicCompleted(topicNumber)
                                      ? "#22c55e"
                                      : "#e5e7eb"
                                  }
                                  strokeWidth="3"
                                  strokeDasharray={
                                    isTopicCompleted(topicNumber)
                                      ? "none"
                                      : "5,5"
                                  }
                                />

                                {/* Line from assessment down (vertical) */}
                                <line
                                  x1={assessmentCenterX}
                                  y1={currentRowY + 25} // Bottom of assessment button
                                  x2={assessmentCenterX}
                                  y2={currentRowY + rowSpacing * 0.6} // Partway down
                                  stroke={
                                    isAssessmentCompleted(topicNumber)
                                      ? "#22c55e"
                                      : "#e5e7eb"
                                  }
                                  strokeWidth="3"
                                  strokeDasharray={
                                    isAssessmentCompleted(topicNumber)
                                      ? "none"
                                      : "5,5"
                                  }
                                />

                                {/* Line from right side to left side (horizontal) */}
                                <line
                                  x1={assessmentCenterX}
                                  y1={currentRowY + rowSpacing * 0.6}
                                  x2={topicCenterX}
                                  y2={currentRowY + rowSpacing * 0.6}
                                  stroke={
                                    isAssessmentCompleted(topicNumber)
                                      ? "#22c55e"
                                      : "#e5e7eb"
                                  }
                                  strokeWidth="3"
                                  strokeDasharray={
                                    isAssessmentCompleted(topicNumber)
                                      ? "none"
                                      : "5,5"
                                  }
                                />

                                {/* Line from left side to next topic (vertical) */}
                                <line
                                  x1={topicCenterX}
                                  y1={currentRowY + rowSpacing * 0.6}
                                  x2={topicCenterX}
                                  y2={nextRowY - 25} // Top of next topic button
                                  stroke={
                                    isAssessmentCompleted(topicNumber)
                                      ? "#22c55e"
                                      : "#e5e7eb"
                                  }
                                  strokeWidth="3"
                                  strokeDasharray={
                                    isAssessmentCompleted(topicNumber)
                                      ? "none"
                                      : "5,5"
                                  }
                                />
                              </g>
                            );
                          })}
                        </svg>

                        {lessonTopics.map((topicNumber, topicIndex) => {
                          const topicButtonId = `lesson-${lesson.lessonId}-topic-${topicNumber}`;
                          const assessmentButtonId = `lesson-${lesson.lessonId}-assessment-${topicNumber}`;
                          const isTopicLocked = !isTopicUnlocked(
                            topicNumber,
                            lessonIndex
                          );
                          const isAssessmentLocked = !isAssessmentUnlocked(
                            topicNumber,
                            lessonIndex
                          );

                          return (
                            <div
                              key={topicNumber}
                              className="flex items-center space-x-8 relative z-10"
                            >
                              {/* Topic Button */}
                              <div className="flex justify-center">
                                <AnimatedLessonButton
                                  label={`Topic ${topicNumber}`}
                                  onClick={() => {
                                    if (!isTopicLocked) {
                                      handleButtonClick(
                                        topicButtonId,
                                        lesson.lessonId,
                                        topicNumber,
                                        lessonIndex + 1,
                                        "topic"
                                      );
                                    }
                                  }}
                                  onEnterLesson={() => handleEnterLesson()}
                                  isSelected={selectedButton === topicButtonId}
                                  className="scale-75 h-15 relative"
                                  isLesson={true}
                                  locked={isTopicLocked}
                                  isCompleted={isTopicCompleted(topicNumber)} // Add this line
                                />
                                {/* Completion checkmark for topic */}
                                {isTopicCompleted(topicNumber) && (
                                  <div className="absolute top-8 -right-6 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs z-20">
                                    ✓
                                  </div>
                                )}
                              </div>

                              {/* Assessment Button - Now using AnimatedAssessmentButton */}
                              <div className="flex justify-center relative">
                                <AnimatedAssessmentButton
                                  label={`A${topicNumber}`}
                                  onClick={() => {
                                    if (!isAssessmentLocked) {
                                      handleButtonClick(
                                        assessmentButtonId,
                                        lesson.lessonId,
                                        topicNumber,
                                        lessonIndex + 1,
                                        "assessment"
                                      );
                                    }
                                  }}
                                  onEnterLesson={() => handleEnterLesson()}
                                  isSelected={
                                    selectedButton === assessmentButtonId
                                  }
                                  className=""
                                  locked={isAssessmentLocked}
                                  assessmentNumber={topicNumber}
                                  isCompleted={isAssessmentCompleted(
                                    topicNumber
                                  )} // Add this line
                                />
                                {/* Completion checkmark for assessment */}
                                {isAssessmentCompleted(topicNumber) && (
                                  <div className="absolute bottom-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs z-20">
                                    ✓
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Connection line to next lesson */}
                      {lessonIndex < lessons.length - 1 && (
                        <div className="absolute right-0 top-1/2 transform translate-x-8 -translate-y-1/2">
                          <svg width="40" height="4">
                            <line
                              x1="0"
                              y1="2"
                              x2="40"
                              y2="2"
                              stroke={
                                isLessonUnlocked(lessonIndex + 1)
                                  ? "#22c55e"
                                  : "#e5e7eb"
                              }
                              strokeWidth="4"
                              strokeDasharray={
                                isLessonUnlocked(lessonIndex + 1)
                                  ? "none"
                                  : "8,8"
                              }
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition-colors">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full border-black border-2">
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
