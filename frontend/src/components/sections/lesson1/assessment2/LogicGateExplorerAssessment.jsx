import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Info,
  Clock,
  HelpCircle,
  Award,
  BookOpen,
} from "lucide-react";

// Enhanced color palette matching the other assessments
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

const LogicGateExplorer = ({
  onComplete,
  attemptsRemaining = 3,
  currentAttempt = 1,
  maxAttempts = 3,
  studentAssessmentId
}) => {
  // Assessment states
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // Interactive states
  const [selectedGate, setSelectedGate] = useState(null);
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [userMatches, setUserMatches] = useState({});
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // Assessment content
  const assessmentSteps = [
    {
      type: "intro",
      title: "Logic Gate Explorer",
      content:
        "In this assessment, you will explore different types of logic gates and learn to identify them. You'll understand what each gate does and how to recognize them by their behavior.",
      image: "/api/placeholder/600/300",
    },
    {
      type: "gateExplorer",
      title: "Understanding Logic Gates",
      description:
        "Select each gate to learn how it works with different inputs. Try changing the inputs to see how the output changes.",
      gates: [
        {
          name: "AND",
          symbol: "∧",
          description:
            'Returns 1 only if both inputs are 1. Like "I need my keys AND my phone to leave the house."',
          color: colors.emeraldz,
          examples: [
            {
              a: 0,
              b: 0,
              output: 0,
              explanation: "Both inputs OFF → Output OFF",
            },
            {
              a: 0,
              b: 1,
              output: 0,
              explanation: "One input ON, one OFF → Output OFF",
            },
            {
              a: 1,
              b: 0,
              output: 0,
              explanation: "One input ON, one OFF → Output OFF",
            },
            {
              a: 1,
              b: 1,
              output: 1,
              explanation: "Both inputs ON → Output ON",
            },
          ],
        },
        {
          name: "OR",
          symbol: "∨",
          description:
            'Returns 1 if at least one input is 1. Like "I can take the bus OR walk to work."',
          color: colors.cyanz,
          examples: [
            {
              a: 0,
              b: 0,
              output: 0,
              explanation: "Both inputs OFF → Output OFF",
            },
            {
              a: 0,
              b: 1,
              output: 1,
              explanation: "At least one input ON → Output ON",
            },
            {
              a: 1,
              b: 0,
              output: 1,
              explanation: "At least one input ON → Output ON",
            },
            {
              a: 1,
              b: 1,
              output: 1,
              explanation: "Both inputs ON → Output ON",
            },
          ],
        },
        {
          name: "NOT",
          symbol: "¬",
          description:
            "Flips the input value. Like a switch that does the opposite of what you expect.",
          color: colors.pinkz,
          examples: [
            { a: 0, output: 1, explanation: "Input OFF → Output ON (flipped)" },
            { a: 1, output: 0, explanation: "Input ON → Output OFF (flipped)" },
          ],
        },
        {
          name: "NAND",
          symbol: "↑",
          description:
            'Opposite of AND. Returns 0 only when both inputs are 1. Like "NOT (both conditions are true)."',
          color: colors.violetz,
          examples: [
            {
              a: 0,
              b: 0,
              output: 1,
              explanation: "Both inputs OFF → Output ON (opposite of AND)",
            },
            { a: 0, b: 1, output: 1, explanation: "One input OFF → Output ON" },
            { a: 1, b: 0, output: 1, explanation: "One input OFF → Output ON" },
            {
              a: 1,
              b: 1,
              output: 0,
              explanation:
                "Both inputs ON → Output OFF (only time NAND is OFF)",
            },
          ],
        },
        {
          name: "NOR",
          symbol: "↓",
          description:
            'Opposite of OR. Returns 1 only when both inputs are 0. Like "NOT (any condition is true)."',
          color: colors.ambez,
          examples: [
            {
              a: 0,
              b: 0,
              output: 1,
              explanation: "Both inputs OFF → Output ON (only time NOR is ON)",
            },
            {
              a: 0,
              b: 1,
              output: 0,
              explanation: "At least one input ON → Output OFF",
            },
            {
              a: 1,
              b: 0,
              output: 0,
              explanation: "At least one input ON → Output OFF",
            },
            {
              a: 1,
              b: 1,
              output: 0,
              explanation: "Both inputs ON → Output OFF",
            },
          ],
        },
        {
          name: "XOR",
          symbol: "⊕",
          description:
            'Returns 1 only if inputs are different. Like "either this OR that, but not both."',
          color: colors.tealz,
          examples: [
            {
              a: 0,
              b: 0,
              output: 0,
              explanation: "Same inputs (both OFF) → Output OFF",
            },
            {
              a: 0,
              b: 1,
              output: 1,
              explanation: "Different inputs → Output ON",
            },
            {
              a: 1,
              b: 0,
              output: 1,
              explanation: "Different inputs → Output ON",
            },
            {
              a: 1,
              b: 1,
              output: 0,
              explanation: "Same inputs (both ON) → Output OFF",
            },
          ],
        },
        {
          name: "XNOR",
          symbol: "⊙",
          description:
            'Returns 1 if inputs are the same. Like "both conditions match."',
          color: colors.rosez,
          examples: [
            {
              a: 0,
              b: 0,
              output: 1,
              explanation: "Same inputs (both OFF) → Output ON",
            },
            {
              a: 0,
              b: 1,
              output: 0,
              explanation: "Different inputs → Output OFF",
            },
            {
              a: 1,
              b: 0,
              output: 0,
              explanation: "Different inputs → Output OFF",
            },
            {
              a: 1,
              b: 1,
              output: 1,
              explanation: "Same inputs (both ON) → Output ON",
            },
          ],
        },
      ],
      question: "Which gate outputs TRUE only when exactly one input is TRUE?",
      options: ["AND Gate", "OR Gate", "NAND Gate", "XOR Gate"],
      correctAnswer: 3,
      explanation:
        "The XOR (Exclusive OR) gate outputs TRUE (1) only when exactly one input is TRUE and the other is FALSE. In other words, it outputs TRUE when the inputs are different from each other.",
    },
    {
      type: "gateIdentification",
      title: "Gate Identification Challenge",
      description:
        "Look at these input/output patterns and identify which logic gate they represent.",
      challenges: [
        {
          inputs: [
            { a: 0, b: 0, output: 0 },
            { a: 0, b: 1, output: 0 },
            { a: 1, b: 0, output: 0 },
            { a: 1, b: 1, output: 1 },
          ],
          question: "What gate does this pattern represent?",
          options: ["AND", "OR", "NAND", "XOR"],
          correctAnswer: 0,
          explanation:
            "This is an AND gate because it only outputs 1 when both inputs are 1.",
        },
        {
          inputs: [
            { a: 0, b: 0, output: 0 },
            { a: 0, b: 1, output: 1 },
            { a: 1, b: 0, output: 1 },
            { a: 1, b: 1, output: 0 },
          ],
          question: "What gate does this pattern represent?",
          options: ["AND", "OR", "XOR", "NAND"],
          correctAnswer: 2,
          explanation:
            "This is an XOR gate because it outputs 1 only when the inputs are different.",
        },
        {
          inputs: [
            { a: 0, output: 1 },
            { a: 1, output: 0 },
          ],
          question: "What gate does this pattern represent?",
          options: ["NOT", "AND", "OR", "NAND"],
          correctAnswer: 0,
          explanation:
            "This is a NOT gate because it flips the input - 0 becomes 1, and 1 becomes 0.",
        },
      ],
    },
    {
      type: "gateMatching",
      title: "Match Gates to Descriptions",
      description: "Match each description to the correct logic gate.",
      matches: [
        {
          id: 1,
          description: "Only outputs TRUE when both conditions are met",
          correctGate: "AND",
          color: colors.emeraldz,
        },
        {
          id: 2,
          description: "Outputs TRUE when at least one condition is met",
          correctGate: "OR",
          color: colors.cyanz,
        },
        {
          id: 3,
          description: "Does the opposite of whatever you put in",
          correctGate: "NOT",
          color: colors.pinkz,
        },
        {
          id: 4,
          description: "Outputs TRUE only when inputs are different",
          correctGate: "XOR",
          color: colors.tealz,
        },
        {
          id: 5,
          description: "Outputs FALSE only when both inputs are TRUE",
          correctGate: "NAND",
          color: colors.violetz,
        },
      ],
      gateOptions: ["AND", "OR", "NOT", "NAND", "NOR", "XOR", "XNOR"],
      question: "Match each description to the correct logic gate.",
      explanation:
        "Each logic gate has a unique behavior pattern that can be described in everyday language.",
    },
    {
      type: "symbolRecognition",
      title: "Logic Gate Symbol Recognition",
      description: "Identify the logic gates by their symbols.",
      symbols: [
        { symbol: "∧", name: "AND", color: colors.emeraldz },
        { symbol: "∨", name: "OR", color: colors.cyanz },
        { symbol: "¬", name: "NOT", color: colors.pinkz },
        { symbol: "↑", name: "NAND", color: colors.violetz },
        { symbol: "↓", name: "NOR", color: colors.ambez },
        { symbol: "⊕", name: "XOR", color: colors.tealz },
        { symbol: "⊙", name: "XNOR", color: colors.rosez },
      ],
      question: "Which symbol represents the XOR gate?",
      options: ["∧", "∨", "⊕", "↑"],
      correctAnswer: 2,
      explanation:
        "The XOR gate is represented by the ⊕ symbol, which looks like a plus sign in a circle.",
    },
    {
      type: "realWorldLogic",
      title: "Real-World Logic Applications",
      description: "Understand how logic gates work in everyday situations.",
      scenarios: [
        {
          id: 1,
          scenario:
            "A car that only starts when you have the key AND you are wearing a seatbelt.",
          gate: "AND",
          explanation: "Both conditions must be true for the car to start.",
          color: colors.emeraldz,
        },
        {
          id: 2,
          scenario: "A light that turns on when you flip switch A OR switch B.",
          gate: "OR",
          explanation: "Either switch can turn on the light.",
          color: colors.cyanz,
        },
        {
          id: 3,
          scenario:
            "A door that is locked when the security system is NOT armed.",
          gate: "NOT",
          explanation:
            "The door behavior is opposite to the security system state.",
          color: colors.pinkz,
        },
        {
          id: 4,
          scenario:
            "A garage door that opens when you press the remote OR the wall button, but NOT both at the same time.",
          gate: "XOR",
          explanation: "Only one input should be active, not both together.",
          color: colors.tealz,
        },
      ],
      question:
        "A security system that sounds an alarm when a window breaks OR a door opens. Which gate represents this?",
      options: ["AND Gate", "OR Gate", "NOT Gate", "XOR Gate"],
      correctAnswer: 1,
      explanation:
        "An OR gate is perfect for this scenario because the alarm should sound if ANY of the conditions (window break OR door open) is true.",
    },
    {
      type: "completion",
      title: "Assessment Complete!",
      content:
        "You've completed your journey through logic gate identification and understanding.",
    },
  ];

  // Calculate progress percentage
  const progress = ((currentStep + 1) / assessmentSteps.length) * 100;

  // Get total number of questions (excluding intro and completion steps)
  const totalQuestions = assessmentSteps.filter(
    (step) => step.type !== "intro" && step.type !== "completion"
  ).length;

  // Check if user has already answered current question
  const hasAnsweredCurrent = () => {
    return userAnswers[currentStep] !== undefined;
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    if (hasAnsweredCurrent()) return;

    const currentQuestion = assessmentSteps[currentStep];
    let isCorrect = false;

    if (currentQuestion.type === "gateIdentification") {
      // Handle the gate identification challenges
      const currentChallenge =
        currentQuestion.challenges[currentQuestion.currentChallengeIndex || 0];
      isCorrect = answer === currentChallenge.correctAnswer;
    } else if (currentQuestion.type === "gateMatching") {
      // Handle matching answers
      isCorrect = Object.keys(answer).every(
        (key) =>
          answer[key] ===
          currentQuestion.matches.find((m) => m.id === parseInt(key))
            ?.correctGate
      );
    } else {
      // Handle regular multiple choice
      isCorrect = answer === currentQuestion.correctAnswer;
    }

    // Update score
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setFeedbackMessage(
        "Correct! " +
          (currentQuestion.explanation ||
            currentQuestion.challenges?.[0]?.explanation)
      );
    } else {
      setFeedbackMessage(
        "Not quite. " +
          (currentQuestion.explanation ||
            currentQuestion.challenges?.[0]?.explanation)
      );
    }

    // Update user answers
    setUserAnswers({
      ...userAnswers,
      [currentStep]: { answer, isCorrect },
    });

    // Show feedback
    setShowFeedback(true);
  };

  // Handle navigation between steps
  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowFeedback(false);
      setHintVisible(false);
    } else {
      finishAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowFeedback(false);
      setHintVisible(false);
    }
  };

  // SIMPLIFIED - Complete the assessment
  const finishAssessment = async () => {
    setIsCompleted(true);
    const finalScore = Math.round((score / totalQuestions) * 100);

    // Single callback with all data needed
    if (onComplete) {
      await onComplete({
        score,
        totalQuestions,
        percentage: finalScore,
        userAnswers,
        isCompleted: true
      });
    }

    console.log("Assessment completed:", {
      score,
      totalQuestions,
      percentage: finalScore
    });
  };

  // Reset and restart assessment
  const handleRestartAssessment = () => {
    setCurrentStep(0);
    setScore(0);
    setUserAnswers({});
    setShowFeedback(false);
    setFeedbackMessage("");
    setIsCompleted(false);
    setSelectedGate(null);
    setInputA(0);
    setInputB(0);
    setShowDescription(false);
    setHintVisible(false);
    setUserMatches({});
    setCurrentChallengeIndex(0);

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

  // Enhanced Logic Gate component
  const LogicGate = ({ gate, selected, onClick }) => {
    return (
      <div
        className={`p-6 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg ${
          selected ? "border-2 shadow-lg" : "border-gray-200"
        }`}
        onClick={onClick}
        style={{
          backgroundColor: selected ? `${gate.color}20` : colors.white,
          borderColor: selected ? gate.color : "#e5e7eb",
        }}
      >
        <div className="flex flex-col items-center">
          <div
            className="text-lg font-bold mb-2"
            style={{ color: colors.grayz }}
          >
            {gate.name}
          </div>
          <div
            className="text-4xl my-3 font-bold"
            style={{ color: gate.color }}
          >
            {gate.symbol}
          </div>
          <div className="text-xs text-center" style={{ color: colors.grayz }}>
            {gate.description.split(".")[0]}
          </div>
        </div>
      </div>
    );
  };

  // Gate Output Calculator
  const calculateOutput = (gate, a, b = null) => {
    switch (gate) {
      case "AND":
        return a && b ? 1 : 0;
      case "OR":
        return a || b ? 1 : 0;
      case "NOT":
        return a ? 0 : 1;
      case "NAND":
        return a && b ? 0 : 1;
      case "NOR":
        return a || b ? 0 : 1;
      case "XOR":
        return a !== b ? 1 : 0;
      case "XNOR":
        return a === b ? 1 : 0;
      default:
        return null;
    }
  };

  // Enhanced Progress Bar component
  const ProgressBar = ({ value }) => {
    return (
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${colors.emeraldz}, ${colors.cyanz}, ${colors.violetz})`,
          }}
        />
      </div>
    );
  };

  // Custom Badge component
  const Badge = ({ children, color, className }) => {
    return (
      <span
        className={`px-3 py-1 text-sm font-bold rounded-full ${className}`}
        style={{
          backgroundColor: `${colors[color]}20`,
          color: colors[color],
        }}
      >
        {children}
      </span>
    );
  };

  // Render different content based on step type
  const renderStepContent = () => {
    const step = assessmentSteps[currentStep];

    switch (step.type) {
      case "intro":
        return (
          <div className="flex flex-col items-center space-y-6 text-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
              style={{
                background: `linear-gradient(135deg, ${colors.indigoz}, ${colors.violetz})`,
              }}
            >
              <span className="text-4xl">⚡</span>
            </div>
            <h2 className="text-3xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <div
              className="w-full max-w-2xl h-64 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.cyanz}20, ${colors.violetz}20)`,
              }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🔍</div>
                <p
                  className="text-lg font-medium"
                  style={{ color: colors.indigoz }}
                >
                  Learn to Identify Logic Gates
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

            <Button onClick={handleNext} size="lg" className="mt-6">
              Begin Exploration
            </Button>
          </div>
        );

      case "gateExplorer":
        const gate = selectedGate
          ? step.gates.find((g) => g.name === selectedGate)
          : null;
        const output = gate ? calculateOutput(gate.name, inputA, inputB) : null;

        return (
          <div className="space-y-8">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.emeraldz}, ${colors.cyanz})`,
                }}
              >
                <span className="text-2xl">🎛️</span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.grayz }}
              >
                {step.title}
              </h2>
            </div>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Gates selection */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {step.gates.map((g) => (
                <LogicGate
                  key={g.name}
                  gate={g}
                  selected={selectedGate === g.name}
                  onClick={() => {
                    setSelectedGate(g.name);
                    setShowDescription(false);
                  }}
                />
              ))}
            </div>

            {/* Interactive Logic Gate Simulator */}
            {selectedGate && (
              <div
                className="rounded-xl shadow-lg overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${colors.white}, ${gate.color}10)`,
                }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3
                      className="text-xl font-bold"
                      style={{ color: gate.color }}
                    >
                      {selectedGate} Gate
                    </h3>
                    <Button
                      variant="outline"
                      onClick={() => setShowDescription(!showDescription)}
                      className="text-sm"
                    >
                      {showDescription ? "Hide Examples" : "Show Examples"}
                    </Button>
                  </div>

                  <p className="mb-6" style={{ color: colors.grayz }}>
                    {gate?.description}
                  </p>

                  <div className="flex flex-col lg:flex-row justify-around items-center space-y-6 lg:space-y-0 lg:space-x-8">
                    <div className="flex flex-col items-center">
                      <p
                        className="font-bold mb-4 text-lg"
                        style={{ color: colors.indigoz }}
                      >
                        Inputs
                      </p>
                      {/* Input A */}
                      <div className="mb-6">
                        <span
                          className="mr-3 font-bold text-lg"
                          style={{ color: colors.grayz }}
                        >
                          A:
                        </span>
                        <div className="inline-flex rounded-lg overflow-hidden shadow-md">
                          <button
                            className={`px-6 py-3 font-bold transition-all ${
                              inputA === 0
                                ? "text-white shadow-lg"
                                : "hover:shadow-md"
                            }`}
                            style={{
                              backgroundColor:
                                inputA === 0 ? colors.indigoz : colors.white,
                              color:
                                inputA === 0 ? colors.white : colors.indigoz,
                              borderRight: `1px solid ${colors.indigoz}30`,
                            }}
                            onClick={() => setInputA(0)}
                          >
                            0
                          </button>
                          <button
                            className={`px-6 py-3 font-bold transition-all ${
                              inputA === 1
                                ? "text-white shadow-lg"
                                : "hover:shadow-md"
                            }`}
                            style={{
                              backgroundColor:
                                inputA === 1 ? colors.indigoz : colors.white,
                              color:
                                inputA === 1 ? colors.white : colors.indigoz,
                            }}
                            onClick={() => setInputA(1)}
                          >
                            1
                          </button>
                        </div>
                      </div>

                      {/* Input B - only shown for gates that need 2 inputs */}
                      {selectedGate !== "NOT" && (
                        <div>
                          <span
                            className="mr-3 font-bold text-lg"
                            style={{ color: colors.grayz }}
                          >
                            B:
                          </span>
                          <div className="inline-flex rounded-lg overflow-hidden shadow-md">
                            <button
                              className={`px-6 py-3 font-bold transition-all ${
                                inputB === 0
                                  ? "text-white shadow-lg"
                                  : "hover:shadow-md"
                              }`}
                              style={{
                                backgroundColor:
                                  inputB === 0 ? colors.indigoz : colors.white,
                                color:
                                  inputB === 0 ? colors.white : colors.indigoz,
                                borderRight: `1px solid ${colors.indigoz}30`,
                              }}
                              onClick={() => setInputB(0)}
                            >
                              0
                            </button>
                            <button
                              className={`px-6 py-3 font-bold transition-all ${
                                inputB === 1
                                  ? "text-white shadow-lg"
                                  : "hover:shadow-md"
                              }`}
                              style={{
                                backgroundColor:
                                  inputB === 1 ? colors.indigoz : colors.white,
                                color:
                                  inputB === 1 ? colors.white : colors.indigoz,
                              }}
                              onClick={() => setInputB(1)}
                            >
                              1
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Gate symbol */}
                    <div className="flex items-center">
                      <div
                        className="w-20 h-20 rounded-xl flex items-center justify-center text-5xl shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${gate.color}, ${gate.color}80)`,
                        }}
                      >
                        <span className="text-white">{gate?.symbol}</span>
                      </div>
                    </div>

                    {/* Output */}
                    <div className="flex flex-col items-center">
                      <p
                        className="font-bold mb-4 text-lg"
                        style={{ color: colors.indigoz }}
                      >
                        Output
                      </p>
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform transition-all hover:scale-110"
                        style={{
                          background: output
                            ? `linear-gradient(135deg, ${colors.emeraldz}, ${colors.mintgreenz})`
                            : `linear-gradient(135deg, ${colors.coralz}, ${colors.redz})`,
                        }}
                      >
                        {output}
                      </div>
                    </div>
                  </div>

                  {/* Examples */}
                  {showDescription && (
                    <div
                      className="mt-8 p-4 rounded-xl"
                      style={{ backgroundColor: `${colors.skyz}10` }}
                    >
                      <h4
                        className="font-bold mb-4 text-lg"
                        style={{ color: colors.indigoz }}
                      >
                        All Examples for {selectedGate}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {gate?.examples.map((example, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg"
                            style={{ backgroundColor: colors.white }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex space-x-4">
                                <span className="font-bold">
                                  A: {example.a}
                                </span>
                                {example.hasOwnProperty("b") && (
                                  <span className="font-bold">
                                    B: {example.b}
                                  </span>
                                )}
                              </div>
                              <span
                                className="font-bold"
                                style={{
                                  color: example.output
                                    ? colors.emeraldz
                                    : colors.coralz,
                                }}
                              >
                                Output: {example.output}
                              </span>
                            </div>
                            <p
                              className="text-sm"
                              style={{ color: colors.grayz }}
                            >
                              {example.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Question */}
            <div className="p-6 rounded-xl">
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: colors.grayz }}
              >
                {step.question}
              </h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => {
                  const answered = hasAnsweredCurrent();
                  const isSelected = answered
                    ? userAnswers[currentStep]?.answer === idx
                    : false;
                  const isCorrect = step.correctAnswer === idx;

                  let bgColor = colors.white;
                  let borderColor = colors.tealz;

                  if (answered && isSelected) {
                    bgColor = userAnswers[currentStep].isCorrect
                      ? `${colors.emeraldz}20`
                      : `${colors.coralz}20`;
                    borderColor = userAnswers[currentStep].isCorrect
                      ? colors.emeraldz
                      : colors.coralz;
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !answered && handleAnswerSelect(idx)}
                      className={`p-4 border-2 rounded-xl transition-all transform ${
                        answered
                          ? "cursor-default"
                          : "cursor-pointer hover:scale-105 hover:shadow-md"
                      }`}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isSelected ? borderColor : colors.tealz,
                        color: colors.grayz,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {answered &&
                          isSelected &&
                          userAnswers[currentStep].isCorrect && (
                            <CheckCircle
                              className="h-6 w-6"
                              style={{ color: colors.emeraldz }}
                            />
                          )}
                        {answered &&
                          isSelected &&
                          !userAnswers[currentStep].isCorrect && (
                            <XCircle
                              className="h-6 w-6"
                              style={{ color: colors.coralz }}
                            />
                          )}
                        {answered && !isSelected && isCorrect && (
                          <CheckCircle
                            className="h-6 w-6"
                            style={{ color: colors.emeraldz, opacity: 0.5 }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div
                  className="mt-4 p-4 rounded-xl border-2"
                  style={{
                    backgroundColor: userAnswers[currentStep]?.isCorrect
                      ? `${colors.emeraldz}10`
                      : `${colors.coralz}10`,
                    borderColor: userAnswers[currentStep]?.isCorrect
                      ? colors.emeraldz
                      : colors.coralz,
                    color: userAnswers[currentStep]?.isCorrect
                      ? colors.emeraldz
                      : colors.coralz,
                  }}
                >
                  <p className="font-medium">{feedbackMessage}</p>
                </div>
              )}

              {renderNavigation()}
            </div>
          </div>
        );

      case "gateIdentification":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.tealz}, ${colors.cyanz})`,
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

            {/* Display truth table for the current challenge */}
            {step.challenges && step.challenges[0] && (
              <div
                className="p-6 rounded-xl shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${colors.white}, ${colors.tealz}10)`,
                }}
              >
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: colors.tealz }}
                >
                  Truth Table Pattern
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr
                        style={{
                          backgroundColor: `${colors.tealz}20`,
                          color: colors.grayz,
                        }}
                      >
                        {step.challenges[0].inputs[0].hasOwnProperty('b') && (
                          <>
                            <th className="border border-gray-300 px-4 py-2 font-bold">Input A</th>
                            <th className="border border-gray-300 px-4 py-2 font-bold">Input B</th>
                          </>
                        )}
                        {!step.challenges[0].inputs[0].hasOwnProperty('b') && (
                          <th className="border border-gray-300 px-4 py-2 font-bold">Input</th>
                        )}
                        <th className="border border-gray-300 px-4 py-2 font-bold">Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {step.challenges[0].inputs.map((row, idx) => (
                        <tr key={idx}>
                          <td 
                            className="border border-gray-300 px-4 py-2 text-center font-bold"
                            style={{ color: colors.grayz }}
                          >
                            {row.a}
                          </td>
                          {row.hasOwnProperty('b') && (
                            <td 
                              className="border border-gray-300 px-4 py-2 text-center font-bold"
                              style={{ color: colors.grayz }}
                            >
                              {row.b}
                            </td>
                          )}
                          <td 
                            className="border border-gray-300 px-4 py-2 text-center font-bold"
                            style={{ 
                              color: row.output === 1 ? colors.emeraldz : colors.coralz 
                            }}
                          >
                            {row.output}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Question */}
            <div className="p-6 rounded-xl">
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: colors.grayz }}
              >
                {step.challenges?.[0]?.question}
              </h3>
              <div className="space-y-3">
                {step.challenges?.[0]?.options.map((option, idx) => {
                  const answered = hasAnsweredCurrent();
                  const isSelected = answered
                    ? userAnswers[currentStep]?.answer === idx
                    : false;
                  const isCorrect = step.challenges[0].correctAnswer === idx;

                  let bgColor = colors.white;
                  let borderColor = colors.tealz;

                  if (answered && isSelected) {
                    bgColor = userAnswers[currentStep].isCorrect
                      ? `${colors.emeraldz}20`
                      : `${colors.coralz}20`;
                    borderColor = userAnswers[currentStep].isCorrect
                      ? colors.emeraldz
                      : colors.coralz;
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !answered && handleAnswerSelect(idx)}
                      className={`p-4 border-2 rounded-xl transition-all transform ${
                        answered
                          ? "cursor-default"
                          : "cursor-pointer hover:scale-105 hover:shadow-md"
                      }`}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isSelected ? borderColor : colors.tealz,
                        color: colors.grayz,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {answered &&
                          isSelected &&
                          userAnswers[currentStep].isCorrect && (
                            <CheckCircle
                              className="h-6 w-6"
                              style={{ color: colors.emeraldz }}
                            />
                          )}
                        {answered &&
                          isSelected &&
                          !userAnswers[currentStep].isCorrect && (
                            <XCircle
                              className="h-6 w-6"
                              style={{ color: colors.coralz }}
                            />
                          )}
                        {answered && !isSelected && isCorrect && (
                          <CheckCircle
                            className="h-6 w-6"
                            style={{ color: colors.emeraldz, opacity: 0.5 }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div
                  className="mt-4 p-4 rounded-xl border-2"
                  style={{
                    backgroundColor: userAnswers[currentStep]?.isCorrect
                      ? `${colors.emeraldz}10`
                      : `${colors.coralz}10`,
                    borderColor: userAnswers[currentStep]?.isCorrect
                      ? colors.emeraldz
                      : colors.coralz,
                    color: userAnswers[currentStep]?.isCorrect
                      ? colors.emeraldz
                      : colors.coralz,
                  }}
                >
                  <p className="font-medium">{feedbackMessage}</p>
                </div>
              )}

              {renderNavigation()}
            </div>
          </div>
        );

      case "gateMatching":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.violetz}, ${colors.pinkz})`,
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

            {/* Matching cards */}
            <div className="grid grid-cols-1 gap-4">
              {step.matches?.map((match) => (
                <div
                  key={match.id}
                  className="p-4 rounded-xl shadow-md border-l-4"
                  style={{
                    backgroundColor: colors.white,
                    borderLeftColor: match.color,
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <p
                        className="font-medium"
                        style={{ color: colors.grayz }}
                      >
                        {match.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {step.gateOptions?.map((gate) => (
                        <button
                          key={gate}
                          onClick={() => {
                            const newMatches = { ...userMatches };
                            newMatches[match.id] = gate;
                            setUserMatches(newMatches);
                          }}
                          className={`px-3 py-2 rounded-lg font-medium transition-all ${
                            userMatches[match.id] === gate
                              ? "shadow-lg"
                              : "hover:shadow-md"
                          }`}
                          style={{
                            backgroundColor:
                              userMatches[match.id] === gate
                                ? match.color
                                : colors.white,
                            color:
                              userMatches[match.id] === gate
                                ? colors.white
                                : colors.grayz,
                            border: `2px solid ${
                              userMatches[match.id] === gate
                                ? match.color
                                : "#e5e7eb"
                            }`,
                          }}
                        >
                          {gate}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit matching answers */}
            <div className="text-center">
              <Button
                onClick={() => handleAnswerSelect(userMatches)}
                disabled={
                  Object.keys(userMatches).length !== step.matches?.length ||
                  hasAnsweredCurrent()
                }
                className="px-8 py-3"
              >
                Submit Matches
              </Button>
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div
                className="mt-4 p-4 rounded-xl border-2"
                style={{
                  backgroundColor: userAnswers[currentStep]?.isCorrect
                    ? `${colors.emeraldz}10`
                    : `${colors.coralz}10`,
                  borderColor: userAnswers[currentStep]?.isCorrect
                    ? colors.emeraldz
                    : colors.coralz,
                  color: userAnswers[currentStep]?.isCorrect
                    ? colors.emeraldz
                    : colors.coralz,
                }}
              >
                <p className="font-medium">{feedbackMessage}</p>
              </div>
            )}

            {renderNavigation()}
          </div>
        );

      case "symbolRecognition":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.ambez}, ${colors.orangez})`,
                }}
              >
                <span className="text-2xl">🔣</span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.grayz }}
              >
                {step.title}
              </h2>
            </div>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Symbol gallery */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {step.symbols?.map((symbolInfo, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                  style={{
                    backgroundColor: colors.white,
                    border: `2px solid ${symbolInfo.color}30`,
                  }}
                >
                  <div className="text-center">
                    <div
                      className="text-4xl font-bold mb-2"
                      style={{ color: symbolInfo.color }}
                    >
                      {symbolInfo.symbol}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: colors.grayz }}
                    >
                      {symbolInfo.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Question */}
            <div className="p-6 rounded-xl">
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: colors.grayz }}
              >
                {step.question}
              </h3>
              <div className="space-y-3">
                {step.options?.map((option, idx) => {
                  const answered = hasAnsweredCurrent();
                  const isSelected = answered
                    ? userAnswers[currentStep]?.answer === idx
                    : false;
                  const isCorrect = step.correctAnswer === idx;

                  let bgColor = colors.white;
                  let borderColor = colors.ambez;

                  if (answered && isSelected) {
                    bgColor = userAnswers[currentStep].isCorrect
                      ? `${colors.emeraldz}20`
                      : `${colors.coralz}20`;
                    borderColor = userAnswers[currentStep].isCorrect
                      ? colors.emeraldz
                      : colors.coralz;
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !answered && handleAnswerSelect(idx)}
                      className={`p-4 border-2 rounded-xl transition-all transform ${
                        answered
                          ? "cursor-default"
                          : "cursor-pointer hover:scale-105 hover:shadow-md"
                      }`}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isSelected ? borderColor : colors.ambez,
                        color: colors.grayz,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-2xl">{option}</span>
                        {answered &&
                          isSelected &&
                          userAnswers[currentStep].isCorrect && (
                            <CheckCircle
                              className="h-6 w-6"
                              style={{ color: colors.emeraldz }}
                            />
                          )}
                        {answered &&
                          isSelected &&
                          !userAnswers[currentStep].isCorrect && (
                            <XCircle
                              className="h-6 w-6"
                              style={{ color: colors.coralz }}
                            />
                          )}
                        {answered && !isSelected && isCorrect && (
                          <CheckCircle
                            className="h-6 w-6"
                            style={{ color: colors.emeraldz, opacity: 0.5 }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div
                  className="mt-4 p-4 rounded-xl border-2"
                  style={{
                    backgroundColor: userAnswers[currentStep]?.isCorrect
                      ? `${colors.emeraldz}10`
                      : `${colors.coralz}10`,
                    borderColor: userAnswers[currentStep]?.isCorrect
                      ? colors.emeraldz
                      : colors.coralz,
                    color: userAnswers[currentStep]?.isCorrect
                      ? colors.emeraldz
                      : colors.coralz,
                  }}
                >
                  <p className="font-medium">{feedbackMessage}</p>
                </div>
              )}

              {renderNavigation()}
            </div>
          </div>
        );

      case "realWorldLogic":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.limez}, ${colors.emeraldz})`,
                }}
              >
                <span className="text-2xl">🌍</span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.grayz }}
              >
                {step.title}
              </h2>
            </div>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Real-world scenarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.scenarios?.map((scenario) => (
                <div
                  key={scenario.id}
                  className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-l-4"
                  style={{
                    backgroundColor: colors.white,
                    borderLeftColor: scenario.color,
                  }}
                >
                  <div className="mb-4">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-3"
                      style={{
                        backgroundColor: `${scenario.color}20`,
                        color: scenario.color,
                      }}
                    >
                      {scenario.gate} Gate
                    </div>
                    <p
                      className="font-medium mb-2"
                      style={{ color: colors.grayz }}
                    >
                      {scenario.scenario}
                    </p>
                    <p className="text-sm" style={{ color: colors.grayz }}>
                      {scenario.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Question */}
            <div className="p-6 rounded-xl">
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: colors.grayz }}
              >
                {step.question}
              </h3>
              <div className="space-y-3">
                {step.options?.map((option, idx) => {
                  const answered = hasAnsweredCurrent();
                  const isSelected = answered
                    ? userAnswers[currentStep]?.answer === idx
                    : false;
                  const isCorrect = step.correctAnswer === idx;

                  let bgColor = colors.white;
                  let borderColor = colors.limez;

                  if (answered && isSelected) {
                    bgColor = userAnswers[currentStep].isCorrect
                      ? `${colors.emeraldz}20`
                      : `${colors.coralz}20`;
                    borderColor = userAnswers[currentStep].isCorrect
                      ? colors.emeraldz
                      : colors.coralz;
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !answered && handleAnswerSelect(idx)}
                      className={`p-4 border-2 rounded-xl transition-all transform ${
                        answered
                          ? "cursor-default"
                          : "cursor-pointer hover:scale-105 hover:shadow-md"
                      }`}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isSelected ? borderColor : colors.limez,
                        color: colors.grayz,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {answered &&
                          isSelected &&
                          userAnswers[currentStep].isCorrect && (
                            <CheckCircle
                              className="h-6 w-6"
                              style={{ color: colors.emeraldz }}
                            />
                          )}
                        {answered &&
                          isSelected &&
                          !userAnswers[currentStep].isCorrect && (
                            <XCircle
                              className="h-6 w-6"
                              style={{ color: colors.coralz }}
                            />
                          )}
                        {answered && !isSelected && isCorrect && (
                          <CheckCircle
                            className="h-6 w-6"
                            style={{ color: colors.emeraldz, opacity: 0.5 }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div
                  className="mt-4 p-4 rounded-xl border-2"
                  style={{
                    backgroundColor: userAnswers[currentStep]?.isCorrect
                      ? `${colors.emeraldz}10`
                      : `${colors.coralz}10`,
                    borderColor: userAnswers[currentStep]?.isCorrect
                      ? colors.emeraldz
                      : colors.coralz,
                    color: userAnswers[currentStep]?.isCorrect
                      ? colors.emeraldz
                      : colors.coralz,
                  }}
                >
                  <p className="font-medium">{feedbackMessage}</p>
                </div>
              )}

              {renderNavigation()}
            </div>
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
                      ? "Excellent! 🌟"
                      : finalScore >= 60
                      ? "Good job! 👍"
                      : "Keep practicing! 📚"}
                  </p>
                  <p className="text-sm mt-1">
                    {finalScore >= 80
                      ? "You have a strong understanding of logic gates and circuit analysis. You can recognize different gates and understand what they do!"
                      : finalScore >= 60
                      ? "You understand many key concepts about logic gates. Review the gate types and their behaviors to strengthen your understanding."
                      : "Logic gate identification takes practice. Try revisiting the gate explorer and practice identifying gates by their behavior patterns."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Only show restart if attempts remaining */}
              {attemptsRemaining > 1 && (
                <Button
                  onClick={handleRestartAssessment}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Try Again ({attemptsRemaining - 1} attempts left)
                </Button>
              )}

              {/* SIMPLIFIED - Single finish button */}
              <Button onClick={finishAssessment} className="flex items-center gap-2">
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

    return (
      <div className="flex justify-between mt-6">
        <Button
          onClick={handlePrevious}
          disabled={currentStep <= 0}
          variant="outline"
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!answered}
          className="flex items-center gap-1"
        >
          {currentStep >= assessmentSteps.length - 2 ? "Complete" : "Next"}{" "}
          <ChevronRight className="h-4 w-4" />
        </Button>
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
          <span className="font-bold" style={{ color: colors.emeraldz }}>
            Score: {score} / {totalQuestions}
          </span>
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
};

export default LogicGateExplorer;