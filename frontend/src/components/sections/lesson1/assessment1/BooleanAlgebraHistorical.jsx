import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Clock, Award, BookOpen, ArrowRight, Info } from "lucide-react"

// Custom color palette
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

export default function HistoricalAssessment({ onComplete }) {
  // Assessment states
  const [currentStep, setCurrentStep] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [isReviewMode, setIsReviewMode] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [timelineVisible, setTimelineVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [showHistoryInfo, setShowHistoryInfo] = useState(false)
  
  useEffect(() => {
    // Show timeline with slight delay for animation effect
    const timer = setTimeout(() => {
      setTimelineVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Reset selected option and feedback when changing steps
  useEffect(() => {
    setSelectedOption(null)
    setShowFeedback(false)
  }, [currentStep])

  // Assessment content structured as a journey
  const assessmentSteps = [
    {
      type: 'intro',
      title: 'The Origins of Boolean Algebra',
      content: 'In this assessment, you will explore the fascinating history of Boolean Algebra, from its philosophical beginnings to its revolutionary impact on modern computing.',
      image: '/api/placeholder/600/300',
      imageAlt: 'Boolean Algebra representation'
    },
    {
      type: 'timelineExploration',
      title: 'Key Moments in Boolean History',
      events: [
        { 
          year: 1854, 
          title: 'An Investigation of the Laws of Thought', 
          description: 'George Boole publishes his groundbreaking work establishing Boolean logic.',
          image: '/api/placeholder/150/150'
        },
        { 
          year: 1938, 
          title: 'Shannon\'s Thesis', 
          description: 'Claude Shannon applies Boolean Algebra to electrical circuits in his Master\'s thesis.',
          image: '/api/placeholder/150/150'
        },
        { 
          year: 1945, 
          title: 'First Electronic Computers', 
          description: 'Boolean logic used in the design of early electronic computers.',
          image: '/api/placeholder/150/150'
        },
        { 
          year: 1970, 
          title: 'Integrated Circuits', 
          description: 'Boolean logic becomes fundamental to building complex integrated circuits.',
          image: '/api/placeholder/150/150'
        },
        { 
          year: 'Today', 
          title: 'Everywhere Computing', 
          description: 'Boolean Algebra powers all modern digital devices and search algorithms.',
          image: '/api/placeholder/150/150'
        }
      ],
      question: 'Which development made Boolean Algebra practical for electrical engineering?',
      options: [
        'George Boole\'s original publication',
        'Claude Shannon\'s application to electrical circuits',
        'The invention of the transistor',
        'The development of search algorithms'
      ],
      correctAnswer: 1,
      explanation: 'Claude Shannon\'s 1938 Master\'s thesis demonstrated how Boolean Algebra could be applied to design and analyze electrical switching circuits, creating the foundation for digital circuit design.'
    },
    {
      type: 'contextMatching',
      title: 'Boolean Algebra in Context',
      description: 'Connect these historical developments with how they relate to Boolean Algebra.',
      pairs: [
        { 
          context: 'Mathematical Logic', 
          booleanRelation: 'Boolean Algebra provided a way to express logical statements mathematically',
          id: 'logic'
        },
        { 
          context: 'Electronic Switching', 
          booleanRelation: 'ON/OFF states in circuits directly map to Boolean 1/0 values',
          id: 'switching'
        },
        { 
          context: 'Computer Programming', 
          booleanRelation: 'IF-THEN statements in code rely on Boolean true/false conditions',
          id: 'programming' 
        },
        { 
          context: 'Search Engines', 
          booleanRelation: 'Search queries use Boolean operators like AND, OR, and NOT',
          id: 'search'
        }
      ],
      question: 'Which historical context was the FIRST to make use of Boolean Algebra?',
      options: ['Mathematical Logic', 'Electronic Switching', 'Computer Programming', 'Search Engines'],
      correctAnswer: 0,
      explanation: 'Boolean Algebra was first developed as a mathematical system to represent logic, years before its applications in electronic switching, programming, or search engines. George Boole created it in the 1850s as a branch of mathematical logic.'
    },
    {
      type: 'applicationSpotting',
      title: 'Boolean Algebra in Everyday Life',
      description: 'Boolean logic is all around us! Can you identify where it appears in these everyday scenarios?',
      scenarios: [
        {
          scenario: 'Using a search engine to find "laptops AND affordable NOT gaming"',
          hasBoolean: true,
          explanation: 'This uses Boolean operators to filter search results'
        },
        {
          scenario: 'A light controlled by two switches that both need to be ON',
          hasBoolean: true,
          explanation: 'This is an AND operation: Light = Switch1 AND Switch2'
        },
        {
          scenario: 'Setting your phone alarm to wake you up at 7:00 AM',
          hasBoolean: false,
          explanation: 'This is a simple time trigger, not a Boolean operation'
        },
        {
          scenario: 'A security system that activates if the door OR window is opened',
          hasBoolean: true,
          explanation: 'This uses the OR operation: Alarm = Door OR Window'
        }
      ],
      question: 'Which scenario does NOT directly use Boolean logic?',
      options: [
        'Search engine filtering',
        'Light controlled by two switches',
        'Setting an alarm clock',
        'Security system activation'
      ],
      correctAnswer: 2,
      explanation: 'Setting an alarm clock for 7:00 AM is just a simple time-based trigger. The clock activates when the time equals 7:00 AM, but it doesn\'t involve evaluating logical conditions like AND, OR, or NOT operations across multiple inputs.'
    },
    {
      type: 'pioneersFocus',
      title: 'Pioneers of Boolean Logic',
      description: 'George Boole transformed logic from philosophy to mathematics, but many others expanded on his work.',
      pioneers: [
        {
          name: 'George Boole',
          contribution: 'Created Boolean Algebra as a system of logical thought',
          years: '1815-1864',
          image: '/api/placeholder/150/150'
        },
        {
          name: 'Claude Shannon',
          contribution: 'Applied Boolean Algebra to electrical circuit design',
          years: '1916-2001',
          image: '/api/placeholder/150/150'
        },
        {
          name: 'John Venn',
          contribution: 'Created Venn diagrams to visualize Boolean operations',
          years: '1834-1923',
          image: '/api/placeholder/150/150'
        }
      ],
      question: 'What was George Boole\'s most significant contribution?',
      options: [
        'Inventing the electronic computer',
        'Creating a mathematical system for logical reasoning',
        'Designing the first electronic circuits',
        'Developing search algorithms'
      ],
      correctAnswer: 1,
      explanation: 'George Boole\'s most significant contribution was creating a mathematical system for logical reasoning, which he published in his 1854 work "An Investigation of the Laws of Thought". This system formed the basis of Boolean Algebra, a way to express logical operations mathematically.'
    },
    {
      type: 'reflection',
      title: 'The Impact of Boolean Algebra',
      description: 'Boolean Algebra\'s journey from abstract mathematics to the foundation of computing represents one of the most impactful mathematical innovations in history.',
      reflectionPoints: [
        'Boolean values (1/0, true/false) are the most fundamental unit of all digital systems',
        'Every decision in programming relies on Boolean conditions',
        'Boolean searching powers how we find information online',
        'Complex computers ultimately operate using millions of simple Boolean operations'
      ],
      question: 'Why is Boolean Algebra considered fundamental to modern computing?',
      options: [
        'It allows computers to perform calculations with very large numbers',
        'It forms the basis of all programming languages',
        'It enables computers to operate using binary (ON/OFF) states',
        'It was the first mathematical system ever developed'
      ],
      correctAnswer: 2,
      explanation: 'Boolean Algebra is fundamental to computing because it enables computers to operate using binary (ON/OFF) states. These binary states, represented as 0s and 1s, are the foundation of all digital systems. Computer hardware like transistors and logic gates implement Boolean operations physically, making complex computing possible.'
    },
    {
      type: 'completion',
      title: 'Assessment Complete!',
      content: 'You\'ve completed your journey through the history and significance of Boolean Algebra.',
    }
  ];

  // Calculate progress percentage
  const progress = ((currentStep + 1) / assessmentSteps.length) * 100
  
  // Get total number of questions (excluding intro and completion steps)
  const totalQuestions = assessmentSteps.filter((step) => step.type !== "intro" && step.type !== "completion").length
  
  // Calculate score
  const score = userAnswers.filter((answer) => answer.isCorrect).length
  
  // Check if current step has a question
  const hasQuestion = useCallback(() => {
    const step = assessmentSteps[currentStep]
    return step.options && step.correctAnswer !== undefined
  }, [currentStep, assessmentSteps])

  // Check if user has already answered the current question
  const hasAnsweredCurrent = useCallback(() => {
    return userAnswers.some((answer) => answer.questionIndex === currentStep)
  }, [currentStep, userAnswers])

  // Get user's answer for the current question
  const getCurrentAnswer = useCallback(() => {
    return userAnswers.find((answer) => answer.questionIndex === currentStep)
  }, [currentStep, userAnswers])

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    if (hasAnsweredCurrent()) return
    setSelectedOption(answerIndex)
  }

  // Show immediate feedback upon selection
  const handleShowFeedback = () => {
    if (selectedOption === null) return
    
    const currentQuestion = assessmentSteps[currentStep]
    const isCorrect = currentQuestion.correctAnswer === selectedOption
    
    // Set feedback message
    if (isCorrect) {
      setFeedbackMessage("Correct! " + currentQuestion.explanation)
    } else {
      setFeedbackMessage(`Not quite. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}. ${currentQuestion.explanation}`)
    }
    
    // Add answer to userAnswers array
    setUserAnswers([
      ...userAnswers,
      {
        questionIndex: currentStep,
        selectedAnswer: selectedOption,
        isCorrect,
      },
    ])
    
    // Show feedback
    setShowFeedback(true)
  }

  // Handle navigation between steps
  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      finishAssessment()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Complete the assessment
  const finishAssessment = () => {
    setIsCompleted(true)
    const finalScore = (score / totalQuestions) * 100
    
    // Call the onComplete callback if provided
    if (onComplete) {
      onComplete(score, totalQuestions, Math.round(finalScore))
    }
    
    console.log("Assessment completed with score:", score, "out of", totalQuestions, ":", Math.round(finalScore) + "%")
  }

  // Toggle review mode
  const toggleReviewMode = () => {
    setIsReviewMode(!isReviewMode)
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
  const Badge = ({ children, variant }) => {
    const baseStyles = "px-2 py-1 text-xs font-semibold rounded-full"
    const variantStyles = variant === "outline" ? "border border-bluez text-bluez" : "bg-bluez text-white"

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
    )
  }

  // Render different content based on step type
  const renderStepContent = () => {
    const step = assessmentSteps[currentStep]
    const currentAnswer = getCurrentAnswer()

    switch (step.type) {
      case "intro":
        return (
          <div className="flex flex-col items-center space-y-6 text-center">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <img
              src={step.image || "/api/placeholder/600/300"}
              alt={step.imageAlt}
              className="rounded-lg shadow-md w-full max-w-2xl"
            />
            <p className="text-lg" style={{ color: colors.grayz }}>
              {step.content}
            </p>
            <Button onClick={handleNext} size="lg" className="mt-6 flex items-center gap-1">
              Begin Journey <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )

      case "timelineExploration":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>

            {/* Interactive Timeline */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="relative pb-8">
                {/* Timeline line */}
                <div
                  className="absolute h-1 top-8 left-0 right-0 z-0"
                  style={{ backgroundColor: colors.lightpurple }}
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
                      <div className="w-4 h-4 rounded-full mb-1" style={{ backgroundColor: colors.darkpurple }}></div>
                      <p className="font-bold text-sm">{event.year}</p>
                      <img
                        src={event.image || "/api/placeholder/150/150"}
                        alt={event.title}
                        className="w-16 h-16 rounded-full my-2 object-cover border-2"
                        style={{ borderColor: colors.bluez }}
                      />
                      <p className="text-xs font-semibold text-center">{event.title}</p>
                      <div
                        className="absolute top-20 opacity-0 group-hover:opacity-100 bg-white p-2 rounded-lg shadow-lg text-xs w-48 text-center transition-opacity z-20"
                        style={{ color: colors.grayz }}
                      >
                        {event.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Year Info Button */}
            <button
              className="mt-2 flex items-center text-xs font-medium gap-1 text-bluez hover:underline"
              onClick={() => setShowHistoryInfo(!showHistoryInfo)}
            >
              <Info className="h-3 w-3" /> Learn more about these events
            </button>
            
            {/* History Information Panel - Shown on Click */}
            {showHistoryInfo && (
              <div className="mt-3 p-4 bg-white rounded-lg shadow-md text-sm" style={{ color: colors.grayz }}>
                <h4 className="font-bold mb-2">Key Historical Facts</h4>
                <ul className="space-y-2">
                  <li>
                    <span className="font-medium">1854:</span> George Boole published "An Investigation of the Laws of Thought", establishing Boolean logic as a mathematical system.
                  </li>
                  <li>
                    <span className="font-medium">1938:</span> Claude Shannon's master's thesis at MIT demonstrated how electrical circuits could implement Boolean operations.
                  </li>
                  <li>
                    <span className="font-medium">1940s:</span> Boolean Algebra became essential in the design of early electronic computers like ENIAC.
                  </li>
                  <li>
                    <span className="font-medium">1970s:</span> The development of integrated circuits made complex Boolean operations possible in increasingly smaller devices.
                  </li>
                </ul>
                <button 
                  className="mt-2 text-bluez hover:underline"
                  onClick={() => setShowHistoryInfo(false)}
                >
                  Close
                </button>
              </div>
            )}

            {/* Question */}
            {renderQuestion(step)}
          </div>
        )

      case "contextMatching":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Context cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.pairs?.map((pair, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                  <h3 className="font-bold" style={{ color: colors.bluez }}>
                    {pair.context}
                  </h3>
                  <p className="text-sm mt-2" style={{ color: colors.grayz }}>
                    {pair.booleanRelation}
                  </p>
                </div>
              ))}
            </div>

            {/* Question */}
            {renderQuestion(step)}
          </div>
        )

      case "applicationSpotting":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Application scenarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.scenarios?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg shadow-md hover:shadow-lg transition-all border-l-4"
                  style={{
                    backgroundColor: colors.white,
                    borderLeftColor: item.hasBoolean ? colors.bluez : colors.grayz,
                  }}
                >
                  <p className="font-medium" style={{ color: colors.grayz }}>
                    {item.scenario}
                  </p>
                  {(isReviewMode || showFeedback) && (
                    <p className="mt-2 text-sm" style={{ color: colors.grayz, opacity: 0.7 }}>
                      {item.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Question */}
            {renderQuestion(step)}
          </div>
        )

      case "pioneersFocus":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Pioneers gallery */}
            <div className="flex flex-wrap justify-center gap-6">
              {step.pioneers?.map((pioneer, idx) => (
                <div
                  key={idx}
                  className="w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  <img
                    src={pioneer.image || "/api/placeholder/150/150"}
                    alt={pioneer.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold" style={{ color: colors.bluez }}>
                      {pioneer.name}
                    </h3>
                    <p className="text-xs text-gray-500">{pioneer.years}</p>
                    <p className="mt-2 text-sm" style={{ color: colors.grayz }}>
                      {pioneer.contribution}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Question */}
            {renderQuestion(step)}
          </div>
        )

      case "reflection":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>

            {/* Reflection points */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: `${colors.lightpurple}30` }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.grayz }}>
                Key Takeaways:
              </h3>
              <ul className="space-y-2">
                {step.reflectionPoints?.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <div
                      className="flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: colors.greenz }}
                    >
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="ml-2" style={{ color: colors.grayz }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Question */}
            {renderQuestion(step)}
          </div>
        )

      case "completion": {
        const finalScore = (score / totalQuestions) * 100

        return (
          <div className="flex flex-col items-center space-y-8 text-center">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>

            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.lightpurple }}
            >
              <span className="text-3xl font-bold" style={{ color: colors.darkpurple }}>
                {Math.round(finalScore)}%
              </span>
            </div>

            <div className="max-w-md">
              <p className="text-lg mb-4" style={{ color: colors.grayz }}>
                {step.content}
              </p>
              <p className="font-semibold" style={{ color: colors.grayz }}>
                You answered {score} out of {totalQuestions} questions correctly.
              </p>

              {finalScore >= 80 ? (
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${colors.greenz}20` }}>
                  <p style={{ color: colors.greenz }}>
                    <strong>Excellent work!</strong> You have a strong understanding of Boolean Algebra's history and significance. 
                    You clearly understand how this mathematical system evolved from abstract theory to the foundation of modern computing.
                  </p>
                </div>
              ) : finalScore >= 60 ? (
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${colors.bluez}20` }}>
                  <p style={{ color: colors.bluez }}>
                    <strong>Good job!</strong> You understand many key aspects of Boolean Algebra's history. 
                    With a bit more study on the pioneers and applications, you'll have a comprehensive understanding of this topic.
                  </p>
                </div>
              ) : (
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${colors.orangez}20` }}>
                  <p style={{ color: colors.orangez }}>
                    <strong>Keep learning!</strong> You might benefit from reviewing the material again to strengthen your understanding.
                    Focus particularly on the timeline of Boolean Algebra's development and how it transitioned from theory to practice.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={toggleReviewMode} variant="outline" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {isReviewMode ? "Hide Review" : "Review Answers"}
              </Button>
              <Button
                onClick={() => {
                    setCurrentStep(0);
                    window.location.reload();
                }}
                variant="outline"
                className="flex items-center gap-2"
                >
                <Clock className="h-4 w-4" />
                Restart Assessment
                </Button>
              <Button className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Continue to Next Topic
              </Button>
            </div>
          </div>
        )
      }

      default:
        return <div>Loading...</div>
    }
  }

  // Render question and answer options
  const renderQuestion = (step) => {
    if (!step.question || !step.options) return null

    const currentAnswer = getCurrentAnswer()
    const answered = hasAnsweredCurrent()

    return (
      <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.offwhite }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: colors.grayz }}>
          {step.question}
        </h3>
        
        <div className="space-y-3">
          {step.options?.map((option, idx) => {
            const isSelected = selectedOption === idx
            const isAnswered = answered
            const isCorrect = isReviewMode && step.correctAnswer === idx
            const isIncorrect = isReviewMode && currentAnswer?.selectedAnswer === idx && !currentAnswer.isCorrect

            let bgColor = colors.white
            let borderColor = "#e5e7eb" // Default gray border

            if (isSelected) {
              bgColor = `${colors.lightpurple}50` // 50% opacity
              borderColor = colors.bluez
            }
            if (isCorrect) {
              bgColor = `${colors.greenz}20` // 20% opacity
              borderColor = colors.greenz
            }
            if (isIncorrect) {
              bgColor = `${colors.redz}20` // 20% opacity
              borderColor = colors.redz
            }

            return (
              <div
                key={idx}
                onClick={() => !isAnswered && handleAnswerSelect(idx)}
                className={`p-3 border rounded-lg transition-all ${
                  isAnswered ? "cursor-default" : "cursor-pointer hover:bg-opacity-50"
                }`}
                style={{
                  backgroundColor: bgColor,
                  borderColor: borderColor,
                  color: colors.grayz,
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isReviewMode && isCorrect && (
                    <CheckCircle className="h-5 w-5" style={{ color: colors.greenz }} />
                  )}
                  {isReviewMode && isIncorrect && <XCircle className="h-5 w-5" style={{ color: colors.redz }} />}
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Feedback area */}
        {showFeedback && (
          <div 
            className="mt-4 p-4 rounded-lg" 
            style={{ 
              backgroundColor: currentAnswer?.isCorrect ? `${colors.greenz}20` : `${colors.redz}20`,
              color: currentAnswer?.isCorrect ? colors.greenz : colors.redz 
            }}
          >
            <p>{feedbackMessage}</p>
          </div>
        )}

        {renderNavigation()}
      </div>
    )
  }

  // Custom progress bar component
  const ProgressBar = ({ value }) => {
    return (
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${value}%`,
            backgroundColor: colors.greenz,
          }}
        ></div>
      </div>
    )
  }

  // Render navigation buttons
  const renderNavigation = () => {
    // Don't show navigation for intro and completion
    if (assessmentSteps[currentStep].type === "intro" || assessmentSteps[currentStep].type === "completion") {
      return null
    }

    const answered = hasAnsweredCurrent()
    const showSubmitButton = hasQuestion() && !answered

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
              backgroundColor: selectedOption === null ? "#ccc" : colors.darkpurple,
              color: colors.white,
            }}
          >
            Submit Answer
          </Button>
        ) : (
          <Button 
            onClick={handleNext} 
            className="flex items-center gap-1"
          >
            {currentStep >= assessmentSteps.length - 2 ? "Complete" : "Next"} <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-16 px-4">
      {/* Progress bar */}
      <div className="p-4 mb-4">
        <ProgressBar value={progress} />
        <div className="flex justify-between mt-2 text-sm" style={{ color: colors.grayz }}>
          <span>
            Step {currentStep + 1} of {assessmentSteps.length}
          </span>
          {isReviewMode && <Badge variant="outline">Review Mode</Badge>}
        </div>
      </div>

      {/* Main content */}
      <div className="rounded-lg shadow-lg p-6" style={{ backgroundColor: colors.white }}>
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
  )
}