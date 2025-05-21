import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Info, AlertCircle } from "lucide-react"

// Use the original colors from the first file
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
}

const TruthTableConstructionAssessment = ({ onComplete }) => {
  // Assessment states
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)

  // Interactive states
  const [selectedVariables, setSelectedVariables] = useState(2)
  const [userTruthTable, setUserTruthTable] = useState({})
  const [highlightCell, setHighlightCell] = useState(null)
  const [showFormula, setShowFormula] = useState(false)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [userRowCalculations, setUserRowCalculations] = useState({})
  const [calculationChecked, setCalculationChecked] = useState(false)

  // Assessment content
  const assessmentSteps = [
    {
      type: "intro",
      title: "Truth Table Construction",
      content:
        "In this assessment, you will learn how to construct truth tables for Boolean expressions. You'll understand the relationship between variables and table size, and build truth tables step by step.",
      image: "/placeholder.svg?height=300&width=600",
      imageAlt: "Truth Table Diagram",
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
      title: "Construct a Complex Truth Table",
      description: "Now let's build a truth table for the expression: (A OR B) AND (NOT C)",
      operationDescription:
        "This expression has two parts: (A OR B) and (NOT C). We'll calculate each part separately, then combine them with the AND operator.",
      table: {
        headers: ["A", "B", "C", "A OR B", "NOT C", "(A OR B) AND (NOT C)"],
        rows: [
          [0, 0, 0, null, null, null],
          [0, 0, 1, null, null, null],
          [0, 1, 0, null, null, null],
          [0, 1, 1, null, null, null],
          [1, 0, 0, null, null, null],
          [1, 0, 1, null, null, null],
          [1, 1, 0, null, null, null],
          [1, 1, 1, null, null, null],
        ],
      },
      correctAnswers: {
        "A OR B": [0, 0, 1, 1, 1, 1, 1, 1],
        "NOT C": [1, 0, 1, 0, 1, 0, 1, 0],
        "(A OR B) AND (NOT C)": [0, 0, 1, 0, 1, 0, 1, 0],
      },
      explanation:
        "For (A OR B) AND (NOT C), we first calculate (A OR B), which is 1 whenever either A or B is 1. Then we calculate (NOT C), which is 1 when C is 0. Finally, we apply the AND operation to these intermediate results.",
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
      content: "You've completed your journey through truth table construction.",
    },
  ]

  // Calculate progress percentage
  const progress = ((currentStep + 1) / assessmentSteps.length) * 100

  // Get total number of questions (excluding intro and completion steps)
  const totalQuestions = assessmentSteps.filter(
    (step) => step.type !== "intro" && step.type !== "completion" && step.question,
  ).length

  // Check if user has already answered current question
  const hasAnsweredCurrent = () => {
    return userAnswers[currentStep] !== undefined
  }

  // Handle answer selection for multiple choice
  const handleAnswerSelect = (answerIndex) => {
    if (hasAnsweredCurrent()) return

    const currentQuestion = assessmentSteps[currentStep]
    const isCorrect = answerIndex === currentQuestion.correctAnswer

    // Update score
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1)
      setFeedbackMessage("Correct! " + currentQuestion.explanation)
    } else {
      setFeedbackMessage("Not quite. " + currentQuestion.explanation)
    }

    // Update user answers
    setUserAnswers({
      ...userAnswers,
      [currentStep]: { answer: answerIndex, isCorrect },
    })

    // Show feedback
    setShowFeedback(true)
  }

  // Handle user input for truth table cells
  const handleTruthTableInput = (rowIndex, columnHeader, value) => {
    setUserTruthTable({
      ...userTruthTable,
      [`${rowIndex}-${columnHeader}`]: Number.parseInt(value),
    })
  }

  // Check truth table answers
  const checkTruthTableAnswers = (tableType) => {
    const step = assessmentSteps[currentStep]
    let isAllCorrect = true
    let correctCount = 0
    let totalCells = 0

    if (tableType === "basic") {
      // Basic table with single column of answers
      for (let i = 0; i < step.table.rows.length; i++) {
        const userAnswer = userTruthTable[`${i}-${step.table.headers[2]}`]
        if (userAnswer === undefined) {
          isAllCorrect = false
          break
        }

        if (userAnswer === step.correctAnswers[i]) {
          correctCount++
        } else {
          isAllCorrect = false
        }
        totalCells++
      }
    } else if (tableType === "complex") {
      // Complex table with multiple columns to fill
      const columnsToCheck = Object.keys(step.correctAnswers)

      for (const column of columnsToCheck) {
        for (let i = 0; i < step.table.rows.length; i++) {
          const userAnswer = userTruthTable[`${i}-${column}`]
          if (userAnswer === undefined) {
            isAllCorrect = false
            break
          }

          if (userAnswer === step.correctAnswers[column][i]) {
            correctCount++
          } else {
            isAllCorrect = false
          }
          totalCells++
        }
      }
    }

    // Calculate partial score (for complex tables)
    const accuracy = correctCount / totalCells

    // Update score and show feedback
    if (isAllCorrect) {
      setScore((prevScore) => prevScore + 1)
      setFeedbackMessage("Perfect! " + step.explanation)
    } else if (accuracy > 0.5) {
      // Partial credit for more than 50% correct
      setScore((prevScore) => prevScore + 0.5)
      setFeedbackMessage("You got some correct, but not all. " + step.explanation)
    } else {
      setFeedbackMessage("Let's review this. " + step.explanation)
    }

    // Update user answers
    setUserAnswers({
      ...userAnswers,
      [currentStep]: { isCorrect: isAllCorrect, accuracy },
    })

    // Show feedback
    setShowFeedback(true)
  }

  // Handle row calculation for the variable selection exercise
  const handleRowCalculation = (variables, value) => {
    setUserRowCalculations({
      ...userRowCalculations,
      [variables]: value,
    })
  }

  // Check if user has answered a specific row calculation
  const hasCalculationAnswer = (variables) => {
    return calculationChecked && userRowCalculations[variables] !== undefined
  }

  // Check if a specific row calculation is correct
  const isCalculationCorrect = (variables) => {
    return Number.parseInt(userRowCalculations[variables]) === Math.pow(2, Number.parseInt(variables))
  }

  // Check all row calculations
  const checkRowCalculations = () => {
    setCalculationChecked(true)
  }

  // Handle navigation between steps
  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setShowFeedback(false)
      setUserTruthTable({})
      setHighlightCell(null)
      setExplanationOpen(false)
      setCalculationChecked(false)
      setUserRowCalculations({})
    } else {
      finishAssessment()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowFeedback(false)
      setUserTruthTable({})
      setHighlightCell(null)
      setExplanationOpen(false)
      setCalculationChecked(false)
      setUserRowCalculations({})
    }
  }

  // Complete the assessment
  const finishAssessment = () => {
    setIsCompleted(true)

    // Calculate final score
    const finalScore = Math.round((score / totalQuestions) * 100)

    // Call the onComplete callback if provided
    if (onComplete) {
      onComplete(score, totalQuestions, finalScore)
    }

    console.log(`Assessment completed with score: ${score}/${totalQuestions} (${finalScore}%)`)
  }

  // Reset and restart assessment
  const handleRestartAssessment = () => {
    setCurrentStep(0)
    setScore(0)
    setUserAnswers({})
    setShowFeedback(false)
    setFeedbackMessage("")
    setIsCompleted(false)
    setUserTruthTable({})
    setHighlightCell(null)
    setSelectedVariables(2)
    setExplanationOpen(false)
    setCalculationChecked(false)
    setUserRowCalculations({})

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Custom Button component
  const Button = ({ children, onClick, disabled, variant, className, size }) => {
    const baseStyles = "rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
    const sizeStyles = size === "lg" ? "px-6 py-3 text-lg" : "px-4 py-2 text-sm"

    let variantStyles = ""
    if (variant === "outline") {
      variantStyles = `border border-${disabled ? "gray-300" : "bluez"} text-${disabled ? "gray-400" : "bluez"} hover:bg-bluez hover:bg-opacity-10`
    } else {
      variantStyles = `bg-${disabled ? "gray-300" : "bluez"} text-white hover:bg-opacity-90`
    }

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className || ""}`}
        style={{
          backgroundColor: disabled ? "#ccc" : variant === "outline" ? "transparent" : colors.bluez,
          color: disabled ? "#888" : variant === "outline" ? colors.bluez : colors.white,
          borderColor: variant === "outline" ? colors.bluez : "transparent",
        }}
      >
        {children}
      </button>
    )
  }

  // Custom Badge component
  const Badge = ({ children, color, className }) => {
    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${className}`}
        style={{
          backgroundColor: `${colors[color]}20`, // 20% opacity
          color: colors[color],
        }}
      >
        {children}
      </span>
    )
  }

  // Function to generate truth table rows based on number of variables
  const generateTruthTableRows = (variables) => {
    const rows = []
    const totalRows = Math.pow(2, variables)

    for (let i = 0; i < totalRows; i++) {
      const row = []
      for (let j = variables - 1; j >= 0; j--) {
        // Calculate bit value (0 or 1) for this position
        const bit = (i >> j) & 1
        row.unshift(bit) // Add to beginning of row
      }
      rows.push(row)
    }

    return rows
  }

  // Progress Bar component
  const ProgressBar = ({ value }) => {
    return (
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${value}%`,
            backgroundColor: colors.greenz,
          }}
        />
      </div>
    )
  }

  // Mathematical formula with superscript
  const Formula = ({ base, exponent }) => {
    return (
      <span className="font-medium">
        {base}
        <sup>{exponent}</sup>
      </span>
    )
  }

  // Explanation panel component
  const ExplanationPanel = ({ title, children, isOpen, onToggle }) => {
    return (
      <div className="bg-offwhite rounded-lg overflow-hidden mt-4">
        <div
          className="p-3 cursor-pointer flex justify-between items-center"
          onClick={onToggle}
          style={{ backgroundColor: `${colors.bluez}20` }}
        >
          <h3 className="font-medium" style={{ color: colors.bluez }}>
            {title}
          </h3>
          <Info className="h-4 w-4" style={{ color: colors.bluez }} />
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
    )
  }

  // Truth Table component
  const TruthTable = ({ headers, rows, editable, onCellChange, highlightCell, correctAnswers }) => {
    const answered = hasAnsweredCurrent()

    return (
      <div className="overflow-x-auto mt-4 mb-6">
        <table className="w-full text-center border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr style={{ backgroundColor: `${colors.bluez}20` }}>
              {headers.map((header, index) => (
                <th key={index} className="p-2 border">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {row.map((cell, cellIndex) => {
                  const isEditable = editable && cell === null
                  const cellHeader = headers[cellIndex]
                  const cellKey = `${rowIndex}-${cellHeader}`
                  const isHighlighted = highlightCell === cellKey
                  const userValue = userTruthTable[cellKey]

                  const cellClass = "p-2 border"
                  const cellStyle = {}

                  if (isHighlighted) {
                    cellStyle.backgroundColor = `${colors.yellowz}30`
                  }

                  // Check if answer is correct (for feedback)
                  let isCorrect = null
                  if (answered && userValue !== undefined && correctAnswers) {
                    if (Array.isArray(correctAnswers)) {
                      isCorrect = userValue === correctAnswers[rowIndex]
                    } else {
                      isCorrect = userValue === correctAnswers[cellHeader][rowIndex]
                    }

                    // Apply styling based on correctness
                    if (isCorrect) {
                      cellStyle.backgroundColor = `${colors.greenz}20`
                    } else {
                      cellStyle.backgroundColor = `${colors.redz}20`
                    }
                  }

                  return (
                    <td key={cellIndex} className={cellClass} style={cellStyle}>
                      {isEditable ? (
                        <select
                          value={userValue || ""}
                          onChange={(e) => onCellChange(rowIndex, cellHeader, e.target.value)}
                          className="w-12 text-center border rounded py-1"
                          disabled={answered}
                        >
                          <option value="">?</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                        </select>
                      ) : cell === "?" ? (
                        "?"
                      ) : (
                        cell
                      )}
                      {answered && isCorrect === false && (
                        <div className="text-xs mt-1" style={{ color: colors.redz }}>
                          Correct:{" "}
                          {Array.isArray(correctAnswers)
                            ? correctAnswers[rowIndex]
                            : correctAnswers[cellHeader][rowIndex]}
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Navigation buttons
  const renderNavigation = () => {
    const isLastStep = currentStep === assessmentSteps.length - 1
    const isFirstStep = currentStep === 0
    const canProceed =
      hasAnsweredCurrent() ||
      assessmentSteps[currentStep].type === "intro" ||
      assessmentSteps[currentStep].type === "completion"

    return (
      <div className="flex justify-between mt-6">
        <Button onClick={handlePrevious} disabled={isFirstStep} variant="outline" className="flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>

        <Button onClick={handleNext} disabled={!canProceed} className="flex items-center">
          {isLastStep ? "Finish" : "Next"} <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    )
  }

  // Render different content based on step type
  const renderStepContent = () => {
    const step = assessmentSteps[currentStep]

    switch (step.type) {
      case "intro":
        return (
          <div className="flex flex-col items-center space-y-6 text-center">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <img
              src={step.image || "/placeholder.svg"}
              alt={step.imageAlt}
              className="rounded-lg shadow-md w-full max-w-2xl"
            />
            <p className="text-lg" style={{ color: colors.grayz }}>
              {step.content}
            </p>
            <Button onClick={handleNext} size="lg" className="mt-6">
              Begin Learning
            </Button>
          </div>
        )

      case "variableExplanation":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Examples table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Examples:</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr style={{ backgroundColor: `${colors.bluez}20` }}>
                      <th className="p-2 border">Number of Variables</th>
                      <th className="p-2 border">Number of Rows</th>
                      <th className="p-2 border">Formula</th>
                    </tr>
                  </thead>
                  <tbody>
                    {step.examples.map((example, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-2 border">{example.variables}</td>
                        <td className="p-2 border">{example.rows}</td>
                        <td className="p-2 border">{example.formula}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${colors.bluez}10` }}>
                <p className="font-medium">Formula: {step.formula}</p>
              </div>
            </div>

            {/* Question */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.offwhite }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.grayz }}>
                {step.question}
              </h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => {
                  const answered = hasAnsweredCurrent()
                  const isSelected = answered ? userAnswers[currentStep]?.answer === idx : false
                  const isCorrect = step.correctAnswer === idx

                  let bgColor = colors.white
                  let borderColor = "#e5e7eb"

                  if (answered && isSelected) {
                    bgColor = userAnswers[currentStep].isCorrect ? `${colors.greenz}20` : `${colors.redz}20`
                    borderColor = userAnswers[currentStep].isCorrect ? colors.greenz : colors.redz
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !answered && handleAnswerSelect(idx)}
                      className={`p-3 border rounded-lg transition-all ${answered ? "cursor-default" : "cursor-pointer hover:bg-opacity-50 hover:bg-bluez hover:bg-opacity-10"}`}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isSelected ? borderColor : "#e5e7eb",
                        color: colors.grayz,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {answered && isSelected && userAnswers[currentStep].isCorrect && (
                          <CheckCircle className="h-5 w-5" style={{ color: colors.greenz }} />
                        )}
                        {answered && isSelected && !userAnswers[currentStep].isCorrect && (
                          <XCircle className="h-5 w-5" style={{ color: colors.redz }} />
                        )}
                        {answered && !isSelected && isCorrect && (
                          <CheckCircle className="h-5 w-5" style={{ color: colors.greenz, opacity: 0.5 }} />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{
                    backgroundColor: userAnswers[currentStep]?.isCorrect ? `${colors.greenz}10` : `${colors.redz}10`,
                    color: userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz,
                  }}
                >
                  <p>{feedbackMessage}</p>
                </div>
              )}

              {renderNavigation()}
            </div>
          </div>
        )

      case "variableSelection":
        // Generate example rows based on selected number of variables
        const rows = generateTruthTableRows(selectedVariables)
        const headers = Array.from({ length: selectedVariables }, (_, i) => String.fromCharCode(65 + i)) // A, B, C, etc.

        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Variable selection */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold mb-2">Select number of variables:</h3>
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        className="px-4 py-2 rounded-lg transition-all"
                        style={{
                          backgroundColor: selectedVariables === num ? colors.bluez : "#e5e7eb",
                          color: selectedVariables === num ? colors.white : colors.grayz,
                        }}
                        onClick={() => setSelectedVariables(num)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4 md:mt-0 p-3 rounded-lg" style={{ backgroundColor: colors.offwhite }}>
                  <div className="text-lg font-bold">Rows needed: {Math.pow(2, selectedVariables)}</div>
                  <div className="text-sm">
                    Formula: 2<sup>{selectedVariables}</sup> = {Math.pow(2, selectedVariables)}
                  </div>
                </div>
              </div>

              {/* Dynamic Truth Table based on variable selection */}
              <div className="mt-6">
                <h3 className="font-bold mb-2">
                  Example Truth Table with {selectedVariables} variable{selectedVariables > 1 ? "s" : ""}:
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr style={{ backgroundColor: `${colors.bluez}20` }}>
                        {headers.map((header, index) => (
                          <th key={index} className="p-2 border">
                            {header}
                          </th>
                        ))}
                        <th className="p-2 border">Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-2 border">
                              {cell}
                            </td>
                          ))}
                          <td className="p-2 border">?</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Visual representation showing the exponential growth */}
              <div className="mt-6">
                <h3 className="font-bold mb-2">Visual Row Growth with Variables:</h3>
                <div className="flex items-end justify-center h-40 space-x-8 mt-4">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex flex-col items-center">
                      <div
                        className="rounded-t-lg flex items-center justify-center text-white font-bold px-3"
                        style={{
                          height: `${Math.min(Math.pow(2, num) * 4, 150)}px`,
                          width: "60px",
                          backgroundColor: colors.bluez,
                          opacity: num <= 3 ? 1 : 0.5,
                        }}
                      >
                        {Math.pow(2, num)}
                      </div>
                      <div className="mt-2 text-center">
                        <div className="font-bold">
                          {num} var{num !== 1 ? "s" : ""}
                        </div>
                        <div className="text-xs">
                          2<sup>{num}</sup> rows
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Warning about keeping tables manageable */}
                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: `${colors.redz}10` }}>
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: colors.redz }} />
                    <p className="text-sm" style={{ color: colors.redz }}>
                      <strong>Note:</strong> As you can see, with 4 variables, we already need 16 rows! For
                      practicality, we'll limit our exercises to a maximum of 3 variables (8 rows).
                    </p>
                  </div>
                </div>

              <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${colors.bluez}10` }}>
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: colors.bluez }} />
                  <p className="text-sm">{step.instructionalText}</p>
                </div>
              </div>
            </div>

            {/* Interactive exercise: Calculate rows needed */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Practice: Row Calculation</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.offwhite }}>
                  <p className="font-medium">Fill in the missing values:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">For 2 variables, rows needed:</label>
                      <input
                        type="number"
                        className="mt-1 p-2 w-full border rounded-md"
                        placeholder="Enter answer"
                        value={userRowCalculations?.["2"] || ""}
                        onChange={(e) => handleRowCalculation("2", e.target.value)}
                        disabled={hasCalculationAnswer("2")}
                      />
                      {hasCalculationAnswer("2") && (
                        <div
                          className="text-sm mt-1"
                          style={{ color: isCalculationCorrect("2") ? colors.greenz : colors.redz }}
                        >
                          {isCalculationCorrect("2") ? "✓ Correct!" : `✗ Incorrect. Answer: ${Math.pow(2, 2)}`}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">For 5 variables, rows needed:</label>
                      <input
                        type="number"
                        className="mt-1 p-2 w-full border rounded-md"
                        placeholder="Enter answer"
                        value={userRowCalculations?.["5"] || ""}
                        onChange={(e) => handleRowCalculation("5", e.target.value)}
                        disabled={hasCalculationAnswer("5")}
                      />
                      {hasCalculationAnswer("5") && (
                        <div
                          className="text-sm mt-1"
                          style={{ color: isCalculationCorrect("5") ? colors.greenz : colors.redz }}
                        >
                          {isCalculationCorrect("5") ? "✓ Correct!" : `✗ Incorrect. Answer: ${Math.pow(2, 5)}`}
                        </div>
                      )}
                    </div>
                  </div>
                  {!hasCalculationAnswer("2") || !hasCalculationAnswer("5") ? (
                    <button
                      className="mt-4 px-4 py-2 rounded-lg text-white"
                      style={{ backgroundColor: colors.bluez }}
                      onClick={checkRowCalculations}
                    >
                      Check Answers
                    </button>
                  ) : (
                    <div
                      className="mt-4 p-3 rounded-lg"
                      style={{ backgroundColor: `${colors.greenz}10`, color: colors.greenz }}
                    >
                      <p>Great! You understand how to calculate the number of rows needed based on variables.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.offwhite }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.grayz }}>
                {step.question}
              </h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => {
                  const answered = hasAnsweredCurrent()
                  const isSelected = answered ? userAnswers[currentStep]?.answer === idx : false
                  const isCorrect = step.correctAnswer === idx

                  let bgColor = colors.white
                  let borderColor = "#e5e7eb"

                  if (answered && isSelected) {
                    bgColor = userAnswers[currentStep].isCorrect ? `${colors.greenz}20` : `${colors.redz}20`
                    borderColor = userAnswers[currentStep].isCorrect ? colors.greenz : colors.redz
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !answered && handleAnswerSelect(idx)}
                      className={`p-3 border rounded-lg transition-all ${answered ? "cursor-default" : "cursor-pointer hover:bg-opacity-50 hover:bg-bluez hover:bg-opacity-10"}`}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isSelected ? borderColor : "#e5e7eb",
                        color: colors.grayz,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {answered && isSelected && userAnswers[currentStep].isCorrect && (
                          <CheckCircle className="h-5 w-5" style={{ color: colors.greenz }} />
                        )}
                        {answered && isSelected && !userAnswers[currentStep].isCorrect && (
                          <XCircle className="h-5 w-5" style={{ color: colors.redz }} />
                        )}
                        {answered && !isSelected && isCorrect && (
                          <CheckCircle className="h-5 w-5" style={{ color: colors.greenz, opacity: 0.5 }} />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{
                    backgroundColor: userAnswers[currentStep]?.isCorrect ? `${colors.greenz}10` : `${colors.redz}10`,
                    color: userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz,
                  }}
                >
                  <p>{feedbackMessage}</p>
                </div>
              )}

              {renderNavigation()}
            </div>
          </div>
          </div>
        )

      case "tableConstruction":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: `${colors.bluez}10` }}>
                <h3 className="font-bold mb-2">Operation: AND</h3>
                <p>{step.operationDescription}</p>
              </div>

              <h3 className="text-lg font-bold mb-2">Complete the Truth Table:</h3>
              <p className="mb-4">Fill in the values for the "A AND B" column:</p>

              <TruthTable
                headers={step.table.headers}
                rows={step.table.rows}
                editable={true}
                onCellChange={handleTruthTableInput}
                highlightCell={highlightCell}
                correctAnswers={step.correctAnswers}
              />

              {!hasAnsweredCurrent() && (
                <Button onClick={() => checkTruthTableAnswers("basic")} className="mt-4">
                  Check Answers
                </Button>
              )}

              {/* Explanation toggle */}
              <ExplanationPanel
                title="Need help? Click for explanation"
                isOpen={explanationOpen}
                onToggle={() => setExplanationOpen(!explanationOpen)}
              >
                <p>The AND operation returns 1 (true) only when both inputs are 1 (true).</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>0 AND 0 = 0 (false AND false = false)</li>
                  <li>0 AND 1 = 0 (false AND true = false)</li>
                  <li>1 AND 0 = 0 (true AND false = false)</li>
                  <li>1 AND 1 = 1 (true AND true = true)</li>
                </ul>
              </ExplanationPanel>

              {/* Feedback */}
              {showFeedback && (
                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{
                    backgroundColor: userAnswers[currentStep]?.isCorrect ? `${colors.greenz}10` : `${colors.redz}10`,
                    color: userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz,
                  }}
                >
                  <p>{feedbackMessage}</p>
                </div>
              )}
            </div>

            {renderNavigation()}
          </div>
        )

      case "intermediateColumnsExplanation":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Expression: {step.expression}</h3>

              <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: colors.offwhite }}>
                <h4 className="font-bold mb-2">Step-by-Step Approach:</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  {step.steps.map((stepItem, index) => (
                    <li key={index}>{stepItem}</li>
                  ))}
                </ol>
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-2">Visual Example:</h4>
                <img
                  src={step.imageUrl || "/placeholder.svg?height=300&width=600"}
                  alt="Truth table with intermediate columns"
                  className="rounded-lg shadow-sm w-full max-w-2xl mx-auto"
                />
              </div>

              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${colors.bluez}10` }}>
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: colors.bluez }} />
                  <p>
                    <strong>Key Insight:</strong> Breaking down complex expressions into intermediate steps makes truth
                    tables easier to construct and understand. Each intermediate column represents a sub-expression.
                  </p>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.offwhite }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.grayz }}>
                {step.question}
              </h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => {
                  const answered = hasAnsweredCurrent()
                  const isSelected = answered ? userAnswers[currentStep]?.answer === idx : false
                  const isCorrect = step.correctAnswer === idx

                  let bgColor = colors.white
                  let borderColor = "#e5e7eb"

                  if (answered && isSelected) {
                    bgColor = userAnswers[currentStep].isCorrect ? `${colors.greenz}20` : `${colors.redz}20`
                    borderColor = userAnswers[currentStep].isCorrect ? colors.greenz : colors.redz
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !answered && handleAnswerSelect(idx)}
                      className={`p-3 border rounded-lg transition-all ${answered ? "cursor-default" : "cursor-pointer hover:bg-opacity-50 hover:bg-bluez hover:bg-opacity-10"}`}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isSelected ? borderColor : "#e5e7eb",
                        color: colors.grayz,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {answered && isSelected && userAnswers[currentStep].isCorrect && (
                          <CheckCircle className="h-5 w-5" style={{ color: colors.greenz }} />
                        )}
                        {answered && isSelected && !userAnswers[currentStep].isCorrect && (
                          <XCircle className="h-5 w-5" style={{ color: colors.redz }} />
                        )}
                        {answered && !isSelected && isCorrect && (
                          <CheckCircle className="h-5 w-5" style={{ color: colors.greenz, opacity: 0.5 }} />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{
                    backgroundColor: userAnswers[currentStep]?.isCorrect ? `${colors.greenz}10` : `${colors.redz}10`,
                    color: userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz,
                  }}
                >
                  <p>{feedbackMessage}</p>
                </div>
              )}

              {renderNavigation()}
            </div>
          </div>
        )

      case "complexTableConstruction":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: `${colors.bluez}10` }}>
                <h3 className="font-bold mb-2">Expression: {step.expression}</h3>
                <p>{step.operationDescription}</p>
              </div>

              <h3 className="text-lg font-bold mb-2">Complete the Truth Table:</h3>
              <p className="mb-4">Fill in the values for each intermediate column, then the final result:</p>

              <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: `${colors.yellowz}10` }}>
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: colors.yellowz }} />
                  <p className="text-sm">
                    <strong>Tip:</strong> Work from left to right. First calculate "A OR B" for each row, then "NOT C", 
                    and finally combine them with AND to get the final result.
                  </p>
                </div>
              </div>

              <TruthTable
                headers={step.table.headers}
                rows={step.table.rows}
                editable={true}
                onCellChange={handleTruthTableInput}
                highlightCell={highlightCell}
                correctAnswers={step.correctAnswers}
              />

              {!hasAnsweredCurrent() && (
                <Button onClick={() => checkTruthTableAnswers("complex")} className="mt-4">
                  Check Answers
                </Button>
              )}

              {/* Explanation toggle */}
              <ExplanationPanel
                title="Need help? Click for explanation"
                isOpen={explanationOpen}
                onToggle={() => setExplanationOpen(!explanationOpen)}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold">A OR B:</h4>
                    <p>The OR operation returns 1 (true) when at least one input is 1 (true).</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>0 OR 0 = 0 (false OR false = false)</li>
                      <li>0 OR 1 = 1 (false OR true = true)</li>
                      <li>1 OR 0 = 1 (true OR false = true)</li>
                      <li>1 OR 1 = 1 (true OR true = true)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold">NOT C:</h4>
                    <p>The NOT operation inverts the input.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>NOT 0 = 1 (not false = true)</li>
                      <li>NOT 1 = 0 (not true = false)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold">(A OR B) AND (NOT C):</h4>
                    <p>The AND operation returns 1 (true) only when both inputs are 1 (true).</p>
                    <p>Use the values from the intermediate columns to calculate this final result.</p>
                  </div>
                </div>
              </ExplanationPanel>

              {/* Feedback */}
              {showFeedback && (
                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{
                    backgroundColor: userAnswers[currentStep]?.isCorrect ? `${colors.greenz}10` : `${colors.redz}10`,
                    color: userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz,
                  }}
                >
                  <p>{feedbackMessage}</p>
                  {!userAnswers[currentStep]?.isCorrect && (
                    <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: `${colors.offwhite}` }}>
                      <p className="font-bold mb-2">Review the correct answers:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>A OR B: 1 when either A or B (or both) is 1</li>
                        <li>NOT C: 1 when C is 0, and 0 when C is 1</li>
                        <li>(A OR B) AND (NOT C): 1 only when both (A OR B) AND (NOT C) are 1</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {renderNavigation()}
          </div>
        )

      case "equivalenceChallenge":
      case "realWorldApplication":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {step.scenario && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2">Scenario:</h3>
                <p>{step.scenario}</p>
              </div>
            )}

            {/* Question */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.offwhite }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.grayz }}>
                {step.question}
              </h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => {
                  const answered = hasAnsweredCurrent()
                  const isSelected = answered ? userAnswers[currentStep]?.answer === idx : false
                  const isCorrect = step.correctAnswer === idx

                  let bgColor = colors.white
                  let borderColor = "#e5e7eb"

                  if (answered && isSelected) {
                    bgColor = userAnswers[currentStep].isCorrect ? `${colors.greenz}20` : `${colors.redz}20`
                    borderColor = userAnswers[currentStep].isCorrect ? colors.greenz : colors.redz
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !answered && handleAnswerSelect(idx)}
                      className={`p-3 border rounded-lg transition-all ${answered ? "cursor-default" : "cursor-pointer hover:bg-opacity-50 hover:bg-bluez hover:bg-opacity-10"}`}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isSelected ? borderColor : "#e5e7eb",
                        color: colors.grayz,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {answered && isSelected && userAnswers[currentStep].isCorrect && (
                          <CheckCircle className="h-5 w-5" style={{ color: colors.greenz }} />
                        )}
                        {answered && isSelected && !userAnswers[currentStep].isCorrect && (
                          <XCircle className="h-5 w-5" style={{ color: colors.redz }} />
                        )}
                        {answered && !isSelected && isCorrect && (
                          <CheckCircle className="h-5 w-5" style={{ color: colors.greenz, opacity: 0.5 }} />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{
                    backgroundColor: userAnswers[currentStep]?.isCorrect ? `${colors.greenz}10` : `${colors.redz}10`,
                    color: userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz,
                  }}
                >
                  <p>{feedbackMessage}</p>
                </div>
              )}

              {renderNavigation()}
            </div>
          </div>
        )

      case "completion":
        // Calculate final score
        {const finalScore = Math.round((score / totalQuestions) * 100)

        return (
          <div className="flex flex-col items-center space-y-6 text-center">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>

            <div
              className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold"
              style={{
                backgroundColor: `${colors.bluez}20`,
                color: colors.bluez,
              }}
            >
              {finalScore}%
            </div>

            <p className="text-lg" style={{ color: colors.grayz }}>
              {step.content}
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Your Results:</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Questions Answered:</span>
                  <span className="font-bold">
                    {Object.keys(userAnswers).length} / {totalQuestions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Correct Answers:</span>
                  <span className="font-bold">
                    {score} / {totalQuestions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Final Score:</span>
                  <span className="font-bold">{finalScore}%</span>
                </div>
              </div>

              <div
                className="mt-6 p-4 rounded-lg"
                style={{
                  backgroundColor: finalScore >= 70 ? `${colors.greenz}10` : `${colors.yellowz}10`,
                  color: finalScore >= 70 ? colors.greenz : colors.yellowz,
                }}
              >
                <p className="font-bold">
                  {finalScore >= 90
                    ? "Excellent!"
                    : finalScore >= 70
                      ? "Good job!"
                      : finalScore >= 50
                        ? "Nice effort!"
                        : "Keep practicing!"}
                </p>
                <p className="text-sm mt-1">
                  {finalScore >= 90
                    ? "You have mastered truth table construction!"
                    : finalScore >= 70
                      ? "You have a good understanding of truth tables."
                      : finalScore >= 50
                        ? "You're on the right track with truth tables."
                        : "Truth tables take practice. Try again to improve your score."}
                </p>
              </div>
            </div>

            <Button onClick={handleRestartAssessment} size="lg" className="mt-6">
              Restart Assessment
            </Button>
          </div>
        )
    }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Progress bar and step indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">
            Step {currentStep + 1} of {assessmentSteps.length}
          </div>
          <div className="text-sm font-medium">
            Score: {score} / {totalQuestions}
          </div>
        </div>
        <ProgressBar value={progress} />
      </div>

      {/* Main content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">{renderStepContent()}</div>
      </div>
    </div>
  )
}
export default TruthTableConstructionAssessment