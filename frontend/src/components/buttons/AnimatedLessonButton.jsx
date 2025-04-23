// src/components/AnimatedLessonButton.jsx
import React, { useState, useRef } from 'react';
import Lottie from 'lottie-react';
import defaultAnimation from "../../assets/roadmap-button.json";
import hoverAnimation from "../../assets/hover-roadmap-button.json";
import pressedAnimation from "../../assets/pressed-roadmap-button.json";

const AnimatedLessonButton = ({ lesson, onClick }) => {
  const [state, setState] = useState('default');
  const animationRef = useRef();

  const getAnimation = () => {
    switch (state) {
      case 'hover': return hoverAnimation;
      case 'pressed': return pressedAnimation;
      default: return defaultAnimation;
    }
  };

  const handleMouseEnter = () => {
    if (state !== 'pressed') setState('hover');
  };

  const handleMouseLeave = () => {
    if (state !== 'pressed') setState('default');
  };

  const handleClick = () => {
    setState('pressed');
    setTimeout(() => {
      setState('default');
      onClick();
    }, 500);
  };

  return (
    <div
      className="w-32 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Lottie
        key={state}
        lottieRef={animationRef}
        animationData={getAnimation()}
        loop={false}
      />
      <div className="font-medium text-lg flex -mt-5 justify-center">
        {lesson}
      </div>
    </div>
  );
};

export default AnimatedLessonButton;
