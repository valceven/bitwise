import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Clock, Award, BookOpen, ArrowRight, Info, Zap, Target, Timer, Star, RotateCcw, Play, Bug, Search, Lightbulb, Code, AlertTriangle } from "lucide-react"

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

// Main Code Debug Detective Game Component
const CodeDebugDetectiveGame = ({ 
  onComplete, 
  attemptsRemaining = 3, 
  currentAttempt = 1, 
  maxAttempts = 3, 
  studentAssessmentId 
}) => {
  // Game state
  const [currentCase, setCurrentCase] = useState(0)
  const [score, setScore] = useState(0)
  const [bugsFound, setBugsFound] = useState(0)
  const [gameState, setGameState] = useState('intro') // intro, playing, case_solved, completed
  const [selectedFix, setSelectedFix] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])
  
  // Instruction state
  const [showInstructions, setShowInstructions] = useState(true)
  const [instructionStep, setInstructionStep] = useState(0)
  
  // Hint state
  const [showHint, setShowHint] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)

  // Game instructions
  const instructions = [
    "Welcome, Detective! 🕵️ You've been called to investigate a series of Boolean logic crimes in the code.",
    "Each case contains buggy code with Boolean logic errors. Your mission is to identify and fix these bugs.",
    "Study the code carefully, understand what it's supposed to do, then choose the correct fix.",
    "Use hints if you're stuck, but remember - good detectives solve cases with minimal assistance!",
    "Ready to catch some Boolean bugs? Let's start investigating! 🔍"
  ]

  // Debug cases with progressive difficulty
  const debugCases = [
    {
      id: 1,
      title: "The Permission Gate Bug",
      difficulty: "Rookie",
      scenario: "A user access system isn't working correctly. Users with admin OR premium access should get through, but something's wrong...",
      buggyCode: `def can_access_dashboard(is_admin, has_premium):
    # Bug: Using AND instead of OR
    return is_admin and has_premium

# Test cases that should return True:
print(can_access_dashboard(True, False))   # Admin user
print(can_access_dashboard(False, True))   # Premium user`,
      expectedBehavior: "Both admin users and premium users should have access, but only users with BOTH admin AND premium are getting through.",
      bugDescription: "The logical operator is incorrect",
      fixes: [
        {
          option: "Change 'and' to 'or'",
          code: "return is_admin or has_premium",
          isCorrect: true,
          explanation: "Correct! OR logic allows access for users who are admin OR have premium (or both)."
        },
        {
          option: "Add parentheses around the condition",
          code: "return (is_admin and has_premium)",
          isCorrect: false,
          explanation: "Parentheses don't fix the logic error. The problem is using AND instead of OR."
        },
        {
          option: "Negate the entire condition",
          code: "return not (is_admin and has_premium)",
          isCorrect: false,
          explanation: "This would deny access to admin and premium users, making the problem worse."
        }
      ],
      hint: "Think about the business logic: should a user need BOTH admin AND premium, or just ONE of them?",
      points: 100
    },
    {
      id: 2,
      title: "The De Morgan's Law Violation",
      difficulty: "Rookie", 
      scenario: "A validation function is supposed to reject invalid users, but it's letting some through...",
      buggyCode: `def is_invalid_user(is_registered, has_paid_fee):
    # Bug: Incorrect application of De Morgan's law
    return not is_registered and not has_paid_fee

# This should catch users who are either unregistered OR haven't paid
user1 = is_invalid_user(False, True)  # Unregistered but paid
user2 = is_invalid_user(True, False)  # Registered but unpaid
print(f"User1 invalid: {user1}, User2 invalid: {user2}")`,
      expectedBehavior: "Should return True if user is unregistered OR hasn't paid fees, but it only catches users who are both unregistered AND haven't paid.",
      bugDescription: "De Morgan's law incorrectly applied",
      fixes: [
        {
          option: "Change 'and' to 'or'",
          code: "return not is_registered or not has_paid_fee",
          isCorrect: true,
          explanation: "Correct! Using De Morgan's law: not(A and B) = (not A) or (not B)"
        },
        {
          option: "Negate the entire expression",
          code: "return not (is_registered and has_paid_fee)",
          isCorrect: true,
          explanation: "Also correct! This is the equivalent form using De Morgan's law."
        },
        {
          option: "Remove the 'not' operators",
          code: "return is_registered and has_paid_fee",
          isCorrect: false,
          explanation: "This would return True for valid users, which is the opposite of what we want."
        }
      ],
      hint: "Remember De Morgan's law: NOT(A AND B) = (NOT A) OR (NOT B)",
      points: 150
    },
    {
      id: 3,
      title: "The Short-Circuit Catastrophe",
      difficulty: "Detective",
      scenario: "A data processing function is crashing with null reference errors...",
      buggyCode: `def process_user_data(user_id):
    user = get_user_data(user_id)  # Might return None
    
    # Bug: Wrong order in short-circuit evaluation
    if user.get("active") and user:
        print(f"Processing: {user['name']}")
        return True
    return False

def get_user_data(user_id):
    return {"name": "Alice", "active": True} if user_id > 0 else None`,
      expectedBehavior: "Should safely check if user exists before accessing properties, but it's checking properties first.",
      bugDescription: "Incorrect order of conditions in short-circuit evaluation",
      fixes: [
        {
          option: "Swap the conditions",
          code: "if user and user.get(\"active\"):",
          isCorrect: true,
          explanation: "Correct! Check if user exists first, then check properties. Short-circuit prevents null reference errors."
        },
        {
          option: "Use nested if statements",
          code: "if user:\n        if user.get(\"active\"):",
          isCorrect: true,
          explanation: "Also works! Nested ifs achieve the same safe checking, though less concise."
        },
        {
          option: "Add try-catch around the condition",
          code: "try:\n        if user.get(\"active\") and user:",
          isCorrect: false,
          explanation: "Try-catch doesn't fix the logic error, and the condition order is still wrong."
        }
      ],
      hint: "In AND operations, put the 'safety check' condition first to prevent errors on the second condition.",
      points: 200
    },
    {
      id: 4,
      title: "The Truthy-Falsy Trap",
      difficulty: "Detective",
      scenario: "A username validation system is behaving strangely with empty inputs...",
      buggyCode: `def validate_username(username):
    # Bug: Incorrect truthy/falsy handling
    if username == True:
        return "Valid username"
    elif username == False:
        return "Please enter a username"
    else:
        return "Invalid username format"

# Test cases:
print(validate_username(""))        # Empty string
print(validate_username("alice"))   # Valid name
print(validate_username(None))      # None value`,
      expectedBehavior: "Should validate string usernames, reject empty/None values, but it's checking against boolean True/False instead of truthy/falsy.",
      bugDescription: "Comparing strings to boolean literals instead of checking truthiness",
      fixes: [
        {
          option: "Check truthiness directly",
          code: "if username:\n        return \"Valid username\"\n    else:\n        return \"Please enter a username\"",
          isCorrect: true,
          explanation: "Correct! Checks if username is truthy (non-empty string) or falsy (empty string, None)."
        },
        {
          option: "Check for empty string specifically",
          code: "if username != \"\" and username is not None:",
          isCorrect: true,
          explanation: "Also works! Explicitly checks for non-empty and non-None values."
        },
        {
          option: "Convert to boolean first",
          code: "if bool(username) == True:",
          isCorrect: false,
          explanation: "Unnecessary conversion. Just checking 'if username:' is simpler and more Pythonic."
        }
      ],
      hint: "In Python, empty strings and None are falsy. You don't need to compare to True/False explicitly.",
      points: 250
    },
    {
      id: 5,
      title: "The Complex Condition Chaos",
      difficulty: "Senior Detective",
      scenario: "A graduation eligibility checker has complex business rules, but students who should graduate aren't being approved...",
      buggyCode: `def can_graduate(grades, attendance, project_complete):
    if not grades:  # Empty grades list
        return False
        
    avg_grade = sum(grades) / len(grades)
    passing_grades = avg_grade >= 70
    good_attendance = attendance >= 80
    
    # Bug: Incorrect precedence and logic
    return passing_grades and good_attendance or \\
           project_complete and passing_grades or \\
           project_complete and good_attendance and min(grades) >= 60

# Test case that should pass but doesn't:
# Good project, decent grades (>= 60), good attendance
print(can_graduate([65, 68, 62], 85, True))`,
      expectedBehavior: "A student with a complete project, good attendance, and no grades below 60 should graduate, but the logic isn't working correctly.",
      bugDescription: "Missing parentheses causing incorrect operator precedence",
      fixes: [
        {
          option: "Add parentheses around OR groups",
          code: "return (passing_grades and good_attendance) or \\\n           (project_complete and passing_grades) or \\\n           (project_complete and good_attendance and min(grades) >= 60)",
          isCorrect: true,
          explanation: "Correct! Parentheses ensure proper evaluation of each graduation path separately."
        },
        {
          option: "Change all ANDs to ORs",
          code: "return passing_grades or good_attendance or project_complete",
          isCorrect: false,
          explanation: "This would make graduation too easy - any single condition would pass."
        },
        {
          option: "Remove the line breaks",
          code: "return passing_grades and good_attendance or project_complete and passing_grades or project_complete and good_attendance and min(grades) >= 60",
          isCorrect: false,
          explanation: "Line breaks aren't the issue - operator precedence is. AND has higher precedence than OR."
        }
      ],
      hint: "AND has higher precedence than OR. Use parentheses to group related conditions that should be evaluated together.",
      points: 300
    },
    {
      id: 6,
      title: "The Bitwise Blunder",
      difficulty: "Senior Detective",
      scenario: "A permission system using bitwise flags is malfunctioning. Users aren't getting the right permissions...",
      buggyCode: `# Permission flags
READ = 1    # 001
WRITE = 2   # 010
DELETE = 4  # 100

def has_permission(user_perms, required_perm):
    # Bug: Using logical AND instead of bitwise AND
    return user_perms and required_perm

def grant_permissions(user_perms, new_perm):
    # Bug: Using logical OR instead of bitwise OR
    return user_perms or new_perm

# Test cases:
user_perms = READ | WRITE  # User has READ and WRITE (3)
print(has_permission(user_perms, READ))    # Should be True
print(has_permission(user_perms, DELETE))  # Should be False

new_perms = grant_permissions(user_perms, DELETE)
print(f"New permissions: {new_perms}")  # Should be 7 (READ|WRITE|DELETE)`,
      expectedBehavior: "Should use bitwise operations for flag manipulation, but logical operations are being used instead.",
      bugDescription: "Using logical operators (and, or) instead of bitwise operators (&, |)",
      fixes: [
        {
          option: "Use bitwise operators",
          code: "return user_perms & required_perm\n# and\nreturn user_perms | new_perm",
          isCorrect: true,
          explanation: "Correct! Bitwise & checks if bits are set, bitwise | combines permission flags."
        },
        {
          option: "Convert to boolean first",
          code: "return bool(user_perms) and bool(required_perm)",
          isCorrect: false,
          explanation: "This loses the specific bit information needed for permission checking."
        },
        {
          option: "Use modulo operation",
          code: "return user_perms % required_perm == 0",
          isCorrect: false,
          explanation: "Modulo doesn't work for bitwise flag checking. We need bitwise operations."
        }
      ],
      hint: "Bitwise operations work on individual bits. Use & to check flags and | to combine flags.",
      points: 350
    }
  ]

  // Game control functions
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

  const selectFix = (fixIndex) => {
    if (showFeedback) return
    setSelectedFix(fixIndex)
  }

  const submitFix = () => {
    if (selectedFix === null) return

    const currentBug = debugCases[currentCase]
    const chosenFix = currentBug.fixes[selectedFix]
    const isCorrect = chosenFix.isCorrect
    
    // Record the answer
    const answerData = {
      caseIndex: currentCase,
      selectedAnswer: selectedFix,
      isCorrect: isCorrect,
      hintsUsed: hintsUsed,
      caseDifficulty: currentBug.difficulty,
      caseTitle: currentBug.title
    }
    setUserAnswers([...userAnswers, answerData])
    
    if (isCorrect) {
      const points = Math.max(50, currentBug.points - (hintsUsed * 25))
      setScore(score + points)
      setBugsFound(bugsFound + 1)
      setGameState('case_solved')
    }
    
    setShowFeedback(true)
    
    setTimeout(() => {
      if (currentCase < debugCases.length - 1) {
        nextCase()
      } else {
        setGameState('completed')
        finishAssessment()
      }
    }, 3000)
  }

  const nextCase = () => {
    setCurrentCase(currentCase + 1)
    setSelectedFix(null)
    setShowFeedback(false)
    setGameState('playing')
    setShowHint(false)
    setHintsUsed(0)
  }

  const resetGame = () => {
    setCurrentCase(0)
    setScore(0)
    setBugsFound(0)
    setGameState('intro')
    setShowInstructions(true)
    setInstructionStep(0)
    setSelectedFix(null)
    setShowFeedback(false)
    setShowHint(false)
    setHintsUsed(0)
    setUserAnswers([])
  }

  const showHintHandler = () => {
    setShowHint(true)
    setHintsUsed(hintsUsed + 1)
  }

  // Calculate final assessment data and call completion handler
  const finishAssessment = () => {
    const totalPossiblePoints = debugCases.reduce((sum, bugCase) => sum + bugCase.points, 0)
    const percentage = Math.round((score / totalPossiblePoints) * 100)
    
    const assessmentData = {
      percentage: percentage,
      score: score,
      totalQuestions: debugCases.length,
      totalPossiblePoints: totalPossiblePoints,
      bugsFixed: bugsFound,
      userAnswers: userAnswers,
      currentAttempt: currentAttempt,
      maxAttempts: maxAttempts
    }

    console.log('Code Detective Assessment completed:', assessmentData)
    
    if (onComplete) {
      onComplete(assessmentData)
    }
  }

  // Render intro/instructions screen
  if (gameState === 'intro' && showInstructions) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
               style={{ background: `linear-gradient(135deg, ${colors.ambez}, ${colors.orangez})` }}>
            <span className="text-3xl">🕵️</span>
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: colors.grayz }}>
            Code Debug Detective Academy
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-xl shadow-lg min-h-32"
          style={{ background: `linear-gradient(135deg, ${colors.white}, ${colors.ambez}10)` }}
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
                  backgroundColor: idx <= instructionStep ? colors.ambez : colors.grayz + "40"
                }}
              />
            ))}
          </div>
          
          <motion.button
            onClick={nextInstruction}
            className="px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
            style={{ backgroundColor: colors.ambez, color: colors.white }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {instructionStep === instructions.length - 1 ? (
              <>Start Investigation! <Search className="h-5 w-5 ml-2 inline" /></>
            ) : (
              <>Next <ArrowRight className="h-5 w-5 ml-2 inline" /></>
            )}
          </motion.button>
        </div>
      </div>
    )
  }

  // Render case solved screen
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
        
        <div className="text-6xl">🔍</div>
        
        <p className="text-lg" style={{ color: colors.grayz }}>
          Excellent detective work! Moving to the next case...
        </p>
      </motion.div>
    )
  }

  // Render completion screen
  if (gameState === 'completed') {
    const accuracy = Math.round((bugsFound / debugCases.length) * 100)
    const totalPossiblePoints = debugCases.reduce((sum, bugCase) => sum + bugCase.points, 0)
    const percentage = Math.round((score / totalPossiblePoints) * 100)
    
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
          Detective Mission Complete! 🎉
        </h2>
        
        {/* Score Circle - showing percentage */}
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg mx-auto"
          style={{
            background: `conic-gradient(${colors.emeraldz} ${percentage * 3.6}deg, ${colors.offwhite} 0deg)`,
            color: colors.emeraldz,
          }}
        >
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
            {percentage}%
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${colors.violetz}20` }}>
            <div className="text-2xl font-bold" style={{ color: colors.violetz }}>{percentage}%</div>
            <div className="text-sm" style={{ color: colors.grayz }}>Final Score</div>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${colors.ambez}20` }}>
            <div className="text-2xl font-bold" style={{ color: colors.ambez }}>{score}</div>
            <div className="text-sm" style={{ color: colors.grayz }}>Points Earned</div>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${colors.emeraldz}20` }}>
            <div className="text-2xl font-bold" style={{ color: colors.emeraldz }}>{bugsFound}</div>
            <div className="text-sm" style={{ color: colors.grayz }}>Bugs Fixed</div>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${colors.cyanz}20` }}>
            <div className="text-2xl font-bold" style={{ color: colors.cyanz }}>{accuracy}%</div>
            <div className="text-sm" style={{ color: colors.grayz }}>Success Rate</div>
          </div>
        </div>

        <div className="p-6 rounded-xl" 
             style={{ backgroundColor: percentage >= 80 ? `${colors.emeraldz}10` : percentage >= 60 ? `${colors.cyanz}10` : `${colors.ambez}10` }}>
          <h3 className="font-bold text-lg mb-2" 
              style={{ color: percentage >= 80 ? colors.emeraldz : percentage >= 60 ? colors.cyanz : colors.ambez }}>
            {percentage >= 80 ? "Master Detective! 🌟" :
             percentage >= 60 ? "Expert Debugger! 🎯" :
             percentage >= 40 ? "Good Detective! 👍" : "Rookie Investigator! 📚"}
          </h3>
          <p className="text-sm" style={{ color: colors.grayz }}>
            {percentage >= 80 ? "Outstanding! You've mastered Boolean debugging with minimal hints and perfect accuracy." :
             percentage >= 60 ? "Excellent work! You show strong debugging skills and understand Boolean logic well." :
             percentage >= 40 ? "Well done! You're developing good debugging instincts and Boolean reasoning." :
             "Good effort! Keep practicing to improve your bug detection and Boolean logic understanding."}
          </p>
        </div>

        {/* Show attempt information */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 mb-2">
            📝 Attempt <strong>{currentAttempt}</strong> of <strong>{maxAttempts}</strong>
          </p>
          <p className="text-xs text-blue-600">
            Score: {score} points out of {totalPossiblePoints} possible ({percentage}%)
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <motion.button
            onClick={resetGame}
            className="px-6 py-3 rounded-lg font-medium transition-all"
            style={{ backgroundColor: colors.cyanz, color: colors.white }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="h-4 w-4 mr-2 inline" />
            Investigate Again
          </motion.button>
        </div>
      </motion.div>
    )
  }

  // Main game interface for playing cases
  const currentBug = debugCases[currentCase]
  
  return (
    <div className="space-y-6">
      {/* Game Stats Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center p-4 rounded-xl" 
        style={{ backgroundColor: `${colors.ambez}20` }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" style={{ color: colors.ambez }} />
            <span className="font-bold" style={{ color: colors.ambez }}>Score: {score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bug className="h-5 w-5" style={{ color: colors.emeraldz }} />
            <span className="font-bold" style={{ color: colors.emeraldz }}>Bugs Fixed: {bugsFound}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full font-bold text-sm"
               style={{ 
                 backgroundColor: currentBug.difficulty === 'Rookie' ? `${colors.emeraldz}20` :
                                  currentBug.difficulty === 'Detective' ? `${colors.ambez}20` : `${colors.coralz}20`,
                 color: currentBug.difficulty === 'Rookie' ? colors.emeraldz :
                        currentBug.difficulty === 'Detective' ? colors.ambez : colors.coralz
               }}>
            {currentBug.difficulty}
          </div>
          <div className="px-3 py-1 rounded-full font-bold"
               style={{ backgroundColor: colors.indigoz, color: colors.white }}>
            Case {currentCase + 1}/{debugCases.length}
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
          🔍 {currentBug.title}
        </h3>
        <p className="text-lg mb-4" style={{ color: colors.grayz }}>
          {currentBug.scenario}
        </p>
      </motion.div>

      {/* Buggy Code Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {/* Code Block */}
        <div className="p-6 rounded-xl shadow-lg border-l-4" 
             style={{ 
               backgroundColor: colors.white,
               borderLeftColor: colors.redz
             }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5" style={{ color: colors.redz }} />
            <span className="font-bold" style={{ color: colors.redz }}>Buggy Code</span>
          </div>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm leading-relaxed" 
               style={{ color: colors.grayz }}>
            {currentBug.buggyCode}
          </pre>
        </div>

        {/* Expected Behavior */}
        <div className="p-4 rounded-xl" 
             style={{ backgroundColor: `${colors.cyanz}10` }}>
          <h4 className="font-bold mb-2" style={{ color: colors.cyanz }}>
            🎯 Expected Behavior:
          </h4>
          <p className="text-sm" style={{ color: colors.grayz }}>
            {currentBug.expectedBehavior}
          </p>
        </div>

        {/* Bug Description */}
        <div className="p-4 rounded-xl" 
             style={{ backgroundColor: `${colors.redz}10` }}>
          <h4 className="font-bold mb-2" style={{ color: colors.redz }}>
            🐛 The Problem:
          </h4>
          <p className="text-sm" style={{ color: colors.grayz }}>
            {currentBug.bugDescription}
          </p>
        </div>
      </motion.div>

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
            <p className="text-sm">{currentBug.hint}</p>
          </div>
        )}
      </motion.div>

      {/* Fix Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h4 className="text-lg font-bold text-center" style={{ color: colors.grayz }}>
          🔧 Choose the Correct Fix:
        </h4>
        
        <div className="space-y-3">
          {currentBug.fixes.map((fix, idx) => {
            const isSelected = selectedFix === idx
            const isCorrectAnswer = showFeedback && fix.isCorrect
            const isWrongAnswer = showFeedback && selectedFix === idx && !fix.isCorrect
            
            return (
              <motion.button
                key={idx}
                onClick={() => selectFix(idx)}
                disabled={showFeedback}
                className="w-full p-4 rounded-xl border-2 transition-all transform hover:scale-102 text-left"
                style={{
                  backgroundColor: isCorrectAnswer ? `${colors.emeraldz}20` : 
                                 isWrongAnswer ? `${colors.coralz}20` :
                                 isSelected ? `${colors.ambez}20` : colors.white,
                  borderColor: isCorrectAnswer ? colors.emeraldz :
                             isWrongAnswer ? colors.coralz :
                             isSelected ? colors.ambez : colors.cyanz,
                  opacity: showFeedback ? (fix.isCorrect ? 1 : 0.7) : 1
                }}
                whileHover={{ scale: showFeedback ? 1 : 1.02 }}
                whileTap={{ scale: showFeedback ? 1 : 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold" style={{ color: colors.grayz }}>
                    Option {idx + 1}: {fix.option}
                  </span>
                  {isCorrectAnswer && <CheckCircle className="h-5 w-5" style={{ color: colors.emeraldz }} />}
                  {isWrongAnswer && <XCircle className="h-5 w-5" style={{ color: colors.coralz }} />}
                </div>
                
                <pre className="bg-gray-100 p-2 rounded text-sm font-mono mb-2" 
                     style={{ color: colors.grayz }}>
                  {fix.code}
                </pre>
                
                {showFeedback && (
                  <p className="text-sm" style={{ color: colors.grayz }}>
                    {fix.explanation}
                  </p>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Submit Button */}
        {selectedFix !== null && !showFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <button
              onClick={submitFix}
              className="px-8 py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
              style={{ backgroundColor: colors.emeraldz, color: colors.white }}
            >
              Submit Fix <Code className="h-5 w-5 ml-2 inline" />
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Progress Bar */}
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
            style={{ backgroundColor: colors.ambez }}
            initial={{ width: 0 }}
            animate={{ width: `${((currentCase + 1) / debugCases.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  )
}

// Main export component
export default function CodeDebugDetectiveGamez({ 
  onComplete, 
  attemptsRemaining = 3, 
  currentAttempt = 1, 
  maxAttempts = 3, 
  studentAssessmentId 
}) {
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto pb-16 px-4 min-h-screen" 
         style={{ background: `linear-gradient(135deg, ${colors.offwhite}, ${colors.ambez}05)` }}>
      <div className="rounded-2xl shadow-xl p-6" style={{ backgroundColor: colors.white }}>
        <CodeDebugDetectiveGame 
          onComplete={onComplete} 
          attemptsRemaining={attemptsRemaining}
          currentAttempt={currentAttempt}
          maxAttempts={maxAttempts}
          studentAssessmentId={studentAssessmentId}
        />
      </div>
    </div>
  )
}