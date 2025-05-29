import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Clock, Award, BookOpen, ArrowRight, Info, Zap, Target, Timer, Star, RotateCcw, Play, Settings, Search, Lightbulb, Cpu, AlertTriangle, Shield, Calculator, Home } from "lucide-react"

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

// Logic Gate Symbols Component
const LogicGateSymbol = ({ gateType, className = "w-16 h-12" }) => {
  const symbols = {
    AND: (
      <svg className={className} viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 10 L40 10 Q70 10 70 30 Q70 50 40 50 L10 50 Z" fill="white" stroke="black"/>
        <line x1="0" y1="20" x2="10" y2="20"/>
        <line x1="0" y1="40" x2="10" y2="40"/>
        <line x1="70" y1="30" x2="80" y2="30"/>
        <text x="30" y="35" fontSize="8" textAnchor="middle" fill="black">AND</text>
      </svg>
    ),
    OR: (
      <svg className={className} viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 10 Q40 10 50 30 Q40 50 10 50 Q25 30 10 10" fill="white" stroke="black"/>
        <line x1="0" y1="20" x2="15" y2="20"/>
        <line x1="0" y1="40" x2="15" y2="40"/>
        <line x1="50" y1="30" x2="60" y2="30"/>
        <text x="25" y="35" fontSize="8" textAnchor="middle" fill="black">OR</text>
      </svg>
    ),
    NOT: (
      <svg className={className} viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 10 L40 30 L10 50 Z" fill="white" stroke="black"/>
        <circle cx="45" cy="30" r="3" fill="white" stroke="black"/>
        <line x1="0" y1="30" x2="10" y2="30"/>
        <line x1="48" y1="30" x2="58" y2="30"/>
        <text x="20" y="35" fontSize="8" textAnchor="middle" fill="black">NOT</text>
      </svg>
    ),
    NAND: (
      <svg className={className} viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 10 L40 10 Q70 10 70 30 Q70 50 40 50 L10 50 Z" fill="white" stroke="black"/>
        <circle cx="73" cy="30" r="3" fill="white" stroke="black"/>
        <line x1="0" y1="20" x2="10" y2="20"/>
        <line x1="0" y1="40" x2="10" y2="40"/>
        <line x1="76" y1="30" x2="86" y2="30"/>
        <text x="30" y="35" fontSize="6" textAnchor="middle" fill="black">NAND</text>
      </svg>
    ),
    NOR: (
      <svg className={className} viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 10 Q40 10 50 30 Q40 50 10 50 Q25 30 10 10" fill="white" stroke="black"/>
        <circle cx="53" cy="30" r="3" fill="white" stroke="black"/>
        <line x1="0" y1="20" x2="15" y2="20"/>
        <line x1="0" y1="40" x2="15" y2="40"/>
        <line x1="56" y1="30" x2="66" y2="30"/>
        <text x="25" y="35" fontSize="7" textAnchor="middle" fill="black">NOR</text>
      </svg>
    ),
    XOR: (
      <svg className={className} viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 10 Q40 10 50 30 Q40 50 10 50 Q25 30 10 10" fill="white" stroke="black"/>
        <path d="M5 10 Q20 30 5 50" fill="none" stroke="black"/>
        <line x1="0" y1="20" x2="10" y2="20"/>
        <line x1="0" y1="40" x2="10" y2="40"/>
        <line x1="50" y1="30" x2="60" y2="30"/>
        <text x="25" y="35" fontSize="8" textAnchor="middle" fill="black">XOR</text>
      </svg>
    ),
    XNOR: (
      <svg className={className} viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 10 Q40 10 50 30 Q40 50 10 50 Q25 30 10 10" fill="white" stroke="black"/>
        <path d="M5 10 Q20 30 5 50" fill="none" stroke="black"/>
        <circle cx="53" cy="30" r="3" fill="white" stroke="black"/>
        <line x1="0" y1="20" x2="10" y2="20"/>
        <line x1="0" y1="40" x2="10" y2="40"/>
        <line x1="56" y1="30" x2="66" y2="30"/>
        <text x="25" y="35" fontSize="6" textAnchor="middle" fill="black">XNOR</text>
      </svg>
    )
  }
  
  return symbols[gateType] || null
}

