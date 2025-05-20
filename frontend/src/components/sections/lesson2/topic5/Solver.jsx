// import React, { useState } from 'react';

// const SolvingBooleanLawsPart3 = () => {
//   const [activeTab, setActiveTab] = useState('learn');
//   const [expressionInput, setExpressionInput] = useState('A·B + A·B\' + A\'·B');
//   const [simplifySteps, setSimplifySteps] = useState([]);
//   const [currentExample, setCurrentExample] = useState(0);
//   const [showSolution, setShowSolution] = useState(false);
//   const [selectedLaw, setSelectedLaw] = useState('');
//   const [userAnswer, setUserAnswer] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [showTruthTable, setShowTruthTable] = useState(false);
//   const [variables, setVariables] = useState(['A', 'B']);
//   const [truthTableExpression, setTruthTableExpression] = useState('A·B');

//   // Boolean algebra laws
//   const booleanLaws = [
//     { 
//       name: 'Idempotent Law', 
//       examples: ['A + A = A', 'A · A = A'],
//       explanation: 'Variables combined with themselves result in the original variable.'
//     },
//     { 
//       name: 'Complement Law', 
//       examples: ['A + A\' = 1', 'A · A\' = 0'],
//       explanation: 'A variable combined with its complement yields either 1 (OR) or 0 (AND).'
//     },
//     { 
//       name: 'Absorption Law', 
//       examples: ['A + (A · B) = A', 'A · (A + B) = A'],
//       explanation: 'A term absorbs a term containing itself under certain operations.'
//     },
//     { 
//       name: 'Distributive Law', 
//       examples: ['A · (B + C) = A·B + A·C', 'A + (B · C) = (A + B) · (A + C)'],
//       explanation: 'Distributes one operation over another, similar to algebra.'
//     },
//     { 
//       name: 'Identity Law', 
//       examples: ['A + 0 = A', 'A · 1 = A'],
//       explanation: 'Operations with identity elements (0 for OR, 1 for AND) result in the original variable.'
//     }
//   ];

//   // Examples with step-by-step solutions
//   const examples = [
//     {
//       question: 'A·B + A·B\' + A\'·B',
//       steps: [
//         { text: 'Factoring out A from the first two terms: A·B + A·B\' = A·(B + B\')', law: 'Distributive Law' },
//         { text: 'Using the Complement Law: B + B\' = 1', law: 'Complement Law' },
//         { text: 'Simplifying: A·(B + B\') = A·1 = A', law: 'Identity Law' },
//         { text: 'The expression becomes: A + A\'·B', law: '' },
//         { text: 'This is our simplified expression in SOP form.', law: '' }
//       ],
//       solution: 'A + A\'·B',
//       type: 'SOP'
//     },
//     {
//       question: 'A·B + A·C + B·C',
//       steps: [
//         { text: 'This expression looks like a candidate for the consensus theorem.', law: 'Consensus Theorem' },
//         { text: 'The consensus term of A·B and A·C would be B·C, which is already in our expression.', law: '' },
//         { text: 'Using the consensus theorem: X·Y + X·Z + Y·Z\' = X·Y + X·Z', law: '' },
//         { text: 'In our case: A·B + A·C + B·C = A·B + A·C + B·C', law: '' },
//         { text: 'The expression cannot be simplified further using basic laws.', law: '' }
//       ],
//       solution: 'A·B + A·C + B·C',
//       type: 'SOP'
//     },
//     {
//       question: '(A + B)·(A\' + C)',
//       steps: [
//         { text: 'Apply the Distributive Law: (A + B)·(A\' + C) = A·A\' + A·C + B·A\' + B·C', law: 'Distributive Law' },
//         { text: 'Using the Complement Law: A·A\' = 0', law: 'Complement Law' },
//         { text: 'Simplifying: 0 + A·C + B·A\' + B·C = A·C + B·A\' + B·C', law: 'Identity Law' },
//         { text: 'This is our simplified expression in SOP form.', law: '' }
//       ],
//       solution: 'A·C + B·A\' + B·C',
//       type: 'SOP'
//     }
//   ];

//   // Generate truth table for an expression
//   const generateTruthTable = () => {
//     // Extract unique variables from the expression
//     let uniqueVars = [...new Set(truthTableExpression.match(/[A-Z]/g))];
//     uniqueVars.sort();
//     setVariables(uniqueVars);

//     // Truth table will be generated in the render function
//   };

//   // Evaluate a Boolean expression for specific variable values
//   const evaluateExpression = (expr, varValues) => {
//     // Simple expression evaluator for demo purposes
//     // In a real app, you'd implement a proper parser and evaluator
//     let result = expr;
    
//     // Replace variables with their values
//     for (const [variable, value] of Object.entries(varValues)) {
//       const regex = new RegExp(variable, 'g');
//       result = result.replace(regex, value ? '1' : '0');
//     }

