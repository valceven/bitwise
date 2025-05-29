import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  Info,
} from "lucide-react";

import booleImg from "@assets/GeorgeBoole.png";
import shannonImg from "@assets/shannon.jpg";
import computerImg from "@assets/computer.jpg";
import circuitsImg from "@assets/circuits.jpg";
import todayImg from "@assets/today.jpg";
import vennImg from "@assets/venn.jpg";

// Enhanced color palette matching the truth table assessment
const colors = {
  greenz: "#27AE60",
  darkpurple: "#9B51E0",
  bluez: "#6E61FF",
  yellowz: "#F2C94C",
  cyanz: "#56CCF2",
  grayz: "#29314D",
  orangez: "#F2994A",
  lightpurple: "#DAC3FF",
  offwhite: "#F1F6F1",
  redz: "#F14E3A",
  white: "#FFFFFF",
  blackz: "#031926",
  // New enhanced colors
  pinkz: "#FF6B9D",
  mintgreenz: "#51E5A8",
  lavenderz: "#B794F6",
  coralz: "#FF8A80",
  tealz: "#26C6DA",
  indigoz: "#5C7CFA",
  emeraldz: "#10B981",
  rosez: "#FB7185",
  violetz: "#8B5CF6",
  ambez: "#F59E0B",
  limez: "#84CC16",
  skyz: "#0EA5E9",
};

