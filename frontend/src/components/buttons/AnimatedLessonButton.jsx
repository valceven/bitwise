import React, { useState, useRef } from "react";
import Lottie from "lottie-react";
import hoverAnimation from "../../assets/AnimatedHoveredButton.json";
import hoverAnimationLocked from "../../assets/AnimatedHoveredButtonLocked.json";
import defaultAnimation from "../../assets/defaultTopicButton.json";
import defaultAnimationLocked from "../../assets/defaultTopicButtonLocked.json";
import pressedAnimation from "../../assets/pressedAnimationTopicButton.json";

const AnimatedLessonButton = ({
  label,
  onClick, // keeps the current Lottie interaction logic
  onEnterLesson, // new prop for the "Enter Lesson" button
  isSelected,
  className,
  locked,
}) => {
  const [state, setState] = useState("default");
  const animationRef = useRef();

  const getAnimation = () => {
    if (locked) {
      switch (state) {
        case "hover":
          return hoverAnimationLocked;
        default:
          return defaultAnimationLocked;
      }
    } else {
      switch (state) {
        case "hover":
          return hoverAnimation;
        case "pressed":
          return pressedAnimation;
        default:
          return defaultAnimation;
      }
    }
  };

  const handleMouseEnter = () => {
    if (locked) {
      setState("hover"); // Still allow hover animation for locked
    } else if (state !== "pressed") {
      setState("hover");
    }
  };

  const handleMouseLeave = () => {
    if (state !== "pressed") setState("default");
  };

  const handleClick = () => {
    if (locked) return; // Block clicks on locked
    setState("pressed");
    setTimeout(() => {
      setState("default");
      onClick();
    }, 500);
  };

  return (
    <div className="relative flex items-center">
      <div
        className={`flex items-center pl-3 rounded-xl transition-all duration-300 ${
          locked ? "cursor-not-allowed" : "cursor-pointer"
        } z-50 ${className}`}
      >
        <div className="flex mx-auto w-20 h-40 relative" onClick={handleClick}>
          <Lottie
            animationData={getAnimation()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            loop={state !== "pressed"}
            autoplay
            lottieRef={animationRef}
            className="z-50"
          />

          {/* Show lesson details ONLY if unlocked and selected */}
          {!locked && isSelected && (
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
                  30 min
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
                  Beginner
                </div>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation(); // prevent bubbling to parent
                  if (onEnterLesson) onEnterLesson(); // trigger only onEnterLesson
                }}
                className="flex items-center justify-center p-2 addgrotesk bg-black text-white rounded-lg text-xs mt-4 cursor-pointer hover:bg-gray-800 transition duration-300"
              >
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