//     // Replace operators
//     result = result.replace(/·/g, '&&')
//                    .replace(/\+/g, '||')
//                    .replace(/'/g, '!')
//                    .replace(/!/g, ' !')
//                    .replace(/0/g, 'false')
//                    .replace(/1/g, 'true');
    
//     // Basic evaluation (simplified for demonstration)
//     try {
//       // This is for demonstration only and has limitations
//       // A real implementation would use a proper Boolean expression parser
//       return eval(result);
//     } catch (e) {
//       return false;
//     }
//   };

//   const checkUserAnswer = () => {
//     if (userAnswer.trim().replace(/\s+/g, '') === examples[currentExample].solution.replace(/\s+/g, '')) {
//       setFeedback('Correct! That\'s the right simplification.');
//     } else {
//       setFeedback('Not quite right. Try again or check the solution.');
//     }
//   };
  
//   const handleNextExample = () => {
//     setCurrentExample((prev) => (prev + 1) % examples.length);
//     setShowSolution(false);
//     setUserAnswer('');
//     setFeedback('');
//   };

//   const handlePreviousExample = () => {
//     setCurrentExample((prev) => (prev - 1 + examples.length) % examples.length);
//     setShowSolution(false);
//     setUserAnswer('');
//     setFeedback('');
//   };

//   const practiceSimplify = () => {
//     setSimplifySteps(examples[currentExample].steps);
//     setShowSolution(true);
//   };

//   return (
//     <div className="flex flex-col h-full bg-offwhite text-blackz">
//       {/* Header */}
//       <div className="bg-bluez text-white p-4 rounded-t-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center">Interactive Boolean Algebra Solver</h1>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="flex border-b border-grayz">
//         <button 
//           onClick={() => setActiveTab('learn')} 
//           className={`px-4 py-2 ${activeTab === 'learn' ? 'bg-bluez text-white' : 'bg-white text-grayz'} rounded-t-lg mr-1`}
//         >
//           Learn
//         </button>
//         <button 
//           onClick={() => setActiveTab('practice')} 
//           className={`px-4 py-2 ${activeTab === 'practice' ? 'bg-bluez text-white' : 'bg-white text-grayz'} rounded-t-lg mr-1`}
//         >
//           Practice
//         </button>
//         <button 
//           onClick={() => setActiveTab('truthTable')} 
//           className={`px-4 py-2 ${activeTab === 'truthTable' ? 'bg-bluez text-white' : 'bg-white text-grayz'} rounded-t-lg`}
//         >
//           Truth Table
//         </button>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-grow p-4 overflow-y-auto">
//         {activeTab === 'learn' && (
//           <div className="space-y-6">
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <h2 className="text-xl font-bold text-bluez mb-2">Boolean Algebra Laws</h2>
//               <p className="mb-4">Understanding these fundamental laws is essential for simplifying Boolean expressions.</p>
              
