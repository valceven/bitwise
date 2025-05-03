import React, { useState, useRef } from 'react';
import Lottie from 'lottie-react';
import hoverAnimation from '../../assets/AnimatedHoveredButton.json';
import defaultAnimation from "../../assets/defaultTopicButton.json";
import pressedAnimation from "../../assets/Animation-robot.json"; // You need this

const AnimatedTopicButton = ({ topic, onClick, isSelected }) => {
  const [state, setState] = useState('default');
  const animationRef = useRef();

  const getAnimation = () => {
    switch (state) {
      case 'hover': return hoverAnimation;
      case 'pressed': return defaultAnimation;
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
      onClick(); // This will update the selected topic
    }, 500);
  };

  return (
    <Lottie
      animationData={getAnimation()}
      loop={state !== 'pressed'}
      autoplay
      lottieRef={animationRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="w-24 h-24 cursor-pointer"
    />
  );
};

export default AnimatedTopicButton;
