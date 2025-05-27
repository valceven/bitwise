import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Clock, Award, BookOpen, ArrowRight, Info, Zap, Target, Timer, Star, RotateCcw, Play, Pause } from "lucide-react"

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
  skyz: "#0EA5E9"
}

// Typewriter Component
const Typewriter = ({ text, delay = 50, className = "", onComplete }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(currentIndex + 1)
      }, delay)
      
      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      if (onComplete) onComplete()
    }
  }, [currentIndex, delay, text, isComplete, onComplete])

  return <span className={className}>{displayText}</span>
}

// Law Detective Game Component
const LawDetectiveGame = ({ onComplete, onFinish }) => {
  const [currentCase, setCurrentCase] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [gameState, setGameState] = useState('intro') // intro, playing, correct, wrong, completed
  const [selectedLaw, setSelectedLaw] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [instructionStep, setInstructionStep] = useState(0)

  // Instructions for the game
  const instructions = [
    "Welcome, Detective! 🕵️ Your mission is to identify which Boolean law was used in each transformation.",
    "You'll see a 'Before' and 'After' expression. Study the change carefully.",
    "Select the correct law from the available cards. Speed and accuracy matter!",
    "Build streaks for bonus points, but watch out - time is ticking! ⏰",
    "Ready to solve some Boolean mysteries? Let's start detecting! 🔍"
  ]

  // Detective cases - transformations and their laws
  const detectiveCases = [
    {
      transformation: { before: "A ∧ 1", after: "A" },
      correctLaw: "Identity Law",
      explanation: "AND with 1 preserves the original value - this is the AND Identity Law",
      difficulty: 1
    },
    {
      transformation: { before: "A ∨ 0", after: "A" },
      correctLaw: "Identity Law", 
      explanation: "OR with 0 preserves the original value - this is the OR Identity Law",
      difficulty: 1
    },
    {
      transformation: { before: "A ∧ 0", after: "0" },
      correctLaw: "Nullification Law",
      explanation: "AND with 0 always results in 0, nullifying any other input",
      difficulty: 1
    },
    {
      transformation: { before: "A ∨ 1", after: "1" },
      correctLaw: "Nullification Law",
      explanation: "OR with 1 always results in 1, nullifying any other input", 
      difficulty: 1
    },
    {
      transformation: { before: "A ∧ A", after: "A" },
      correctLaw: "Idempotent Law",
      explanation: "A variable ANDed with itself equals itself - idempotent means 'unchanged by operation'",
      difficulty: 2
    },
    {
      transformation: { before: "A ∨ A", after: "A" },
      correctLaw: "Idempotent Law",
      explanation: "A variable ORed with itself equals itself - the operation has no additional effect",
      difficulty: 2
    },
    {
      transformation: { before: "A ∧ ¬A", after: "0" },
      correctLaw: "Complement Law",
      explanation: "A variable ANDed with its negation is always false - they contradict each other",
      difficulty: 2
    },
    {
      transformation: { before: "A ∨ ¬A", after: "1" },
      correctLaw: "Complement Law",
      explanation: "A variable ORed with its negation is always true - one of them must be true",
      difficulty: 2
    },
    {
      transformation: { before: "¬(A ∧ B)", after: "¬A ∨ ¬B" },
      correctLaw: "De Morgan's Law",
      explanation: "Negation of AND becomes OR of negations - De Morgan's first law",
      difficulty: 3
    },
    {
      transformation: { before: "A ∨ (A ∧ B)", after: "A" },
      correctLaw: "Absorption Law",
      explanation: "Variable absorbs when it appears in both terms - A absorbs (A ∧ B)",
      difficulty: 3
    }
  ]

  // Available law cards
  const lawCards = [
    { name: "Identity Law", color: colors.emeraldz, icon: "🎯", description: "Neutral elements preserve values" },
    { name: "Nullification Law", color: colors.coralz, icon: "🚫", description: "Dominance elements force outputs" },
    { name: "Idempotent Law", color: colors.violetz, icon: "🔄", description: "Self-operations have no effect" },
    { name: "Complement Law", color: colors.tealz, icon: "⚖️", description: "Variable + negation interactions" },
    { name: "De Morgan's Law", color: colors.pinkz, icon: "🔀", description: "Negation distribution rules" },
    { name: "Absorption Law", color: colors.ambez, icon: "🧽", description: "Simplification through absorption" }
  ]

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleTimeUp()
    }
  }, [timeLeft, gameState])

  const handleTimeUp = () => {
    setGameState('wrong')
    setStreak(0)
    setShowFeedback(true)
    setTimeout(() => {
      if (currentCase < detectiveCases.length - 1) {
        nextCase()
      } else {
        completeGame()
      }
    }, 2500)
  }

  const handleLawSelect = (lawName) => {
    if (gameState !== 'playing') return
    
    setSelectedLaw(lawName)
    const isCorrect = lawName === detectiveCases[currentCase].correctLaw
    
    if (isCorrect) {
      const timeBonus = Math.max(0, timeLeft * 2)
      const streakBonus = streak * 5
      const points = 100 + timeBonus + streakBonus
      setScore(score + points)
      setStreak(streak + 1)
      setGameState('correct')
    } else {
      setStreak(0)
      setGameState('wrong')
    }
    
    setShowFeedback(true)
    setTimeout(() => {
      if (currentCase < detectiveCases.length - 1) {
        nextCase()
      } else {
        completeGame()
      }
    }, 2500)
  }

  const nextCase = () => {
    setCurrentCase(currentCase + 1)
    setSelectedLaw(null)
    setShowFeedback(false)
    setGameState('playing')
    setTimeLeft(15)
  }

  const completeGame = () => {
    setGameState('completed')
    const correctAnswers = detectiveCases.filter((_, index) => index < currentCase + 1).length
    const percentage = Math.round((score / (detectiveCases.length * 100)) * 100)
    
    // Call onComplete with score data
    if (onComplete) {
      onComplete(correctAnswers, detectiveCases.length, percentage)
    }
    
    // Call onFinish to let AssessmentView handle completion
    if (onFinish) {
      onFinish()
    }
  }

  const startGame = () => {
    setGameState('playing')
    setShowInstructions(false)
    setTimeLeft(15)
  }

  const resetGame = () => {
    setCurrentCase(0)
    setScore(0)
    setStreak(0)
    setTimeLeft(15)
    setGameState('intro')
    setSelectedLaw(null)
    setShowFeedback(false)
    setShowInstructions(true)
    setInstructionStep(0)
  }

  const nextInstruction = () => {
    if (instructionStep < instructions.length - 1) {
      setInstructionStep(instructionStep + 1)
    } else {
      startGame()
    }
  }

  // Don't render anything when completed - let AssessmentView handle it
  if (gameState === 'completed') {
    return null
  }

  // Intro/Instructions Screen
  if (gameState === 'intro' && showInstructions) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
               style={{ background: `linear-gradient(135deg, ${colors.violetz}, ${colors.pinkz})` }}>
            <span className="text-3xl">🕵️</span>
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: colors.grayz }}>
            Law Detective Training Academy
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-xl shadow-lg min-h-32"
          style={{ background: `linear-gradient(135deg, ${colors.white}, ${colors.lavenderz}10)` }}
        >
          <div className="text-lg leading-relaxed" style={{ color: colors.grayz }}>
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
                  backgroundColor: idx <= instructionStep ? colors.violetz : colors.grayz + "40"
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
              <>Start Mission! <Target className="h-5 w-5 ml-2 inline" /></>
            ) : (
              <>Next <ArrowRight className="h-5 w-5 ml-2 inline" /></>
            )}
          </motion.button>
        </div>
      </div>
    )
  }

  const currentTransformation = detectiveCases[currentCase]

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
            <span className="font-bold" style={{ color: colors.violetz }}>Score: {score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" style={{ color: colors.ambez }} />
            <span className="font-bold" style={{ color: colors.ambez }}>Streak: {streak}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5" style={{ color: timeLeft <= 5 ? colors.redz : colors.tealz }} />
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
        <p style={{ color: colors.grayz }}>Which law was used in this transformation?</p>
      </motion.div>

      {/* Transformation Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="p-8 rounded-xl shadow-lg" 
        style={{ background: `linear-gradient(135deg, ${colors.white}, ${colors.skyz}10)` }}
      >
        <div className="flex items-center justify-center space-x-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="text-sm font-medium mb-2" style={{ color: colors.grayz }}>Before</div>
            <div className="p-4 rounded-lg font-mono text-2xl font-bold"
                 style={{ backgroundColor: `${colors.cyanz}20`, color: colors.indigoz }}>
              {currentTransformation.transformation.before}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-4xl" style={{ color: colors.violetz }}
          >
            →
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="text-sm font-medium mb-2" style={{ color: colors.grayz }}>After</div>
            <div className="p-4 rounded-lg font-mono text-2xl font-bold"
                 style={{ backgroundColor: `${colors.emeraldz}20`, color: colors.emeraldz }}>
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
          const isSelected = selectedLaw === law.name
          const isCorrect = showFeedback && law.name === currentTransformation.correctLaw
          const isWrong = showFeedback && selectedLaw === law.name && !isCorrect
          
          return (
            <motion.button
              key={idx}
              onClick={() => handleLawSelect(law.name)}
              disabled={gameState !== 'playing'}
              className="p-4 rounded-xl border-2 transition-all transform hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: isCorrect ? `${colors.emeraldz}20` : 
                               isWrong ? `${colors.coralz}20` :
                               isSelected ? `${law.color}20` : colors.white,
                borderColor: isCorrect ? colors.emeraldz :
                           isWrong ? colors.coralz :
                           isSelected ? law.color : colors.cyanz,
                opacity: gameState !== 'playing' ? 0.7 : 1
              }}
              whileHover={{ scale: gameState === 'playing' ? 1.05 : 1 }}
              whileTap={{ scale: gameState === 'playing' ? 0.95 : 1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              <div className="text-2xl mb-2">{law.icon}</div>
              <div className="font-bold text-sm mb-1" style={{ color: law.color }}>
                {law.name}
              </div>
              <div className="text-xs opacity-75" style={{ color: colors.grayz }}>
                {law.description}
              </div>
              {isCorrect && <CheckCircle className="h-6 w-6 mx-auto mt-2" style={{ color: colors.emeraldz }} />}
              {isWrong && <XCircle className="h-6 w-6 mx-auto mt-2" style={{ color: colors.coralz }} />}
            </motion.button>
          )
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
              backgroundColor: gameState === 'correct' ? `${colors.emeraldz}10` : `${colors.coralz}10`,
              borderColor: gameState === 'correct' ? colors.emeraldz : colors.coralz,
              color: gameState === 'correct' ? colors.emeraldz : colors.coralz
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              {gameState === 'correct' ? 
                <CheckCircle className="h-5 w-5" /> : 
                <XCircle className="h-5 w-5" />
              }
              <span className="font-bold">
                {gameState === 'correct' ? 
                  `Correct! +${100 + Math.max(0, timeLeft * 2) + streak * 5} points` : 
                  `Wrong! The answer was: ${currentTransformation.correctLaw}`}
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
  )
}

export default function BooleanLawDetectiveGame({ onComplete, onFinish }) {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-16 px-4 min-h-screen" 
         style={{ background: `linear-gradient(135deg, ${colors.offwhite}, ${colors.cyanz}05)` }}>
      <div className="rounded-2xl shadow-xl p-6" style={{ backgroundColor: colors.white }}>
        <LawDetectiveGame onComplete={onComplete} onFinish={onFinish} />
      </div>
    </div>
  )
}