//               <div className="grid md:grid-cols-2 gap-4">
//                 {booleanLaws.map((law, index) => (
//                   <div key={index} className="border border-grayz rounded-lg p-3 hover:border-bluez transition duration-300">
//                     <h3 className="font-semibold text-bluez">{law.name}</h3>
//                     <div className="text-sm mt-1 mb-2">{law.explanation}</div>
//                     <div className="bg-offwhite p-2 rounded-md">
//                       {law.examples.map((example, i) => (
//                         <div key={i} className="font-mono">{example}</div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <h2 className="text-xl font-bold text-bluez mb-2">Simplification Methods</h2>
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="font-semibold text-darkpurple">Sum of Products (SOP)</h3>
//                   <p>Boolean expression as a sum (OR) of product (AND) terms.</p>
//                   <div className="bg-offwhite p-2 rounded-md mt-1 font-mono">
//                     F = A·B + A·C + B·C
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-darkpurple">Product of Sums (POS)</h3>
//                   <p>Boolean expression as a product (AND) of sum (OR) terms.</p>
//                   <div className="bg-offwhite p-2 rounded-md mt-1 font-mono">
//                     F = (A+B)·(A+C)·(B+C)
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {activeTab === 'practice' && (
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold text-bluez mb-2">Practice Simplifying Boolean Expressions</h2>
            
//             <div className="flex justify-between items-center mb-4">
//               <button 
//                 onClick={handlePreviousExample}
//                 className="bg-grayz text-white px-3 py-1 rounded hover:bg-darkpurple"
//               >
//                 Previous
//               </button>
//               <span>Example {currentExample + 1} of {examples.length}</span>
//               <button 
//                 onClick={handleNextExample}
//                 className="bg-grayz text-white px-3 py-1 rounded hover:bg-darkpurple"
//               >
//                 Next
//               </button>
//             </div>
            
//             <div className="mb-4">
//               <h3 className="font-semibold">Simplify this expression:</h3>
//               <div className="bg-offwhite p-3 rounded-md text-lg font-mono text-center my-2">
//                 {examples[currentExample].question}
//               </div>
//               <p className="text-grayz text-sm">Type: {examples[currentExample].type}</p>
//             </div>
            
//             <div className="mb-4">
//               <label className="block mb-1">Your simplified answer:</label>
//               <div className="flex gap-2">
//                 <input 
//                   type="text" 
//                   className="w-full p-2 border border-grayz rounded"
//                   value={userAnswer}
//                   onChange={(e) => setUserAnswer(e.target.value)}
//                   placeholder="Enter your answer here"
//                 />
//                 <button 
//                   onClick={checkUserAnswer}
//                   className="bg-bluez text-white px-3 py-1 rounded hover:bg-darkpurple"
//                 >
//                   Check
//                 </button>
//               </div>
//               {feedback && (
//                 <div className={`mt-2 p-2 rounded ${feedback.includes('Correct') ? 'bg-greenz text-white' : 'bg-redz text-white'}`}>
//                   {feedback}
//                 </div>
//               )}
//             </div>
            
//             <div className="flex gap-2">
//               <button 
//                 onClick={practiceSimplify}
//                 className="bg-bluez text-white px-3 py-1 rounded hover:bg-darkpurple"
//               >
//                 Show Solution
//               </button>
//               <select 
//                 className="border border-grayz rounded p-1"
//                 value={selectedLaw}
//                 onChange={(e) => setSelectedLaw(e.target.value)}
//               >
//                 <option value="">Select a law to apply...</option>
//                 {booleanLaws.map((law, index) => (
//                   <option key={index} value={law.name}>{law.name}</option>
//                 ))}
//               </select>
//             </div>
            
//             {showSolution && (
//               <div className="mt-4 border-t border-grayz pt-4">
//                 <h3 className="font-semibold text-bluez">Solution Steps:</h3>
//                 <ol className="list-decimal pl-5 mt-2 space-y-2">
//                   {simplifySteps.map((step, index) => (
//                     <li key={index}>
//                       {step.text}
//                       {step.law && <span className="text-sm text-darkpurple ml-1">({step.law})</span>}
//                     </li>
//                   ))}
//                 </ol>
//                 <div className="bg-lightpurple p-2 rounded-md mt-3">
//                   <div className="font-semibold">Final simplified expression:</div>
//                   <div className="font-mono text-lg">{examples[currentExample].solution}</div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
        
//         {activeTab === 'truthTable' && (
//           <div className="bg-white p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold text-bluez mb-2">Truth Table Generator</h2>
            
//             <div className="mb-4">
//               <label className="block mb-1">Enter Boolean expression:</label>
//               <div className="flex gap-2">
//                 <input 
//                   type="text" 
//                   className="w-full p-2 border border-grayz rounded"
//                   value={truthTableExpression}
//                   onChange={(e) => setTruthTableExpression(e.target.value)}
//                   placeholder="Example: A·B + C"
//                 />
//                 <button 
//                   onClick={() => {
//                     generateTruthTable();
//                     setShowTruthTable(true);
//                   }}
//                   className="bg-bluez text-white px-3 py-1 rounded hover:bg-darkpurple"
//                 >
//                   Generate
//                 </button>
//               </div>
//               <p className="text-grayz text-sm mt-1">
//                 Use · for AND, + for OR, and ' for NOT. Example: A·B + A'·C
//               </p>
//             </div>
            
//             {showTruthTable && (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full border-collapse border border-grayz">
//                   <thead>
//                     <tr className="bg-grayz text-white">
//                       {variables.map((variable, index) => (
//                         <th key={index} className="border border-grayz px-4 py-2">{variable}</th>
//                       ))}
//                       <th className="border border-grayz px-4 py-2">Result</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Array.from({ length: Math.pow(2, variables.length) }).map((_, rowIndex) => {
//                       // Create variable assignments for this row
//                       const varValues = {};
//                       variables.forEach((variable, colIndex) => {
//                         // Determine if this variable is 0 or 1 for this row
//                         const bitPosition = variables.length - 1 - colIndex;
//                         varValues[variable] = Boolean((rowIndex >> bitPosition) & 1);
//                       });
                      
//                       // Calculate result for this row
//                       const result = evaluateExpression(truthTableExpression, varValues);
                      
//                       return (
//                         <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-offwhite' : 'bg-white'}>
//                           {variables.map((variable, colIndex) => (
//                             <td key={colIndex} className="border border-grayz px-4 py-2 text-center">
//                               {varValues[variable] ? '1' : '0'}
//                             </td>
//                           ))}
//                           <td className={`border border-grayz px-4 py-2 text-center ${result ? 'bg-greenz text-white' : ''}`}>
//                             {result ? '1' : '0'}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="bg-grayz text-white p-2 text-center text-sm rounded-b-lg">
//         Interactive Boolean Algebra Learning Tool
//       </div>
//     </div>
//   );
// };

// export default SolvingBooleanLawsPart3;