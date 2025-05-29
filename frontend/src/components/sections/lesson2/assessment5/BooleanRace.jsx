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
  Rocket,
  Trophy,
  TrendingUp,
  Activity,
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

// Boolean Race: SOP vs POS Game Component
const BooleanRaceGame = ({
  onComplete,
  onFinish,
  attemptsRemaining = 3,
  currentAttempt = 1,
  maxAttempts = 3,
  studentAssessmentId,
}) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [gameScore, setGameScore] = useState(0); // Renamed to avoid confusion
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
  const [userAnswers, setUserAnswers] = useState([]); // Track all answers for review
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState("intro"); // intro, playing, round_complete, completed
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);
  const [instructionStep, setInstructionStep] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [showSteps, setShowSteps] = useState(false);
  const [problemsAttempted, setProblemsAttempted] = useState(0); // Track total problems attempted

  // Instructions for the game
  const instructions = [
    "Welcome to Boolean Race! ⚡ Speed and accuracy are your allies in this high-energy conversion challenge.",
    "You'll convert Boolean expressions between SOP (Sum of Products) and POS (Product of Sums) forms.",
    "SOP form: OR of AND terms like (A·B) + (A'·C). POS form: AND of OR terms like (A+B)·(A'+C).",
    "Beat the clock! Each round gives you 30 seconds to complete as many conversions as possible.",
    "Ready to race through Boolean transformations? Let's start your engines! 🏁",
  ];

  // Problem sets for different difficulties
  const problemSets = [
    // Round 1 - Basic Conversions
    {
      round: 1,
      timeLimit: 30,
      problems: [
        {
          given: "A·B + A'·B'",
          givenForm: "SOP",
          targetForm: "POS",
          answer: "(A+B')·(A'+B)",
          explanation:
            "Convert each minterm to maxterm: A·B → (A+B'), A'·B' → (A'+B)",
          difficulty: "Easy",
          steps: [
            "Identify minterms: A·B and A'·B'",
            "Convert A·B to maxterm: (A+B')",
            "Convert A'·B' to maxterm: (A'+B)",
            "Combine with AND: (A+B')·(A'+B)",
          ],
        },
        {
          given: "(A+B)·(A'+B')",
          givenForm: "POS",
          targetForm: "SOP",
          answer: "A·B' + A'·B",
          explanation: "Expand using distributive law then simplify",
          difficulty: "Easy",
          steps: [
            "Apply distributive law: (A+B)·(A'+B')",
            "Expand: A·A' + A·B' + B·A' + B·B'",
            "Simplify using complement law: A·A' = 0, B·B' = 0",
            "Result: A·B' + A'·B",
          ],
        },
        {
          given: "A + B'",
          givenForm: "SOP",
          targetForm: "POS",
          answer: "(A+B')",
          explanation: "Already in simplest POS form",
          difficulty: "Easy",
          steps: [
            "Expression is already a single sum term",
            "In POS form, this is: (A+B')",
            "No further conversion needed",
          ],
        },
      ],
    },

    // Round 2 - Intermediate Conversions
    {
      round: 2,
      timeLimit: 35,
      problems: [
        {
          given: "A·B·C + A·B'·C + A'·B·C",
          givenForm: "SOP",
          targetForm: "POS",
          answer: "(A+B+C')·(A+B'+C')·(A'+B+C')",
          explanation: "Convert each minterm to corresponding maxterm",
          difficulty: "Medium",
          steps: [
            "Identify minterms: A·B·C, A·B'·C, A'·B·C",
            "Convert A·B·C to maxterm: (A'+B'+C')",
            "Find missing maxterms for complete POS form",
            "Result: (A+B+C')·(A+B'+C')·(A'+B+C')",
          ],
        },
        {
          given: "(A+B+C)·(A+B'+C)·(A'+B+C)",
          givenForm: "POS",
          targetForm: "SOP",
          answer: "A·B'·C' + A'·B·C' + A'·B'·C",
          explanation: "Find the missing minterms from the maxterms",
          difficulty: "Medium",
          steps: [
            "Each maxterm eliminates certain minterms",
            "Find which minterms are NOT eliminated",
            "Convert to SOP form with remaining minterms",
          ],
        },
        {
          given: "A·B + A·C + B·C",
          givenForm: "SOP",
          targetForm: "POS",
          answer: "(A+B)·(A+C)·(B+C)",
          explanation: "Use consensus theorem and convert to POS",
          difficulty: "Medium",
          steps: [
            "Apply consensus theorem: A·B + A·C + B·C",
            "Factor using distributive properties",
            "Convert to POS form: (A+B)·(A+C)·(B+C)",
          ],
        },
      ],
    },

    // Round 3 - Advanced Conversions
    {
      round: 3,
      timeLimit: 40,
      problems: [
        {
          given: "A·B·C·D + A·B·C'·D + A·B'·C·D + A'·B·C·D",
          givenForm: "SOP",
          targetForm: "POS",
          answer: "(A+B+C+D')·(A+B+C'+D')·(A+B'+C+D')·(A'+B+C+D')",
          explanation:
            "Complex 4-variable conversion requires systematic approach",
          difficulty: "Hard",
          steps: [
            "Map given minterms to truth table",
            "Identify missing minterms",
            "Convert missing minterms to maxterms",
            "Combine all maxterms with AND",
          ],
        },
        {
          given: "(A+B+C+D)·(A+B+C'+D)·(A+B'+C+D)·(A'+B+C+D)",
          givenForm: "POS",
          targetForm: "SOP",
          answer: "A·B'·C'·D' + A·B'·C'·D + A·B'·C·D' + A'·B'·C'·D'",
          explanation: "Systematic conversion from POS to SOP for 4 variables",
          difficulty: "Hard",
          steps: [
            "Each maxterm eliminates specific minterms",
            "Find intersection of all constraints",
            "Identify remaining valid minterms",
            "Express as SOP form",
          ],
        },
        {
          given: "A·B + A'·C + B·C'",
          givenForm: "SOP",
          targetForm: "POS",
          answer: "(A+C)·(A'+B)·(B+C')",
          explanation: "Advanced factoring and conversion techniques",
          difficulty: "Hard",
          steps: [
            "Apply advanced Boolean algebra laws",
            "Factor terms systematically",
            "Convert to equivalent POS form",
          ],
        },
      ],
    },
  ];

  // Calculate total questions
  const totalQuestions = problemSets.reduce(
    (total, round) => total + round.problems.length,
    0
  );

  // Timer effect
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleTimeUp();
    }
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState("playing");
    setShowInstructions(false);
    startRound(1);
  };

  const startRound = (roundNum) => {
    const roundData = problemSets[roundNum - 1];
    setCurrentRound(roundNum);
    setTimeLeft(roundData.timeLimit);
    setRoundsCompleted(0);
    loadNextProblem(roundNum, 0);
  };

  const loadNextProblem = (roundNum, problemIndex) => {
    const roundData = problemSets[roundNum - 1];
    if (problemIndex < roundData.problems.length) {
      setCurrentProblem({
        ...roundData.problems[problemIndex],
        roundNum,
        problemIndex,
      });
      setUserAnswer("");
      setShowFeedback(false);
      setShowSteps(false);
    } else {
      // Round complete
      handleRoundComplete();
    }
  };

  const handleAnswer = () => {
    if (!userAnswer.trim() || !currentProblem) return;

    const isCorrect =
      userAnswer.trim().toLowerCase().replace(/\s/g, "") ===
      currentProblem.answer.toLowerCase().replace(/\s/g, "");

    // Record the answer
    const answer = {
      questionIndex: problemsAttempted,
      selectedAnswer: userAnswer.trim(),
      correctAnswer: currentProblem.answer,
      isCorrect: isCorrect,
      problem: currentProblem.given,
      timeLeft: timeLeft,
    };
    setUserAnswers([...userAnswers, answer]);
    setProblemsAttempted(problemsAttempted + 1);

    if (isCorrect) {
      const timeBonus = Math.max(0, timeLeft * 2);
      const streakBonus = streak * 10;
      const difficultyBonus =
        currentProblem.difficulty === "Hard"
          ? 50
          : currentProblem.difficulty === "Medium"
          ? 30
          : 20;
      const points = 100 + timeBonus + streakBonus + difficultyBonus;

      setGameScore(gameScore + points);
      setCorrectAnswers(correctAnswers + 1);
      setStreak(streak + 1);
      setFeedbackMessage(
        `Correct! +${points} points (${timeBonus} time bonus, ${streakBonus} streak bonus)`
      );
    } else {
      setStreak(0);
      setFeedbackMessage(`Incorrect. The answer was: ${currentProblem.answer}`);
    }

    setShowFeedback(true);

    setTimeout(() => {
      const nextProblemIndex = currentProblem.problemIndex + 1;
      loadNextProblem(currentProblem.roundNum, nextProblemIndex);
    }, 2500);
  };

  const handleTimeUp = () => {
    // Record timeout for current problem if one is active
    if (currentProblem && !showFeedback) {
      const timeoutAnswer = {
        questionIndex: problemsAttempted,
        selectedAnswer: null, // timeout
        correctAnswer: currentProblem.answer,
        isCorrect: false,
        problem: currentProblem.given,
        timeLeft: 0,
      };
      setUserAnswers([...userAnswers, timeoutAnswer]);
      setProblemsAttempted(problemsAttempted + 1);
    }

    setGameState("round_complete");
    setTimeout(() => {
      if (currentRound < problemSets.length) {
        startRound(currentRound + 1);
        setGameState("playing");
      } else {
        completeGame();
      }
    }, 3000);
  };

  const handleRoundComplete = () => {
    setGameState("round_complete");
    setRoundsCompleted(roundsCompleted + 1);
    setTimeout(() => {
      if (currentRound < problemSets.length) {
        startRound(currentRound + 1);
        setGameState("playing");
      } else {
        completeGame();
      }
    }, 3000);
  };

  // FIXED: Complete game function to match HistoricalAssessment pattern
  const completeGame = () => {
    setGameState("completed");

    // Calculate final score based on correct answers (not game points)
    const finalScore = (correctAnswers / problemsAttempted) * 100;

    const assessmentData = {
      percentage: Math.round(finalScore),
      score: correctAnswers, // Number of correct answers
      totalQuestions: problemsAttempted, // Use actual attempted questions
      userAnswers: userAnswers,
      currentAttempt: currentAttempt,
      maxAttempts: maxAttempts,
      gameScore: gameScore, // Keep the game score for display
    };

    console.log(
      "Assessment completed with score:",
      correctAnswers,
      "out of",
      problemsAttempted,
      ":",
      Math.round(finalScore) + "%"
    );

    if (onComplete) {
      onComplete(assessmentData);
    }
  };

  // FIXED: Add finish function to match other assessments
  const handleFinishAssessment = () => {
    const finalScore =
      problemsAttempted > 0 ? (correctAnswers / problemsAttempted) * 100 : 0;

    const assessmentData = {
      percentage: Math.round(finalScore),
      score: correctAnswers,
      totalQuestions: problemsAttempted,
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

  const resetGame = () => {
    setCurrentRound(0);
    setGameScore(0);
    setCorrectAnswers(0);
    setUserAnswers([]);
    setProblemsAttempted(0);
    setTimeLeft(30);
    setGameState("intro");
    setShowInstructions(true);
    setInstructionStep(0);
    setStreak(0);
    setRoundsCompleted(0);
    setCurrentProblem(null);
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
    const finalScore =
      problemsAttempted > 0
        ? Math.round((correctAnswers / problemsAttempted) * 100)
        : 0;

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
          Race Complete!
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
          You've completed the Boolean Race challenge!
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
              Race Results:
            </h3>
            <div className="space-y-4">
              <div
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ backgroundColor: `${colors.skyz}10` }}
              >
                <span className="font-medium">Problems Attempted:</span>
                <span className="font-bold" style={{ color: colors.indigoz }}>
                  {problemsAttempted}
                </span>
              </div>
              <div
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ backgroundColor: `${colors.emeraldz}10` }}
              >
                <span className="font-medium">Correct Answers:</span>
                <span className="font-bold" style={{ color: colors.emeraldz }}>
                  {correctAnswers} / {problemsAttempted}
                </span>
              </div>
              <div
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ backgroundColor: `${colors.violetz}10` }}
              >
                <span className="font-medium">Accuracy Rate:</span>
                <span
                  className="font-bold text-xl"
                  style={{ color: colors.violetz }}
                >
                  {finalScore}%
                </span>
              </div>
              <div
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ backgroundColor: `${colors.orangez}10` }}
              >
                <span className="font-medium">Race Score:</span>
                <span className="font-bold" style={{ color: colors.orangez }}>
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
                  ? "Excellent Racing! 🌟"
                  : finalScore >= 60
                  ? "Good Race! 👍"
                  : "Keep Racing! 📚"}
              </p>
              <p className="text-sm mt-1">
                {finalScore >= 80
                  ? "You've mastered SOP and POS conversions! Your Boolean racing skills are top-tier."
                  : finalScore >= 60
                  ? "You understand most conversions. Practice the more complex transformations to improve your speed."
                  : "Boolean conversions take practice. Focus on the basic patterns first, then work up to more complex expressions."}
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
              Race Again ({attemptsRemaining - 1} attempts left)
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
              background: `linear-gradient(135deg, ${colors.orangez}, ${colors.redz})`,
            }}
          >
            <span className="text-3xl">🏁</span>
          </div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: colors.grayz }}
          >
            Boolean Race: SOP vs POS
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
            background: `linear-gradient(135deg, ${colors.white}, ${colors.orangez}10)`,
          }}
        >
          <div
            className="text-lg leading-relaxed"
            style={{ color: colors.grayz }}
          >
            <Typewriter
              text={instructions[instructionStep]}
              delay={25}
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
                      ? colors.orangez
                      : colors.grayz + "40",
                }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextInstruction}
            className="px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
            style={{ backgroundColor: colors.orangez, color: colors.white }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {instructionStep === instructions.length - 1 ? (
              <>
                Start Race! <Rocket className="h-5 w-5 ml-2 inline" />
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

  // Round Complete Screen
  if (gameState === "round_complete") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${colors.ambez}, ${colors.orangez})`,
          }}
        >
          <Trophy className="h-10 w-10 text-white" />
        </div>

        <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
          Round {currentRound} Complete! 🏆
        </h2>

        <div className="text-6xl">⚡</div>

        <div className="space-y-2">
          <p className="text-lg font-bold" style={{ color: colors.orangez }}>
            Score: {gameScore}
          </p>
          <p className="text-lg font-bold" style={{ color: colors.emeraldz }}>
            Correct: {correctAnswers} / {problemsAttempted}
          </p>
          <p className="text-lg" style={{ color: colors.grayz }}>
            {currentRound < problemSets.length
              ? "Next round starting..."
              : "Calculating final results..."}
          </p>
        </div>
      </motion.div>
    );
  }

  if (!currentProblem) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center p-4 rounded-xl"
        style={{ backgroundColor: `${colors.orangez}20` }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" style={{ color: colors.orangez }} />
            <span className="font-bold" style={{ color: colors.orangez }}>
              Score: {gameScore}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" style={{ color: colors.violetz }} />
            <span className="font-bold" style={{ color: colors.violetz }}>
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Timer
              className="h-5 w-5"
              style={{ color: timeLeft <= 10 ? colors.redz : colors.emeraldz }}
            />
            <motion.span
              className="font-bold text-2xl"
              style={{ color: timeLeft <= 10 ? colors.redz : colors.emeraldz }}
              animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
              transition={{
                duration: 0.5,
                repeat: timeLeft <= 10 ? Infinity : 0,
              }}
            >
              {timeLeft}s
            </motion.span>
          </div>
          <div
            className="px-3 py-1 rounded-full font-bold"
            style={{ backgroundColor: colors.indigoz, color: colors.white }}
          >
            Round {currentRound}/{problemSets.length}
          </div>
        </div>
      </motion.div>

      {/* Problem Display */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h3 className="text-xl font-bold mb-2" style={{ color: colors.grayz }}>
          🏁 Convert to {currentProblem.targetForm} Form
        </h3>
        <div className="flex justify-center items-center gap-4">
          <span
            className="px-3 py-1 rounded-full text-sm font-bold"
            style={{
              backgroundColor:
                currentProblem.difficulty === "Easy"
                  ? `${colors.emeraldz}20`
                  : currentProblem.difficulty === "Medium"
                  ? `${colors.ambez}20`
                  : `${colors.coralz}20`,
              color:
                currentProblem.difficulty === "Easy"
                  ? colors.emeraldz
                  : currentProblem.difficulty === "Medium"
                  ? colors.ambez
                  : colors.coralz,
            }}
          >
            {currentProblem.difficulty}
          </span>
          <span className="text-sm" style={{ color: colors.grayz }}>
            Problem {currentProblem.problemIndex + 1}
          </span>
        </div>
      </motion.div>

      {/* Expression Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {/* Given Expression */}
        <div
          className="p-6 rounded-xl shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${colors.white}, ${colors.cyanz}10)`,
          }}
        >
          <div className="text-center">
            <div
              className="text-sm font-medium mb-2"
              style={{ color: colors.grayz }}
            >
              Given ({currentProblem.givenForm} Form)
            </div>
            <div
              className="p-4 rounded-lg font-mono text-2xl font-bold"
              style={{
                backgroundColor: `${colors.cyanz}20`,
                color: colors.indigoz,
              }}
            >
              {currentProblem.given}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-center">
          <motion.div
            className="text-4xl"
            style={{ color: colors.orangez }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ⬇️
          </motion.div>
          <p
            className="text-sm font-medium mt-2"
            style={{ color: colors.grayz }}
          >
            Convert to {currentProblem.targetForm} Form
          </p>
        </div>

        {/* Answer Input */}
        <div
          className="p-6 rounded-xl shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${colors.white}, ${colors.emeraldz}10)`,
          }}
        >
          <div className="text-center space-y-4">
            <div
              className="text-sm font-medium"
              style={{ color: colors.grayz }}
            >
              Your Answer ({currentProblem.targetForm} Form)
            </div>
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAnswer()}
                placeholder={`Enter ${currentProblem.targetForm} expression...`}
                className="w-full p-4 rounded-lg border-2 font-mono text-lg text-center transition-all focus:outline-none focus:ring-2"
                style={{
                  borderColor: colors.emeraldz,
                  backgroundColor: `${colors.emeraldz}10`,
                  color: colors.emeraldz,
                }}
                disabled={showFeedback}
              />
            </div>

            {!showFeedback && (
              <motion.button
                onClick={handleAnswer}
                disabled={!userAnswer.trim()}
                className="px-8 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
                style={{
                  backgroundColor: userAnswer.trim()
                    ? colors.emeraldz
                    : colors.grayz,
                  color: colors.white,
                }}
                whileHover={{ scale: userAnswer.trim() ? 1.05 : 1 }}
                whileTap={{ scale: userAnswer.trim() ? 0.95 : 1 }}
              >
                Submit Answer <Rocket className="h-5 w-5 ml-2 inline" />
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Steps Helper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
          style={{
            backgroundColor: `${colors.indigoz}20`,
            color: colors.indigoz,
          }}
        >
          <Info className="h-4 w-4" />
          {showSteps ? "Hide" : "Show"} Steps
        </button>
      </motion.div>

      {/* Steps Display */}
      <AnimatePresence>
        {showSteps && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-xl"
            style={{ backgroundColor: `${colors.indigoz}10` }}
          >
            <h4
              className="text-sm font-bold mb-3"
              style={{ color: colors.indigoz }}
            >
              Conversion Steps:
            </h4>
            <div className="space-y-2">
              {currentProblem.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: colors.indigoz,
                      color: colors.white,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-sm" style={{ color: colors.grayz }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-xl border-2"
            style={{
              backgroundColor: feedbackMessage.includes("Correct")
                ? `${colors.emeraldz}10`
                : `${colors.coralz}10`,
              borderColor: feedbackMessage.includes("Correct")
                ? colors.emeraldz
                : colors.coralz,
              color: feedbackMessage.includes("Correct")
                ? colors.emeraldz
                : colors.coralz,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              {feedbackMessage.includes("Correct") ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <span className="font-bold">{feedbackMessage}</span>
            </div>
            <p className="text-sm">{currentProblem.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full"
      >
        <div
          className="flex justify-between text-sm mb-2"
          style={{ color: colors.grayz }}
        >
          <span>Round Progress</span>
          <span>
            {currentProblem.problemIndex + 1} /{" "}
            {problemSets[currentRound - 1].problems.length}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: colors.orangez }}
            initial={{ width: 0 }}
            animate={{
              width: `${
                ((currentProblem.problemIndex + 1) /
                  problemSets[currentRound - 1].problems.length) *
                100
              }%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default function BooleanRace({
  onComplete,
  onFinish,
  attemptsRemaining = 3,
  currentAttempt = 1,
  maxAttempts = 3,
  studentAssessmentId,
}) {
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto pb-16 px-4 min-h-screen">
      <div className="rounded-2xl p-6">
        <BooleanRaceGame
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
