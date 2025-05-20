import React, { useState } from 'react';
import SolvingBooleanLawsPart2 from './SolvingBooleanLawsPart2';

const SolvingBooleanLawsPart3 = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [viewMode, setViewMode] = useState('step-by-step'); // 'step-by-step' or 'laws'

  // Boolean algebra laws with explanations
  const booleanLaws = [
    { 
      name: 'Idempotent Law', 
      examples: ['A + A = A', 'A · A = A'],
      explanation: 'A variable combined with itself results in the original variable. This shows that repeating a variable has no effect.',
      details: 'This law reflects that in Boolean logic, once a condition is met, meeting it again doesn\'t change the result.'
    },
    { 
      name: 'Complement Law', 
      examples: ['A + A\' = 1', 'A · A\' = 0'],
      explanation: 'A variable combined with its complement yields either 1 (OR) or 0 (AND).',
      details: 'Since a variable must be either true or false, combining it with its opposite using OR always results in true (1), while using AND always results in false (0).'
    },
    { 
      name: 'Absorption Law', 
      examples: ['A + (A · B) = A', 'A · (A + B) = A'],
      explanation: 'A term absorbs a term containing itself when combined with certain operations.',
      details: 'If A is true, A+AB is true regardless of B. If A is false, both A and AB are false, so A+AB is false. Thus, A+AB always equals A.'
    },
    { 
      name: 'Distributive Law', 
      examples: ['A · (B + C) = A·B + A·C', 'A + (B · C) = (A + B) · (A + C)'],
      explanation: 'Similar to algebra, you can distribute terms across parentheses with both AND and OR operations.',
      details: 'This law allows us to expand or factor expressions, which is crucial for simplifying complex Boolean expressions.'
    },
    { 
      name: 'Identity Law', 
      examples: ['A + 0 = A', 'A · 1 = A', 'A + 1 = 1', 'A · 0 = 0'],
      explanation: 'Operations with identity elements (0 for OR, 1 for AND) result in predictable outcomes.',
      details: 'The identity element for AND is 1 (like multiplication by 1), while for OR it\'s 0 (like addition with 0).'
    },
    {
      name: 'Consensus Theorem',
      examples: ['AB + AC + BC = AB + AC', 'AB + AC + B\'C\' = AB + AC'],
      explanation: 'When you have terms that imply a third term, the third term becomes redundant.',
      details: 'If you have AB and AC, together they imply that when B and C are both true, A must also be true. This makes the term BC redundant in some expressions.'
    }
  ];

  // Examples with step-by-step detailed explanations
  const examples = [
    {
      title: "Example 1: Simplifying an SOP Expression",
      expression: "A·B + A·B' + A'·B",
      steps: [
        {
          result: "A·B + A·B' + A'·B",
          explanation: "Let's begin with our original expression in Sum of Products (SOP) form. We have three terms joined by OR operators (+).",
          lawApplied: "Original Expression",
          details: "This is a Boolean expression with three product terms: A·B, A·B', and A'·B. Our goal is to simplify this to use fewer operations while maintaining the same logical behavior."
        },
        {
          result: "A·(B + B') + A'·B",
          explanation: "Looking at the first two terms (A·B and A·B'), we can see they share the variable A. We can factor this out using the distributive law.",
          lawApplied: "Distributive Law",
          details: "The distributive law lets us factor out common terms: A·B + A·B' = A·(B + B'). We're essentially saying 'when A is true, either B is true OR B is false'."
        },
        {
          result: "A·(1) + A'·B",
          explanation: "Within the parentheses, we have B + B'. According to the complement law, a variable ORed with its complement equals 1.",
          lawApplied: "Complement Law",
          details: "B + B' = 1 because either B is true or B is false - one of these must be true in Boolean logic, so their OR is always true (1)."
        },
        {
          result: "A + A'·B",
          explanation: "Now we have A·1. According to the identity law, any variable ANDed with 1 equals the variable itself.",
          lawApplied: "Identity Law",
          details: "A·1 = A because when we AND any value with 1 (true), it doesn't change the original value. 1 is the identity element for the AND operation."
        },
        {
          result: "A + A'·B",
          explanation: "Our final simplified expression is A + A'·B, which cannot be simplified further using standard Boolean algebra laws.",
          lawApplied: "Final Result",
          details: "This expression is now in a minimal SOP form. It states: 'The output is true when A is true OR when A is false AND B is true'. This uses fewer operations than our original expression while maintaining the same logical function."
        }
      ]
    },
    {
      title: "Example 2: Using Absorption Law",
      expression: "A·B + A·B·C",
      steps: [
        {
          result: "A·B + A·B·C",
          explanation: "We start with an expression that has two terms: A·B and A·B·C.",
          lawApplied: "Original Expression",
          details: "The first term A·B appears within the second term A·B·C, which suggests we might be able to use the absorption law."
        },
        {
          result: "A·B·(1 + C)",
          explanation: "We can factor out the common term A·B from both expressions.",
          lawApplied: "Distributive Law",
          details: "Using distributive law: A·B + A·B·C = A·B·(1 + C). This is similar to factoring in algebra: xy + xyz = xy(1 + z)."
        },
        {
          result: "A·B·(1)",
          explanation: "Inside the parentheses, we have 1 + C. According to the identity law, any variable ORed with 1 equals 1.",
          lawApplied: "Identity Law",
          details: "1 + C = 1 regardless of the value of C. In Boolean algebra, when you OR anything with 1, the result is always 1."
        },
        {
          result: "A·B",
          explanation: "Now we have A·B·1. Using the identity law again, any value ANDed with 1 equals the original value.",
          lawApplied: "Identity Law",
          details: "A·B·1 = A·B because 1 is the identity element for the AND operation. It doesn't change the value when ANDed with any term."
        },
        {
          result: "A·B",
          explanation: "Our final simplified expression is just A·B. This demonstrates the absorption law directly: A·B + A·B·C = A·B.",
          lawApplied: "Absorption Law",
          details: "The absorption law states that A + (A·B) = A. In our case, A·B + A·B·C = A·B, which follows the same pattern with A·B acting as our 'A' term."
        }
      ]
    },
   
  ];

  const handleNextExample = () => {
    setCurrentExample((prev) => (prev + 1) % examples.length);
    setCurrentStep(0);
    setShowAllSteps(false);
  };

  const handlePreviousExample = () => {
    setCurrentExample((prev) => (prev - 1 + examples.length) % examples.length);
    setCurrentStep(0);
    setShowAllSteps(false);
  };

  const handleNextStep = () => {
    if (currentStep < examples[currentExample].steps.length - 1) {
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

  const activeExample = examples[currentExample];
  const visibleSteps = showAllSteps 
    ? activeExample.steps 
    : activeExample.steps.slice(0, currentStep + 1);

  return (
    <div className="flex flex-col min-h-screen bg-offwhite text-blackz">
      {/* Header */}
      <div className="bg-bluez text-white p-4 rounded-t-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Simplifying Boolean expression in SOP form.</h1>
        <p className="text-center mt-1">Understanding simplification through detailed explanations</p>
    
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-grayz mt-8">
        <button 
          onClick={() => setViewMode('step-by-step')} 
          className={`px-4 py-2 ${viewMode === 'step-by-step' ? 'bg-bluez text-white' : 'bg-white text-grayz'} rounded-t-lg mr-1`}
        >
          Step-by-Step Examples
        </button>
        <button 
          onClick={() => setViewMode('laws')} 
          className={`px-4 py-2 ${viewMode === 'laws' ? 'bg-bluez text-white' : 'bg-white text-grayz'} rounded-t-lg`}
        >
          Boolean Laws Reference
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        {viewMode === 'step-by-step' ? (
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Example header and navigation */}
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={handlePreviousExample}
                className="bg-grayz text-white px-3 py-1 rounded hover:bg-darkpurple transition"
              >
                Previous Example
              </button>
              <h2 className="text-xl font-bold text-bluez">{activeExample.title}</h2>
              <button 
                onClick={handleNextExample}
                className="bg-grayz text-white px-3 py-1 rounded hover:bg-darkpurple transition"
              >
                Next Example
              </button>
            </div>
            
            {/* Original expression */}
            <div className="mb-6">
              <h3 className="font-semibold text-grayz">Original Expression:</h3>
              <div className="bg-offwhite p-3 rounded-md text-lg font-mono text-center my-2 border-l-4 border-bluez">
                {activeExample.expression}
              </div>
            </div>
            
            {/* Step by step visualization */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-bluez">Simplification Steps:</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={handleReset}
                    className="bg-grayz text-white px-2 py-1 text-sm rounded hover:bg-darkpurple transition"
                    disabled={currentStep === 0 && !showAllSteps}
                  >
                    Reset
                  </button>
                  <button 
                    onClick={() => setShowAllSteps(true)}
                    className="bg-bluez text-white px-2 py-1 text-sm rounded hover:bg-darkpurple transition"
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
                    className="bg-grayz text-white px-3 py-1 rounded hover:bg-darkpurple transition"
                    disabled={currentStep === 0}
                  >
                    Previous Step
                  </button>
                  <div className="text-grayz">
                    Step {currentStep + 1} of {activeExample.steps.length}
                  </div>
                  <button 
                    onClick={handleNextStep}
                    className="bg-bluez text-white px-3 py-1 rounded hover:bg-darkpurple transition"
                    disabled={currentStep === activeExample.steps.length - 1 && showAllSteps}
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
                    {activeExample.steps[activeExample.steps.length - 1].result}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-bluez mb-4">Boolean Algebra Laws Reference</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              {booleanLaws.map((law, index) => (
                <div key={index} className="border border-grayz rounded-lg p-4 hover:border-bluez transition-all duration-300">
                  <h3 className="font-semibold text-bluez mb-2">{law.name}</h3>
                  
                  <div className="bg-offwhite p-2 rounded-md mb-3">
                    {law.examples.map((example, i) => (
                      <div key={i} className="font-mono">{example}</div>
                    ))}
                  </div>
                  
                  <p className="mb-2">{law.explanation}</p>
                  
                  <div className="text-sm text-grayz">
                    <strong>In detail:</strong> {law.details}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-lightpurple rounded-lg">
              <h3 className="font-semibold text-bluez mb-2">How to Apply These Laws</h3>
              <p>
                When simplifying Boolean expressions, look for patterns where these laws can be applied. 
                The general strategy is to:
              </p>
              <ol className="list-decimal ml-5 mt-2 space-y-1">
                <li>Identify common factors that can be distributed or factored out</li>
                <li>Look for complementary terms (A and A') that can be simplified</li>
                <li>Apply absorption when a term contains another term entirely</li>
                <li>Continue applying these laws until the expression cannot be simplified further</li>
              </ol>
            </div>
          </div>
        )}
      </div>

    
    </div>
  );
};

export default SolvingBooleanLawsPart3;