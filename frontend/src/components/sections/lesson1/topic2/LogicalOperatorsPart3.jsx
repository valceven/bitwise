import React, { useState, useEffect } from 'react';

// Custom colors from the provided palette
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

const LogicalOperatorsLessonPart3 = () => {
  // Quiz data
  const operators = [
    { id: 1, name: "AND", correctAnswer: "C" },
    { id: 2, name: "OR", correctAnswer: "E" },
    { id: 3, name: "NOT", correctAnswer: "B" },
    { id: 4, name: "NAND", correctAnswer: "F" },
    { id: 5, name: "NOR", correctAnswer: "D" },
    { id: 6, name: "XOR", correctAnswer: "A" },
    { id: 7, name: "XNOR", correctAnswer: "G" },
  ];

  const definitions = [
    { id: "A", text: "Outputs 1 only when inputs are different" },
    { id: "B", text: "Inverts the input value" },
    { id: "C", text: "Outputs 1 only if both inputs are 1" },
    { id: "D", text: "Opposite of OR" },
    { id: "E", text: "Outputs 1 when at least one input is 1" },
    { id: "F", text: "Opposite of AND" },
    { id: "G", text: "Outputs 1 only when inputs are the same" },
  ];

  // State
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState({});

  // Handle selection change
  const handleAnswerChange = (operatorId, definitionId) => {
    setUserAnswers({
      ...userAnswers,
      [operatorId]: definitionId,
    });
  };

  // Handle drag events
  const handleDragStart = (definitionId) => {
    setDraggedItem(definitionId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (operatorId) => {
    if (draggedItem) {
      handleAnswerChange(operatorId, draggedItem);
      
      setMatchedPairs({
        ...matchedPairs,
        [operatorId]: draggedItem
      });
      
      setDraggedItem(null);
    }
  };

  // Submit quiz
  const handleSubmit = () => {
    let newScore = 0;
    operators.forEach((operator) => {
      if (userAnswers[operator.id] === operator.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setShowResults(true);
    setIsCompleted(true);
  };

  // Reset quiz
  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setIsCompleted(false);
    setMatchedPairs({});
  };

  // Check if all questions have been answered
  const allAnswered = operators.every((operator) => userAnswers[operator.id]);

  return (
    <div className="p-6 bg-offwhite rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-bluez mb-2">Logical Operators Mini Quiz</h1>
        <p className="text-grayz">Match each logical operator to its correct definition or behavior</p>
        
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Operators column */}
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-4 text-blackz border-b-2 pb-2" style={{ borderColor: colors.bluez }}>
            Column A - Logical Operators
          </h2>
          <div className="space-y-4">
            {operators.map((operator) => (
              <div 
                key={operator.id}
                className={`p-4 rounded-lg cursor-pointer border-2 ${
                  showResults
                    ? userAnswers[operator.id] === operator.correctAnswer
                      ? "bg-greenz/10 border-greenz"
                      : "bg-redz/10 border-redz"
                    : matchedPairs[operator.id]
                    ? "bg-lightpurple/30 border-darkpurple"
                    : "bg-white border-grayz/30"
                }`}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(operator.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="font-bold">{operator.id}. {operator.name}</div>
                  <div className="text-lg font-semibold">
                    {matchedPairs[operator.id] && (
                      <span 
                        className={`px-3 py-1 rounded-full ${
                          showResults
                            ? userAnswers[operator.id] === operator.correctAnswer
                              ? "bg-greenz text-white"
                              : "bg-redz text-white"
                            : "bg-bluez text-white"
                        }`}
                      >
                        {matchedPairs[operator.id]}
                      </span>
                    )}
                  </div>
                </div>
                
                {showResults && (
                  <div className="mt-2 text-sm">
                    {userAnswers[operator.id] === operator.correctAnswer ? (
                      <span className="text-greenz">Correct!</span>
                    ) : (
                      <span className="text-redz">
                        Incorrect. The correct answer is {operator.correctAnswer}.
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Definitions column */}
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-4 text-blackz border-b-2 pb-2" style={{ borderColor: colors.bluez }}>
            Column B - Definitions
          </h2>
          <div className="space-y-4">
            {definitions.map((definition) => (
              <div
                key={definition.id}
                className={`p-4 rounded-lg cursor-move ${
                  Object.values(matchedPairs).includes(definition.id) && !showResults
                    ? "bg-lightpurple/30 border-2 border-darkpurple"
                    : "bg-white border-2 border-grayz/30 hover:border-bluez"
                }`}
                draggable={!Object.values(matchedPairs).includes(definition.id) || showResults}
                onDragStart={() => handleDragStart(definition.id)}
              >
                <div className="flex items-center">
                  <span 
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 font-bold ${
                      Object.values(matchedPairs).includes(definition.id) && !showResults
                        ? "bg-darkpurple text-white"
                        : "bg-bluez text-white"
                    }`}
                  >
                    {definition.id}
                  </span>
                  <span>{definition.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        {!isCompleted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-6 py-3 rounded-lg font-bold ${
              allAnswered
                ? "bg-bluez text-white hover:bg-bluez/90"
                : "bg-grayz/30 text-grayz/70 cursor-not-allowed"
            }`}
          >
            {allAnswered ? "Submit Answers" : "Match All Operators to Continue"}
          </button>
        ) : (
          <div className="text-center">
            <div className="mb-4 text-xl font-bold">
              Your Score: {score} / {operators.length}
              <span className="ml-2">
                ({Math.round((score / operators.length) * 100)}%)
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-lg font-bold bg-bluez text-white hover:bg-bluez/90"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center text-sm text-grayz">
        <p>Drag definitions from Column B and drop them onto operators in Column A</p>
      </div>
    </div>
  );
};

export default LogicalOperatorsLessonPart3;