// Truth Table Component
const TruthTable = ({ inputs, output, title = "Truth Table" }) => {
  const inputNames = Object.keys(inputs[0])
  
  return (
    <div className="p-4 rounded-lg" style={{ backgroundColor: `${colors.cyanz}10` }}>
      <h4 className="font-bold mb-3 text-center" style={{ color: colors.cyanz }}>
        {title}
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="border-b-2" style={{ borderColor: colors.cyanz }}>
              {inputNames.map(name => (
                <th key={name} className="p-2 font-bold" style={{ color: colors.grayz }}>
                  {name}
                </th>
              ))}
              <th className="p-2 font-bold" style={{ color: colors.grayz }}>Y</th>
            </tr>
          </thead>
          <tbody>
            {inputs.map((row, idx) => (
              <tr key={idx} className="border-b" style={{ borderColor: `${colors.cyanz}30` }}>
                {inputNames.map(name => (
                  <td key={name} className="p-2 font-mono" style={{ color: colors.grayz }}>
                    {row[name]}
                  </td>
                ))}
                <td className="p-2 font-mono font-bold" 
                    style={{ color: output[idx] ? colors.emeraldz : colors.coralz }}>
                  {output[idx]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Logic Gate Detective Game Component
const LogicGateDetectiveGame = ({ 
  onComplete,
  onFinish,
  attemptsRemaining = 3, 
  currentAttempt = 1, 
  maxAttempts = 3, 
  studentAssessmentId 
}) => {
  const [currentCase, setCurrentCase] = useState(0)
  const [score, setScore] = useState(0)
  const [casesSolved, setCasesSolved] = useState(0)
  const [gameState, setGameState] = useState('intro') // intro, playing, case_solved, completed
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [instructionStep, setInstructionStep] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [multiQuestionAnswers, setMultiQuestionAnswers] = useState({})

  // Instructions for the game
  const instructions = [
    "Welcome to the Logic Gate Detective Academy! 🕵️⚡ You're now a Digital Circuit Investigator.",
    "Your mission: Solve mysterious cases involving malfunctioning digital devices and circuits.",
    "You'll analyze truth tables, identify logic gates, and build circuits to restore functionality.",
    "Each case tests different skills: gate identification, circuit analysis, and hands-on building.",
    "Ready to become a master of digital logic? Let's investigate these electronic mysteries! 🔍"
  ]

  // Detective cases with progressive difficulty
  const detectiveCases = [
    // Level 1 - Basic Gate Identification
    {
      id: 1,
      title: "The Broken Smart Door Lock",
      difficulty: "Rookie",
      scenario: "A smart door lock malfunctioned. It should only open when BOTH the key card is scanned AND the correct PIN is entered. Help identify the logic gate!",
      caseType: "gate_identification",
      device: "🚪 Smart Door Lock",
      truthTable: {
        inputs: [
          { "Card": 0, "PIN": 0 },
          { "Card": 0, "PIN": 1 },
          { "Card": 1, "PIN": 0 },
          { "Card": 1, "PIN": 1 }
        ],
        output: [0, 0, 0, 1]
      },
      options: [
        { gate: "AND", isCorrect: true, explanation: "Correct! AND gate outputs 1 only when ALL inputs are 1. Perfect for requiring both card AND PIN." },
        { gate: "OR", isCorrect: false, explanation: "OR would open the door with just the card OR just the PIN - not secure!" },
        { gate: "NAND", isCorrect: false, explanation: "NAND would keep the door locked when both card and PIN are correct - opposite of what we want!" },
        { gate: "XOR", isCorrect: false, explanation: "XOR would open only when card OR PIN is present, but not both - very insecure!" }
      ],
      hint: "The door should open ONLY when BOTH conditions are true. Which gate requires ALL inputs to be high?",
      points: 100
    },

    {
      id: 2,
      title: "The Faulty Fire Alarm System",
      difficulty: "Rookie", 
      scenario: "A fire alarm should trigger when smoke is detected OR when the manual button is pressed. But it's not working correctly...",
      caseType: "gate_identification",
      device: "🚨 Fire Alarm System",
      truthTable: {
        inputs: [
          { "Smoke": 0, "Button": 0 },
          { "Smoke": 0, "Button": 1 },
          { "Smoke": 1, "Button": 0 },
          { "Smoke": 1, "Button": 1 }
        ],
        output: [0, 1, 1, 1]
      },
      options: [
        { gate: "OR", isCorrect: true, explanation: "Correct! OR gate triggers when ANY input is high - perfect for smoke OR manual activation." },
        { gate: "AND", isCorrect: false, explanation: "AND would require both smoke AND button press simultaneously - not practical for safety!" },
        { gate: "XOR", isCorrect: false, explanation: "XOR would turn OFF the alarm when both smoke and button are active - dangerous!" },
        { gate: "NOR", isCorrect: false, explanation: "NOR would only activate when neither smoke nor button is detected - completely backwards!" }
      ],
      hint: "Safety systems should activate when ANY dangerous condition occurs. Which gate outputs 1 when any input is 1?",
      points: 120
    },

    {
      id: 3,
      title: "The Mysterious Inverter Circuit",
      difficulty: "Detective",
      scenario: "A digital display is showing inverted signals. When input is HIGH, output should be LOW, and vice versa. Identify the gate!",
      caseType: "gate_identification", 
      device: "📺 Digital Display Controller",
      truthTable: {
        inputs: [
          { "Input": 0 },
          { "Input": 1 }
        ],
        output: [1, 0]
      },
      options: [
        { gate: "NOT", isCorrect: true, explanation: "Perfect! NOT gate (inverter) flips the input - 0 becomes 1, and 1 becomes 0." },
        { gate: "AND", isCorrect: false, explanation: "AND gate needs two inputs. This is a single-input problem." },
        { gate: "OR", isCorrect: false, explanation: "OR gate also needs two inputs, and wouldn't invert the signal." },
        { gate: "XOR", isCorrect: false, explanation: "XOR needs two inputs. For inversion, we need a single-input gate." }
      ],
      hint: "This gate has only ONE input and flips the signal. What's the simplest logic operation for inversion?",
      points: 150
    },

    {
      id: 4,
      title: "The Exclusive Security Scanner",
      difficulty: "Detective",
      scenario: "A security scanner should beep when EXACTLY ONE sensor detects movement (not both sensors, not neither). What gate controls this behavior?",
      caseType: "gate_identification",
      device: "🔐 Security Motion Scanner", 
      truthTable: {
        inputs: [
          { "Sensor1": 0, "Sensor2": 0 },
          { "Sensor1": 0, "Sensor2": 1 },
          { "Sensor1": 1, "Sensor2": 0 },
          { "Sensor1": 1, "Sensor2": 1 }
        ],
        output: [0, 1, 1, 0]
      },
      options: [
        { gate: "XOR", isCorrect: true, explanation: "Excellent! XOR outputs 1 only when inputs are different - exactly one sensor active." },
        { gate: "OR", isCorrect: false, explanation: "OR would also trigger when BOTH sensors are active - not exclusive enough." },
        { gate: "AND", isCorrect: false, explanation: "AND only triggers when BOTH sensors are active - opposite of what we want." },
        { gate: "NAND", isCorrect: false, explanation: "NAND would be active most of the time, including when no sensors are triggered." }
      ],
      hint: "This gate outputs 1 only when inputs are DIFFERENT. It's the 'exclusive' gate - what's it called?",
      points: 200
    },

    {
      id: 5,
      title: "The Universal Gate Challenge",
      difficulty: "Senior Detective",
      scenario: "A manufacturing plant only has NAND gates available. They need to create a NOT gate function using only NAND gates. Which configuration creates an inverter?",
      caseType: "circuit_building",
      device: "🏭 Manufacturing Logic Controller",
      challenge: "Build a NOT gate using only NAND gates",
      truthTable: {
        inputs: [{ "A": 0 }, { "A": 1 }],
        output: [1, 0]
      },
      options: [
        { 
          gate: "Single NAND with both inputs connected to A", 
          isCorrect: true, 
          explanation: "Correct! When both inputs of a NAND gate receive the same signal A, it outputs NOT A. NAND(A,A) = NOT(A AND A) = NOT A" 
        },
        { 
          gate: "Two NAND gates in series", 
          isCorrect: false, 
          explanation: "Two NANDs in series would create a buffer (A → NOT A → A), not an inverter." 
        },
        { 
          gate: "NAND gate with one input grounded", 
          isCorrect: false, 
          explanation: "With one input at 0, NAND always outputs 1 regardless of the other input - not useful as an inverter." 
        },
        { 
          gate: "Parallel NAND gates", 
          isCorrect: false, 
          explanation: "Parallel connections don't change the logic function - still need the input connected to both terminals of a single NAND." 
        }
      ],
      hint: "Remember: A NAND A = NOT A. What happens when you connect the same input to both terminals of a NAND gate?",
      points: 300
    },

    {
      id: 6,
      title: "The Calculator Crisis - Half Adder",
      difficulty: "Senior Detective", 
      scenario: "A calculator's binary adder is broken. You need to identify the correct gates for a half-adder that adds two bits and produces Sum and Carry outputs.",
      caseType: "circuit_analysis",
      device: "🧮 Digital Calculator",
      circuitDescription: "Two inputs A and B. Sum = A XOR B, Carry = A AND B",
      truthTable: {
        inputs: [
          { "A": 0, "B": 0 },
          { "A": 0, "B": 1 },
          { "A": 1, "B": 0 },
          { "A": 1, "B": 1 }
        ],
        sum: [0, 1, 1, 0],
        carry: [0, 0, 0, 1]
      },
      questions: [
        {
          question: "What gate produces the Sum output (0+0=0, 0+1=1, 1+0=1, 1+1=0)?",
          options: ["XOR", "AND", "OR", "NAND"],
          correct: 0,
          explanation: "XOR gives 1 when inputs are different - perfect for binary addition sum! It handles the case where 1+1=10 (sum=0, carry=1)."
        },
        {
          question: "What gate produces the Carry output (only 1 when both inputs are 1)?", 
          options: ["OR", "AND", "XOR", "NOT"],
          correct: 1,
          explanation: "AND gives 1 only when both inputs are 1 - exactly when we need a carry bit in binary addition!"
        }
      ],
      hint: "Think about binary addition: 0+1=1 (sum=1, carry=0), but 1+1=10 (sum=0, carry=1). Which gates match this behavior?",
      points: 350
    }
  ]

  // Calculate totals
  const totalQuestions = detectiveCases.length
  const totalPossiblePoints = detectiveCases.reduce((sum, case_) => sum + case_.points, 0)

  const startGame = () => {
    setGameState('playing')
    setShowInstructions(false)
  }

  const nextInstruction = () => {
    if (instructionStep < instructions.length - 1) {
      setInstructionStep(instructionStep + 1)
    } else {
      startGame()
    }
  }

  const selectAnswer = (answerIndex) => {
    if (showFeedback) return
    console.log('Selecting answer:', answerIndex, 'for case:', currentCase + 1)
    setSelectedAnswer(answerIndex)
  }

  const selectMultiQuestionAnswer = (questionIndex, answerIndex) => {
    if (showFeedback) return
    console.log('Multi-question answer:', questionIndex, answerIndex)
    setMultiQuestionAnswers({
      ...multiQuestionAnswers,
      [questionIndex]: answerIndex
    })
  }

  const submitAnswer = () => {
    const currentProblem = detectiveCases[currentCase]
    let isCorrect = false 
    let explanation = ""
    
    if (currentProblem.caseType === 'gate_identification' || currentProblem.caseType === 'circuit_building') {
      if (selectedAnswer !== null) {
        isCorrect = currentProblem.options[selectedAnswer].isCorrect
        explanation = currentProblem.options[selectedAnswer].explanation
      }
    } else if (currentProblem.caseType === 'circuit_analysis') {
      // Check all questions are answered
      const allQuestionsAnswered = currentProblem.questions.every((_, idx) => 
        multiQuestionAnswers.hasOwnProperty(idx)
      )
      
      if (allQuestionsAnswered) {
        // Check if all answers are correct
        isCorrect = currentProblem.questions.every((question, idx) => 
          multiQuestionAnswers[idx] === question.correct
        )
        explanation = isCorrect ? "All correct! Great understanding of half-adder logic." : "Some answers were incorrect. Review binary addition logic."
      }
    }
    
    // Record the answer
    const answerData = {
      questionIndex: currentCase,
      selectedAnswer: selectedAnswer,
      multiQuestionAnswers: multiQuestionAnswers,
      isCorrect: isCorrect,
      hintsUsed: hintsUsed,
      caseDifficulty: currentProblem.difficulty,
      caseTitle: currentProblem.title,
      pointsEarned: isCorrect ? Math.max(50, currentProblem.points - (hintsUsed * 25)) : 0
    }
    setUserAnswers([...userAnswers, answerData])
    
    if (isCorrect) {
      const points = Math.max(50, currentProblem.points - (hintsUsed * 25))
      setScore(score + points)
      setCasesSolved(casesSolved + 1)
      setGameState('case_solved')
    }
    
    setShowFeedback(true)
    
    setTimeout(() => {
      if (currentCase < detectiveCases.length - 1) {
        nextCase()
      } else {
        completeGame()
      }
    }, 3000)
  }

  const nextCase = () => {
    console.log(`Moving from case ${currentCase + 1} to case ${currentCase + 2}`)
    setCurrentCase(currentCase + 1)
    setSelectedAnswer(null)
    setMultiQuestionAnswers({})
    setShowFeedback(false)
    setGameState('playing')
    setShowHint(false)
    setHintsUsed(0)
    setCurrentQuestionIndex(0)
  }

  const completeGame = () => {
    setGameState('completed')
  }

  const resetGame = () => {
    setCurrentCase(0)
    setScore(0)
    setCasesSolved(0)
    setGameState('intro')
    setShowInstructions(true)
    setInstructionStep(0)
    setSelectedAnswer(null)
    setMultiQuestionAnswers({})
    setShowFeedback(false)
    setShowHint(false)
    setHintsUsed(0)
    setUserAnswers([])
    setCurrentQuestionIndex(0)
  }

  const showHintHandler = () => {
    setShowHint(true)
    setHintsUsed(hintsUsed + 1)
  }

  const handleFinish = () => {
    const finalScore = Math.round((score / totalPossiblePoints) * 100)
    const assessmentData = {
      percentage: finalScore,
      score: score,
      totalQuestions: totalQuestions,
      totalPossiblePoints: totalPossiblePoints,
      casesSolved: casesSolved,
      userAnswers: userAnswers,
      currentAttempt: currentAttempt,
      maxAttempts: maxAttempts
    }
    
    if (onFinish) {
      onFinish(assessmentData)
    } else if (onComplete) {
      onComplete(assessmentData)
    }
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
               style={{ background: `linear-gradient(135deg, ${colors.violetz}, ${colors.cyanz})` }}>
            <span className="text-3xl">🔌</span>
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: colors.grayz }}>
            Logic Gate Detective Academy
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-xl shadow-lg min-h-32"
          style={{ background: `linear-gradient(135deg, ${colors.white}, ${colors.violetz}10)` }}
        >
          <div className="text-lg leading-relaxed" style={{ color: colors.grayz }}>
            <Typewriter
              text={instructions[instructionStep]}
              delay={30}
              onComplete={() => setTimeout(() => {}, 1000)}
            />
          </div>
        </motion.div>

        {/* Show attempt information */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 mb-2">
            📝 Attempt <strong>{currentAttempt}</strong> of <strong>{maxAttempts}</strong>
          </p>
          <p className="text-xs text-blue-600">
            {attemptsRemaining > 1
              ? `You have ${attemptsRemaining - 1} attempts remaining after this one.`
              : "This is your final attempt!"}
          </p>
        </div>

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
              <>Start Investigation! <Cpu className="h-5 w-5 ml-2 inline" /></>
            ) : (
              <>Next <ArrowRight className="h-5 w-5 ml-2 inline" /></>
            )}
          </motion.button>
        </div>
      </div>
    )
  }

  // Case Solved Screen
  if (gameState === 'case_solved') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
             style={{ background: `linear-gradient(135deg, ${colors.emeraldz}, ${colors.cyanz})` }}>
          <CheckCircle className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
          Case Solved! 🎉
        </h2>
        
        <div className="text-6xl">⚡</div>
        
        <p className="text-lg" style={{ color: colors.grayz }}>
          Excellent work, Detective! Moving to the next case...
        </p>
      </motion.div>
    )
  }

  // Completion Screen (Fixed - now shows proper results)
  if (gameState === 'completed') {
    const accuracy = Math.round((casesSolved / detectiveCases.length) * 100)
    const finalScore = Math.round((score / totalPossiblePoints) * 100)
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center"
             style={{ background: `linear-gradient(135deg, ${colors.emeraldz}, ${colors.cyanz})` }}>
          <Award className="h-12 w-12 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold" style={{ color: colors.grayz }}>
          Logic Gate Detective Mission Complete! 🎉
        </h2>
        
        {/* Score Circle */}
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg mx-auto"
          style={{
            background: `conic-gradient(${colors.violetz} ${finalScore * 3.6}deg, ${colors.offwhite} 0deg)`,
            color: colors.violetz,
          }}
        >
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
            {finalScore}%
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${colors.violetz}20` }}>
            <div className="text-2xl font-bold" style={{ color: colors.violetz }}>{finalScore}%</div>
            <div className="text-sm" style={{ color: colors.grayz }}>Final Score</div>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${colors.ambez}20` }}>
            <div className="text-2xl font-bold" style={{ color: colors.ambez }}>{score}</div>
            <div className="text-sm" style={{ color: colors.grayz }}>Points Earned</div>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${colors.emeraldz}20` }}>
            <div className="text-2xl font-bold" style={{ color: colors.emeraldz }}>{casesSolved}</div>
            <div className="text-sm" style={{ color: colors.grayz }}>Cases Solved</div>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${colors.cyanz}20` }}>
            <div className="text-2xl font-bold" style={{ color: colors.cyanz }}>{accuracy}%</div>
            <div className="text-sm" style={{ color: colors.grayz }}>Success Rate</div>
          </div>
        </div>

        <div className="p-6 rounded-xl" 
             style={{ backgroundColor: finalScore >= 80 ? `${colors.emeraldz}10` : finalScore >= 60 ? `${colors.cyanz}10` : `${colors.ambez}10` }}>
          <h3 className="font-bold text-lg mb-2" 
              style={{ color: finalScore >= 80 ? colors.emeraldz : finalScore >= 60 ? colors.cyanz : colors.ambez }}>
            {finalScore >= 80 ? "Master Logic Detective! ⚡" :
             finalScore >= 60 ? "Expert Circuit Analyst! 🔌" :
             finalScore >= 40 ? "Good Logic Investigator! 👍" : "Rookie Gate Detective! 📚"}
          </h3>
          <p className="text-sm" style={{ color: colors.grayz }}>
            {finalScore >= 80 ? "Outstanding! You've mastered digital logic gates and circuit analysis with exceptional skill." :
             finalScore >= 60 ? "Excellent work! You demonstrate strong understanding of logic gates and their applications." :
             finalScore >= 40 ? "Well done! You're developing solid skills in digital logic and circuit analysis." :
             "Good effort! Keep practicing to improve your logic gate identification and circuit understanding."}
          </p>
        </div>

        {/* Results Summary */}
        <div className="rounded-xl shadow-lg overflow-hidden w-full max-w-md mx-auto"
             style={{ background: `linear-gradient(135deg, ${colors.white}, ${colors.cyanz}10)` }}>
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.indigoz }}>
              Your Results:
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg"
                   style={{ backgroundColor: `${colors.skyz}10` }}>
                <span className="font-medium">Cases Investigated:</span>
                <span className="font-bold" style={{ color: colors.indigoz }}>
                  {totalQuestions} / {totalQuestions}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg"
                   style={{ backgroundColor: `${colors.emeraldz}10` }}>
                <span className="font-medium">Cases Solved:</span>
                <span className="font-bold" style={{ color: colors.emeraldz }}>
                  {casesSolved} / {totalQuestions}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg"
                   style={{ backgroundColor: `${colors.violetz}10` }}>
                <span className="font-medium">Final Score:</span>
                <span className="font-bold text-xl" style={{ color: colors.violetz }}>
                  {finalScore}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg"
                   style={{ backgroundColor: `${colors.ambez}10` }}>
                <span className="font-medium">Attempt:</span>
                <span className="font-bold" style={{ color: colors.ambez }}>
                  {currentAttempt} / {maxAttempts}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Only show restart if attempts remaining */}
          {attemptsRemaining > 1 && (
            <motion.button
              onClick={resetGame}
              className="px-6 py-3 rounded-lg font-medium transition-all"
              style={{ backgroundColor: colors.cyanz, color: colors.white }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="h-4 w-4 mr-2 inline" />
              🔄 Try Again ({attemptsRemaining - 1} attempts left)
            </motion.button>
          )}
          
          {/* Finish Assessment Button */}
          <motion.button
            onClick={handleFinish}
            className="px-6 py-3 rounded-lg font-medium transition-all"
            style={{ backgroundColor: colors.emeraldz, color: colors.white }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Award className="h-4 w-4 mr-2 inline" />
            Finish Assessment
          </motion.button>
        </div>
      </motion.div>
    )
  }

  const currentProblem = detectiveCases[currentCase]
  
  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center p-4 rounded-xl" 
        style={{ backgroundColor: `${colors.violetz}20` }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" style={{ color: colors.violetz }} />
            <span className="font-bold" style={{ color: colors.violetz }}>Score: {score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" style={{ color: colors.emeraldz }} />
            <span className="font-bold" style={{ color: colors.emeraldz }}>Solved: {casesSolved}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full font-bold text-sm"
               style={{ 
                 backgroundColor: currentProblem.difficulty === 'Rookie' ? `${colors.emeraldz}20` :
                                  currentProblem.difficulty === 'Detective' ? `${colors.violetz}20` : `${colors.coralz}20`,
                 color: currentProblem.difficulty === 'Rookie' ? colors.emeraldz :
                        currentProblem.difficulty === 'Detective' ? colors.violetz : colors.coralz
               }}>
            {currentProblem.difficulty}
          </div>
          <div className="px-3 py-1 rounded-full font-bold"
               style={{ backgroundColor: colors.indigoz, color: colors.white }}>
            Case {currentCase + 1}/{detectiveCases.length}
          </div>
        </div>
      </motion.div>

      {/* Case Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold mb-2" style={{ color: colors.grayz }}>
          🔍 {currentProblem.title}
        </h3>
        <div className="text-3xl mb-2">{currentProblem.device}</div>
        <p className="text-lg mb-4" style={{ color: colors.grayz }}>
          {currentProblem.scenario}
        </p>
      </motion.div>

      {/* Truth Table Display */}
      {currentProblem.truthTable && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TruthTable 
            inputs={currentProblem.truthTable.inputs}
            output={currentProblem.truthTable.output || currentProblem.truthTable.sum}
            title="Observed Truth Table"
          />
        </motion.div>
      )}

      {/* Additional Truth Table for Half Adder */}
      {currentProblem.id === 6 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <TruthTable 
            inputs={currentProblem.truthTable.inputs}
            output={currentProblem.truthTable.sum}
            title="Sum Output"
          />
          <TruthTable 
            inputs={currentProblem.truthTable.inputs}
            output={currentProblem.truthTable.carry}
            title="Carry Output"
          />
        </motion.div>
      )}

      {/* Hint Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        {!showHint ? (
          <button
            onClick={showHintHandler}
            className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
            style={{ backgroundColor: `${colors.yellowz}20`, color: colors.ambez }}
          >
            <Lightbulb className="h-4 w-4" />
            Need a Hint? (-25 points)
          </button>
        ) : (
          <div className="p-4 rounded-xl border-2" 
               style={{ 
                 backgroundColor: `${colors.yellowz}10`,
                 borderColor: colors.yellowz,
                 color: colors.ambez
               }}>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-5 w-5" />
              <span className="font-bold">Detective Hint:</span>
            </div>
            <p className="text-sm">{currentProblem.hint}</p>
          </div>
        )}
      </motion.div>

      {/* Answer Options - Gate Identification & Circuit Building */}
      {(currentProblem.caseType === 'gate_identification' || currentProblem.caseType === 'circuit_building') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <h4 className="text-lg font-bold text-center" style={{ color: colors.grayz }}>
            🔧 {currentProblem.caseType === 'circuit_building' ? 'Choose the Correct Configuration:' : 'Which Logic Gate Is Responsible?'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentProblem.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx
              const isCorrectAnswer = showFeedback && option.isCorrect
              const isWrongAnswer = showFeedback && selectedAnswer === idx && !option.isCorrect
              
              return (
                <motion.button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  disabled={showFeedback}
                  className="p-6 rounded-xl border-2 transition-all transform text-center"
                  style={{
                    backgroundColor: isCorrectAnswer ? `${colors.emeraldz}20` : 
                                   isWrongAnswer ? `${colors.coralz}20` :
                                   isSelected ? `${colors.violetz}20` : colors.white,
                    borderColor: isCorrectAnswer ? colors.emeraldz :
                               isWrongAnswer ? colors.coralz :
                               isSelected ? colors.violetz : colors.cyanz,
                    opacity: showFeedback ? (option.isCorrect ? 1 : 0.7) : 1
                  }}
                  whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                  whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <div className="flex flex-col items-center space-y-3">
                    {currentProblem.caseType === 'gate_identification' && (
                      <LogicGateSymbol gateType={option.gate} className="w-20 h-16" />
                    )}
                    <span className="font-bold text-lg" style={{ color: colors.grayz }}>
                      {currentProblem.caseType === 'gate_identification' ? `${option.gate} Gate` : option.gate}
                    </span>
                    {isCorrectAnswer && <CheckCircle className="h-6 w-6" style={{ color: colors.emeraldz }} />}
                    {isWrongAnswer && <XCircle className="h-6 w-6" style={{ color: colors.coralz }} />}
                  </div>
                  
                  {showFeedback && (
                    <div className="mt-4 p-3 rounded-lg" 
                         style={{ backgroundColor: `${colors.white}80` }}>
                      <p className="text-sm" style={{ color: colors.grayz }}>
                        {option.explanation}
                      </p>
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Circuit Analysis Questions (Multi-Question) */}
      {currentProblem.caseType === 'circuit_analysis' && currentProblem.questions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <h4 className="text-lg font-bold text-center" style={{ color: colors.grayz }}>
            🔧 Circuit Analysis Questions:
          </h4>
          
          {currentProblem.questions.map((question, qIdx) => (
            <div key={qIdx} className="p-6 rounded-xl" 
                 style={{ backgroundColor: `${colors.cyanz}10` }}>
              <h4 className="font-bold mb-4" style={{ color: colors.cyanz }}>
                Question {qIdx + 1}: {question.question}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {question.options.map((option, oIdx) => {
                  const isSelected = multiQuestionAnswers[qIdx] === oIdx
                  const isCorrectAnswer = showFeedback && oIdx === question.correct
                  const isWrongAnswer = showFeedback && multiQuestionAnswers[qIdx] === oIdx && oIdx !== question.correct
                  
                  return (
                    <button
                      key={oIdx}
                      onClick={() => selectMultiQuestionAnswer(qIdx, oIdx)}
                      disabled={showFeedback}
                      className="p-3 rounded-lg border-2 transition-all"
                      style={{
                        backgroundColor: isCorrectAnswer ? `${colors.emeraldz}20` :
                                       isWrongAnswer ? `${colors.coralz}20` :
                                       isSelected ? `${colors.violetz}20` : colors.white,
                        borderColor: isCorrectAnswer ? colors.emeraldz :
                                   isWrongAnswer ? colors.coralz :
                                   isSelected ? colors.violetz : colors.grayz
                      }}
                    >
                      <LogicGateSymbol gateType={option} className="w-16 h-12 mx-auto mb-2" />
                      <div className="font-bold" style={{ color: colors.grayz }}>{option}</div>
                      {isCorrectAnswer && <CheckCircle className="h-4 w-4 mx-auto mt-1" style={{ color: colors.emeraldz }} />}
                      {isWrongAnswer && <XCircle className="h-4 w-4 mx-auto mt-1" style={{ color: colors.coralz }} />}
                    </button>
                  )
                })}
              </div>
              
              {showFeedback && (
                <div className="mt-4 p-3 rounded-lg" 
                     style={{ backgroundColor: `${colors.white}80` }}>
                  <p className="text-sm" style={{ color: colors.grayz }}>
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* Submit Button */}
      {((selectedAnswer !== null && (currentProblem.caseType === 'gate_identification' || currentProblem.caseType === 'circuit_building')) ||
        (currentProblem.caseType === 'circuit_analysis' && 
         currentProblem.questions.every((_, idx) => multiQuestionAnswers.hasOwnProperty(idx)))) && 
       !showFeedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <button
            onClick={submitAnswer}
            className="px-8 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
            style={{ backgroundColor: colors.emeraldz, color: colors.white }}
          >
            Submit Answer <Cpu className="h-5 w-5 ml-2 inline" />
          </button>
        </motion.div>
      )}

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="text-sm mb-2" style={{ color: colors.grayz }}>
          Investigation Progress
        </div>
        <div className="w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: colors.violetz }}
            initial={{ width: 0 }}
            animate={{ width: `${((currentCase + 1) / detectiveCases.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function LogicGateDetectiveAcademy({ 
  onComplete,
  onFinish,
  attemptsRemaining = 3, 
  currentAttempt = 1, 
  maxAttempts = 3, 
  studentAssessmentId 
}) {
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto pb-16 px-4 min-h-screen" 
         style={{ background: `linear-gradient(135deg, ${colors.offwhite}, ${colors.violetz}05)` }}>
      <div className="rounded-2xl shadow-xl p-6" style={{ backgroundColor: colors.white }}>
        <LogicGateDetectiveGame 
          onComplete={onComplete}
          onFinish={onFinish}
          attemptsRemaining={attemptsRemaining}
          currentAttempt={currentAttempt}
          maxAttempts={maxAttempts}
          studentAssessmentId={studentAssessmentId}
        />
      </div>
    </div>
  )
}