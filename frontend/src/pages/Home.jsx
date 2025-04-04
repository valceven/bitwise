import React from "react";
import RightLanding001 from "../assets/right_landing001.svg";
import LeftLanding001 from "../assets/left_landing001.svg";
import FeatureBox from "../assets/featurebox.svg";
import shapesforlogic from "../assets/shapesforlogic.svg";
import rainbow_small from "../assets/rainbow_small.svg";
import small_stairs from "../assets/small_stairs.svg";
import small_butterfly from "../assets/small_butterfly.svg";
import landing002 from "../assets/landing002.svg";

function HomePage() {
  return (
    <>
      <div className="bg-offwhite h-[calc(100vh-8rem)]">
        <img style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }} draggable="false" src={RightLanding001} alt="My Icon" className="flex absolute h-full right-0 z-0"/>
        <img style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }} draggable="false" src={LeftLanding001} alt="My Icon" className="flex absolute h-full left-0 z-0"/>
        
        <div>
          <div className="flex flex-col items-center justify-center h-screen pb-20">
            <div className="relative">
              <div className="flex flex-col items-center justify-center h-full relative">
                <img style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }} draggable="false" src={FeatureBox} alt="My Icon" className="absolute top-4 md:top-0 left-1/5 md:left-1/5 w-2/6 z-0 md:w-2/6"/>
                <img style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }} draggable="false" src={shapesforlogic} alt="My Icon" className="absolute bottom-0 right-1/6 md:right-1/5 w-10 md:w-max"/>
                <h1 className="addgrotesk text-4xl md:text-7xl font-black text-center w-2/3 z-10 relative pt-6">Interact, Learn. Master logic</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-min bg-white w-full flex flex-col md:flex-row justify-center md:space-x-32">
          <div className="h-18 md:h-32 addinter flex flex-row space-x-4 items-center justify-center">
          <img style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }} draggable="false" src={small_stairs} alt="My Icon" className=""/>
            <p className="font-medium">Boolean Algebra</p>
          </div>
          <div className="h-18 md:h-32 addinter flex flex-row space-x-4 items-center justify-center">
          <img style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }} draggable="false" src={small_butterfly} alt="My Icon" className=""/>
            <p className="font-medium">Simplify</p>
          </div>
          <div className="h-18 md:h-32 addinter flex flex-row space-x-4 items-center justify-center">
          <img style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }} draggable="false" src={rainbow_small} alt="My Icon" className=""/>
            <p className="font-medium">Circuit Equivalent</p>
          </div>
      </div>
      <div className="h-screen flex items-center justify-center bg-lightpurple relative">
        <img style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }} draggable="false" src={landing002} alt="My Icon" className="flex relative h-full bottom-0 z-10 -mb-87"/>
        <div className="absolute top-0 flex flex-col items-center justify-center p-20">
          <h1 className="w-3/4 addgrotesk text-5xl font-bold text-center">Tap, experiment, and understand!</h1>
          <p className="addinter text-sm">Explore Boolean logic through interactive exercises—no memorization, just hands-on learning!</p>
        </div>
        <div className="w-4/9 h-1/2 bg-white rounded-xl flex items-center justify-center absolute z-20 mt-40 box-shadow border">
        </div>
      </div>
      <div className="h-screen flex items-center justify-center bg-bluez relative z-0">
      </div>
    </>
  );
}

export default HomePage;
