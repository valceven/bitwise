import React, { useState, useRef } from "react";
import Lottie from "lottie-react";
// Existing animations
import hoverAnimation from "../../assets/assessmentHover.json";
import hoverAnimationLocked from "../../assets/AnimatedHoveredButtonLocked.json";
import defaultAnimation from "../../assets/assessmentIdle.json";
import defaultAnimationLocked from "../../assets/defaultTopicButtonLocked.json";
import pressedAnimation from "../../assets/assessmentPressed.json";
// New completed animations for assessments
import completeHoverAssessment from "../../assets/completeHover.json"; // if you have assessment-specific ones
import completeDefaultAssessment from "../../assets/completeDefault.json";
import completePressedAssessment from "../../assets/completePressed.json";
// OR if you want to reuse the same completed animations from lesson buttons:
// import completeHover from "../../assets/completeHover.json";
// import completeDefault from "../../assets/completeDefault.json";
// import completePressed from "../../assets/completePressed.json";
import indelSvg from "../../assets/bitbot/idle.svg";
import mainStarSvg from "../../assets/main_star.svg";

const AnimatedAssessmentButton = ({
  label,
  onClick,
  onEnterLesson,
  isSelected,
  className,
  locked,
  assessmentNumber,
  isCompleted, // New prop for completed state
}) => {
  const [state, setState] = useState("default");
  const animationRef = useRef();

  const getAnimation = () => {
    // Priority: completed > locked > normal
    if (isCompleted) {
      switch (state) {
        case "hover":
          return completeHoverAssessment; // or completeHover if reusing
        case "pressed":
          return completePressedAssessment; // or completePressed if reusing
        default:
          return completeDefaultAssessment; // or completeDefault if reusing
      }
    } else if (locked) {
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
        className={`flex items-center justify-center rounded-xl transition-all duration-300 ${
          locked ? "cursor-not-allowed" : "cursor-pointer"
        } z-50 ${className}`}
      >
        <div
          className="flex items-center justify-center w-20 h-20 relative"
          onClick={handleClick}
        >
          {/* Lottie Animation Background */}
          <div className="absolute inset-0 scale-75">
            <Lottie
              animationData={getAnimation()}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              loop={state !== "pressed"}
              autoplay
              lottieRef={animationRef}
              className="w-full h-full"
            />
          </div>

          {/* Assessment Icon and Label Overlay */}
          <div
            className={`relative z-10 flex flex-col items-center justify-center transition-all duration-300 ${
              isSelected
                ? "text-white"
                : locked
                ? "text-gray-500"
                : isCompleted
                ? "text-white" // Keep white text for completed assessments
                : "text-white"
            }`}
          ></div>

          {/* Show SVG for assessment buttons when selected */}
          {!locked && isSelected && (
            <div className="absolute -translate-y-full w-full h-10 z-50 border-black transition-opacity duration-300 ease-in-out flex items-center justify-center">
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

export default AnimatedAssessmentButton;
