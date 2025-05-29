import React, { useState } from 'react';

const TruthTableLessonPart2 = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  // Custom colors matching the previous components
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
  
  // Steps for constructing a truth table with examples
  const constructionSteps = [
    {
      title: "List all input variables",
      description: "First, identify and list all the variables in your logical expression.",
      example: {
        text: "For the expression A AND B, we have two variables: A and B",
        visual: (
          <div className="flex space-x-6 justify-center p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-bluez/10 text-bluez font-bold text-xl border-2 border-bluez">A</div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-bluez/10 text-bluez font-bold text-xl border-2 border-bluez">B</div>
          </div>
        )
      }
    },
    {
      title: "Calculate the number of rows",
      description: "Use the formula 2ⁿ, where n is the number of input variables.",
      example: {
        text: "For 2 variables (A and B): 2² = 4 rows\nFor 3 variables (A, B, and C): 2³ = 8 rows",
        visual: (
          <div className="p-5 bg-white rounded-lg shadow-sm">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-bluez text-white flex items-center justify-center font-bold mr-3">2</div>
                <div className="font-semibold text-grayz">Variables:</div>
                <div className="ml-2 flex">
                  <span className="px-3 py-1 bg-bluez/10 rounded-md text-bluez font-semibold mx-1">A</span>
                  <span className="px-3 py-1 bg-bluez/10 rounded-md text-bluez font-semibold mx-1">B</span>
                </div>
              </div>
              <div className="ml-11 flex items-center">
                <span className="text-darkpurple font-bold mr-2">Formula:</span>
                <span className="bg-offwhite px-4 py-2 rounded-md font-mono">2<sup>2</sup> = 4 rows</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-bluez text-white flex items-center justify-center font-bold mr-3">3</div>
                <div className="font-semibold text-grayz">Variables:</div>
                <div className="ml-2 flex">
                  <span className="px-3 py-1 bg-bluez/10 rounded-md text-bluez font-semibold mx-1">A</span>
                  <span className="px-3 py-1 bg-bluez/10 rounded-md text-bluez font-semibold mx-1">B</span>
                  <span className="px-3 py-1 bg-bluez/10 rounded-md text-bluez font-semibold mx-1">C</span>
                </div>
              </div>
              <div className="ml-11 flex items-center">
                <span className="text-darkpurple font-bold mr-2">Formula:</span>
                <span className="bg-offwhite px-4 py-2 rounded-md font-mono">2<sup>3</sup> = 8 rows</span>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: "List all binary combinations",
      description: "Create all possible input combinations, starting from all 0s and incrementing in binary.",
      example: {
        text: "For 2 variables (A and B), list all 4 combinations: 00, 01, 10, 11",
        visual: (
          <div className="p-5 bg-white rounded-lg shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-bluez text-white">
                  <th className="p-2 text-center">A</th>
                  <th className="p-2 text-center">B</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 text-center bg-offwhite">0</td>
                  <td className="p-3 text-center bg-offwhite">0</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 text-center">0</td>
                  <td className="p-3 text-center">1</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 text-center bg-offwhite">1</td>
                  <td className="p-3 text-center bg-offwhite">0</td>
                </tr>
                <tr>
                  <td className="p-3 text-center">1</td>
                  <td className="p-3 text-center">1</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 text-sm text-grayz">
              <div className="flex items-center mb-1">
                <div className="w-5 h-5 rounded-full bg-greenz text-white flex items-center justify-center font-bold text-xs mr-2">✓</div>
                <span>Binary counting pattern: 00 → 01 → 10 → 11</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-bluez text-white flex items-center justify-center font-bold text-xs mr-2">i</div>
                <span>Pattern ensures all possibilities are covered exactly once</span>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: "Compute the output",
      description: "Apply the logical operation to each row of inputs to determine the output.",
      example: {
        text: "For A AND B, compute the result for each input combination.",
        visual: (
          <div className="space-y-6">
            <div className="p-5 bg-white rounded-lg shadow-sm">
              <div className="mb-4 text-center">
                <span className="text-lg font-bold text-bluez">A AND B</span>
                <span className="ml-2 px-3 py-1 bg-bluez/10 rounded-md text-bluez">Output = 1 only when both inputs are 1</span>
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-bluez text-white">
                    <th className="p-2 text-center">A</th>
                    <th className="p-2 text-center">B</th>
                    <th className="p-2 text-center">A AND B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 text-center bg-offwhite">0</td>
                    <td className="p-3 text-center bg-offwhite">0</td>
                    <td className="p-3 text-center bg-offwhite font-bold">0</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 text-center">0</td>
                    <td className="p-3 text-center">1</td>
                    <td className="p-3 text-center font-bold">0</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 text-center bg-offwhite">1</td>
                    <td className="p-3 text-center bg-offwhite">0</td>
                    <td className="p-3 text-center bg-offwhite font-bold">0</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-center">1</td>
                    <td className="p-3 text-center">1</td>
                    <td className="p-3 text-center font-bold text-bluez">1</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-3 flex justify-end">
                <div className="bg-greenz/10 border border-greenz/30 text-greenz p-2 rounded-md text-sm">
                  <span className="font-bold">Rule:</span> 1 only when both inputs are 1
                </div>
              </div>
            </div>
            
            <div className="p-5 bg-white rounded-lg shadow-sm">
              <div className="mb-4 text-center">
                <span className="text-lg font-bold text-bluez">A OR B</span>
                <span className="ml-2 px-3 py-1 bg-bluez/10 rounded-md text-bluez">Output = 1 when at least one input is 1</span>
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-bluez text-white">
                    <th className="p-2 text-center">A</th>
                    <th className="p-2 text-center">B</th>
                    <th className="p-2 text-center">A OR B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 text-center bg-offwhite">0</td>
                    <td className="p-3 text-center bg-offwhite">0</td>
                    <td className="p-3 text-center bg-offwhite font-bold">0</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 text-center">0</td>
                    <td className="p-3 text-center">1</td>
                    <td className="p-3 text-center font-bold text-bluez">1</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 text-center bg-offwhite">1</td>
                    <td className="p-3 text-center bg-offwhite">0</td>
                    <td className="p-3 text-center bg-offwhite font-bold text-bluez">1</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-center">1</td>
                    <td className="p-3 text-center">1</td>
                    <td className="p-3 text-center font-bold text-bluez">1</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-3 flex justify-end">
                <div className="bg-greenz/10 border border-greenz/30 text-greenz p-2 rounded-md text-sm">
                  <span className="font-bold">Rule:</span> 1 when at least one input is 1
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
  ];
  
  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-bluez mb-3">How to Construct a Truth Table</h1>
        <div className="w-24 h-1 bg-bluez mx-auto rounded-full"></div>
        <p className="mt-4 text-grayz">A step-by-step guide to building logical truth tables</p>
      </div>
      
      {/* Introduction */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex items-start">
          <div className="text-3xl mr-4">🛠️</div>
          <div>
            <h2 className="text-xl font-bold text-grayz mb-3">The Construction Process</h2>
            <p className="text-grayz leading-relaxed mb-6">
              Building a truth table involves systematically organizing all possible inputs and determining their corresponding outputs. Follow these four steps to create a clear, complete truth table for any logical operation.
            </p>
            
            {/* Overview of steps */}
            <div className="bg-offwhite p-5 rounded-lg mb-4">
              <h3 className="font-bold text-bluez mb-3 text-lg">Four Steps to Create a Truth Table:</h3>
              <ol className="space-y-3">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-bluez text-white flex items-center justify-center font-bold mr-2">1</div>
                  <span className="text-grayz font-medium">List all input variables</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-bluez text-white flex items-center justify-center font-bold mr-2">2</div>
                  <span className="text-grayz font-medium">Calculate the number of rows</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-bluez text-white flex items-center justify-center font-bold mr-2">3</div>
                  <span className="text-grayz font-medium">List all binary combinations</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-bluez text-white flex items-center justify-center font-bold mr-2">4</div>
                  <span className="text-grayz font-medium">Compute the output</span>
                </li>
              </ol>
            </div>
            
            <div className="bg-yellowz/10 p-4 rounded-lg border border-yellowz/30">
              <div className="flex items-start">
                <div className="text-yellowz mr-3">💡</div>
                <div>
                  <p className="text-grayz text-sm">
                    <span className="font-bold">Pro Tip:</span> Before starting, clearly define the logical operation you're analyzing. Understanding the operation's rules is essential for correctly computing the outputs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Step by Step Guide */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-bold text-grayz mb-6 text-center">Explore Each Step in Detail</h2>
        
        {/* Step Navigation */}
        <div className="flex mb-6 overflow-x-auto py-2">
          {constructionSteps.map((step, index) => (
            <button
              key={index}
              className={`whitespace-nowrap mr-2 px-4 py-2 rounded-lg transition-all ${
                activeStep === index 
                  ? 'bg-bluez text-white shadow-md' 
                  : 'bg-gray-100 text-grayz hover:bg-gray-200'
              }`}
              onClick={() => setActiveStep(index)}
            >
              <span className="font-bold mr-2">{index + 1}.</span>
              <span>{step.title}</span>
            </button>
          ))}
        </div>
        
        {/* Step Content */}
        <div className="p-6 bg-offwhite rounded-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-bluez text-white flex items-center justify-center font-bold text-xl mr-3">
              {activeStep + 1}
            </div>
            <h3 className="text-lg font-bold text-bluez">{constructionSteps[activeStep].title}</h3>
          </div>
          
          <p className="text-grayz mb-6 leading-relaxed">
            {constructionSteps[activeStep].description}
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-bluez">
            <div className="font-bold text-grayz mb-2">Example:</div>
            <p className="text-grayz whitespace-pre-line">
              {constructionSteps[activeStep].example.text}
            </p>
          </div>
          
          <div className="mt-6">
            {constructionSteps[activeStep].example.visual}
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeStep > 0 
                  ? 'bg-gray-200 text-grayz hover:bg-gray-300' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              onClick={() => activeStep > 0 && setActiveStep(activeStep - 1)}
              disabled={activeStep === 0}
            >
              ← Previous Step
            </button>
            
            <button
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeStep < constructionSteps.length - 1 
                  ? 'bg-bluez text-white hover:bg-bluez/90' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              onClick={() => activeStep < constructionSteps.length - 1 && setActiveStep(activeStep + 1)}
              disabled={activeStep === constructionSteps.length - 1}
            >
              Next Step →
            </button>
          </div>
        </div>
      </div>
      
      {/* Common Challenges and Tips */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-bold text-grayz mb-4">Common Challenges & Tips</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-redz/10 p-4 rounded-lg border border-redz/30">
            <h3 className="font-bold text-redz mb-2">Common Mistakes</h3>
            <ul className="list-disc list-inside text-grayz space-y-2 text-sm">
              <li>Forgetting to include all possible input combinations</li>
              <li>Incorrectly applying the logical operation rules</li>
              <li>Miscalculating the total number of rows needed</li>
              <li>Forgetting to label columns clearly</li>
            </ul>
          </div>
          
          <div className="bg-greenz/10 p-4 rounded-lg border border-greenz/30">
            <h3 className="font-bold text-greenz mb-2">Helpful Tips</h3>
            <ul className="list-disc list-inside text-grayz space-y-2 text-sm">
              <li>Double-check your binary counting pattern</li>
              <li>Use the formula 2ⁿ to verify you have all rows</li>
              <li>Create a separate column for complex expressions</li>
              <li>Highlight the 1s in the output column for clarity</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Practice Example */}
      <div className="bg-bluez/10 p-6 rounded-xl border border-bluez/30 mb-8">
        <h2 className="text-xl font-bold text-bluez mb-4">Practice Example</h2>
        <p className="text-grayz mb-4">
          Try constructing a truth table for the expression: (A AND B) OR (NOT C)
        </p>
        
        <div className="bg-white p-4 rounded-lg">
          <h3 className="font-bold text-grayz mb-3">Solution Approach:</h3>
          <ol className="list-decimal list-inside space-y-3 text-grayz">
            <li>
              <span className="font-medium">List all variables:</span> A, B, and C
            </li>
            <li>
              <span className="font-medium">Calculate rows:</span> 2³ = 8 rows
            </li>
            <li>
              <span className="font-medium">List all combinations:</span> 000, 001, 010, 011, 100, 101, 110, 111
            </li>
            <li>
              <span className="font-medium">Compute outputs:</span> 
              <ul className="list-disc list-inside ml-6 mt-2 text-sm">
                <li>First compute A AND B</li>
                <li>Then compute NOT C</li>
                <li>Finally, compute (A AND B) OR (NOT C)</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
      
      {/* Summary and Next Steps */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-grayz mb-4">Summary</h2>
        <p className="text-grayz mb-6">
          Constructing truth tables is a systematic process that helps visualize and analyze logical operations. By following the four steps outlined in this guide, you can create truth tables for any Boolean expression, from simple operations to complex combinations of multiple variables.
        </p>
        
        <div className="bg-darkpurple/10 p-4 rounded-lg border border-darkpurple/30">
          <h3 className="font-bold text-darkpurple mb-2">Next Steps</h3>
          <ul className="list-disc list-inside text-grayz space-y-2">
            <li>Practice with different logical operators (XOR, NAND, NOR)</li>
            <li>Try creating truth tables for expressions with three or more variables</li>
            <li>Learn how to use truth tables to simplify complex expressions</li>
            <li>Explore digital circuit design using truth tables as a foundation</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TruthTableLessonPart2;