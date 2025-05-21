import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, RotateCcw, Info, Clock, HelpCircle } from 'lucide-react';

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
};

const LogicGateExplorer = ({ onComplete }) => {
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
  const [showTruthTable, setShowTruthTable] = useState(false);
  const [userTruthTable, setUserTruthTable] = useState({});
  const [selectedCircuitParts, setSelectedCircuitParts] = useState([]);
  const [hintVisible, setHintVisible] = useState(false);

  // Assessment content
  const assessmentSteps = [
    {
      type: 'intro',
      title: 'Logic Gate Explorer',
      content: 'In this assessment, you will explore logic gates, truth tables, and Boolean operators. You\'ll test your understanding of how these fundamental elements work and apply them to solve problems.',
      image: '/api/placeholder/600/300'
    },
    {
      type: 'gateExplorer',
      title: 'Understanding Logic Gates',
      description: 'Select each gate to learn how it works with different inputs. Try changing the inputs to see how the output changes.',
      gates: [
        { 
          name: 'AND', 
          symbol: '∧', 
          description: 'Returns 1 only if both inputs are 1.',
          truthTable: [
            { a: 0, b: 0, output: 0 },
            { a: 0, b: 1, output: 0 },
            { a: 1, b: 0, output: 0 },
            { a: 1, b: 1, output: 1 }
          ]
        },
        { 
          name: 'OR', 
          symbol: '∨', 
          description: 'Returns 1 if at least one input is 1.',
          truthTable: [
            { a: 0, b: 0, output: 0 },
            { a: 0, b: 1, output: 1 },
            { a: 1, b: 0, output: 1 },
            { a: 1, b: 1, output: 1 }
          ]
        },
        { 
          name: 'NOT', 
          symbol: '¬', 
          description: 'Flips the input value.',
          truthTable: [
            { a: 0, output: 1 },
            { a: 1, output: 0 }
          ]
        },
        { 
          name: 'NAND', 
          symbol: '↑', 
          description: 'Opposite of AND. Returns 0 only when both inputs are 1.',
          truthTable: [
            { a: 0, b: 0, output: 1 },
            { a: 0, b: 1, output: 1 },
            { a: 1, b: 0, output: 1 },
            { a: 1, b: 1, output: 0 }
          ]
        },
        { 
          name: 'NOR', 
          symbol: '↓', 
          description: 'Opposite of OR. Returns 1 only when both inputs are 0.',
          truthTable: [
            { a: 0, b: 0, output: 1 },
            { a: 0, b: 1, output: 0 },
            { a: 1, b: 0, output: 0 },
            { a: 1, b: 1, output: 0 }
          ]
        },
        { 
          name: 'XOR', 
          symbol: '⊕', 
          description: 'Returns 1 only if inputs are different.',
          truthTable: [
            { a: 0, b: 0, output: 0 },
            { a: 0, b: 1, output: 1 },
            { a: 1, b: 0, output: 1 },
            { a: 1, b: 1, output: 0 }
          ]
        },
        { 
          name: 'XNOR', 
          symbol: '⊙', 
          description: 'Returns 1 if inputs are the same.',
          truthTable: [
            { a: 0, b: 0, output: 1 },
            { a: 0, b: 1, output: 0 },
            { a: 1, b: 0, output: 0 },
            { a: 1, b: 1, output: 1 }
          ]
        }
      ],
      question: 'Which gate outputs TRUE only when exactly one input is TRUE?',
      options: ['AND Gate', 'OR Gate', 'NAND Gate', 'XOR Gate'],
      correctAnswer: 3,
      explanation: 'The XOR (Exclusive OR) gate outputs TRUE (1) only when exactly one input is TRUE and the other is FALSE. In other words, it outputs TRUE when the inputs are different from each other.'
    },
    {
      type: 'truthTableChallenge',
      title: 'Truth Table Challenge',
      description: 'Complete the truth table for the given expression.',
      expression: 'A AND (NOT B)',
      question: 'Fill in the missing values in the truth table for A AND (NOT B)',
      truthTable: [
        { a: 0, b: 0, result: '?' },
        { a: 0, b: 1, result: '?' },
        { a: 1, b: 0, result: '?' },
        { a: 1, b: 1, result: '?' }
      ],
      correctAnswers: [0, 0, 1, 0],
      explanation: 'For A AND (NOT B), we first calculate NOT B (which is 1 when B is 0, and 0 when B is 1), then we perform A AND (NOT B). This is only true when A is 1 AND B is 0.'
    },
    {
      type: 'logicGateMatching',
      title: 'Match Logic Gates to Truth Tables',
      description: 'Match each truth table to the correct logic gate it represents.',
      truthTables: [
        { 
          id: 1,
          values: [
            { a: 0, b: 0, output: 0 },
            { a: 0, b: 1, output: 0 },
            { a: 1, b: 0, output: 0 },
            { a: 1, b: 1, output: 1 }
          ],
          gateName: 'AND'
        },
        { 
          id: 2,
          values: [
            { a: 0, b: 0, output: 0 },
            { a: 0, b: 1, output: 1 },
            { a: 1, b: 0, output: 1 },
            { a: 1, b: 1, output: 0 }
          ],
          gateName: 'XOR'
        },
        { 
          id: 3,
          values: [
            { a: 0, b: 0, output: 1 },
            { a: 0, b: 1, output: 0 },
            { a: 1, b: 0, output: 0 },
            { a: 1, b: 1, output: 0 }
          ],
          gateName: 'NOR'
        }
      ],
      options: ['AND', 'OR', 'NAND', 'NOR', 'XOR', 'XNOR'],
      question: 'Match each truth table to the correct logic gate.',
      correctAnswers: {
        '1': 'AND',
        '2': 'XOR',
        '3': 'NOR'
      },
      explanation: 'Each logic gate has a unique truth table that defines its behavior across all possible input combinations.'
    },
    {
      type: 'simpleCircuitBuilder',
      title: 'Simple Circuit Challenge',
      description: 'Build a circuit to satisfy the given truth table using the available gates.',
      targetTruthTable: [
        { a: 0, b: 0, output: 1 },
        { a: 0, b: 1, output: 1 },
        { a: 1, b: 0, output: 1 },
        { a: 1, b: 1, output: 0 }
      ],
      availableGates: ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'],
      question: 'Which gate produces the output shown in the truth table?',
      options: ['AND Gate', 'NAND Gate', 'XOR Gate', 'XNOR Gate'],
      correctAnswer: 1,
      hint: 'Look at when the output is 0 - only in one specific case. Which gate behaves this way?',
      explanation: 'The NAND gate outputs 0 only when both inputs are 1, and outputs 1 for all other input combinations. This matches exactly with the target truth table.'
    },
    {
      type: 'realWorldLogic',
      title: 'Real-World Logic Applications',
      description: 'Translate real-world scenarios into Boolean expressions.',
      scenarios: [
        {
          id: 1,
          scenario: 'A light that turns on when either of two switches is flipped on.',
          expression: 'Switch1 OR Switch2',
          gates: ['OR']
        },
        {
          id: 2,
          scenario: 'A security door that opens only when a correct card is scanned AND the correct PIN is entered.',
          expression: 'Card AND PIN',
          gates: ['AND']
        },
        {
          id: 3,
          scenario: 'An alarm system that activates when a window breaks OR the door opens, BUT only when the system is armed.',
          expression: '(Window OR Door) AND Armed',
          gates: ['OR', 'AND']
        }
      ],
      question: 'Which Boolean expression correctly represents: "A sprinkler system that activates when it\'s hot AND dry, UNLESS it\'s nighttime"?',
      options: [
        '(Hot OR Dry) AND NOT Nighttime',
        '(Hot AND Dry) OR Nighttime',
        '(Hot AND Dry) AND NOT Nighttime',
        'Hot OR (Dry AND Nighttime)'
      ],
      correctAnswer: 2,
      explanation: 'For the sprinkler to activate, it must be both hot AND dry (requiring the AND operator), but it should not activate at night (requiring the NOT operator). The expression (Hot AND Dry) AND NOT Nighttime captures this logic.'
    },
    {
      type: 'completion',
      title: 'Assessment Complete!',
      content: 'You\'ve completed your journey through logic gates and Boolean operations.',
    }
  ];

  // Calculate progress percentage
  const progress = ((currentStep + 1) / assessmentSteps.length) * 100;

  // Get total number of questions (excluding intro and completion steps)
  const totalQuestions = assessmentSteps.filter(step => 
    step.type !== 'intro' && step.type !== 'completion'
  ).length;

  // Check if user has already answered current question
  const hasAnsweredCurrent = () => {
    return userAnswers[currentStep] !== undefined;
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    if (hasAnsweredCurrent()) return;
    
    const currentQuestion = assessmentSteps[currentStep];
    const isCorrect = 
      (Array.isArray(answer) && answer.every((a, i) => a === currentQuestion.correctAnswers[i])) ||
      (typeof answer === 'object' && Object.keys(answer).every(key => answer[key] === currentQuestion.correctAnswers[key])) ||
      answer === currentQuestion.correctAnswer;
    
    // Update score
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedbackMessage("Correct! " + currentQuestion.explanation);
    } else {
      setFeedbackMessage("Not quite. " + currentQuestion.explanation);
    }
    
    // Update user answers
    setUserAnswers({
      ...userAnswers,
      [currentStep]: { answer, isCorrect }
    });
    
    // Show feedback
    setShowFeedback(true);
  };
  
  // Handle submitting truth table answers
  const handleTruthTableSubmit = () => {
    const currentQuestion = assessmentSteps[currentStep];
    const userValues = Object.values(userTruthTable);
    
    if (userValues.length !== currentQuestion.correctAnswers.length) {
      setFeedbackMessage("Please complete all cells in the truth table.");
      return;
    }
    
    const isCorrect = userValues.every((value, index) => 
      parseInt(value) === currentQuestion.correctAnswers[index]
    );
    
    // Update score and show feedback
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedbackMessage("Correct! " + currentQuestion.explanation);
    } else {
      setFeedbackMessage("Not quite. " + currentQuestion.explanation);
    }
    
    // Update user answers
    setUserAnswers({
      ...userAnswers,
      [currentStep]: { answer: userValues, isCorrect }
    });
    
    // Show feedback
    setShowFeedback(true);
  };
  
  // Handle matching answers
  const handleMatchingSubmit = (matches) => {
    const currentQuestion = assessmentSteps[currentStep];
    const correctMatches = currentQuestion.correctAnswers;
    
    const isCorrect = Object.keys(matches).every(key => 
      matches[key] === correctMatches[key]
    );
    
    // Update score and show feedback
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedbackMessage("Correct! " + currentQuestion.explanation);
    } else {
      setFeedbackMessage("Not quite. " + currentQuestion.explanation);
    }
    
    // Update user answers
    setUserAnswers({
      ...userAnswers,
      [currentStep]: { answer: matches, isCorrect }
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

  // Complete the assessment
  const finishAssessment = () => {
    setIsCompleted(true);
    
    // Calculate final score
    const finalScore = Math.round((score / totalQuestions) * 100);
    
    // Call the onComplete callback if provided
    if (onComplete) {
      onComplete(score, totalQuestions, finalScore);
    }
    
    console.log(`Assessment completed with score: ${score}/${totalQuestions} (${finalScore}%)`);
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
    setShowTruthTable(false);
    setUserTruthTable({});
    setSelectedCircuitParts([]);
    setHintVisible(false);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Custom Button component
  const Button = ({ children, onClick, disabled, variant, className, size }) => {
    const baseStyles = "rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
    const sizeStyles = size === "lg" ? "px-6 py-3 text-lg" : "px-4 py-2 text-sm";

    let variantStyles = "";
    if (variant === "outline") {
      variantStyles = `border border-${disabled ? "gray-300" : "bluez"} text-${disabled ? "gray-400" : "bluez"} hover:bg-bluez hover:bg-opacity-10`;
    } else {
      variantStyles = `bg-${disabled ? "gray-300" : "bluez"} text-white hover:bg-opacity-90`;
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
    );
  };

  // Logic Gate component
  const LogicGate = ({ name, symbol, selected, onClick }) => {
    return (
      <div 
        className={`p-4 border-2 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${selected ? 'border-bluez bg-bluez bg-opacity-10' : 'border-gray-200'}`}
        onClick={onClick}
      >
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold" style={{ color: colors.grayz }}>{name}</div>
          <div className="text-3xl my-2" style={{ color: colors.darkpurple }}>{symbol}</div>
        </div>
      </div>
    );
  };

  // Truth Table component
  const TruthTable = ({ data, isEditable, onChange }) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">A</th>
              {data[0].hasOwnProperty('b') && <th className="p-2 border">B</th>}
              <th className="p-2 border">Output</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 border">{row.a}</td>
                {row.hasOwnProperty('b') && <td className="p-2 border">{row.b}</td>}
                <td className="p-2 border">
                  {isEditable ? (
                    <div className="flex justify-center">
                      <select 
                        value={onChange && userTruthTable[rowIndex] ? userTruthTable[rowIndex] : ''} 
                        onChange={(e) => onChange && onChange(rowIndex, e.target.value)}
                        className="w-12 text-center border rounded"
                      >
                        <option value="">?</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                      </select>
                    </div>
                  ) : (
                    row.output || row.result
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Gate Output Calculator
  const calculateOutput = (gate, a, b = null) => {
    switch (gate) {
      case 'AND':
        return a && b ? 1 : 0;
      case 'OR':
        return a || b ? 1 : 0;
      case 'NOT':
        return a ? 0 : 1;
      case 'NAND':
        return a && b ? 0 : 1;
      case 'NOR':
        return a || b ? 0 : 1;
      case 'XOR':
        return a !== b ? 1 : 0;
      case 'XNOR':
        return a === b ? 1 : 0;
      default:
        return null;
    }
  };

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
    );
  };

  // Custom Badge component
  const Badge = ({ children, color, className }) => {
    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${className}`}
        style={{
          backgroundColor: `${colors[color]}20`, // 20% opacity
          color: colors[color]
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
      case 'intro':
        return (
          <div className="flex flex-col items-center space-y-6 text-center">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <img
              src={step.image}
              alt="Logic Gates"
              className="rounded-lg shadow-md w-full max-w-2xl"
            />
            <p className="text-lg" style={{ color: colors.grayz }}>
              {step.content}
            </p>
            <Button onClick={handleNext} size="lg" className="mt-6">
              Begin Exploration
            </Button>
          </div>
        );

      case 'gateExplorer':
        const gate = selectedGate ? step.gates.find(g => g.name === selectedGate) : null;
        const output = gate ? calculateOutput(gate.name, inputA, inputB) : null;
        
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>
            
            {/* Gates selection */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {step.gates.map((g) => (
                <LogicGate
                  key={g.name}
                  name={g.name}
                  symbol={g.symbol}
                  selected={selectedGate === g.name}
                  onClick={() => {
                    setSelectedGate(g.name);
                    setShowTruthTable(false);
                  }}
                />
              ))}
            </div>
            
            {/* Interactive Logic Gate Simulator */}
            {selectedGate && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold" style={{ color: colors.bluez }}>{selectedGate} Gate</h3>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowTruthTable(!showTruthTable)}
                    className="text-sm"
                  >
                    {showTruthTable ? "Hide Truth Table" : "Show Truth Table"}
                  </Button>
                </div>
                
                <p className="mb-4">{gate?.description}</p>
                
                <div className="flex flex-col sm:flex-row justify-around items-center space-y-4 sm:space-y-0">
                  <div className="flex flex-col items-center">
                    <p className="font-medium mb-2">Inputs</p>
                    {/* Input A */}
                    <div className="mb-4">
                      <span className="mr-2 font-bold">A:</span>
                      <div className="inline-flex">
                        <button
                          className={`px-4 py-2 rounded-l-lg ${inputA === 0 ? 'bg-bluez text-white' : 'bg-gray-200'}`}
                          onClick={() => setInputA(0)}
                        >
                          0
                        </button>
                        <button
                          className={`px-4 py-2 rounded-r-lg ${inputA === 1 ? 'bg-bluez text-white' : 'bg-gray-200'}`}
                          onClick={() => setInputA(1)}
                        >
                          1
                        </button>
                      </div>
                    </div>
                    
                    {/* Input B - only shown for gates that need 2 inputs */}
                    {selectedGate !== 'NOT' && (
                      <div>
                        <span className="mr-2 font-bold">B:</span>
                        <div className="inline-flex">
                          <button
                            className={`px-4 py-2 rounded-l-lg ${inputB === 0 ? 'bg-bluez text-white' : 'bg-gray-200'}`}
                            onClick={() => setInputB(0)}
                          >
                            0
                          </button>
                          <button
                            className={`px-4 py-2 rounded-r-lg ${inputB === 1 ? 'bg-bluez text-white' : 'bg-gray-200'}`}
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
                    <div className="w-16 h-16 flex items-center justify-center text-4xl" style={{ color: colors.darkpurple }}>
                      {gate?.symbol}
                    </div>
                  </div>
                  
                  {/* Output */}
                  <div className="flex flex-col items-center">
                    <p className="font-medium mb-2">Output</p>
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: output ? colors.greenz : colors.redz }}
                    >
                      {output}
                    </div>
                  </div>
                </div>
                
                {/* Truth Table */}
                {showTruthTable && (
                  <div className="mt-6">
                    <h4 className="font-bold mb-2">Truth Table</h4>
                    <TruthTable data={gate?.truthTable} />
                  </div>
                )}
              </div>
            )}
            
            {/* Question */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.offwhite }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.grayz }}>
                {step.question}
              </h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => {
                  const answered = hasAnsweredCurrent();
                  const isSelected = answered ? userAnswers[currentStep]?.answer === idx : false;
                  const isCorrect = step.correctAnswer === idx;
                  
                  let bgColor = colors.white;
                  if (answered && isSelected) {
                    bgColor = userAnswers[currentStep].isCorrect ? `${colors.greenz}20` : `${colors.redz}20`;
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !answered && handleAnswerSelect(idx)}
                      className={`p-3 border rounded-lg transition-all ${answered ? 'cursor-default' : 'cursor-pointer hover:bg-opacity-50 hover:bg-bluez hover:bg-opacity-10'}`}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isSelected ? (userAnswers[currentStep].isCorrect ? colors.greenz : colors.redz) : '#e5e7eb',
                        color: colors.grayz
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
                  );
                })}
              </div>
              
              {/* Feedback */}
              {showFeedback && (
                <div 
                  className="mt-4 p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: userAnswers[currentStep]?.isCorrect ? `${colors.greenz}10` : `${colors.redz}10`,
                    color: userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz 
                  }}
                >
                  <p>{feedbackMessage}</p>
                </div>
              )}
              
              {renderNavigation()}
            </div>
          </div>
        );

      case 'truthTableChallenge':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>
            
            {/* Expression visualization */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-center mb-2 text-lg font-semibold">Expression:</div>
              <div className="flex justify-center">
                <Badge color="darkpurple" className="text-lg py-2 px-4">
                  {step.expression}
                </Badge>
              </div>
            </div>
            
            {/* Truth Table Challenge */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.grayz }}>
                {step.question}
              </h3>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <TruthTable 
                    data={step.truthTable} 
                    isEditable={!hasAnsweredCurrent()} 
                    onChange={(rowIndex, value) => {
                      setUserTruthTable({...userTruthTable, [rowIndex]: value});
                    }}
                  />
                </div>
              </div>
              
              {!hasAnsweredCurrent() && (
                <div className="flex justify-center mt-6">
                  <Button 
                    onClick={handleTruthTableSubmit}
                    disabled={Object.keys(userTruthTable).length !== step.truthTable.length}
                  >
                    Submit Truth Table
                  </Button>
                </div>
              )}
              
              {/* Explanation for NOT operator */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold mb-2">Helpful Reminder:</h4>
                <p>For this expression <strong>A AND (NOT B)</strong>:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>First apply NOT to B (1 becomes 0, 0 becomes 1)</li>
                  <li>Then apply AND between A and (NOT B)</li>
                  <li>Remember: AND is true only when both inputs are true</li>
                </ol>
              </div>
              
              {/* Feedback */}
              {showFeedback && (
                <div 
                  className="mt-4 p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: userAnswers[currentStep]?.isCorrect ? `${colors.greenz}10` : `${colors.redz}10`,
                    color: userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz 
                  }}
                >
                  <p>{feedbackMessage}</p>
                  {!userAnswers[currentStep]?.isCorrect && (
                    <div className="mt-2">
                      <p className="font-bold">Correct answers:</p>
                      <div className="overflow-x-auto mt-2">
                        <table className="w-full text-center border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="p-2 border">A</th>
                              <th className="p-2 border">B</th>
                              <th className="p-2 border">Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            {step.truthTable.map((row, idx) => (
                              <tr key={idx}>
                                <td className="p-2 border">{row.a}</td>
                                <td className="p-2 border">{row.b}</td>
                                <td className="p-2 border font-bold">{step.correctAnswers[idx]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {renderNavigation()}
            </div>
          </div>
        );

      case 'logicGateMatching':
        const [userMatches, setUserMatches] = useState({});
        const answered = hasAnsweredCurrent();
        
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>
            
            {/* Truth Table Matching */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.grayz }}>
                {step.question}
              </h3>
              
              <div className="space-y-6">
                {step.truthTables.map((table) => (
                  <div key={table.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
                      <div className="mr-6 flex-1">
                        <h4 className="font-bold mb-2">Truth Table {table.id}:</h4>
                        <TruthTable data={table.values} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-2">Select the matching gate:</h4>
                        <select 
                          className="w-full p-2 border rounded-lg"
                          value={userMatches[table.id] || ''}
                          onChange={(e) => !answered && setUserMatches({...userMatches, [table.id]: e.target.value})}
                          disabled={answered}
                        >
                          <option value="">-- Select Gate --</option>
                          {step.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        
                        {answered && (
                          <div 
                            className="mt-2 p-2 rounded-lg text-center"
                            style={{ 
                              backgroundColor: userAnswers[currentStep]?.answer[table.id] === step.correctAnswers[table.id] 
                                ? `${colors.greenz}20` 
                                : `${colors.redz}20` 
                            }}
                          >
                            <span 
                              style={{ 
                                color: userAnswers[currentStep]?.answer[table.id] === step.correctAnswers[table.id] 
                                  ? colors.greenz 
                                  : colors.redz 
                              }}
                            >
                              {userAnswers[currentStep]?.answer[table.id] === step.correctAnswers[table.id] 
                                ? <span>✓ Correct</span> 
                                : <span>✗ Incorrect - should be {step.correctAnswers[table.id]}</span>
                              }
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {!answered && (
                <div className="flex justify-center mt-6">
                  <Button 
                    onClick={() => handleMatchingSubmit(userMatches)}
                    disabled={Object.keys(userMatches).length !== step.truthTables.length}
                  >
                    Submit Matches
                  </Button>
                </div>
              )}
              
              {/* Feedback */}
              {showFeedback && (
                <div 
                  className="mt-4 p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: userAnswers[currentStep]?.isCorrect ? `${colors.greenz}10` : `${colors.redz}10`,
                    color: userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz 
                  }}
                >
                  <p>{feedbackMessage}</p>
                </div>
              )}
              
              {renderNavigation()}
            </div>
          </div>
        );

      case 'simpleCircuitBuilder':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>
            
            {/* Target Truth Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Target Truth Table</h3>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <TruthTable data={step.targetTruthTable} />
                </div>
              </div>
              
              {/* Available Gates */}
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Available Gates</h3>
                <div className="flex flex-wrap gap-2">
                  {step.availableGates.map((gate) => (
                    <Badge
                      key={gate}
                      color="bluez"
                      className="p-2"
                    >
                      {gate}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Hint button */}
              <div className="mt-4 flex justify-end">
                <button
                  className="flex items-center text-sm text-bluez hover:underline"
                  onClick={() => setHintVisible(!hintVisible)}
                >
                  <HelpCircle className="h-4 w-4 mr-1" />
                  {hintVisible ? "Hide Hint" : "Show Hint"}
                </button>
              </div>
              
              {hintVisible && (
                <div className="mt-2 p-3 bg-bluez bg-opacity-10 rounded-lg">
                  <p className="text-bluez">{step.hint}</p>
                </div>
              )}
            </div>
            
            {/* Question */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.offwhite }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.grayz }}>
                {step.question}
              </h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => {
                  const answered = hasAnsweredCurrent();
                  const isSelected = answered ? userAnswers[currentStep]?.answer === idx : false;
                  const isCorrect = step.correctAnswer === idx;
                  
                  let bgColor = colors.white;
                  if (answered && isSelected) {
                    bgColor = userAnswers[currentStep].isCorrect ? `${colors.greenz}20` : `${colors.redz}20`;
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !answered && handleAnswerSelect(idx)}
                      className={`p-3 border rounded-lg transition-all ${answered ? 'cursor-default' : 'cursor-pointer hover:bg-opacity-50 hover:bg-bluez hover:bg-opacity-10'}`}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isSelected ? (userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz) : '#e5e7eb',
                        color: colors.grayz
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
                  );
                })}
              </div>
              
              {/* Feedback */}
              {showFeedback && (
                <div 
                  className="mt-4 p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: userAnswers[currentStep]?.isCorrect ? `${colors.greenz}10` : `${colors.redz}10`,
                    color: userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz 
                  }}
                >
                  <p>{feedbackMessage}</p>
                </div>
              )}
              
              {renderNavigation()}
            </div>
          </div>
        );

      case 'realWorldLogic':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
              {step.title}
            </h2>
            <p style={{ color: colors.grayz }}>{step.description}</p>
            
            {/* Real-world scenarios */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Examples</h3>
              <div className="space-y-4">
                {step.scenarios.map((scenario) => (
                  <div key={scenario.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col space-y-2">
                      <p className="font-bold">Scenario {scenario.id}:</p>
                      <p>{scenario.scenario}</p>
                      <div className="flex flex-wrap items-center mt-2">
                        <span className="mr-2">Boolean Expression:</span>
                        <Badge color="darkpurple">{scenario.expression}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center">
                        <span className="mr-2">Gates Used:</span>
                        {scenario.gates.map((gate, idx) => (
                          <Badge key={idx} color="bluez" className="mr-1">{gate}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Question */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.offwhite }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.grayz }}>
                {step.question}
              </h3>
              <div className="space-y-3">
                {step.options.map((option, idx) => {
                  const answered = hasAnsweredCurrent();
                  const isSelected = answered ? userAnswers[currentStep]?.answer === idx : false;
                  const isCorrect = step.correctAnswer === idx;
                  
                  let bgColor = colors.white;
                  if (answered && isSelected) {
                    bgColor = userAnswers[currentStep].isCorrect ? `${colors.greenz}20` : `${colors.redz}20`;
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !answered && handleAnswerSelect(idx)}
                      className={`p-3 border rounded-lg transition-all ${answered ? 'cursor-default' : 'cursor-pointer hover:bg-opacity-50 hover:bg-bluez hover:bg-opacity-10'}`}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: isSelected ? (userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz) : '#e5e7eb',
                        color: colors.grayz
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
                  );
                })}
              </div>
              
              {/* Feedback */}
              {showFeedback && (
                <div 
                  className="mt-4 p-4 rounded-lg" 
                  style={{ 
                    backgroundColor: userAnswers[currentStep]?.isCorrect ? `${colors.greenz}10` : `${colors.redz}10`,
                    color: userAnswers[currentStep]?.isCorrect ? colors.greenz : colors.redz 
                  }}
                >
                  <p>{feedbackMessage}</p>
                </div>
              )}
              
              {renderNavigation()}
            </div>
          </div>
        );

      case 'completion': {
        const finalScore = Math.round((score / totalQuestions) * 100);
        
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
                {finalScore}%
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
                    <strong>Excellent!</strong> You have a strong understanding of logic gates and Boolean operations. 
                    You're ready to apply these concepts to more complex circuits and real-world problems.
                  </p>
                </div>
              ) : finalScore >= 60 ? (
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${colors.bluez}20` }}>
                  <p style={{ color: colors.bluez }}>
                    <strong>Good job!</strong> You understand many key concepts about logic gates and Boolean operations. 
                    Review the areas where you had difficulty to strengthen your understanding.
                  </p>
                </div>
              ) : (
                <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: `${colors.orangez}20` }}>
                  <p style={{ color: colors.orangez }}>
                    <strong>Keep practicing!</strong> Logic gates and Boolean operations can be challenging. 
                    Try revisiting the basic concepts and working through the examples again.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleRestartAssessment} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Restart Assessment
              </Button>
              <Button className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Continue to Next Topic
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
    if (assessmentSteps[currentStep].type === 'intro' || assessmentSteps[currentStep].type === 'completion') {
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
          {currentStep >= assessmentSteps.length - 2 ? "Complete" : "Next"} <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto pb-16 px-4">
      {/* Progress bar */}
      <div className="p-4 mb-4">
        <ProgressBar value={progress} />
        <div className="flex justify-between mt-2 text-sm" style={{ color: colors.grayz }}>
          <span>
            Step {currentStep + 1} of {assessmentSteps.length}
          </span>
          <span>
            {score}/{totalQuestions} Correct
          </span>
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
  );
};

export default LogicGateExplorer;