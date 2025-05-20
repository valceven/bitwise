import React, { useState } from 'react';
import SolvingBooleanLawsPart3 from './SolvingBooleanLawsPart3';

const SolvingBooleanLawsPart4 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(false);

  // Example with detailed step-by-step explanation
  const example = {
    title: "Example: Simplifying a Boolean Expression (POS)",
    expression: "(A + B)·(A' + C)·(B' + C')",
    steps: [
      {
        result: "(A + B)·(A' + C)·(B' + C')",
        explanation: "We start with our original expression in Product of Sums (POS) form with three terms.",
        lawApplied: "Original Expression",
        details: "This expression is already in POS form, with sum terms (OR terms) joined by AND operators. We'll simplify it step by step to reduce the complexity while maintaining the same logical function."
      },
      {
        result: "(A + B)·(A' + C)·(B' + C')",
        explanation: "We'll first start by distributing terms to see if there are any obvious simplifications.",
        lawApplied: "Identify Common Terms",
        details: "Before applying any laws, it's helpful to examine the expression for patterns or common terms. We'll begin by working with the first two terms (A + B) and (A' + C)."
      },
      {
        result: "(A·A' + A·C + B·A' + B·C)·(B' + C')",
        explanation: "We begin by distributing (A + B) and (A' + C) using the distributive law.",
        lawApplied: "Distributive Law",
        details: "The distributive law allows us to multiply each term in the first parenthesis by each term in the second: (A + B)·(A' + C) = A·A' + A·C + B·A' + B·C. This is similar to FOIL method in algebra."
      },
      {
        result: "(0 + A·C + B·A' + B·C)·(B' + C')",
        explanation: "Look at the term A·A'. This equals 0 by the complement law, since a variable ANDed with its complement is always 0.",
        lawApplied: "Complement Law",
        details: "The complement law states that A·A' = 0 because a variable cannot be both true and false at the same time. This is a fundamental principle in Boolean algebra."
      },
      {
        result: "(A·C + B·A' + B·C)·(B' + C')",
        explanation: "Using the identity law, 0 + [any term] = [the term], so we remove the 0 term.",
        lawApplied: "Identity Law",
        details: "In Boolean algebra, 0 is the identity element for OR operations. Adding 0 to any expression leaves the expression unchanged: 0 + X = X."
      },
      {
        result: "A·C·B' + A·C·C' + B·A'·B' + B·A'·C' + B·C·B' + B·C·C'",
        explanation: "Now we distribute (A·C + B·A' + B·C) with (B' + C') using the distributive law again.",
        lawApplied: "Distributive Law",
        details: "We apply the distributive law to multiply each term in the first expression (A·C, B·A', and B·C) by each term in the second expression (B' and C'). This creates six product terms."
      },
      {
        result: "A·C·B' + 0 + 0 + B·A'·C' + 0 + 0",
        explanation: "Now we simplify terms containing variables and their complements using the complement law.",
        lawApplied: "Complement Law",
        details: "A·C·C' = 0 (because C·C' = 0), B·A'·B' = 0 (because B·B' = 0), B·C·B' = 0 (because B·B' = 0), and B·C·C' = 0 (because C·C' = 0). When a variable and its complement appear in the same product term, the entire term becomes 0."
      },
      {
        result: "A·C·B' + B·A'·C'",
        explanation: "We remove all the 0 terms using the identity law (0 + X = X).",
        lawApplied: "Identity Law",
        details: "After removing all zero terms using the identity law (0 + X = X), we're left with only two non-zero product terms."
      },
      {
        result: "A·C·B' + B·A'·C'",
        explanation: "This is our final simplified expression. It cannot be reduced further using standard Boolean algebra laws.",
        lawApplied: "Final Result",
        details: "We've simplified our original POS expression into a sum of products (SOP) form. While it started as (A + B)·(A' + C)·(B' + C'), we've reduced it to A·C·B' + B·A'·C'. Note that during simplification, POS expressions often convert to SOP form or vice versa."
      }
    ]
  };

  const handleNextStep = () => {
    if (currentStep < example.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowAllSteps(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setShowAllSteps(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setShowAllSteps(false);
  };

  const visibleSteps = showAllSteps 
    ? example.steps 
    : example.steps.slice(0, currentStep + 1);

  return (
    <div className="flex flex-col min-h-screen bg-offwhite text-blackz">
      {/* Header */}
      <div className="bg-bluez text-white p-4 rounded-t-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Simplifying Boolean expression in POS form.</h1>
        <p className="text-center mt-1">Understanding simplification through detailed explanations</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* Example header */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-bluez">{example.title}</h2>
          </div>
          
          {/* Original expression */}
          <div className="mb-6">
            <h3 className="font-semibold text-grayz">Original Expression:</h3>
            <div className="bg-offwhite p-3 rounded-md text-lg font-mono text-center my-2 border-l-4 border-bluez">
              {example.expression}
            </div>
            <p className="text-sm text-grayz italic">
              This expression is in Product of Sums (POS) form, with sum terms joined by AND operators.
            </p>
          </div>
          
          {/* Step by step visualization */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-bluez">Simplification Steps:</h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleReset}
                  className="bg-grayz text-white px-2 py-1 text-sm rounded hover:opacity-90 transition"
                  disabled={currentStep === 0 && !showAllSteps}
                >
                  Reset
                </button>
                <button 
                  onClick={() => setShowAllSteps(true)}
                  className="bg-bluez text-white px-2 py-1 text-sm rounded hover:opacity-90 transition"
                  disabled={showAllSteps}
                >
                  Show All Steps
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {visibleSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${index === currentStep && !showAllSteps ? 'border-bluez bg-white shadow-md' : 'border-grayz bg-white'}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-darkpurple">Step {index + 1}</span>
                    <span className="text-sm px-2 py-1 bg-lightpurple rounded-full">{step.lawApplied}</span>
                  </div>
                  
                  <div className="font-mono text-lg my-3 text-center">
                    {step.result}
                  </div>
                  
                  <p className="mb-2">{step.explanation}</p>
                  
                  <div className="bg-offwhite p-2 rounded text-sm mt-2">
                    <strong className="text-bluez">Detailed Explanation:</strong> {step.details}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Step navigation */}
            {!showAllSteps && (
              <div className="flex justify-between mt-4">
                <button 
                  onClick={handlePreviousStep}
                  className="bg-grayz text-white px-3 py-1 rounded hover:opacity-90 transition"
                  disabled={currentStep === 0}
                >
                  Previous Step
                </button>
                <div className="text-grayz">
                  Step {currentStep + 1} of {example.steps.length}
                </div>
                <button 
                  onClick={handleNextStep}
                  className="bg-bluez text-white px-3 py-1 rounded hover:opacity-90 transition"
                  disabled={currentStep === example.steps.length - 1 && showAllSteps}
                >
                  Next Step
                </button>
              </div>
            )}
            
            {/* Final result highlight (only show when all steps are visible) */}
            {showAllSteps && (
              <div className="mt-6 p-4 bg-lightpurple rounded-lg border border-bluez">
                <h3 className="font-semibold text-bluez mb-2">Final Simplified Expression:</h3>
                <div className="font-mono text-xl text-center">
                  {example.steps[example.steps.length - 1].result}
                </div>
              </div>
            )}
          </div>

          

        </div>
      </div>
    </div>
  );
};

export default SolvingBooleanLawsPart4;