export default function HistoricalAssessment({
  onComplete,
  onFinish,
  attemptsRemaining = 3,
  currentAttempt = 1,
  maxAttempts = 3,
  studentAssessmentId
}) {
  // Assessment states
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showHistoryInfo, setShowHistoryInfo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimelineVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
  }, [currentStep]);

  const assessmentSteps = [
    {
      type: "intro",
      title: "The Origins of Boolean Algebra",
      content:
        "In this assessment, you will explore the fascinating history of Boolean Algebra, from its philosophical beginnings to its revolutionary impact on modern computing.",
      image: "/api/placeholder/600/300",
      imageAlt: "Boolean Algebra representation",
    },
    {
      type: "timelineExploration",
      title: "Key Moments in Boolean History",
      events: [
        {
          year: 1854,
          title: "An Investigation of the Laws of Thought",
          description:
            "George Boole publishes his groundbreaking work establishing Boolean logic.",
          image: booleImg,
        },
        {
          year: 1938,
          title: "Shannon's Thesis",
          description:
            "Claude Shannon applies Boolean Algebra to electrical circuits in his Master's thesis.",
          image: shannonImg,
        },
        {
          year: 1945,
          title: "First Electronic Computers",
          description:
            "Boolean logic used in the design of early electronic computers.",
          image: computerImg,
        },
        {
          year: 1970,
          title: "Integrated Circuits",
          description:
            "Boolean logic becomes fundamental to building complex integrated circuits.",
          image: circuitsImg,
        },
        {
          year: "Today",
          title: "Everywhere Computing",
          description:
            "Boolean Algebra powers all modern digital devices and search algorithms.",
          image: todayImg,
        },
      ],
      question:
        "Which development made Boolean Algebra practical for electrical engineering?",
      options: [
        "George Boole's original publication",
        "Claude Shannon's application to electrical circuits",
        "The invention of the transistor",
        "The development of search algorithms",
      ],
      correctAnswer: 1,
      explanation:
        "Claude Shannon's 1938 Master's thesis demonstrated how Boolean Algebra could be applied to design and analyze electrical switching circuits, creating the foundation for digital circuit design.",
    },
    {
      type: "contextMatching",
      title: "Boolean Algebra in Context",
      description:
        "Connect these historical developments with how they relate to Boolean Algebra.",
      pairs: [
        {
          context: "Mathematical Logic",
          booleanRelation:
            "Boolean Algebra provided a way to express logical statements mathematically",
          id: "logic",
        },
        {
          context: "Electronic Switching",
          booleanRelation:
            "ON/OFF states in circuits directly map to Boolean 1/0 values",
          id: "switching",
        },
        {
          context: "Computer Programming",
          booleanRelation:
            "IF-THEN statements in code rely on Boolean true/false conditions",
          id: "programming",
        },
        {
          context: "Search Engines",
          booleanRelation:
            "Search queries use Boolean operators like AND, OR, and NOT",
          id: "search",
        },
      ],
      question:
        "Which historical context was the FIRST to make use of Boolean Algebra?",
      options: [
        "Mathematical Logic",
        "Electronic Switching",
        "Computer Programming",
        "Search Engines",
      ],
      correctAnswer: 0,
      explanation:
        "Boolean Algebra was first developed as a mathematical system to represent logic, years before its applications in electronic switching, programming, or search engines. George Boole created it in the 1850s as a branch of mathematical logic.",
    },
    {
      type: "applicationSpotting",
      title: "Boolean Algebra in Everyday Life",
      description:
        "Boolean logic is all around us! Can you identify where it appears in these everyday scenarios?",
      scenarios: [
        {
          scenario:
            'Using a search engine to find "laptops AND affordable NOT gaming"',
          hasBoolean: true,
          explanation: "This uses Boolean operators to filter search results",
        },
        {
          scenario:
            "A light controlled by two switches that both need to be ON",
          hasBoolean: true,
          explanation: "This is an AND operation: Light = Switch1 AND Switch2",
        },
        {
          scenario: "Setting your phone alarm to wake you up at 7:00 AM",
          hasBoolean: false,
          explanation: "This is a simple time trigger, not a Boolean operation",
        },
        {
          scenario:
            "A security system that activates if the door OR window is opened",
          hasBoolean: true,
          explanation: "This uses the OR operation: Alarm = Door OR Window",
        },
      ],
      question: "Which scenario does NOT directly use Boolean logic?",
      options: [
        "Search engine filtering",
        "Light controlled by two switches",
        "Setting an alarm clock",
        "Security system activation",
      ],
      correctAnswer: 2,
      explanation:
        "Setting an alarm clock for 7:00 AM is just a simple time-based trigger. The clock activates when the time equals 7:00 AM, but it doesn't involve evaluating logical conditions like AND, OR, or NOT operations across multiple inputs.",
    },
    {
      type: "pioneersFocus",
      title: "Pioneers of Boolean Logic",
      description:
        "George Boole transformed logic from philosophy to mathematics, but many others expanded on his work.",
      pioneers: [
        {
          name: "George Boole",
          contribution:
            "Created Boolean Algebra as a system of logical thought",
          years: "1815-1864",
          image: booleImg,
        },
        {
          name: "Claude Shannon",
          contribution: "Applied Boolean Algebra to electrical circuit design",
          years: "1916-2001",
          image: shannonImg,
        },
        {
          name: "John Venn",
          contribution: "Created Venn diagrams to visualize Boolean operations",
          years: "1834-1923",
          image: vennImg,
        },
      ],
      question: "What was George Boole's most significant contribution?",
      options: [
        "Inventing the electronic computer",
        "Creating a mathematical system for logical reasoning",
        "Designing the first electronic circuits",
        "Developing search algorithms",
      ],
      correctAnswer: 1,
      explanation:
        'George Boole\'s most significant contribution was creating a mathematical system for logical reasoning, which he published in his 1854 work "An Investigation of the Laws of Thought". This system formed the basis of Boolean Algebra, a way to express logical operations mathematically.',
    },
    {
      type: "reflection",
      title: "The Impact of Boolean Algebra",
      description:
        "Boolean Algebra's journey from abstract mathematics to the foundation of computing represents one of the most impactful mathematical innovations in history.",
      reflectionPoints: [
        "Boolean values (1/0, true/false) are the most fundamental unit of all digital systems",
        "Every decision in programming relies on Boolean conditions",
        "Boolean searching powers how we find information online",
        "Complex computers ultimately operate using millions of simple Boolean operations",
      ],
      question:
        "Why is Boolean Algebra considered fundamental to modern computing?",
      options: [
        "It allows computers to perform calculations with very large numbers",
        "It forms the basis of all programming languages",
        "It enables computers to operate using binary (ON/OFF) states",
        "It was the first mathematical system ever developed",
      ],
      correctAnswer: 2,
      explanation:
        "Boolean Algebra is fundamental to computing because it enables computers to operate using binary (ON/OFF) states. These binary states, represented as 0s and 1s, are the foundation of all digital systems. Computer hardware like transistors and logic gates implement Boolean operations physically, making complex computing possible.",
    },
    {
      type: "completion",
      title: "Assessment Complete!",
      content:
        "You've completed your journey through the history and significance of Boolean Algebra.",
    },
  ];

  const progress = ((currentStep + 1) / assessmentSteps.length) * 100;

  const totalQuestions = assessmentSteps.filter(
    (step) => step.type !== "intro" && step.type !== "completion"
  ).length;

  const score = userAnswers.filter((answer) => answer.isCorrect).length;

  const hasQuestion = useCallback(() => {
    const step = assessmentSteps[currentStep];
    return step.options && step.correctAnswer !== undefined;
  }, [currentStep, assessmentSteps]);

  const hasAnsweredCurrent = useCallback(() => {
    return userAnswers.some((answer) => answer.questionIndex === currentStep);
  }, [currentStep, userAnswers]);

  const getCurrentAnswer = useCallback(() => {
    return userAnswers.find((answer) => answer.questionIndex === currentStep);
  }, [currentStep, userAnswers]);

  const handleAnswerSelect = (answerIndex) => {
    if (hasAnsweredCurrent()) return;
    setSelectedOption(answerIndex);
  };

  const handleShowFeedback = () => {
    if (selectedOption === null) return;

    const currentQuestion = assessmentSteps[currentStep];
    const isCorrect = currentQuestion.correctAnswer === selectedOption;

    if (isCorrect) {
      setFeedbackMessage("Correct! " + currentQuestion.explanation);
    } else {
      setFeedbackMessage(
        `Not quite. The correct answer is: ${
          currentQuestion.options[currentQuestion.correctAnswer]
        }. ${currentQuestion.explanation}`
      );
    }

    setUserAnswers([
      ...userAnswers,
      {
        questionIndex: currentStep,
        selectedAnswer: selectedOption,
        isCorrect,
      },
    ]);

    // Show feedback
    setShowFeedback(true);
  };

  // Handle navigation between steps
  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Complete the assessment
 const finishAssessment = async () => {
  setIsCompleted(true);
  const finalScore = (score / totalQuestions) * 100;
  
  const assessmentData = {
    percentage: Math.round(finalScore),
    score: score,
    totalQuestions: totalQuestions,
    userAnswers: userAnswers,
    currentAttempt: currentAttempt,
    maxAttempts: maxAttempts
  };

  console.log(
    "Assessment completed with score:",
    score,
    "out of",
    totalQuestions,
    ":",
    Math.round(finalScore) + "%"
  );

  if (onComplete) {
    onComplete(assessmentData);
  }
};

