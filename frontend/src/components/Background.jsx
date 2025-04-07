import React from "react";

const Background = () => {
  return (
    <div className="absolute inset-0 bg-offwhite opacity-30 z-0">
      <div className="grid grid-cols-4 gap-10 w-full h-1/4">
        {/* Example icons */}
        <div className="flex justify-center items-center">
          <img draggable='false' src="/src/assets/Stairs-2.svg" alt="Icon 1" className="sm:w-16 md:w-20 lg:w-24 opacity-75 transform rotate-[-30deg]" />
        </div>
        <div className="flex justify-center items-center">
          <img draggable='false' src="/src/assets/Periwinkle.svg" alt="Icon 2" className="w-12 h-12 opacity-75" />
        </div>
        <div className="flex justify-center items-center">
          <img draggable='false' src="/src/assets/Stairs-2.svg" alt="Icon 3" className="sm:w-10 md:w-12 lg:w-16 opacity-75 transform rotate-[-30deg]" />
        </div>
        <div className="flex justify-center items-center">
          <img draggable='false' src="/src/assets/Pill.svg" alt="Icon 3" className="sm:w-10 md:w-12 lg:w-16 opacity-75 transform rotate-[30deg]" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 w-full h-2/4">
        <div className="flex justify-center items-center">
            <img draggable='false' src="/src/assets/Star.svg" alt="Icon 1" className="w-16 sm:w-20 md:w-24 lg:w-30 opacity-75 transform rotate-[-30deg]" />
        </div>
        <div className="flex justify-center items-center">
            
        </div>
        <div className="flex justify-center items-center">
            <img draggable='false' src="/src/assets/Tube.svg" alt="Icon 1" className="w-16 sm:w-20 md:w-24 lg:w-30 opacity-75 transform rotate-[-30deg]" />
        </div>

      </div>

      <div className="grid grid-cols-5 gap-10 w-full h-1/4">
        <div className="flex justify-center items-center">
            <img draggable='false' src="/src/assets/Semicircle.svg" alt="Icon 1" className="w-16 h-16 opacity-75 transform rotate-[-30deg]" />
        </div>
        <div className="flex justify-center items-center">
            <img draggable='false' src="/src/assets/Periwinkle.svg" alt="Icon 1" className="w-16 h-16 opacity-75 transform rotate-[-30deg]" />
        </div>
        <div className="flex justify-center items-center">
            <img draggable='false' src="/src/assets/zig-zag.svg" alt="Icon 1" className="w-30 h-30 opacity-75 transform rotate-[-30deg]" />
        </div>
        <div className="flex justify-center items-center">
            <img draggable='false' src="/src/assets/Star.svg" alt="Icon 1" className="w-24 h-24 opacity-75 transform rotate-[30deg]" />
        </div>
        <div className="flex justify-center items-center">
            <img draggable='false' src="/src/assets/rainbow.svg" alt="Icon 1" className="w-30 h-30 opacity-75 transform rotate-[-30deg]" />
        </div>

      </div>
    </div>
  );
};

export default Background;