import React, { useState, useRef } from "react";
import Lottie from "lottie-react";
import hoverAnimation from "../../assets/AnimatedHoveredButton.json";
import hoverAnimationLocked from "../../assets/AnimatedHoveredButtonLocked.json";
import defaultAnimation from "../../assets/defaultTopicButton.json";
import defaultAnimationLocked from "../../assets/defaultTopicButtonLocked.json";
import pressedAnimation from "../../assets/pressedAnimationTopicButton.json";
// Import the new completed animations
import completeHover from "../../assets/completeHover.json";
import completeDefault from "../../assets/completeDefault.json";
import completePressed from "../../assets/completePressed.json";

const AnimatedLessonButton = ({
  label,
  onClick, // keeps the current Lottie interaction logic
  onEnterLesson, // new prop for the "Enter Lesson" button
  isSelected,
  className,
  locked,
  isLesson,
  isCompleted, // new prop for completed state
}) => {
  const [state, setState] = useState("default");
  const animationRef = useRef();

  const getAnimation = () => {
    // Priority: completed > locked > normal
    if (isCompleted) {
      switch (state) {
        case "hover":
          return completeHover;
        case "pressed":
          return completePressed;
        default:
          return completeDefault;
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
        </div>
      </div>
    </div>
  );
};

export default AnimatedLessonButton;