const handleFinishAssessment = () => {
  const finalScore = (score / totalQuestions) * 100;
  const assessmentData = {
    percentage: Math.round(finalScore),
    score: score,
    totalQuestions: totalQuestions,
    userAnswers: userAnswers,
    currentAttempt: currentAttempt,
    maxAttempts: maxAttempts
  };
  
  if (onFinish) {
    onFinish(assessmentData);
  } else if (onComplete) {
    onComplete(assessmentData);
  }
};


  // Toggle review mode
  const toggleReviewMode = () => {
    setIsReviewMode(!isReviewMode);
  };

  // Restart assessment
  const handleRestartAssessment = () => {
    setCurrentStep(0);
    setUserAnswers([]);
    setIsReviewMode(false);
    setIsCompleted(false);
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedbackMessage("");
    setShowHistoryInfo(false);
    setTimelineVisible(false);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Custom Button component
  const Button = ({
    children,
    onClick,
    disabled,
    variant,
    className,
    size,
  }) => {
    const baseStyles =
      "rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
    const sizeStyles =
      size === "lg" ? "px-6 py-3 text-lg" : "px-4 py-2 text-sm";

    let variantStyles = "";
    if (variant === "outline") {
      variantStyles = `border border-${disabled ? "gray-300" : "bluez"} text-${
        disabled ? "gray-400" : "bluez"
      } hover:bg-bluez hover:bg-opacity-10`;
    } else {
      variantStyles = `bg-${
        disabled ? "gray-300" : "bluez"
      } text-white hover:bg-opacity-90`;
    }

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${
          className || ""
        }`}
        style={{
          backgroundColor: disabled
            ? "#ccc"
            : variant === "outline"
            ? "transparent"
            : colors.bluez,
          color: disabled
            ? "#888"
            : variant === "outline"
            ? colors.bluez
            : colors.white,
          borderColor: variant === "outline" ? colors.bluez : "transparent",
        }}
      >
        {children}
      </button>
    );
  };

  // Custom Badge component
  const Badge = ({ children, variant }) => {
    const baseStyles = "px-2 py-1 text-xs font-semibold rounded-full";
    const variantStyles =
      variant === "outline"
        ? "border border-bluez text-bluez"
        : "bg-bluez text-white";

    return (
      <span
        className={`${baseStyles} ${variantStyles}`}
        style={{
          backgroundColor: variant === "outline" ? "transparent" : colors.bluez,
          color: variant === "outline" ? colors.bluez : colors.white,
          borderColor: variant === "outline" ? colors.bluez : "transparent",
        }}
      >
        {children}
      </span>
    );
  };

  // Enhanced Progress Bar component
  const ProgressBar = ({ value }) => {
    return (
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${colors.violetz}, ${colors.pinkz}, ${colors.cyanz})`,
          }}
        />
      </div>
    );
  };

  // Render different content based on step type
  const renderStepContent = () => {
    const step = assessmentSteps[currentStep];
    const currentAnswer = getCurrentAnswer();

    switch (step.type) {
      case "intro":
        return (
          <div className="flex flex-col items-center space-y-6 text-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
              style={{
                background: `linear-gradient(135deg, ${colors.violetz}, ${colors.indigoz})`,
              }}
            >
              <span className="text-4xl">📚</span>
            </div>
            <h2 className="text-3xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <div
              className="w-full max-w-2xl h-64 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.lavenderz}20, ${colors.pinkz}20)`,
              }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">⚡</div>
                <p
                  className="text-lg font-medium"
                  style={{ color: colors.violetz }}
                >
                  Journey Through Boolean History
                </p>
              </div>
            </div>
            <p className="text-lg max-w-2xl" style={{ color: colors.grayz }}>
              {step.content}
            </p>

            {/* Show attempt information */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 mb-2">
                📝 Attempt <strong>{currentAttempt}</strong> of{" "}
                <strong>{maxAttempts}</strong>
              </p>
              <p className="text-xs text-blue-600">
                {attemptsRemaining > 1
                  ? `You have ${
                      attemptsRemaining - 1
                    } attempts remaining after this one.`
                  : "This is your final attempt!"}
              </p>
            </div>

            <Button
              onClick={handleNext}
              size="lg"
              className="mt-6 flex items-center gap-1"
            >
              Begin Journey <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        );

      case "timelineExploration":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.ambez}, ${colors.orangez})`,
                }}
              >
                <span className="text-2xl">⏰</span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.grayz }}
              >
                {step.title}
              </h2>
            </div>

            {/* Interactive Timeline */}
            <div
              className="rounded-xl shadow-lg overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.white}, ${colors.lavenderz}10)`,
              }}
            >
              <div className="p-6">
                <div className="relative pb-8">
                  {/* Timeline line */}
                  <div
                    className="absolute h-2 top-2 left-0 right-0 z-0 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${colors.violetz}, ${colors.pinkz})`,
                    }}
                  ></div>

                  {/* Timeline events */}
                  <div
                    className={`flex justify-between relative z-10 transition-opacity duration-1000 ${
                      timelineVisible ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {step.events?.map((event, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center transition-all transform hover:scale-105 cursor-pointer w-24 group"
                      >
                        <div
                          className="w-6 h-6 rounded-full mb-1 shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${colors.violetz}, ${colors.pinkz})`,
                          }}
                        ></div>
                        <p
                          className="font-bold text-sm"
                          style={{ color: colors.indigoz }}
                        >
                          {event.year}
                        </p>
                        <img
                          src={event.image || "/api/placeholder/150/150"}
                          alt={event.title}
                          className="w-16 h-16 rounded-full my-2 object-cover border-3 shadow-md"
                          style={{ borderColor: colors.cyanz }}
                        />
                        <p
                          className="text-xs font-semibold text-center"
                          style={{ color: colors.violetz }}
                        >
                          {event.title}
                        </p>
                        <div
                          className="absolute top-20 opacity-0 group-hover:opacity-100 bg-white p-3 rounded-xl shadow-xl text-xs w-48 text-center transition-opacity z-20 border-2"
                          style={{
                            color: colors.grayz,
                            borderColor: colors.cyanz,
                          }}
                        >
                          {event.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Year Info Button */}
            <button
              className="mt-2 flex items-center text-xs font-medium gap-1 hover:underline transition-all"
              style={{ color: colors.indigoz }}
              onClick={() => setShowHistoryInfo(!showHistoryInfo)}
            >
              <Info className="h-4 w-4" /> Learn more about these events
            </button>

            {/* History Information Panel */}
            {showHistoryInfo && (
              <div
                className="mt-3 p-6 rounded-xl shadow-lg text-sm border-2"
                style={{
                  backgroundColor: colors.white,
                  borderColor: colors.lavenderz,
                  color: colors.grayz,
                }}
              >
                <h4
                  className="font-bold mb-3"
                  style={{ color: colors.violetz }}
                >
                  Key Historical Facts
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span
                      className="font-bold text-xs px-2 py-1 rounded-full mr-3"
                      style={{
                        backgroundColor: `${colors.ambez}20`,
                        color: colors.ambez,
                      }}
                    >
                      1854
                    </span>
                    George Boole published "An Investigation of the Laws of
                    Thought", establishing Boolean logic as a mathematical
                    system.
                  </li>
                  <li className="flex items-start">
                    <span
                      className="font-bold text-xs px-2 py-1 rounded-full mr-3"
                      style={{
                        backgroundColor: `${colors.tealz}20`,
                        color: colors.tealz,
                      }}
                    >
                      1938
                    </span>
                    Claude Shannon's master's thesis at MIT demonstrated how
                    electrical circuits could implement Boolean operations.
                  </li>
                  <li className="flex items-start">
                    <span
                      className="font-bold text-xs px-2 py-1 rounded-full mr-3"
                      style={{
                        backgroundColor: `${colors.emeraldz}20`,
                        color: colors.emeraldz,
                      }}
                    >
                      1940s
                    </span>
                    Boolean Algebra became essential in the design of early
                    electronic computers like ENIAC.
                  </li>
                  <li className="flex items-start">
                    <span
                      className="font-bold text-xs px-2 py-1 rounded-full mr-3"
                      style={{
                        backgroundColor: `${colors.pinkz}20`,
                        color: colors.pinkz,
                      }}
                    >
                      1970s
                    </span>
                    The development of integrated circuits made complex Boolean
                    operations possible in increasingly smaller devices.
                  </li>
                </ul>
                <button
                  className="mt-4 px-4 py-2 rounded-lg font-medium transition-all hover:shadow-md"
                  style={{
                    backgroundColor: `${colors.lavenderz}20`,
                    color: colors.violetz,
                  }}
                  onClick={() => setShowHistoryInfo(false)}
                >
                  Close
                </button>
              </div>
            )}

            {/* Question */}
            {renderQuestion(step)}
          </div>
        );

      case "contextMatching":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.tealz}, ${colors.cyanz})`,
                }}
              >
                <span className="text-2xl">🔗</span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.grayz }}
              >
                {step.title}
              </h2>
            </div>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Context cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.pairs?.map((pair, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-l-4"
                  style={{
                    backgroundColor: colors.white,
                    borderLeftColor: [
                      colors.violetz,
                      colors.tealz,
                      colors.pinkz,
                      colors.ambez,
                    ][idx % 4],
                  }}
                >
                  <h3
                    className="font-bold text-lg mb-2"
                    style={{
                      color: [
                        colors.violetz,
                        colors.tealz,
                        colors.pinkz,
                        colors.ambez,
                      ][idx % 4],
                    }}
                  >
                    {pair.context}
                  </h3>
                  <p className="text-sm" style={{ color: colors.grayz }}>
                    {pair.booleanRelation}
                  </p>
                </div>
              ))}
            </div>

            {/* Question */}
            {renderQuestion(step)}
          </div>
        );

      case "applicationSpotting":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.emeraldz}, ${colors.mintgreenz})`,
                }}
              >
                <span className="text-2xl">🔍</span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.grayz }}
              >
                {step.title}
              </h2>
            </div>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Application scenarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.scenarios?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4"
                  style={{
                    backgroundColor: colors.white,
                    borderLeftColor: item.hasBoolean
                      ? colors.emeraldz
                      : colors.coralz,
                  }}
                >
                  <p
                    className="font-medium mb-2"
                    style={{ color: colors.grayz }}
                  >
                    {item.scenario}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-1 text-xs font-bold rounded-full"
                      style={{
                        backgroundColor: item.hasBoolean
                          ? `${colors.emeraldz}20`
                          : `${colors.coralz}20`,
                        color: item.hasBoolean
                          ? colors.emeraldz
                          : colors.coralz,
                      }}
                    >
                      {item.hasBoolean ? "Boolean Logic ✓" : "No Boolean Logic"}
                    </span>
                  </div>
                  {(isReviewMode || showFeedback) && (
                    <p
                      className="mt-3 text-sm p-3 rounded-lg"
                      style={{
                        backgroundColor: `${colors.skyz}10`,
                        color: colors.grayz,
                      }}
                    >
                      {item.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Question */}
            {renderQuestion(step)}
          </div>
        );

      case "pioneersFocus":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.rosez}, ${colors.pinkz})`,
                }}
              >
                <span className="text-2xl">👥</span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.grayz }}
              >
                {step.title}
              </h2>
            </div>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Pioneers gallery */}
            <div className="flex flex-wrap justify-center gap-6">
              {step.pioneers?.map((pioneer, idx) => (
                <div
                  key={idx}
                  className="w-72 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${colors.white}, ${
                      [colors.violetz, colors.tealz, colors.ambez][idx]
                    }10)`,
                  }}
                >
                  <img
                    src={pioneer.image || "/api/placeholder/150/150"}
                    alt={pioneer.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3
                      className="font-bold text-lg"
                      style={{
                        color: [colors.violetz, colors.tealz, colors.ambez][
                          idx
                        ],
                      }}
                    >
                      {pioneer.name}
                    </h3>
                    <p
                      className="text-sm font-medium mb-2"
                      style={{ color: colors.grayz }}
                    >
                      {pioneer.years}
                    </p>
                    <p className="text-sm" style={{ color: colors.grayz }}>
                      {pioneer.contribution}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Question */}
            {renderQuestion(step)}
          </div>
        );

      case "reflection":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.limez}, ${colors.emeraldz})`,
                }}
              >
                <span className="text-2xl">💭</span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.grayz }}
              >
                {step.title}
              </h2>
            </div>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Reflection points */}
            <div
              className="p-6 rounded-xl shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colors.emeraldz}10, ${colors.mintgreenz}10)`,
              }}
            >
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: colors.emeraldz }}
              >
                Key Takeaways:
              </h3>
              <ul className="space-y-4">
                {step.reflectionPoints?.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <div
                      className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-0.5 shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${colors.emeraldz}, ${colors.mintgreenz})`,
                      }}
                    >
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span
                      className="ml-3 font-medium"
                      style={{ color: colors.grayz }}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Question */}
            {renderQuestion(step)}
          </div>
        );

      case "completion": {
        const finalScore = Math.round((score / totalQuestions) * 100);

        return (
          <div className="flex flex-col items-center space-y-6 text-center">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.emeraldz}, ${colors.cyanz})`,
              }}
            >
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-3xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>

            <div
              className="w-40 h-40 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg"
              style={{
                background: `conic-gradient(${colors.emeraldz} ${
                  finalScore * 3.6
                }deg, ${colors.offwhite} 0deg)`,
                color: colors.emeraldz,
              }}
            >
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
                {finalScore}%
              </div>
            </div>

            <p className="text-lg max-w-md" style={{ color: colors.grayz }}>
              {step.content}
            </p>

            <div
              className="rounded-xl shadow-lg overflow-hidden w-full max-w-md"
              style={{
                background: `linear-gradient(135deg, ${colors.white}, ${colors.cyanz}10)`,
              }}
            >
              <div className="p-6">
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: colors.indigoz }}
                >
                  Your Results:
                </h3>
                <div className="space-y-4">
                  <div
                    className="flex justify-between items-center p-3 rounded-lg"
                    style={{ backgroundColor: `${colors.skyz}10` }}
                  >
                    <span className="font-medium">Questions Answered:</span>
                    <span
                      className="font-bold"
                      style={{ color: colors.indigoz }}
                    >
                      {Object.keys(userAnswers).length} / {totalQuestions}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center p-3 rounded-lg"
                    style={{ backgroundColor: `${colors.emeraldz}10` }}
                  >
                    <span className="font-medium">Correct Answers:</span>
                    <span
                      className="font-bold"
                      style={{ color: colors.emeraldz }}
                    >
                      {score} / {totalQuestions}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center p-3 rounded-lg"
                    style={{ backgroundColor: `${colors.violetz}10` }}
                  >
                    <span className="font-medium">Final Score:</span>
                    <span
                      className="font-bold text-xl"
                      style={{ color: colors.violetz }}
                    >
                      {finalScore}%
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center p-3 rounded-lg"
                    style={{ backgroundColor: `${colors.ambez}10` }}
                  >
                    <span className="font-medium">Attempt:</span>
                    <span className="font-bold" style={{ color: colors.ambez }}>
                      {currentAttempt} / {maxAttempts}
                    </span>
                  </div>
                </div>

                <div
                  className="mt-6 p-4 rounded-xl border-2"
                  style={{
                    backgroundColor:
                      finalScore >= 80
                        ? `${colors.emeraldz}10`
                        : finalScore >= 60
                        ? `${colors.cyanz}10`
                        : `${colors.ambez}10`,
                    borderColor:
                      finalScore >= 80
                        ? colors.emeraldz
                        : finalScore >= 60
                        ? colors.cyanz
                        : colors.ambez,
                    color:
                      finalScore >= 80
                        ? colors.emeraldz
                        : finalScore >= 60
                        ? colors.cyanz
                        : colors.ambez,
                  }}
                >
                  <p className="font-bold">
                    {finalScore >= 80
                      ? "Excellent work! 🌟"
                      : finalScore >= 60
                      ? "Good job! 👍"
                      : "Keep learning! 📚"}
                  </p>
                  <p className="text-sm mt-1">
                    {finalScore >= 80
                      ? "You have a strong understanding of Boolean Algebra's history and significance. You clearly understand how this mathematical system evolved from abstract theory to the foundation of modern computing."
                      : finalScore >= 60
                      ? "You understand many key aspects of Boolean Algebra's history. With a bit more study on the pioneers and applications, you'll have a comprehensive understanding of this topic."
                      : "You might benefit from reviewing the material again to strengthen your understanding. Focus particularly on the timeline of Boolean Algebra's development and how it transitioned from theory to practice."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={toggleReviewMode}
                variant="outline"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                {isReviewMode ? "Hide Review" : "Review Answers"}
              </Button>

              {/* Only show restart if attempts remaining */}
              {attemptsRemaining > 1 && (
                <Button
                  onClick={handleRestartAssessment}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Clock className="h-4 w-4" />
                  🔄 Try Again ({attemptsRemaining - 1} attempts left)
                </Button>
              )}

              {/* Use the universal finish function */}
              <Button onClick={handleFinishAssessment} className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Finish Assessment
              </Button>
            </div>
          </div>
        );
      }

      default:
        return <div>Loading...</div>;
    }
  };

  // Render question and answer options
  const renderQuestion = (step) => {
    if (!step.question || !step.options) return null;

    const currentAnswer = getCurrentAnswer();
    const answered = hasAnsweredCurrent();

    return (
      <div className="p-6 rounded-xl">
        <h3 className="text-lg font-bold mb-4" style={{ color: colors.grayz }}>
          {step.question}
        </h3>

        <div className="space-y-3">
          {step.options?.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isAnswered = answered;
            const isCorrect = isReviewMode && step.correctAnswer === idx;
            const isIncorrect =
              isReviewMode &&
              currentAnswer?.selectedAnswer === idx &&
              !currentAnswer.isCorrect;

            let bgColor = colors.white;
            let borderColor = colors.cyanz;

            if (isSelected) {
              bgColor = `${colors.lavenderz}20`;
              borderColor = colors.violetz;
            }
            if (isCorrect) {
              bgColor = `${colors.emeraldz}20`;
              borderColor = colors.emeraldz;
            }
            if (isIncorrect) {
              bgColor = `${colors.coralz}20`;
              borderColor = colors.coralz;
            }

            return (
              <div
                key={idx}
                onClick={() => !isAnswered && handleAnswerSelect(idx)}
                className={`p-4 border-2 rounded-xl transition-all transform ${
                  isAnswered
                    ? "cursor-default"
                    : "cursor-pointer hover:scale-105 hover:shadow-md"
                }`}
                style={{
                  backgroundColor: bgColor,
                  borderColor: borderColor,
                  color: colors.grayz,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {isReviewMode && isCorrect && (
                    <CheckCircle
                      className="h-6 w-6"
                      style={{ color: colors.emeraldz }}
                    />
                  )}
                  {isReviewMode && isIncorrect && (
                    <XCircle
                      className="h-6 w-6"
                      style={{ color: colors.coralz }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback area */}
        {showFeedback && (
          <div
            className="mt-4 p-4 rounded-xl border-2"
            style={{
              backgroundColor: currentAnswer?.isCorrect
                ? `${colors.emeraldz}10`
                : `${colors.coralz}10`,
              borderColor: currentAnswer?.isCorrect
                ? colors.emeraldz
                : colors.coralz,
              color: currentAnswer?.isCorrect ? colors.emeraldz : colors.coralz,
            }}
          >
            <p className="font-medium">{feedbackMessage}</p>
          </div>
        )}

        {renderNavigation()}
      </div>
    );
  };

  // Render navigation buttons
  const renderNavigation = () => {
    // Don't show navigation for intro and completion
    if (
      assessmentSteps[currentStep].type === "intro" ||
      assessmentSteps[currentStep].type === "completion"
    ) {
      return null;
    }

    const answered = hasAnsweredCurrent();
    const showSubmitButton = hasQuestion() && !answered;

    return (
      <div className="flex justify-between pt-6">
        <Button
          onClick={handlePrevious}
          disabled={currentStep <= 0}
          variant="outline"
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        {showSubmitButton ? (
          <Button
            onClick={handleShowFeedback}
            disabled={selectedOption === null}
            className="flex items-center gap-1"
            style={{
              backgroundColor:
                selectedOption === null ? "#ccc" : colors.violetz,
              color: colors.white,
            }}
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="flex items-center gap-1">
            {currentStep >= assessmentSteps.length - 2 ? "Complete" : "Next"}{" "}
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-16 px-4 min-h-screen">
      {/* Progress bar */}
      <div className="p-4 mb-4">
        <ProgressBar value={progress} />
        <div className="flex justify-between mt-3 text-sm">
          <span className="font-bold" style={{ color: colors.indigoz }}>
            Step {currentStep + 1} of {assessmentSteps.length}
          </span>
          <div className="flex gap-2">
            {isReviewMode && <Badge variant="outline">Review Mode</Badge>}
            <span className="font-bold" style={{ color: colors.emeraldz }}>
              Score: {score} / {totalQuestions}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="rounded-2xl p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}