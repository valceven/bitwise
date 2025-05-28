import React from "react";
import RightLanding001 from "../assets/right_landing001.svg";
import LeftLanding001 from "../assets/left_landing001.svg";
import FeatureBox from "../assets/featurebox.svg";
import shapesforlogic from "../assets/shapesforlogic.svg";
import rainbow_small from "../assets/rainbow_small.svg";
import small_stairs from "../assets/small_stairs.svg";
import small_butterfly from "../assets/small_butterfly.svg";
import landing002 from "../assets/landing002.svg";
import logoArrow from "../assets/logo-arrow.svg";
import landingLesson001 from "../assets/landing-lesson001.svg";
import lesson_home_right001 from "../assets/lesson_home_right001.svg";
import home_lesson_left001 from "../assets/home_lesson_left001.svg";
import chevronright from "../assets/chevron-right.svg";
import softstar from "../assets/softstar.svg";
import starshape from "../assets/starshape.svg";
import summerflower from "../assets/summerflower.svg";
import bg_text from "../assets/bg_text.svg";
import halfasterisk from "../assets/halfasterisk.svg";
import rectangle_diamond from "../assets/rectangle_diamond.svg";
import roadmapSample from "../assets/roadmapsample.png";
import booleImg from "../assets/GeorgeBoole.png";
import vennImg from "../assets/venn.jpg";
import circuitImg from "../assets/circuits.jpg";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    document.title = "Bitwise";
  }, []);

  return (
    <>
      <div className="bg-offwhite h-[calc(100vh-8rem)]">
        <img
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
          }}
          draggable="false"
          src={RightLanding001}
          alt="My Icon"
          className="flex absolute h-100 md:h-full bottom-0 md:bottom-auto right-0 z-0"
        />
        <img
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
          }}
          draggable="false"
          src={LeftLanding001}
          alt="My Icon"
          className="flex absolute h-100 md:h-full left-0 z-0"
        />
        <div>
          <div className="flex flex-col items-center justify-center h-screen pb-20">
            <div className="relative">
              <div className="flex flex-col items-center justify-center h-full relative">
                <img
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                  }}
                  draggable="false"
                  src={FeatureBox}
                  alt="My Icon"
                  className="absolute top-4 md:top-0 left-1/5 md:left-1/5 w-2/6 z-0 md:w-2/6"
                />
                <img
                  style={{
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    MozUserSelect: "none",
                  }}
                  draggable="false"
                  src={shapesforlogic}
                  alt="My Icon"
                  className="absolute bottom-0 right-1/6 md:right-1/5 w-10 md:w-max"
                />
                <h1 className="addgrotesk text-4xl md:text-7xl font-black text-center w-2/3 z-10 relative pt-6">
                  Interact, Learn. Master logic
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-min bg-white w-full flex flex-col md:flex-row justify-center md:space-x-32">
        <div className="h-18 md:h-32 addinter flex flex-row space-x-4 items-center justify-center">
          <img
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
            }}
            draggable="false"
            src={small_stairs}
            alt="My Icon"
            className=""
          />
          <p className="font-medium">Boolean Algebra</p>
        </div>
        <div className="h-18 md:h-32 addinter flex flex-row space-x-4 items-center justify-center">
          <img
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
            }}
            draggable="false"
            src={small_butterfly}
            alt="My Icon"
            className=""
          />
          <p className="font-medium">Simplify</p>
        </div>
        <div className="h-18 md:h-32 addinter flex flex-row space-x-4 items-center justify-center">
          <img
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
            }}
            draggable="false"
            src={rainbow_small}
            alt="My Icon"
            className=""
          />
          <p className="font-medium">Circuit Equivalent</p>
        </div>
      </div>

      <div className="h-min md:h-screen flex flex-col items-center justify-center bg-lightpurple relative">
        <img
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
          }}
          draggable="false"
          src={landing002}
          alt="My Icon"
          className="absolute z-10 -mb-87"
        />
        <div className="flex flex-col items-center justify-center p-20 space-y-5 md:space-y-0">
          <h1 className="w-full md:3/4 addgrotesk text-4xl md:text-5xl font-bold text-center">
            Tap, experiment, and understand!
          </h1>
          <p className="addinter text-xs md:text-sm">
            Explore Boolean logic through interactive exercises—no memorization,
            just hands-on learning!
          </p>
        </div>
        <div className="w-86 md:w-4/9 h-96 bg-white rounded-xl flex items-center justify-center z-20 mb-20 box-shadow border">
          <img src={roadmapSample} className="h-full" />
        </div>
      </div>

      <div className="h-min md:h-screen  flex flex-col items-center justify-center bg-bluez relative z-0">
        <img
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
          }}
          draggable="false"
          src={landingLesson001}
          alt="My Icon"
          className="absolute w-4/5 mt-10 z-50"
        />
        <img
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
          }}
          draggable="false"
          src={lesson_home_right001}
          alt="My Icon"
          className="absolute right-0 bottom-0 z-0"
        />
        <img
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
          }}
          draggable="false"
          src={home_lesson_left001}
          alt="My Icon"
          className="absolute left-0 top-0 z-0"
        />

        <div className="flex flex-col items-center justify-center p-20 text-white">
          <h1 className="w-3/4 addgrotesk text-5xl font-bold text-center">
            Lesson
          </h1>
          <p className="addinter text-sm">
            Learn every step to boolean algebra success bit by bit!
          </p>
        </div>
        <div className="w-full h-full px-20 space-x-10 flex flex-col space-y-10 md:space-y-0 md:flex-row justify-center z-10">
          <div className="w-86 h-94 rounded-3xl border bg-white box-shadow2 flex flex-col">
            <div className="w-full h-64 rounded-t-3xl overflow-hidden">
              <img
                src={booleImg}
                className="w-full h-full object-cover"
                alt="Boole"
              />
            </div>

            <div className="w-full h-2/5 p-4 space-y-2">
              <h1 className="addinter font-bold text-xl">
                Introduction to Boolean Algebra
              </h1>
              <p className="text-xs">
                Overview of Boolean Algebra, who created it, and its
                significance in mathematics and computer science.
              </p>
              <div className="flex flex-row items-center space-x-2 pt-3">
                <p className="text-xs">View lesson</p>
                <img src={logoArrow} alt="My Icon" className="h-2" />
              </div>
            </div>
          </div>
          <div className="w-86 h-94 rounded-3xl border bg-white box-shadow2 flex flex-col">
            <div className="w-full h-64 rounded-t-3xl overflow-hidden">
              <img
                src={circuitImg}
                className="w-full h-full object-cover"
                alt="Boole"
              />
            </div>
            <div className="w-full h-2/5 p-4 space-y-2">
              <h1 className="addinter font-bold text-xl">
                Basic Boolean Operation
              </h1>
              <p className="text-xs">
                Introduction to fundamental operations: AND, OR, and NOT, with
                simple examples
              </p>
              <div className="flex flex-row items-center space-x-2 pt-3">
                <p className="text-xs">View lesson</p>
                <img src={logoArrow} alt="My Icon" className="h-2" />
              </div>
            </div>
          </div>
          <div className="w-86 h-94 rounded-3xl border bg-white box-shadow2 flex flex-col">
            <div className="w-full h-64 rounded-t-3xl overflow-hidden">
              <img
                src={vennImg}
                className="w-full h-full object-cover"
                alt="Boole"
              />
            </div>
            <div className="w-full h-2/5 p-4 space-y-2">
              <h1 className="addinter font-bold text-xl">Truth Table</h1>
              <p className="text-xs">
                Understanding how to construct and interpret truth tables, and
                how they represent logical expressions.
              </p>
              <div className="flex flex-row items-center space-x-2 pt-3">
                <p className="text-xs">View lesson</p>
                <img src={logoArrow} alt="My Icon" className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-min md:h-[50vh] w-full flex flex-row bg-offwhite">
        <div className="md:w-1/2 flex items-center justify-center px-5 md:px-20">
          <h1 className="text-2xl md:text-5xl font-bold addgrotesk">
            Teach Smarter, Learn Faster – With Classroom Mode.
          </h1>
        </div>
        <div className="w-1/2 flex justify-center flex-col space-y-0 md:space-y-8">
          <p className="text-xs pr-5 p-5 md:p-0 md:pr-20 md:text-lg">
            Bitwise empowers teachers with full control over their lessons. With
            Classroom Mode, educators can customize, reorder, and tailor Boolean
            Algebra topics to fit their teaching style. Track progress, create
            interactive exercises, and adapt lessons to meet student needs—all
            in one intuitive platform designed for effective learning.
          </p>
          <div className="flex flex-row w-full mb-10">
            <button className="w-35 md:w-auto text-xs md:text-md bg-grayz px-4 md:px-8 py-1 md:py-3 text-white border border-black rounded-full box-shadow3 addgrotesk">
              Host a class
            </button>
            <button className="w-45 px-4 md:px-8 py-3 flex flex-row text-xs md:text-md items-center">
              Join a class <img src={chevronright} alt="My Icon" className="" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-min md:h-screen flex flex-col justify-center items-center relative z-0">
        <div className="flex flex-col items-center justify-center p-20 text-black space-y-4 z-50">
          <h1 className="w-full addgrotesk text-4xl font-bold text-center">
            Why choose bitwise?
          </h1>
          <p className="addinter text-sm">
            Let us give you some reasons why you should integrate bitwise to
            your learning!
          </p>
        </div>
        <img
          src={rectangle_diamond}
          alt="My Icon"
          className="absolute -top-180 md:-top-115 left-10 z-50 w-20 md:w-auto"
        />
        <img
          src={halfasterisk}
          alt="My Icon"
          className="absolute -top-30 right-0 z-50 w-8 md:w-auto"
        />
        <div className="w-full px-20 space-x-10 flex flex-col space-y-10 md:space-y-0 md:flex-row justify-center z-10">
          <img
            src={bg_text}
            alt="My Icon"
            className="absolute top-5 z-0 w-full"
          />
          <div className="w-80 h-64 p-5 rounded-3xl border bg-white box-shadow2 flex flex-col space-y-3 relative">
            <img
              src={starshape}
              alt="My Icon"
              className="flex absolute -top-7 right-7 w-15"
            />
            <h1 className="addgrotesk font-bold text-2xl">For Students</h1>
            <h1 className="addinter font-bold text-sm">
              Master Boolean Algebra with Ease
            </h1>
            <div className="pl-4">
              <ul className="addinter text-xs space-y-2 list-disc list-inside">
                <li>
                  Interactive Learning – Engage with hands-on exercises and
                  step-by-step lessons.
                </li>
                <li>
                  Self-Paced Study – Learn at your own speed with structured
                  modules.
                </li>
                <li>
                  Practice & Quizzes – Reinforce concepts with interactive
                  questions and challenges.
                </li>
              </ul>
            </div>
          </div>
          <div className="w-80 h-64 p-5 rounded-3xl border bg-white box-shadow2 flex flex-col space-y-3 relative">
            <img
              src={softstar}
              alt="My Icon"
              className="flex absolute -top-7 right-7 w-15"
            />
            <h1 className="addgrotesk font-bold text-2xl">For Teachers</h1>
            <h1 className="addinter font-bold text-sm">
              A Smarter Way to Teach Boolean Algebra
            </h1>
            <div className="pl-4">
              <ul className="addinter text-xs space-y-2 list-disc list-inside">
                <li>
                  Customizable Lesson Plans – Reorder or modify lessons to fit
                  your teaching style.
                </li>
                <li>
                  Classroom Mode – Easily manage students and track their
                  progress.
                </li>
                <li>
                  Engaging Content – Provide students with dynamic exercises for
                  deeper understanding.
                </li>
              </ul>
            </div>
          </div>
          <div className="w-80 h-64 p-5 rounded-3xl border bg-white box-shadow2 flex flex-col space-y-3 relative">
            <img
              src={summerflower}
              alt="My Icon"
              className="flex absolute -top-7 right-7 w-15"
            />
            <h1 className="addgrotesk font-bold text-2xl">For Everyone</h1>
            <h1 className="addinter font-bold text-sm">
              Why Bitwise Stands Out
            </h1>
            <div className="pl-4">
              <ul className="addinter text-xs space-y-2 list-disc list-inside">
                <li>
                  Flexible Learning Paths – Adaptable for beginners and advanced
                  learners.
                </li>
                <li>
                  Easy Integration – Works seamlessly in both online and
                  in-person classrooms.
                </li>
                <li>
                  Future Updates & Features – Continuous improvements to enhance
                  learning experiences.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <button class="w-full m-10 mt-5 px-6 py-2.5 text-sm tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none border-1 border-white hover:bg-white hover:text-black focus:ring focus:ring-gray-300 focus:ring-opacity-80">
          View all
        </button>
      </div>
    </>
  );
}

export default HomePage;
