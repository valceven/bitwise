// // TruthTableVisualizer.jsx
// import React, { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const TruthTableVisualizer = () => {
//   const [expression, setExpression] = useState("A·B + A'·C");
//   const [customExpression, setCustomExpression] = useState("");
//   const [showCustomInput, setShowCustomInput] = useState(false);
//   const [highlightedRow, setHighlightedRow] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const predefinedExpressions = [
//     "A·B + A'·C",
//     "A + B·C",
//     "(A+B)·(A+C)",
//     "A⊕B", // XOR
//   ];

//   useEffect(() => {
//     // Simulate generation when expression changes
//     setIsGenerating(true);
//     const timer = setTimeout(() => {
//       setIsGenerating(false);
//     }, 800);
    
//     return () => clearTimeout(timer);
//   }, [expression]);

//   const generateTruthTable = () => {
//     // Generate truth table rows based on expression
//     const variables = [...new Set(expression.match(/[A-Z]/g) || [])].sort();
    
//     if (variables.length === 0) return [];
    
//     // Generate all possible combinations of inputs
//     const rows = [];
//     const numRows = Math.pow(2, variables.length);
    
//     for (let i = 0; i < numRows; i++) {
//       const row = { inputs: {}, result: false };
      
//       // Set input values for this row
//       for (let j = 0; j < variables.length; j++) {
//         const variable = variables[j];
//         const value = (i & (1 << (variables.length - j - 1))) !== 0;
//         row.inputs[variable] = value;
//       }
      
//       // Calculate result based on the expression
//       row.result = evaluateExpression(row.inputs, expression);
//       rows.push(row);
//     }
    
//     return { variables, rows };
//   };

//   // Simplified expression evaluator (for demo purposes)
//   const evaluateExpression = (inputs, expr) => {
//     // Handle some common cases for the demo
//     if (expr === "A·B + A'·C") {
//       return (inputs.A && inputs.B) || (!inputs.A && inputs.C);
//     } 
//     else if (expr === "A + B·C") {
//       return inputs.A || (inputs.B && inputs.C);
//     }
//     else if (expr === "(A+B)·(A+C)") {
//       return (inputs.A || inputs.B) && (inputs.A || inputs.C);
//     }
//     else if (expr === "A⊕B") { // XOR
//       return (inputs.A || inputs.B) && !(inputs.A && inputs.B);
//     }
    
//     // For custom expressions, just return a reasonable demo value
//     // In a real implementation, you'd need a proper Boolean expression parser
//     return Math.random() > 0.5;
//   };

//   const handleExpressionChange = (expr) => {
//     setExpression(expr);
//     setShowCustomInput(false);
//   };

//   const handleCustomSubmit = () => {
//     if (customExpression.trim()) {
//       setExpression(customExpression.trim());
//       setShowCustomInput(false);
//     }
//   };

//   const truthTable = useMemo(() => generateTruthTable(), [expression]);

//   return (
//     <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-white shadow">
//       <h3 className="text-xl font-semibold mb-3 text-cyanz">Truth Table Visualizer</h3>
      
//       <div className="mb-4">
//         <h4 className="font-medium mb-2">Select an expression:</h4>
//         <div className="flex flex-wrap gap-2 mb-2">
//           {predefinedExpressions.map((expr, idx) => (
//             <motion.button
//               key={idx}
//               onClick={() => handleExpressionChange(expr)}
//               className={`px-3 py-1 text-sm rounded-full ${
//                 expression === expr && !showCustomInput
//                   ? "bg-cyanz text-white" 
//                   : "bg-gray-200 text-grayz"
//               }`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {expr}
//             </motion.button>
//           ))}
//           <motion.button
//             onClick={() => setShowCustomInput(!showCustomInput)}
//             className={`px-3 py-1 text-sm rounded-full ${
//               showCustomInput
//                 ? "bg-cyanz text-white" 
//                 : "bg-gray-200 text-grayz"
//             }`}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Custom Expression
//           </motion.button>
//         </div>
        
