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
  Zap,
  Target,
  Timer,
  Star,
  RotateCcw,
  Play,
  Pause,
} from "lucide-react";

// Enhanced color palette
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

// Typewriter Component
const Typewriter = ({ text, delay = 50, className = "", onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [currentIndex, delay, text, isComplete, onComplete]);

  return <span className={className}>{displayText}</span>;
};

// Law Detective Game Component
const LawDetectiveGame = ({
  onComplete,
  onFinish,
  attemptsRemaining = 3,
  currentAttempt = 1,
  maxAttempts = 3,
  studentAssessmentId,
}) => {
  const [currentCase, setCurrentCase] = useState(0);
  const [gameScore, setGameScore] = useState(0); // Renamed to avoid confusion
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
  const [userAnswers, setUserAnswers] = useState([]); // Track all answers for review
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameState, setGameState] = useState("intro"); // intro, playing, correct, wrong, completed
  const [selectedLaw, setSelectedLaw] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [instructionStep, setInstructionStep] = useState(0);

  // Instructions for the game
  const instructions = [
    "Welcome, Detective! 🕵️ Your mission is to identify which Boolean law was used in each transformation.",
    "You'll see a 'Before' and 'After' expression. Study the change carefully.",
    "Select the correct law from the available cards. Speed and accuracy matter!",
    "Build streaks for bonus points, but watch out - time is ticking! ⏰",
    "Ready to solve some Boolean mysteries? Let's start detecting! 🔍",
  ];

  // Detective cases - transformations and their laws
  const detectiveCases = [
    {
      transformation: { before: "A ∧ 1", after: "A" },
      correctLaw: "Identity Law",
      explanation:
        "AND with 1 preserves the original value - this is the AND Identity Law",
      difficulty: 1,
    },
    {
      transformation: { before: "A ∨ 0", after: "A" },
      correctLaw: "Identity Law",
      explanation:
        "OR with 0 preserves the original value - this is the OR Identity Law",
      difficulty: 1,
    },
    {
      transformation: { before: "A ∧ 0", after: "0" },
      correctLaw: "Nullification Law",
      explanation: "AND with 0 always results in 0, nullifying any other input",
      difficulty: 1,
    },
    {
      transformation: { before: "A ∨ 1", after: "1" },
      correctLaw: "Nullification Law",
      explanation: "OR with 1 always results in 1, nullifying any other input",
      difficulty: 1,
    },
    {
      transformation: { before: "A ∧ A", after: "A" },
      correctLaw: "Idempotent Law",
      explanation:
        "A variable ANDed with itself equals itself - idempotent means 'unchanged by operation'",
      difficulty: 2,
    },
    {
      transformation: { before: "A ∨ A", after: "A" },
      correctLaw: "Idempotent Law",
      explanation:
        "A variable ORed with itself equals itself - the operation has no additional effect",
      difficulty: 2,
    },
    {
      transformation: { before: "A ∧ ¬A", after: "0" },
      correctLaw: "Complement Law",
      explanation:
        "A variable ANDed with its negation is always false - they contradict each other",
      difficulty: 2,
    },
    {
      transformation: { before: "A ∨ ¬A", after: "1" },
      correctLaw: "Complement Law",
      explanation:
        "A variable ORed with its negation is always true - one of them must be true",
      difficulty: 2,
    },
    {
      transformation: { before: "¬(A ∧ B)", after: "¬A ∨ ¬B" },
      correctLaw: "De Morgan's Law",
      explanation:
        "Negation of AND becomes OR of negations - De Morgan's first law",
      difficulty: 3,
    },
    {
      transformation: { before: "A ∨ (A ∧ B)", after: "A" },
      correctLaw: "Absorption Law",
      explanation:
        "Variable absorbs when it appears in both terms - A absorbs (A ∧ B)",
      difficulty: 3,
    },
  ];

  // Available law cards
  const lawCards = [
    {
      name: "Identity Law",
      color: colors.emeraldz,
      icon: "🎯",
      description: "Neutral elements preserve values",
    },
    {
      name: "Nullification Law",
      color: colors.coralz,
      icon: "🚫",
      description: "Dominance elements force outputs",
    },
    {
      name: "Idempotent Law",
      color: colors.violetz,
      icon: "🔄",
      description: "Self-operations have no effect",
    },
    {
      name: "Complement Law",
      color: colors.tealz,
      icon: "⚖️",
      description: "Variable + negation interactions",
    },
    {
      name: "De Morgan's Law",
      color: colors.pinkz,
      icon: "🔀",
      description: "Negation distribution rules",
    },
    {
      name: "Absorption Law",
      color: colors.ambez,
      icon: "🧽",
      description: "Simplification through absorption",
    },
  ];

  // Timer effect
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleTimeUp();
    }
  }, [timeLeft, gameState]);

  const handleTimeUp = () => {
    // Record wrong answer
    const wrongAnswer = {
      questionIndex: currentCase,
      selectedAnswer: null, // timeout
      correctAnswer: detectiveCases[currentCase].correctLaw,
      isCorrect: false,
      timeLeft: 0,
    };
    setUserAnswers([...userAnswers, wrongAnswer]);

    setGameState("wrong");
    setStreak(0);
    setShowFeedback(true);
    setTimeout(() => {
      if (currentCase < detectiveCases.length - 1) {
        nextCase();
      } else {
        completeGame();
      }
    }, 2500);
  };

  const handleLawSelect = (lawName) => {
    if (gameState !== "playing") return;

    setSelectedLaw(lawName);
    const isCorrect = lawName === detectiveCases[currentCase].correctLaw;

    // Record the answer
    const answer = {
      questionIndex: currentCase,
      selectedAnswer: lawName,
      correctAnswer: detectiveCases[currentCase].correctLaw,
      isCorrect: isCorrect,
      timeLeft: timeLeft,
    };
    setUserAnswers([...userAnswers, answer]);

    if (isCorrect) {
      const timeBonus = Math.max(0, timeLeft * 2);
      const streakBonus = streak * 5;
      const points = 100 + timeBonus + streakBonus;
      setGameScore(gameScore + points);
      setCorrectAnswers(correctAnswers + 1);
      setStreak(streak + 1);
      setGameState("correct");
    } else {
      setStreak(0);
      setGameState("wrong");
    }

    setShowFeedback(true);
    setTimeout(() => {
      if (currentCase < detectiveCases.length - 1) {
        nextCase();
      } else {
        completeGame();
      }
    }, 2500);
  };

  const nextCase = () => {
    setCurrentCase(currentCase + 1);
    setSelectedLaw(null);
    setShowFeedback(false);
    setGameState("playing");
    setTimeLeft(15);
  };

  // FIXED: Complete game function to match HistoricalAssessment pattern
  const completeGame = () => {
    setGameState("completed");

    // Calculate final score based on correct answers (not game points)
    const finalScore = (correctAnswers / detectiveCases.length) * 100;

    const assessmentData = {
      percentage: Math.round(finalScore),
      score: correctAnswers, // Number of correct answers
      totalQuestions: detectiveCases.length,
      userAnswers: userAnswers,
      currentAttempt: currentAttempt,
      maxAttempts: maxAttempts,
      gameScore: gameScore, // Keep the game score for display
    };

    console.log(
      "Assessment completed with score:",
      correctAnswers,
      "out of",
      detectiveCases.length,
      ":",
      Math.round(finalScore) + "%"
    );

    if (onComplete) {
      onComplete(assessmentData);
    }
  };

  // FIXED: Add finish function to match other assessments
  const handleFinishAssessment = () => {
    const finalScore = (correctAnswers / detectiveCases.length) * 100;

    const assessmentData = {
      percentage: Math.round(finalScore),
      score: correctAnswers,
      totalQuestions: detectiveCases.length,
      userAnswers: userAnswers,
      currentAttempt: currentAttempt,
      maxAttempts: maxAttempts,
      gameScore: gameScore,
    };

    if (onFinish) {
      onFinish(assessmentData);
    } else if (onComplete) {
      onComplete(assessmentData);
    }
  };

  const startGame = () => {
    setGameState("playing");
    setShowInstructions(false);
    setTimeLeft(15);
  };

  const resetGame = () => {
    setCurrentCase(0);
    setGameScore(0);
    setCorrectAnswers(0);
    setUserAnswers([]);
    setStreak(0);
    setTimeLeft(15);
    setGameState("intro");
    setSelectedLaw(null);
    setShowFeedback(false);
    setShowInstructions(true);
    setInstructionStep(0);
  };

  const nextInstruction = () => {
    if (instructionStep < instructions.length - 1) {
      setInstructionStep(instructionStep + 1);
    } else {
      startGame();
    }
  };

  // FIXED: Show completion screen instead of returning null
  if (gameState === "completed") {
    const finalScore = Math.round(
      (correctAnswers / detectiveCases.length) * 100
    );

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
          Mission Complete, Detective!
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
          You've completed your Boolean Law Detective training!
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
              Detective Report:
            </h3>
            <div className="space-y-4">
              <div
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ backgroundColor: `${colors.skyz}10` }}
              >
                <span className="font-medium">Cases Solved:</span>
                <span className="font-bold" style={{ color: colors.indigoz }}>
                  {correctAnswers} / {detectiveCases.length}
                </span>
              </div>
              <div
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ backgroundColor: `${colors.emeraldz}10` }}
              >
                <span className="font-medium">Accuracy Rate:</span>
                <span className="font-bold" style={{ color: colors.emeraldz }}>
                  {finalScore}%
                </span>
              </div>
              <div
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ backgroundColor: `${colors.violetz}10` }}
              >
                <span className="font-medium">Game Score:</span>
                <span className="font-bold" style={{ color: colors.violetz }}>
                  {gameScore} pts
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
                  ? "Excellent Detective Work! 🌟"
                  : finalScore >= 60
                  ? "Good Investigation! 👍"
                  : "Keep Practicing! 📚"}
              </p>
              <p className="text-sm mt-1">
                {finalScore >= 80
                  ? "You've mastered Boolean law identification! Your detective skills are top-notch."
                  : finalScore >= 60
                  ? "You understand most Boolean laws. Review the trickier ones to perfect your skills."
                  : "Boolean laws take practice to master. Try the cases again to strengthen your detective abilities."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {attemptsRemaining > 1 && (
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: "transparent",
                color: colors.bluez,
                border: `2px solid ${colors.bluez}`,
              }}
            >
              <RotateCcw className="h-4 w-4" />
              Try Again ({attemptsRemaining - 1} attempts left)
            </button>
          )}

          <button
            onClick={handleFinishAssessment}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all"
            style={{
              backgroundColor: colors.bluez,
              color: colors.white,
            }}
          >
            <Award className="h-4 w-4" />
            Finish Assessment
          </button>
        </div>
      </div>
    );
  }

  // Intro/Instructions Screen
  if (gameState === "intro" && showInstructions) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${colors.violetz}, ${colors.pinkz})`,
            }}
          >
            <span className="text-3xl">🕵️</span>
          </div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: colors.grayz }}
          >
            Law Detective Training Academy
          </h2>

          {/* ADD: Show attempt information */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-xl shadow-lg min-h-32"
          style={{
            background: `linear-gradient(135deg, ${colors.white}, ${colors.lavenderz}10)`,
          }}
        >
          <div
            className="text-lg leading-relaxed"
            style={{ color: colors.grayz }}
          >
            <Typewriter
              text={instructions[instructionStep]}
              delay={30}
              onComplete={() => setTimeout(() => {}, 1000)}
            />
          </div>
        </motion.div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {instructions.map((_, idx) => (
              <div
                key={idx}
                className="w-3 h-3 rounded-full transition-all"
                style={{
                  backgroundColor:
                    idx <= instructionStep
                      ? colors.violetz
                      : colors.grayz + "40",
                }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextInstruction}
            className="px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
            style={{ backgroundColor: colors.violetz, color: colors.white }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {instructionStep === instructions.length - 1 ? (
              <>
                Start Mission! <Target className="h-5 w-5 ml-2 inline" />
              </>
            ) : (
              <>
                Next <ArrowRight className="h-5 w-5 ml-2 inline" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  const currentTransformation = detectiveCases[currentCase];

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center p-4 rounded-xl"
        style={{ backgroundColor: `${colors.lavenderz}20` }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" style={{ color: colors.violetz }} />
            <span className="font-bold" style={{ color: colors.violetz }}>
              Score: {gameScore}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" style={{ color: colors.ambez }} />
            <span className="font-bold" style={{ color: colors.ambez }}>
              Streak: {streak}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle
              className="h-5 w-5"
              style={{ color: colors.emeraldz }}
            />
            <span className="font-bold" style={{ color: colors.emeraldz }}>
              Correct: {correctAnswers}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Timer
            className="h-5 w-5"
            style={{ color: timeLeft <= 5 ? colors.redz : colors.tealz }}
          />
          <motion.span
            className="font-bold text-xl"
            style={{ color: timeLeft <= 5 ? colors.redz : colors.tealz }}
            animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
          >
            {timeLeft}s
          </motion.span>
        </div>
      </motion.div>

      {/* Case Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h3 className="text-xl font-bold mb-2" style={{ color: colors.grayz }}>
          🕵️ Detective Case #{currentCase + 1} of {detectiveCases.length}
        </h3>
        <p style={{ color: colors.grayz }}>
          Which law was used in this transformation?
        </p>
      </motion.div>

      {/* Transformation Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="p-8 rounded-xl shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${colors.white}, ${colors.skyz}10)`,
        }}
      >
        <div className="flex items-center justify-center space-x-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div
              className="text-sm font-medium mb-2"
              style={{ color: colors.grayz }}
            >
              Before
            </div>
            <div
              className="p-4 rounded-lg font-mono text-2xl font-bold"
              style={{
                backgroundColor: `${colors.cyanz}20`,
                color: colors.indigoz,
              }}
            >
              {currentTransformation.transformation.before}
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-4xl"
            style={{ color: colors.violetz }}
          >
            →
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div
              className="text-sm font-medium mb-2"
              style={{ color: colors.grayz }}
            >
              After
            </div>
            <div
              className="p-4 rounded-lg font-mono text-2xl font-bold"
              style={{
                backgroundColor: `${colors.emeraldz}20`,
                color: colors.emeraldz,
              }}
            >
              {currentTransformation.transformation.after}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Law Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {lawCards.map((law, idx) => {
          const isSelected = selectedLaw === law.name;
          const isCorrect =
            showFeedback && law.name === currentTransformation.correctLaw;
          const isWrong =
            showFeedback && selectedLaw === law.name && !isCorrect;

          return (
            <motion.button
              key={idx}
              onClick={() => handleLawSelect(law.name)}
              disabled={gameState !== "playing"}
              className="p-4 rounded-xl border-2 transition-all transform hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: isCorrect
                  ? `${colors.emeraldz}20`
                  : isWrong
                  ? `${colors.coralz}20`
                  : isSelected
                  ? `${law.color}20`
                  : colors.white,
                borderColor: isCorrect
                  ? colors.emeraldz
                  : isWrong
                  ? colors.coralz
                  : isSelected
                  ? law.color
                  : colors.cyanz,
                opacity: gameState !== "playing" ? 0.7 : 1,
              }}
              whileHover={{ scale: gameState === "playing" ? 1.05 : 1 }}
              whileTap={{ scale: gameState === "playing" ? 0.95 : 1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              <div className="text-2xl mb-2">{law.icon}</div>
              <div
                className="font-bold text-sm mb-1"
                style={{ color: law.color }}
              >
                {law.name}
              </div>
              <div
                className="text-xs opacity-75"
                style={{ color: colors.grayz }}
              >
                {law.description}
              </div>
              {isCorrect && (
                <CheckCircle
                  className="h-6 w-6 mx-auto mt-2"
                  style={{ color: colors.emeraldz }}
                />
              )}
              {isWrong && (
                <XCircle
                  className="h-6 w-6 mx-auto mt-2"
                  style={{ color: colors.coralz }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-xl border-2"
            style={{
              backgroundColor:
                gameState === "correct"
                  ? `${colors.emeraldz}10`
                  : `${colors.coralz}10`,
              borderColor:
                gameState === "correct" ? colors.emeraldz : colors.coralz,
              color: gameState === "correct" ? colors.emeraldz : colors.coralz,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              {gameState === "correct" ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <span className="font-bold">
                {gameState === "correct"
                  ? `Correct! +${
                      100 + Math.max(0, timeLeft * 2) + streak * 5
                    } points`
                  : `Wrong! The answer was: ${currentTransformation.correctLaw}`}
              </span>
            </div>
            <Typewriter
              text={currentTransformation.explanation}
              delay={20}
              className="text-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function BooleanLawsAssessment({
  onComplete,
  onFinish,
  attemptsRemaining = 3,
  currentAttempt = 1,
  maxAttempts = 3,
  studentAssessmentId,
}) {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4">
      <div className="rounded-2xl p-6 w-full">
        <LawDetectiveGame
          onComplete={onComplete}
          onFinish={onFinish}
          attemptsRemaining={attemptsRemaining}
          currentAttempt={currentAttempt}
          maxAttempts={maxAttempts}
          studentAssessmentId={studentAssessmentId}
        />
      </div>
    </div>
  );
}
