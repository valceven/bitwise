import React, { useState } from "react";
import AnimatedTopicButton from "../../../components/buttons/AnimatedTopicButton";
import TopicCard from "../../../components/TopicCard";
//import LessonCard from "../../../components/LessonCard";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/buttons/PurpleButton";
import gridBox from "../../../assets/gridbox.svg";
import { useEffect } from "react";

const LessonView = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const { lessonId } = useParams();

  const allTopics = [
    { id: 1, lessonId: "1" },
    { id: 2, lessonId: "1" },
    { id: 3, lessonId: "1" },
    { id: 4, lessonId: "2" },
    { id: 5, lessonId: "2" },
    { id: 6, lessonId: "2" },
    { id: 7, lessonId: "3" },
    { id: 8, lessonId: "4" },
    { id: 9, lessonId: "4" },
  ];

  const topics = allTopics.filter((topic) => topic.lessonId === lessonId);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    if (topics.length > 0) {
      setSelectedTopic(topics[0].id);
    }
  }, [lessonId]);

  const handleTopicClick = (topicId) => {
    setSelectedTopic(topicId); // now it's just a number
    setShowConfirmation(false);
  };

  const handleProceedTopic = (topicId) => {
    navigate(`topic/${topicId}`);
  };

  return (
    <div
      className="flex w-full p-8 px-14 justify-between"
      style={{
        backgroundImage: `url(${gridBox})`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      {!showConfirmation && (
        <div className="w-2/5 h-min p-6 bg-white rounded-xl shadow-[4px_4px_0px_#0b1e2d] border border-black ">
          {/* Lesson Header */}
          <div className="">
            <h1 className="text-2xl font-bold">Basic Boolean Algebra</h1>
            <h2 className="text-xl font-bold">{selectedTopic}</h2>
            <p className="text-gray-600 mt-2">
              Boolean Algebra is a mathematical structure used to analyze and
              simplify logical statements. It is the backbone of all digital
              systems — from the simplest calculators to the most complex
              supercomputers. But before we dive into how it works, it's
              important to know where it all began.
            </p>
          </div>

          <div className="w-full mt-6 border border-gray-300 rounded-md p-4 bg-gray-50">
            <h2 className="font-semibold mb-4">Laws of Boolean Algebra:</h2>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-green-600">✔️</span>
                  <span>Feature text goes here</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              className="bg-bluez btn-shadow items-end"
              onClick={() => handleProceedTopic(selectedTopic)}
            >
              Proceed to Topic
            </Button>
          </div>
        </div>
      )}

      <div className="w-150 flex flex-col z-0 pt-7 mr-20">
        {topics.map((topic, index) => (
          <div
            key={topic.id}
            className={`w-3/5 flex mx-auto ${
              index % 2 === 0 ? "justify-start" : "justify-end pr-7"
            }`}
          >
            <AnimatedTopicButton
              key={topic.id}
              topic={topic.id}
              isSelected={selectedTopic === topic.id}
              onClick={() => handleTopicClick(topic.id)}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonView;
