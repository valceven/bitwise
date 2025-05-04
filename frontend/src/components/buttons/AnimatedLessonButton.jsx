import React, { useState, useRef } from "react";
import Lottie from "lottie-react";
import hoverAnimation from "../../assets/AnimatedHoveredButton.json";
import defaultAnimation from "../../assets/defaultTopicButton.json";
import pressedAnimation from "../../assets/Animation-robot.json";

const AnimatedLessonButton = ({ label, onClick, isSelected, className }) => {
  const [state, setState] = useState("default");
  const animationRef = useRef();

  const getAnimation = () => {
    switch (state) {
      case "hover":
        return hoverAnimation;
      case "pressed":
        return pressedAnimation;
      default:
        return defaultAnimation;
    }
  };

  const handleClick = () => {
    setState("pressed");
    setTimeout(() => {
      setState("default");
      onClick();
    }, 500);
  };

  return (
    <div className="relative flex items-center">
      <div
        className={`flex items-center pl-2 rounded-xl transition-all duration-300 cursor-pointer z-50 ${className}`}
      >
        <div className="flex mx-auto w-20 h-32 relative" onClick={handleClick}>
          <Lottie
            animationData={getAnimation()}
            loop={state !== "pressed"}
            autoplay
            lottieRef={animationRef}
          />

          {isSelected && (
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white rounded-lg p-4 w-64 z-50 border-black transition-opacity duration-300 ease-in-out border shadow-[4px_4px_0px_#0b1e2d]">
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-white border-t border-r border-black transform rotate-45 "></div>
              </div>
              <div className="font-bold text-lg text-blue-600">{label}</div>
              <p className="text-gray-600 mb-3 text-sm">
                Learn more about this exciting topic and discover new concepts.
              </p>
              <div className="flex flex-row items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  30 min
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                  Beginner
                </div>
              </div>
              <div className="flex items-center justify-center p-2 addgrotesk bg-black text-white rounded-lg text-xs mt-4 cursor-pointer hover:bg-gray-800 transition duration-300">
                Enter Lesson
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLessonButton;
