import React from 'react';
import { Book, CheckCircle, Tag, ArrowRight, Lightbulb, Maximize2, LifeBuoy } from 'lucide-react';

const TruthTablesKeyTakeaways = () => {
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
  
  // Key takeaways data
  const fundamentalTakeaways = [
    {
      title: "Definition & Purpose",
      icon: <Book size={24} />,
      points: [
        "A truth table is a chart showing all possible input combinations and their resulting outputs for logical operations.",
        "Truth tables help visualize logic and verify how expressions behave with every possible input.",
        "They are foundational tools in digital logic design, programming, and Boolean algebra."
      ]
    },
    {
      title: "Basic Structure",
      icon: <Maximize2 size={24} />,
      points: [
        "Input variables are listed as column headers (A, B, C, etc.).",
        "Each row represents one possible combination of input values (0 or 1).",
        "For n variables, a truth table requires 2ⁿ rows to show all possible combinations.",
        "Binary counting order (000, 001, 010, 011...) ensures all combinations are covered exactly once."
      ]
    },
    {
      title: "Logical Operators",
      icon: <Tag size={24} />,
      points: [
        "AND (∧): Output is 1 only when all inputs are 1.",
        "OR (∨): Output is 1 when at least one input is 1.",
        "NOT (¬): Inverts the input value (0 becomes 1, 1 becomes 0).",
        "XOR (⊕): Output is 1 only when inputs are different.",
        "NAND (↑): Opposite of AND, output is 0 only when all inputs are 1.",
        "NOR (↓): Opposite of OR, output is 1 only when all inputs are 0.",
        "XNOR (≡): Output is 1 only when inputs are the same."
      ]
    }
  ];
  
  const advancedTakeaways = [
    {
      title: "Building Complex Truth Tables",
      icon: <ArrowRight size={24} />,
      points: [
        "Work inside parentheses first, solving innermost ones before outer ones.",
        "Use intermediate columns for partial results to make tables easier to follow.",
        "Respect operator precedence: NOT > AND > OR (unless parentheses specify otherwise).",
        "Break down complex expressions into smaller, manageable sub-expressions.",
        "Work step-by-step to avoid errors in complex calculations."
      ]
    },
    {
      title: "Practical Applications",
      icon: <LifeBuoy size={24} />,
      points: [
        "Verifying logical operations and Boolean expressions.",
        "Designing digital circuits and logic gates.",
        "Simplifying complex logical statements.",
        "Debugging logical errors in code.",
        "Checking equivalence between different Boolean expressions."
      ]
    },
    {
      title: "Best Practices",
      icon: <CheckCircle size={24} />,
      points: [
        "Label all columns clearly, including intermediate calculations.",
        "Double-check your binary combinations to ensure all possibilities are covered.",
        "Verify calculations for each step before moving to the next.",
        "For expressions with many variables, consider using software tools.",
        "Create complete truth tables even when simplifying expressions."
      ]
    }
  ];
  
  const exampleTakeaways = [
    {
      expression: "(A AND B) OR (NOT C)",
      explanation: "First calculate A AND B, then NOT C, finally OR the results. The output is 1 if either sub-expression is 1."
    },
    {
      expression: "NOT((A OR B) AND C)",
      explanation: "First calculate A OR B, then AND with C, finally apply NOT to invert the result."
    },
    {
      expression: "(A XOR B) AND (NOT C)",
      explanation: "Calculate A XOR B (1 when inputs differ), then NOT C, finally AND these results."
    },
    {
      expression: "(A AND (B OR C)) OR (NOT A AND B)",
      explanation: "Work inside parentheses first with B OR C, then A AND that result. Separately, calculate NOT A AND B. Finally, OR these two results."
    }
  ];
  
  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-bluez mb-3">Truth Tables: Key Takeaways</h1>
        <div className="w-32 h-1 bg-bluez mx-auto rounded-full mb-4"></div>
        <p className="text-grayz max-w-3xl mx-auto">
          A comprehensive summary of truth table concepts, construction techniques, and applications
        </p>
      </div>
      
      {/* Core Concepts Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-bold text-grayz mb-6 flex items-center">
          <span className="bg-bluez/20 text-bluez p-2 rounded-lg mr-3">
            <Lightbulb size={24} />
          </span>
          Core Concepts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fundamentalTakeaways.map((section, index) => (
            <div key={index} className="bg-offwhite p-5 rounded-lg border-t-4" style={{ borderColor: colors.bluez }}>
              <div className="flex items-center mb-3">
                <div className="text-bluez mr-2">{section.icon}</div>
                <h3 className="font-bold text-grayz">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex text-sm text-grayz">
                    <span className="text-bluez mr-2 mt-1 flex-shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Truth Table Construction Steps */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-bold text-grayz mb-4">How to Construct a Truth Table: 4 Essential Steps</h2>
        
        <div className="space-y-4">
          <div className="flex items-start p-4 bg-offwhite rounded-lg">
            <div className="w-10 h-10 rounded-full bg-bluez text-white flex items-center justify-center font-bold text-xl mr-3 flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold text-grayz mb-1">List all input variables</h3>
              <p className="text-grayz text-sm">
                Identify and list all variables in your logical expression. For example, in "A AND B", the variables are A and B.
              </p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-offwhite rounded-lg">
            <div className="w-10 h-10 rounded-full bg-bluez text-white flex items-center justify-center font-bold text-xl mr-3 flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold text-grayz mb-1">Calculate the number of rows</h3>
              <p className="text-grayz text-sm">
                Use the formula 2ⁿ, where n is the number of variables. For 2 variables, you need 2² = 4 rows. For 3 variables, you need 2³ = 8 rows.
              </p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-offwhite rounded-lg">
            <div className="w-10 h-10 rounded-full bg-bluez text-white flex items-center justify-center font-bold text-xl mr-3 flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-bold text-grayz mb-1">List all binary combinations</h3>
              <p className="text-grayz text-sm">
                Create all possible input combinations using binary counting order (00, 01, 10, 11 for 2 variables) to ensure all possibilities are covered.
              </p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-offwhite rounded-lg">
            <div className="w-10 h-10 rounded-full bg-bluez text-white flex items-center justify-center font-bold text-xl mr-3 flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="font-bold text-grayz mb-1">Compute the output</h3>
              <p className="text-grayz text-sm">
                Apply the logical operation to each row of inputs to determine the output value (0 or 1) for each combination.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Advanced Concepts */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-bold text-grayz mb-6 flex items-center">
          <span className="bg-darkpurple/20 text-darkpurple p-2 rounded-lg mr-3">
            <Lightbulb size={24} />
          </span>
          Advanced Concepts
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advancedTakeaways.map((section, index) => (
            <div key={index} className="bg-offwhite p-5 rounded-lg border-t-4" style={{ borderColor: colors.darkpurple }}>
              <div className="flex items-center mb-3">
                <div className="text-darkpurple mr-2">{section.icon}</div>
                <h3 className="font-bold text-grayz">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex text-sm text-grayz">
                    <span className="text-darkpurple mr-2 mt-1 flex-shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Example Expressions */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-bold text-grayz mb-4">Key Example Expressions</h2>
        
        <div className="bg-bluez/5 p-5 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bluez/30">
                <th className="px-4 py-2 text-left text-bluez">Expression</th>
                <th className="px-4 py-2 text-left text-bluez">Key Insight</th>
              </tr>
            </thead>
            <tbody>
              {exampleTakeaways.map((example, index) => (
                <tr key={index} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white/50' : 'bg-white/20'}`}>
                  <td className="px-4 py-3 font-bold text-grayz">{example.expression}</td>
                  <td className="px-4 py-3 text-grayz text-sm">{example.explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Reference Guide */}
      <div className="bg-yellowz/10 p-6 rounded-xl shadow-md mb-8 border border-yellowz/30">
        <h2 className="text-xl font-bold text-grayz mb-4 flex items-center">
          <span className="text-yellowz mr-3">
            <Lightbulb size={24} />
          </span>
          Quick Reference: Operator Cheat Sheet
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded-lg">
            <div className="font-bold text-bluez flex items-center">
              <span className="w-8 h-8 rounded-full bg-bluez/10 flex items-center justify-center mr-2 text-lg">∧</span>
              AND
            </div>
            <p className="text-sm text-grayz mt-1">Output: 1 only when all inputs are 1</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg">
            <div className="font-bold text-bluez flex items-center">
              <span className="w-8 h-8 rounded-full bg-bluez/10 flex items-center justify-center mr-2 text-lg">∨</span>
              OR
            </div>
            <p className="text-sm text-grayz mt-1">Output: 1 when at least one input is 1</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg">
            <div className="font-bold text-bluez flex items-center">
              <span className="w-8 h-8 rounded-full bg-bluez/10 flex items-center justify-center mr-2 text-lg">¬</span>
              NOT
            </div>
            <p className="text-sm text-grayz mt-1">Output: Inverts the input (0→1, 1→0)</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg">
            <div className="font-bold text-bluez flex items-center">
              <span className="w-8 h-8 rounded-full bg-bluez/10 flex items-center justify-center mr-2 text-lg">⊕</span>
              XOR
            </div>
            <p className="text-sm text-grayz mt-1">Output: 1 only when inputs are different</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg">
            <div className="font-bold text-bluez flex items-center">
              <span className="w-8 h-8 rounded-full bg-bluez/10 flex items-center justify-center mr-2 text-lg">↑</span>
              NAND
            </div>
            <p className="text-sm text-grayz mt-1">Output: 0 only when all inputs are 1</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg">
            <div className="font-bold text-bluez flex items-center">
              <span className="w-8 h-8 rounded-full bg-bluez/10 flex items-center justify-center mr-2 text-lg">↓</span>
              NOR
            </div>
            <p className="text-sm text-grayz mt-1">Output: 1 only when all inputs are 0</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg">
            <div className="font-bold text-bluez flex items-center">
              <span className="w-8 h-8 rounded-full bg-bluez/10 flex items-center justify-center mr-2 text-lg">≡</span>
              XNOR
            </div>
            <p className="text-sm text-grayz mt-1">Output: 1 only when inputs are the same</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg border-2 border-dashed border-bluez/30">
            <div className="font-bold text-bluez">
              Precedence Order:
            </div>
            <p className="text-sm text-grayz mt-1">1. NOT → 2. AND → 3. OR</p>
            <p className="text-xs text-grayz mt-1">(unless overridden by parentheses)</p>
          </div>
        </div>
      </div>
      
      {/* Final Summary */}
      <div className="bg-bluez/10 p-6 rounded-xl shadow-md border border-bluez/30">
        <h2 className="text-xl font-bold text-bluez mb-3">Summary</h2>
        <p className="text-grayz mb-3">
          Truth tables are essential tools for understanding logical operations in digital systems. They provide a systematic way to visualize how Boolean expressions behave with different input combinations. By breaking down complex expressions into smaller parts and following the step-by-step construction process, you can analyze any logical operation, no matter how complex.
        </p>
        <p className="text-grayz">
          The key to mastering truth tables is practice—start with simple operators, then gradually work with more complex combinations. Use intermediate columns to show your work, respect operator precedence, and always double-check your calculations. With these skills, you'll be well-equipped to design digital circuits, debug logical errors, and understand the foundations of computer science.
        </p>
      </div>
    </div>
  );
};

export default TruthTablesKeyTakeaways;