import React, { useState } from 'react';

const TruthTableLessonPart1 = () => {
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
        <h1 className="text-3xl font-bold text-bluez mb-3">Truth Tables</h1>
        <div className="w-24 h-1 bg-bluez mx-auto rounded-full"></div>
      </div>
      
      {/* Introduction Section */}
    
      <div className="flex items-start mb-6">
        
        <div>
          <h2 className="text-xl font-bold text-grayz mb-3">What is a Truth Table?</h2>
          <p className="text-grayz leading-relaxed">
            A <span className="font-bold">truth table</span> is a simple chart that shows 
            <span className="bg-yellowz/20 px-2 py-1 mx-1 rounded-md font-semibold">all possible input combinations</span> 
            for a logic operation — and what output each combination produces.
          </p>
        </div>
      </div>
      
      <div className="flex items-start mb-6">
        
        <div>
          <h2 className="text-xl font-bold text-grayz mb-3">Why Use Truth Tables?</h2>
          <p className="text-grayz leading-relaxed">
            Truth tables help us <span className="font-bold">visualize logic</span> and verify how a Boolean expression behaves for 
            <span className="bg-bluez/20 px-2 py-1 mx-1 rounded-md font-semibold">every possible input</span>. 
            It's a foundational tool in digital logic design.
          </p>
        </div>
      </div>
      
      {/* Example Truth Table */}
      <div className="p-4 bg-offwhite rounded-lg mb-6 border border-gray-200">
        <div className="text-center mb-3">
          <h3 className="font-bold text-grayz">Example Truth Table: XOR</h3>
          <div className="text-sm text-grayz/80">A ⊕ B (Output is 1 when inputs are different)</div>
        </div>
        <div className="flex justify-center">
          <table className="min-w-[250px] border-collapse">
            <thead>
              <tr className="bg-bluez text-white">
                <th className="p-2 text-center">A</th>
                <th className="p-2 text-center">B</th>
                <th className="p-2 text-center">A ⊕ B</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 bg-white">
                <td className="p-2 text-center">0</td>
                <td className="p-2 text-center">0</td>
                <td className="p-2 text-center font-bold">0</td>
              </tr>
              <tr className="border-b border-gray-200 bg-white">
                <td className="p-2 text-center">0</td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center font-bold text-bluez">1</td>
              </tr>
              <tr className="border-b border-gray-200 bg-white">
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center">0</td>
                <td className="p-2 text-center font-bold text-bluez">1</td>
              </tr>
              <tr className="bg-white">
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-center font-bold">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Applications of Truth Tables */}
      <div className="bg-bluez/10 p-4 rounded-lg">
        <h3 className="font-bold text-bluez mb-2">Applications of Truth Tables</h3>
        <ul className="list-disc list-inside text-grayz space-y-2">
          <li>Verifying logical operations and Boolean expressions</li>
          <li>Designing digital circuits and logic gates</li>
          <li>Simplifying complex logical statements</li>
          <li>Debugging logical errors in code</li>
        </ul>
      </div>
      
      
        
        {/* Summary */}
        <div className="bg-yellowz/10 p-5 rounded-lg border border-yellowz/30 mt-6">
          <h3 className="font-bold text-grayz mb-2">Summary</h3>
          <p className="text-grayz">
            Truth tables are powerful tools for understanding and analyzing logic. By methodically listing all input possibilities and calculating each output, you can verify logical expressions, design circuits, and understand complex logic operations. Remember that the number of rows in your truth table will double with each additional input variable!
          </p>
        </div>
      </>
  );
};

export default TruthTableLessonPart1;