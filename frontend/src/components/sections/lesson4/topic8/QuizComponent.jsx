import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Quiz questions
  const questions = [
    {
      question: "Which logic gate outputs 1 only when all inputs are 1?",
      options: ["OR", "AND", "XOR", "NOR"],
      answer: 1,
      explanation: "The AND gate outputs 1 (HIGH) only when all inputs are 1 (HIGH). For a two-input AND gate, the output is 1 only when both inputs A AND B are 1."
    },
    {
      question: "Which gate is known as the 'inequality detector'?",
      options: ["AND", "NAND", "XOR", "XNOR"],
      answer: 2,
      explanation: "The XOR (Exclusive OR) gate outputs 1 when inputs are different (unequal) and 0 when inputs are the same, making it an 'inequality detector'."
    },
    {
      question: "In a 4-to-1 multiplexer (MUX), how many select lines are required?",
      options: ["1", "2", "3", "4"],
      answer: 1,
      explanation: "A 4-to-1 multiplexer requires 2 select lines. In general, a multiplexer with 2ⁿ inputs requires n select lines. Since 2² = 4, a 4-to-1 MUX needs 2 select lines."
    },
    {
      question: "In a half adder circuit, which gate is used to generate the Sum output?",
      options: ["AND", "OR", "XOR", "NOT"],
      answer: 2,
      explanation: "In a half adder, the Sum output is generated using an XOR gate (A XOR B), while the Carry output is generated using an AND gate (A AND B)."
    },
    {
      question: "What is the main difference between a half adder and a full adder?",
      options: ["A full adder can handle larger numbers", "A full adder has a carry input", "A full adder has more outputs", "A full adder uses fewer gates"],
      answer: 1,
      explanation: "The main difference is that a full adder has a carry input (Cin) in addition to the two data inputs, allowing it to account for carries from previous stages in multi-bit addition operations."
    },
    {
      question: "How many outputs does a 1-to-4 demultiplexer (DEMUX) have?",
      options: ["1", "2", "3", "4"],
      answer: 3,
      explanation: "A 1-to-4 demultiplexer (DEMUX) has 4 outputs. The DEMUX routes a single input to one of its 4 possible outputs based on the values of its select lines."
    },
    {
      question: "Which digital building block routes one input to one of several outputs?",
      options: ["Multiplexer", "Demultiplexer", "Half Adder", "Encoder"],
      answer: 1,
      explanation: "A demultiplexer (DEMUX) routes one input to one of several outputs based on the values of the select lines."
    },
    {
      question: "Which circuit combines two half adders and an OR gate?",
      options: ["Full Adder", "Multiplexer", "Decoder", "Flip-Flop"],
      answer: 0,
      explanation: "A full adder can be constructed using two half adders and an OR gate. The first half adder processes the two inputs, and the second processes the sum from the first half adder with the carry-in bit."
    },
    {
      question: "What is the purpose of a multiplexer (MUX) in digital systems?",
      options: ["To perform addition operations", "To invert signals", "To select one input from many", "To distribute a signal to multiple outputs"],
      answer: 2,
      explanation: "A multiplexer (MUX) selects one input from many and forwards it to a single output. It acts as a digitally controlled switch that chooses which input signal to pass through."
    },
    {
      question: "In a full adder, how many inputs and outputs are there total?",
      options: ["2 inputs, 2 outputs", "3 inputs, 2 outputs", "2 inputs, 3 outputs", "3 inputs, 3 outputs"],
      answer: 1,
      explanation: "A full adder has 3 inputs (A, B, and Carry-in) and 2 outputs (Sum and Carry-out). This allows it to perform addition while accounting for a carry from a previous stage."
    }
  ];
  
  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };
  
  // Go to next question
  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  // Restart quiz
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#F14E3A]">Logic Gates & Digital Circuits Quiz</span>
      </h2>
      
      {showResults ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#FFFFFF] p-6 rounded-lg shadow-md text-center"
        >
          <h3 className="text-2xl font-bold text-[#29314D] mb-4">
            Quiz Results
          </h3>
          
          <div className="text-4xl font-bold mb-4" style={{ color: score > (questions.length / 2) ? '#27AE60' : '#F14E3A' }}>
            {score} / {questions.length}
          </div>
          
          <p className="text-[#29314D] mb-6">
            {score === questions.length 
              ? "Perfect score! You've mastered logic gates and digital building blocks!" 
              : score > (questions.length * 0.8) 
              ? "Excellent work! You have a strong understanding of digital circuits and their applications."
              : score > (questions.length / 2) 
              ? "Good job! You understand most concepts about logic gates and digital building blocks." 
              : "Keep learning! Review the material, especially the digital building blocks section, and try the quiz again."}
          </p>
          
          <button
            onClick={restartQuiz}
            className="px-6 py-3 bg-[#6E61FF] hover:bg-[#5D50EE] text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      ) : (
        <div>
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#FFFFFF] p-6 rounded-lg shadow-md mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#6E61FF] font-medium">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-[#29314D] font-medium">Score: {score}</span>
            </div>
            
            <h3 className="text-xl font-semibold text-[#29314D] mb-4">
              {questions[currentQuestion].question}
            </h3>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedAnswer === index 
                      ? index === questions[currentQuestion].answer 
                        ? 'bg-[#27AE60] text-white' 
                        : 'bg-[#F14E3A] text-white'
                      : showExplanation && index === questions[currentQuestion].answer
                      ? 'bg-[#27AE60] text-white'
                      : 'bg-[#F1F6F1] hover:bg-[#DAC3FF] text-[#29314D]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
          
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#DAC3FF] p-4 rounded-lg mb-6"
            >
              <h4 className="font-semibold text-[#29314D] mb-2">Explanation:</h4>
              <p className="text-[#29314D]">{questions[currentQuestion].explanation}</p>
            </motion.div>
          )}
          
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedAnswer !== null 
                  ? 'bg-[#6E61FF] hover:bg-[#5D50EE] text-white' 
                  : 'bg-[#F1F6F1] text-[#29314D] cursor-not-allowed'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default QuizComponent;