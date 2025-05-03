import React from 'react';
import pathLineAnimation from '../assets/pathLine.json'; // Adjust the path as necessary
import Lottie from 'lottie-react';

export default function PathLine() {
  return (
    <Lottie
      animationData={pathLineAnimation}
      loop
    />
  );
}
