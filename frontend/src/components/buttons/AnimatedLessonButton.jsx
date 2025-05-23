import React, { useState, useRef } from "react";
import Lottie from "lottie-react";
import hoverAnimation from "../../assets/AnimatedHoveredButton.json";
import hoverAnimationLocked from "../../assets/AnimatedHoveredButtonLocked.json";
import defaultAnimation from "../../assets/defaultTopicButton.json";
import defaultAnimationLocked from "../../assets/defaultTopicButtonLocked.json";
import pressedAnimation from "../../assets/pressedAnimationTopicButton.json";
import indelSvg from "../../assets/bitbot/idle.svg";

const AnimatedLessonButton = ({
  label,
  onClick, // keeps the current Lottie interaction logic
  onEnterLesson, // new prop for the "Enter Lesson" button
  isSelected,
  className,
  locked,
  isLesson,
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
        <div className="flex mx-auto w-20 h-20 relative" onClick={handleClick}>
          <Lottie
            animationData={getAnimation()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            loop={state !== "pressed"}
            autoplay
            lottieRef={animationRef}
            className="z-50"
          />

          {/* Show lesson details ONLY if unlocked and selected - positioned at top */}
          {!locked && isSelected && !isLesson && (
            <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 bg-white rounded-lg p-4 w-36 z-50 border-black transition-opacity duration-300 ease-in-out border shadow-[4px_4px_0px_#0b1e2d]">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-4 h-4 bg-white border-l border-b border-black transform rotate-315"></div>
              </div>
              <div className="font-bold text-lg text-blue-600">{label}</div>
            </div>
          )}

          {/* Show SVG for lesson buttons when selected */}
          {!locked && isSelected && isLesson && (
            <div className="absolute right-full top-1/2 -translate-y-1/2 p-6 w-40 h-40 z-50 border-black transition-opacity duration-300 ease-in-out flex items-center justify-center">
              <img
                src={indelSvg}
                alt="Idle"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLessonButton;
