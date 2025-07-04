import React, { useState, useEffect } from "react";
import { Line } from "rc-progress";
import TopicCard from "../../../components/TopicCard";
import Button from "../../../components/buttons/PurpleButton";
import { useParams, useNavigate } from "react-router-dom";
import { classroomApi } from "../../../api/classroom/classroomApi";
import { studentTopicApi } from "../../../api/studentTopic/studentTopicApi";
import { useAuthGuard } from "../../../hooks/useAuthGuard";
import { topic1Sections } from "../../../components/sections/lesson1/topic1/Topic1Sections";
import { topic4Sections } from "../../../components/sections/lesson2/topic4/Topic4Sections";
import { topic2Sections } from "../../../components/sections/lesson1/topic2/Topic2Sections";
import { topic3Sections } from "../../../components/sections/lesson1/topic3/Topic3Sections";
import { topic5Sections } from "../../../components/sections/lesson2/topic5/Topic5Sections";
import { topic6Sections } from "../../../components/sections/lesson2/topic6/Topic6Sections";
import { topic7Sections } from "../../../components/sections/lesson3/topic7/Topic7Sections";
import { topic8Sections } from "../../../components/sections/lesson4/topic8/Topic8Sections";
import { topic9Sections } from "../../../components/sections/lesson4/topic9/Topic9Sections";
import EditBackground from "../../../components/EditBackgroud";

const TopicView = () => {
  const { classCode, topicId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthGuard();
  const [classroom, setClassroom] = useState({});

  //need to check for lesson as well
  const topics = [
    { id: "1", lessonId: "1", topicSections: topic1Sections },
    { id: "2", lessonId: "1", topicSections: topic2Sections },
    { id: "3", lessonId: "1", topicSections: topic3Sections },
    { id: "4", lessonId: "2", topicSections: topic4Sections },
    { id: "5", lessonId: "2", topicSections: topic5Sections },
    { id: "6", lessonId: "2", topicSections: topic6Sections },
    { id: "7", lessonId: "3", topicSections: topic7Sections },
    { id: "8", lessonId: "4", topicSections: topic8Sections },
    { id: "9", lessonId: "4", topicSections: topic9Sections },
  ];

  const matchedTopic = topics.find((u) => u.id === topicId);
  const topicSections = matchedTopic?.topicSections || [];

  const [isCompleted, setIsCompleted] = useState(() => {
    const storedStatus = localStorage.getItem(`topicStatus-${topicId}`);
    return storedStatus === "complete";
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    const storedIndex = localStorage.getItem(`topicIndex-${topicId}`);
    return storedIndex ? parseInt(storedIndex) : 0;
  });

  useEffect(() => {
    const viewTopic = async () => {
      const response = await classroomApi.fetchClassroomByClassCode(classCode);
      setClassroom(response);

      const data = {
        classroomId: response.classroomId,
        topicId: +topicId,
        studentId: user.userID,
      };

      try {
        await studentTopicApi.enterTopic(data);
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };

    viewTopic();
  }, [topicId]);

  const handleNext = () => {
    if (currentIndex < topicSections.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    const dataz = {
      classroomId: classroom.classroomId,
      topicId: +topicId,
      studentId: user.userID,
    };

    try {
      const response = await studentTopicApi.completeTopic(dataz);
      if (response) {
        navigate(`/app/classroom/student/${classroom.classCode}`, {
          state: { topicId, status: "complete" },
        });
      }
    } catch (error) {
      console.error("Error completing student: ", error.message);
    }
  };

  const progress = ((currentIndex + 1) / topicSections.length) * 100;

  return (
    <>
      <div className="min-h-screen relative">
        <EditBackground />
      </div>

      <div className="relative z-10 flex-col justify-center items-center h-full w-3/4 pb-16">
        {/* <EditBackground /> */}
        <div className="p-4">
          <Line percent={progress} strokeWidth={1} strokeColor="#27ae60" />
        </div>
        <div className="flex flex-col justify-center items-end space-y-4 w-full">
          <TopicCard topic={topicSections[currentIndex]} />
          <div className="flex justify-end items-end">
            {currentIndex > 0 && (
              <Button
                className="fixed bg-bluez btn-shadow items-end bottom-10 mr-22"
                onClick={handlePrevious}
                disabled={currentIndex <= 0}
              >
                Previous
              </Button>
            )}

            {currentIndex >= topicSections.length - 1 ? (
              <Button
                className="fixed bg-green-600 btn-shadow items-end bottom-10"
                onClick={handleFinish}
              >
                Finish
              </Button>
            ) : (
              <Button
                className="fixed bg-bluez btn-shadow items-end bottom-10"
                onClick={handleNext}
                disabled={currentIndex >= topicSections.length - 1}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicView;
