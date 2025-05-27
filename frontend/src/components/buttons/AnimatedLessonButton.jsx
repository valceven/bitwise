import React, { useState, useRef } from "react";
import Lottie from "lottie-react";
import hoverAnimation from "../../assets/AnimatedHoveredButton.json";
import hoverAnimationLocked from "../../assets/AnimatedHoveredButtonLocked.json";
import defaultAnimation from "../../assets/defaultTopicButton.json";
import defaultAnimationLocked from "../../assets/defaultTopicButtonLocked.json";
import pressedAnimation from "../../assets/pressedAnimationTopicButton.json";
import indelSvg from "../../assets/bitbot/idle.svg";
import mainStarSvg from "../../assets/main_star.svg";

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

  // Determine which SVG to use based on whether it's a main lesson button
  const getSvgToUse = () => {
    // Check if this is a main lesson button (contains "Lesson No" in the label)
    if (label && label.includes("Lesson No")) {
      return mainStarSvg;
    }
    return indelSvg;
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

          {/* Show SVG for buttons when selected */}
          {!locked && isSelected && (
            <div className="flex absolute -translate-y-5/6 w-full h-14  z-50 border-black transition-opacity duration-300 ease-in-out flex items-center justify-center">
              <img
                src={getSvgToUse()}
                alt={
                  label && label.includes("Lesson No") ? "Main Star" : "Idle"
                }
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
