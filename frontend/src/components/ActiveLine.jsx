import React from 'react';
import activeLineAnimation from '../assets/activeLine.json'
import Lottie from 'lottie-react';

export default function ActiveLine() {
  return (
    <Lottie
      animationData={activeLineAnimation}
      loop
      
    />
  );
}