//         {showCustomInput && (
//           <motion.div 
//             className="mt-3 flex gap-2"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <input
//               type="text"
//               value={customExpression}
//               onChange={(e) => setCustomExpression(e.target.value)}
//               placeholder="Enter Boolean expression (e.g., A·B + C)"
//               className="border border-gray-300 rounded px-3 py-2 flex-grow"
//             />
//             <motion.button
//               onClick={handleCustomSubmit}
//               className="px-3 py-2 bg-cyanz text-white rounded"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               disabled={!customExpression.trim()}
//             >
//               Generate
//             </motion.button>
//           </motion.div>
//         )}
//       </div>
      
//       <div className="bg-offwhite p-3 rounded-md mb-4">
//         <h4 className="font-medium text-grayz mb-2">Current Expression:</h4>
//         <div className="text-xl font-mono bg-white p-3 rounded border border-gray-200 shadow-sm text-center">
//           {expression}
//         </div>
//       </div>
      
//       <div>
//         <h4 className="font-medium text-cyanz mb-2">Truth Table:</h4>
//         {isGenerating ? (
//           <div className="flex justify-center items-center p-10">
//             <motion.div
//               className="w-16 h-16 border-t-4 border-cyanz rounded-full"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             />
//           </div>
//         ) : (
//           <div className="overflow-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-cyanz bg-opacity-10">
//                   {truthTable.variables?.map(variable => (
//                     <th key={variable} className="border border-gray-300 px-4 py-2 text-center">
//                       {variable}
//                     </th>
//                   ))}
//                   <th className="border border-gray-300 px-4 py-2 text-center font-mono">
//                     {expression}
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {truthTable.rows?.map((row, rowIndex) => (
//                   <motion.tr 
//                     key={rowIndex}
//                     className={`
//                       ${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
//                       ${highlightedRow === rowIndex ? 'bg-yellowz bg-opacity-20' : ''}
//                       hover:bg-yellowz hover:bg-opacity-10
//                     `}
//                     onClick={() => setHighlightedRow(rowIndex === highlightedRow ? null : rowIndex)}
//                     whileHover={{ scale: 1.01 }}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.2, delay: rowIndex * 0.05 }}
//                   >
//                     {truthTable.variables.map(variable => (
//                       <td key={variable} className="border border-gray-300 px-4 py-2 text-center">
//                         {row.inputs[variable] ? '1' : '0'}
//                       </td>
//                     ))}
//                     <td className={`border border-gray-300 px-4 py-2 text-center font-bold ${row.result ? 'text-greenz' : 'text-redz'}`}>
//                       {row.result ? '1' : '0'}
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
        
//         {highlightedRow !== null && !isGenerating && (
//           <motion.div 
//             className="mt-4 bg-yellowz bg-opacity-20 p-3 rounded-lg border-l-4 border-yellowz"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <h5 className="font-medium">Row Analysis:</h5>
//             <p className="text-grayz">
//               When {truthTable.variables.map((variable, i) => (
//                 <span key={i}>
//                   {i > 0 && i === truthTable.variables.length - 1 ? ' and ' : i > 0 ? ', ' : ''}
//                   <strong>{variable} = {truthTable.rows[highlightedRow].inputs[variable] ? '1' : '0'}</strong>
//                 </span>
//               ))}, the expression <span className="font-mono">{expression}</span> evaluates to <strong className={truthTable.rows[highlightedRow].result ? 'text-greenz' : 'text-redz'}>
//                 {truthTable.rows[highlightedRow].result ? '1 (TRUE)' : '0 (FALSE)'}
//               </strong>.
//             </p>
//           </motion.div>
//         )}
//       </div>
      
//       <motion.div
//         className="mt-4 p-3 rounded-lg bg-bluez bg-opacity-10 border-l-4 border-bluez"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         <h5 className="font-medium text-bluez">Truth Table Insights:</h5>
//         <ul className="list-disc ml-5 mt-2 text-grayz">
//           <li>Click on any row to see a detailed analysis</li>
//           <li>Truth tables show all possible combinations of input values</li>
//           <li>For n variables, a truth table has 2<sup>n</sup> rows</li>
//           <li>Truth tables are useful for verifying logical equivalence</li>
//         </ul>
//       </motion.div>
//     </div>
//   );
// };

// export default TruthTableVisualizer;