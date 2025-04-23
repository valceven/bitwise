import React from "react";
import AnimatedLessonButton from "../../components/buttons/AnimatedLessonButton.jsx";

const ClassroomView = () => {
  const lessons = ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4", "Lesson 5", "Lesson 6", "Lesson 7"];

  return (
    <div className="h-[calc(100vh-14.5rem)]">
      <div className="w-7/8 flex space-x-24 overflow-x-auto thin-scrollbar h-full items-center">
        {lessons.map((lesson, index) => (
          <div className="" key={index}>
          <AnimatedLessonButton
            lesson={lesson}
            onClick={() => console.log(`${lesson} clicked`)}
            />
            </div>
        ))}
      </div>
    </div>
  );
};

export default ClassroomView;
