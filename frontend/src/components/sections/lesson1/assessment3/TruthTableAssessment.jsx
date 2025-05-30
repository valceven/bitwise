import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Info,
  AlertCircle,
  Award,
  Clock,
  BookOpen,
  RotateCcw,
} from "lucide-react";

// Enhanced color palette with more colors
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
  // New colors
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

const TruthTableConstructionAssessment = ({
  onComplete,
  onFinish,
  attemptsRemaining = 3,
  currentAttempt = 1,
  maxAttempts = 3,
  studentAssessmentId,
}) => {
  // Assessment states - FIXED to match HistoricalAssessment pattern
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Changed from object to array
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Interactive states
  const [selectedVariables, setSelectedVariables] = useState(2);
  const [userTruthTable, setUserTruthTable] = useState({});
  const [highlightCell, setHighlightCell] = useState(null);
  const [showFormula, setShowFormula] = useState(false);
  const [explanationOpen, setExplanationOpen] = useState(false);
  const [userRowCalculations, setUserRowCalculations] = useState({});
  const [calculationChecked, setCalculationChecked] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setUserTruthTable({});
    setHighlightCell(null);
    setExplanationOpen(false);
    setCalculationChecked(false);
    setUserRowCalculations({});
  }, [currentStep]);

  // Assessment content
  const assessmentSteps = [
    {
      type: "intro",
      title: "Truth Table Construction",
      content:
        "In this assessment, you will learn how to construct truth tables for Boolean expressions. You'll understand the relationship between variables and table size, and build truth tables step by step.",
    },
    {
      type: "variableExplanation",
      title: "Understanding Truth Table Size",
      description:
        "The number of rows in a truth table depends on the number of input variables. For n variables, you need 2^n rows to cover all possible combinations.",
      examples: [
        { variables: 1, rows: 2, formula: "2^1 = 2" },
        { variables: 2, rows: 4, formula: "2^2 = 4" },
        { variables: 3, rows: 8, formula: "2^3 = 8" },
        { variables: 4, rows: 16, formula: "2^4 = 16" },
      ],
      formula: "Rows = 2^n, where n is the number of variables",
      question: "How many rows would a truth table with 5 variables have?",
      options: ["8 rows", "16 rows", "32 rows", "64 rows"],
      correctAnswer: 2,
      explanation:
        "With 5 variables, the number of rows would be 2^5 = 32 rows. Each additional variable doubles the number of rows needed to represent all possible combinations.",
    },
    {
      type: "variableSelection",
      title: "Select Number of Variables",
      description:
        "Let's see how different numbers of variables affect the truth table size. Select how many variables you want to use (1-3).",
      instructionalText:
        "As you change the number of variables, notice how the number of rows changes. With 3 variables, we already need 8 rows to cover all possible input combinations!",
      question: "Which statement is true about truth tables?",
      options: [
        "A truth table with 2 variables always has 3 rows",
        "Adding one more variable to a truth table doubles the number of rows",
        "A truth table with 4 variables has the same number of rows as one with 3 variables",
        "The number of rows equals the number of variables times two",
      ],
      correctAnswer: 1,
      explanation:
        "Adding one more variable to a truth table doubles the number of rows because we need to account for all combinations of the new variable (0 and 1) with all existing combinations.",
    },
    {
      type: "complexTableConstruction",
      title: "Construct a Truth Table",
      description:
        "Now let's build a simplified truth table for the expression: A AND (NOT B)",
      operationDescription:
        "This expression has two parts: A and (NOT B). We'll calculate NOT B first, then combine it with A using the AND operator.",
      table: {
        headers: ["A", "B", "NOT B", "A AND (NOT B)"],
        rows: [
          [0, 0, null, null],
          [0, 1, null, null],
          [1, 0, null, null],
          [1, 1, null, null],
        ],
      },
      correctAnswers: {
        "NOT B": [1, 0, 1, 0],
        "A AND (NOT B)": [0, 0, 1, 0],
      },
      question: "What is the result of A AND (NOT B) when A=1 and B=0?",
      options: ["0", "1", "Cannot be determined", "Error"],
      correctAnswer: 1,
      explanation:
        "When A=1 and B=0: NOT B = NOT 0 = 1, so A AND (NOT B) = 1 AND 1 = 1. The AND operation returns 1 only when both inputs are 1.",
    },
    {
      type: "equivalenceChallenge",
      title: "Expression Equivalence Challenge",
      description:
        "Different expressions can produce the same truth table, making them equivalent. Let's see if you can identify equivalent expressions.",
      question: "Which expression is equivalent to NOT(A AND B)?",
      options: ["NOT A AND NOT B", "NOT A OR NOT B", "A OR B", "A AND B"],
      correctAnswer: 1,
      explanation:
        "NOT(A AND B) is equivalent to (NOT A) OR (NOT B). This is known as De Morgan's Law. You can verify this by constructing truth tables for both expressions.",
    },
    {
      type: "realWorldApplication",
      title: "Real-World Truth Table Application",
      description: "Truth tables help us model real-world logical scenarios.",
      scenario:
        "A home security system that triggers an alarm when: the door is open AND the system is armed, OR when the motion sensor detects movement AND it's nighttime.",
      question: "Which Boolean expression represents this scenario?",
      options: [
        "(Door AND Armed) OR (Motion AND Nighttime)",
        "(Door OR Armed) AND (Motion OR Nighttime)",
        "Door AND Armed AND Motion AND Nighttime",
        "(Door OR Motion) AND (Armed OR Nighttime)",
      ],
      correctAnswer: 0,
      explanation:
        "The correct expression is (Door AND Armed) OR (Motion AND Nighttime). The alarm triggers in two cases: when both the door is open AND the system is armed, OR when both motion is detected AND it's nighttime.",
    },
    {
      type: "completion",
      title: "Assessment Complete!",
      content:
        "You've completed your journey through truth table construction.",
    },
  ];

  // Calculate progress percentage
  const progress = ((currentStep + 1) / assessmentSteps.length) * 100;

  // Get total number of questions (excluding intro and completion steps)
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

    setShowFeedback(true);
  };

  // Handle user input for truth table cells
  const handleTruthTableInput = (rowIndex, columnHeader, value) => {
    setUserTruthTable({
      ...userTruthTable,
      [`${rowIndex}-${columnHeader}`]:
        value === "" ? undefined : Number.parseInt(value),
    });
  };

  // Check truth table answers
  const checkTruthTableAnswers = (tableType) => {
    const step = assessmentSteps[currentStep];
    let isAllCorrect = true;
    let correctCount = 0;
    let totalCells = 0;

    if (tableType === "basic") {
      // Basic table with single column of answers
      for (let i = 0; i < step.table.rows.length; i++) {
        const userAnswer = userTruthTable[`${i}-${step.table.headers[2]}`];
        if (userAnswer === undefined) {
          isAllCorrect = false;
          break;
        }

        if (userAnswer === step.correctAnswers[i]) {
          correctCount++;
        } else {
          isAllCorrect = false;
        }
        totalCells++;
      }
    } else if (tableType === "complex") {
      // Complex table with multiple columns to fill
      const columnsToCheck = Object.keys(step.correctAnswers);

      for (const column of columnsToCheck) {
        for (let i = 0; i < step.table.rows.length; i++) {
          const userAnswer = userTruthTable[`${i}-${column}`];
          if (userAnswer === undefined) {
            isAllCorrect = false;
            break;
          }

          if (userAnswer === step.correctAnswers[column][i]) {
            correctCount++;
          } else {
            isAllCorrect = false;
          }
          totalCells++;
        }
      }
    }

    // Calculate partial score (for complex tables)
    const accuracy = correctCount / totalCells;

    // Update user answers using the new pattern
    const newAnswer = {
      questionIndex: currentStep,
      selectedAnswer: null, // For table construction
      isCorrect: isAllCorrect,
      accuracy: accuracy,
    };

    setUserAnswers([...userAnswers, newAnswer]);

    // Show feedback
    if (isAllCorrect) {
      setFeedbackMessage("Perfect! " + step.explanation);
    } else if (accuracy > 0.5) {
      setFeedbackMessage(
        "You got some correct, but not all. " + step.explanation
      );
    } else {
      setFeedbackMessage("Let's review this. " + step.explanation);
    }

    setShowFeedback(true);
  };

  // Handle row calculation for the variable selection exercise
  const handleRowCalculation = (variables, value) => {
    setUserRowCalculations({
      ...userRowCalculations,
      [variables]: value,
    });
  };

  // Check if user has answered a specific row calculation
  const hasCalculationAnswer = (variables) => {
    return calculationChecked && userRowCalculations[variables] !== undefined;
  };

  // Check if a specific row calculation is correct
  const isCalculationCorrect = (variables) => {
    return (
      Number.parseInt(userRowCalculations[variables]) ===
      Math.pow(2, Number.parseInt(variables))
    );
  };

  // Check all row calculations
  const checkRowCalculations = () => {
    setCalculationChecked(true);
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

  // Complete the assessment - FIXED to match HistoricalAssessment pattern
  const finishAssessment = async () => {
    setIsCompleted(true);
    const finalScore = (score / totalQuestions) * 100;

    const assessmentData = {
      percentage: Math.round(finalScore),
      score: score,
      totalQuestions: totalQuestions,
      userAnswers: userAnswers,
      currentAttempt: currentAttempt,
      maxAttempts: maxAttempts,
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
      maxAttempts: maxAttempts,
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

  // Reset and restart assessment
  const handleRestartAssessment = () => {
    setCurrentStep(0);
    setUserAnswers([]);
    setIsReviewMode(false);
    setIsCompleted(false);
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedbackMessage("");
    setUserTruthTable({});
    setHighlightCell(null);
    setSelectedVariables(2);
    setExplanationOpen(false);
    setCalculationChecked(false);
    setUserRowCalculations({});

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

  // Function to generate truth table rows based on number of variables
  const generateTruthTableRows = (variables) => {
    const rows = [];
    const totalRows = Math.pow(2, variables);

    for (let i = 0; i < totalRows; i++) {
      const row = [];
      for (let j = variables - 1; j >= 0; j--) {
        // Calculate bit value (0 or 1) for this position
        const bit = (i >> j) & 1;
        row.unshift(bit); // Add to beginning of row
      }
      rows.push(row);
    }

    return rows;
  };

  // Progress Bar component
  const ProgressBar = ({ value }) => {
    return (
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${colors.mintgreenz}, ${colors.cyanz}, ${colors.bluez})`,
          }}
        />
      </div>
    );
  };

  // Mathematical formula with superscript
  const Formula = ({ base, exponent }) => {
    return (
      <span className="font-medium">
        {base}
        <sup>{exponent}</sup>
      </span>
    );
  };

  // Explanation panel component
  const ExplanationPanel = ({ title, children, isOpen, onToggle }) => {
    return (
      <div className="bg-offwhite rounded-lg overflow-hidden mt-4">
        <div
          className="p-3 cursor-pointer flex justify-between items-center"
          onClick={onToggle}
          style={{ backgroundColor: `${colors.lavenderz}20` }}
        >
          <h3 className="font-medium" style={{ color: colors.lavenderz }}>
            {title}
          </h3>
          <Info className="h-4 w-4" style={{ color: colors.lavenderz }} />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Truth Table component
  const TruthTable = ({
    headers,
    rows,
    editable,
    onCellChange,
    highlightCell,
    correctAnswers,
  }) => {
    const answered = hasAnsweredCurrent();

    return (
      <div className="overflow-x-auto mt-4 mb-6">
        <table className="w-full text-center border-collapse rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr
              style={{
                background: `linear-gradient(135deg, ${colors.tealz}, ${colors.cyanz})`,
              }}
            >
              {headers.map((header, index) => (
                <th key={index} className="p-3 border text-white font-bold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : ""}
                style={{
                  backgroundColor:
                    rowIndex % 2 === 1 ? `${colors.skyz}10` : "white",
                }}
              >
                {row.map((cell, cellIndex) => {
                  const isEditable = editable && cell === null;
                  const cellHeader = headers[cellIndex];
                  const cellKey = `${rowIndex}-${cellHeader}`;
                  const isHighlighted = highlightCell === cellKey;
                  const userValue = userTruthTable[cellKey];

                  const cellClass = "p-3 border font-medium";
                  const cellStyle = {};

                  if (isHighlighted) {
                    cellStyle.backgroundColor = `${colors.ambez}30`;
                  }

                  // Check if answer is correct (for feedback)
                  let isCorrect = null;
                  if (answered && userValue !== undefined && correctAnswers) {
                    if (Array.isArray(correctAnswers)) {
                      isCorrect = userValue === correctAnswers[rowIndex];
                    } else {
                      isCorrect =
                        userValue === correctAnswers[cellHeader][rowIndex];
                    }

                    // Apply styling based on correctness
                    if (isCorrect) {
                      cellStyle.backgroundColor = `${colors.emeraldz}20`;
                      cellStyle.borderColor = colors.emeraldz;
                    } else {
                      cellStyle.backgroundColor = `${colors.coralz}20`;
                      cellStyle.borderColor = colors.coralz;
                    }
                  }

                  return (
                    <td key={cellIndex} className={cellClass} style={cellStyle}>
                      {isEditable ? (
                        <select
                          value={userValue || ""}
                          onChange={(e) =>
                            onCellChange(rowIndex, cellHeader, e.target.value)
                          }
                          className="w-16 text-center border-2 rounded-md py-2 font-bold"
                          style={{ borderColor: colors.indigoz }}
                          disabled={answered}
                        >
                          <option value="">?</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                        </select>
                      ) : cell === "?" ? (
                        <span style={{ color: colors.violetz }}>?</span>
                      ) : (
                        <span
                          style={{
                            color: cell === 1 ? colors.emeraldz : colors.grayz,
                          }}
                        >
                          {cell}
                        </span>
                      )}
                      {answered && isCorrect === false && (
                        <div
                          className="text-xs mt-1 font-bold"
                          style={{ color: colors.redz }}
                        >
                          Correct:{" "}
                          {Array.isArray(correctAnswers)
                            ? correctAnswers[rowIndex]
                            : correctAnswers[cellHeader][rowIndex]}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
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
                background: `linear-gradient(135deg, ${colors.pinkz}, ${colors.violetz})`,
              }}
            >
              <span className="text-3xl">🧮</span>
            </div>
            <h2 className="text-3xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <div
              className="w-full max-w-2xl h-64 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.cyanz}20, ${colors.lavenderz}20)`,
              }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p
                  className="text-lg font-medium"
                  style={{ color: colors.grayz }}
                >
                  Interactive Truth Table Learning
                </p>
              </div>
            </div>
            <p className="text-lg max-w-2xl" style={{ color: colors.grayz }}>
              {step.content}
            </p>

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
              Begin Learning
            </Button>
          </div>
        );

      case "variableExplanation":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.emeraldz}, ${colors.tealz})`,
                }}
              >
                <span className="text-2xl">📈</span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.grayz }}
              >
                {step.title}
              </h2>
            </div>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Examples table */}
            <div
              className="rounded-xl shadow-lg overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.white}, ${colors.skyz}10)`,
              }}
            >
              <div className="p-6">
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: colors.indigoz }}
                >
                  Examples:
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr
                        style={{
                          background: `linear-gradient(135deg, ${colors.indigoz}, ${colors.violetz})`,
                        }}
                      >
                        <th className="p-3 border text-white font-bold">
                          Number of Variables
                        </th>
                        <th className="p-3 border text-white font-bold">
                          Number of Rows
                        </th>
                        <th className="p-3 border text-white font-bold">
                          Formula
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {step.examples.map((example, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0
                                ? colors.white
                                : `${colors.mintgreenz}10`,
                          }}
                        >
                          <td className="p-3 border font-medium">
                            {example.variables}
                          </td>
                          <td
                            className="p-3 border font-bold"
                            style={{ color: colors.emeraldz }}
                          >
                            {example.rows}
                          </td>
                          <td
                            className="p-3 border font-mono"
                            style={{ color: colors.indigoz }}
                          >
                            {example.formula}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colors.lavenderz}20, ${colors.pinkz}20)`,
                  }}
                >
                  <p
                    className="font-bold text-center"
                    style={{ color: colors.violetz }}
                  >
                    Formula: {step.formula}
                  </p>
                </div>
              </div>
            </div>

            {/* Question */}
            {renderQuestion(step)}
          </div>
        );

      case "variableSelection":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.ambez}, ${colors.orangez})`,
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

            {/* Variable selector */}
            <div
              className="rounded-xl shadow-lg overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.white}, ${colors.ambez}10)`,
              }}
            >
              <div className="p-6">
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: colors.ambez }}
                >
                  Select Number of Variables:
                </h3>
                <div className="flex justify-center space-x-4">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setSelectedVariables(num)}
                      className={`px-6 py-3 rounded-lg font-bold transition-all ${
                        selectedVariables === num
                          ? "shadow-lg"
                          : "hover:shadow-md"
                      }`}
                      style={{
                        backgroundColor:
                          selectedVariables === num
                            ? colors.ambez
                            : colors.white,
                        color:
                          selectedVariables === num
                            ? colors.white
                            : colors.ambez,
                        border: `2px solid ${colors.ambez}`,
                      }}
                    >
                      {num} Variable{num > 1 ? "s" : ""}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <div
                    className="p-4 rounded-lg text-center"
                    style={{ backgroundColor: `${colors.mintgreenz}20` }}
                  >
                    <p
                      className="text-lg font-bold"
                      style={{ color: colors.emeraldz }}
                    >
                      With {selectedVariables} variable
                      {selectedVariables > 1 ? "s" : ""}: 2^{selectedVariables}{" "}
                      = {Math.pow(2, selectedVariables)} rows
                    </p>
                  </div>

                  {/* Generate and show truth table structure */}
                  <div className="mt-4">
                    <h4
                      className="font-bold mb-2"
                      style={{ color: colors.indigoz }}
                    >
                      Truth Table Structure:
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-center border-collapse rounded-lg overflow-hidden">
                        <thead>
                          <tr
                            style={{
                              background: `linear-gradient(135deg, ${colors.tealz}, ${colors.cyanz})`,
                            }}
                          >
                            {Array.from(
                              { length: selectedVariables },
                              (_, i) => (
                                <th
                                  key={i}
                                  className="p-2 border text-white font-bold"
                                >
                                  {String.fromCharCode(65 + i)}
                                </th>
                              )
                            )}
                            <th className="p-2 border text-white font-bold">
                              Output
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {generateTruthTableRows(selectedVariables).map(
                            (row, rowIndex) => (
                              <tr
                                key={rowIndex}
                                style={{
                                  backgroundColor:
                                    rowIndex % 2 === 0
                                      ? colors.white
                                      : `${colors.skyz}10`,
                                }}
                              >
                                {row.map((cell, cellIndex) => (
                                  <td
                                    key={cellIndex}
                                    className="p-2 border font-medium"
                                  >
                                    {cell}
                                  </td>
                                ))}
                                <td
                                  className="p-2 border font-medium"
                                  style={{ color: colors.violetz }}
                                >
                                  ?
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{ backgroundColor: `${colors.lavenderz}20` }}
                >
                  <p className="text-sm" style={{ color: colors.grayz }}>
                    {step.instructionalText}
                  </p>
                </div>
              </div>
            </div>

            {/* Question */}
            {renderQuestion(step)}
          </div>
        );

      case "complexTableConstruction":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.violetz}, ${colors.pinkz})`,
                }}
              >
                <span className="text-2xl">🔨</span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.grayz }}
              >
                {step.title}
              </h2>
            </div>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Operation explanation */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: `${colors.skyz}10` }}
            >
              <p className="font-medium" style={{ color: colors.grayz }}>
                {step.operationDescription}
              </p>
            </div>

            {/* Truth table */}
            <TruthTable
              headers={step.table.headers}
              rows={step.table.rows}
              editable={true}
              onCellChange={handleTruthTableInput}
              highlightCell={highlightCell}
              correctAnswers={step.correctAnswers}
            />

            {!hasAnsweredCurrent() && (
              <div className="text-center">
                <Button
                  onClick={() => checkTruthTableAnswers("complex")}
                  className="px-6 py-3"
                >
                  Check Answers
                </Button>
              </div>
            )}

            {/* Question */}
            {renderQuestion(step)}
          </div>
        );

      case "equivalenceChallenge":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.rosez}, ${colors.pinkz})`,
                }}
              >
                <span className="text-2xl">🔄</span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.grayz }}
              >
                {step.title}
              </h2>
            </div>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Question */}
            {renderQuestion(step)}
          </div>
        );

      case "realWorldApplication":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.limez}, ${colors.emeraldz})`,
                }}
              >
                <span className="text-2xl">🏠</span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: colors.grayz }}
              >
                {step.title}
              </h2>
            </div>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Scenario */}
            <div
              className="p-6 rounded-xl shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colors.white}, ${colors.limez}10)`,
              }}
            >
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: colors.limez }}
              >
                Security System Scenario:
              </h3>
              <p className="text-base" style={{ color: colors.grayz }}>
                {step.scenario}
              </p>
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
                      ? "Excellent! 🌟"
                      : finalScore >= 60
                      ? "Good job! 👍"
                      : "Keep practicing! 📚"}
                  </p>
                  <p className="text-sm mt-1">
                    {finalScore >= 80
                      ? "You have mastered truth table construction! You understand how to build truth tables and analyze Boolean expressions."
                      : finalScore >= 60
                      ? "You have a good understanding of truth tables. Review the construction process to strengthen your skills."
                      : "Truth table construction takes practice. Focus on understanding how variables relate to table size and step-by-step construction."}
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

              <Button
                onClick={handleFinishAssessment}
                className="flex items-center gap-2"
              >
                <Award className="h-4 w-4" />
                Finish Assessment
              </Button>
            </div>
          </div>
        );
      }

      default:
        return <div>Unknown step type: {step.type}</div>;
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

  // Navigation buttons
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
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-16 px-4 ">
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
};

export default TruthTableConstructionAssessment;
