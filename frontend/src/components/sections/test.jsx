// import React, { useState, useEffect, useRef } from 'react';

// export default function InteractiveBooleanAlgebra() {
//   // State for controlling which section is visible
//   const [currentSection, setCurrentSection] = useState(0);
//   // State for tracking if content is loaded
//   const [contentVisible, setContentVisible] = useState(false);
//   // State for typed text animation - with multiple text elements per section
//   const [typedTexts, setTypedTexts] = useState({});
//   const [currentlyTyping, setCurrentlyTyping] = useState(null);
//   // For tracking which text elements have completed typing
//   const [completedTyping, setCompletedTyping] = useState({});
//   // For quiz interactions
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [showFeedback, setShowFeedback] = useState(false);
//   // Track progress through each lesson
//   const [sectionProgress, setSectionProgress] = useState(0);
//   // Reference to store typing intervals
//   const typingIntervalsRef = useRef({});

//   // Function to animate typing for a specific text element
//   const animateTyping = (sectionId, textId, text, typingSpeed = 30) => {
//     // Clear any existing interval for this text
//     if (typingIntervalsRef.current[`${sectionId}-${textId}`]) {
//       clearInterval(typingIntervalsRef.current[`${sectionId}-${textId}`]);
//     }

//     setCurrentlyTyping(`${sectionId}-${textId}`);
//     let currentChar = 0;

//     const typingInterval = setInterval(() => {
//       if (currentChar < text.length) {
//         setTypedTexts(prev => ({
//           ...prev,
//           [`${sectionId}-${textId}`]: text.substring(0, currentChar + 1)
//         }));
//         currentChar++;
//       } else {
//         clearInterval(typingInterval);
//         setCompletedTyping(prev => ({
//           ...prev,
//           [`${sectionId}-${textId}`]: true
//         }));
//         setCurrentlyTyping(null);
//       }
//     }, typingSpeed);

//     typingIntervalsRef.current[`${sectionId}-${textId}`] = typingInterval;
//     return () => clearInterval(typingInterval);
//   };

//   // Start typing animation for section content when it becomes visible
//   useEffect(() => {
//     // Clear all typing intervals when changing sections
//     Object.values(typingIntervalsRef.current).forEach(interval => clearInterval(interval));
//     typingIntervalsRef.current = {};

//     if (contentVisible) {
//       const sectionTexts = getSectionTexts(currentSection);
//       if (sectionTexts && sectionTexts.length > 0) {
//         // Start typing the first text element
//         animateTyping(currentSection, 0, sectionTexts[0].text);
//       }
//     }

//     return () => {
//       // Cleanup typing intervals when component unmounts or section changes
//       Object.values(typingIntervalsRef.current).forEach(interval => clearInterval(interval));
//     };
//   }, [contentVisible, currentSection]);

//   // Chain typing animations - when one completes, start the next
//   useEffect(() => {
//     if (!currentlyTyping) {
//       const sectionTexts = getSectionTexts(currentSection);
//       if (!sectionTexts) return;

//       // Find the next text element that hasn't been typed yet
//       for (let i = 0; i < sectionTexts.length; i++) {
//         const key = `${currentSection}-${i}`;
//         if (!completedTyping[key]) {
//           animateTyping(currentSection, i, sectionTexts[i].text, sectionTexts[i].speed || 30);
//           break;
//         }
//       }
//     }
//   }, [currentlyTyping, completedTyping, currentSection]);

//   // Content reveal effect
//   useEffect(() => {
//     // Reset typing state when changing sections
//     setTypedTexts({});
//     setCompletedTyping({});
//     setCurrentlyTyping(null);

//     if (currentSection >= 0) {
//       const timer = setTimeout(() => {
//         setContentVisible(true);
//       }, 500);
      
//       return () => clearTimeout(timer);
//     }
//   }, [currentSection]);

//   // Get text content for the current section that should be animated
//   const getSectionTexts = (sectionIndex) => {
//     switch(sectionIndex) {
//       case 0:
//         return [
//           {
//             text: "📘 Laws of Boolean Algebra",
//             speed: 50
//           },
//           {
//             text: "In this lesson, you will understand the 10 fundamental Laws of Boolean Algebra, identify where to apply them, practice simplifying complex equations, and develop logical thinking skills.",
//             speed: 20
//           },
//           {
//             text: "💡Tip: Each law you learn is a powerful tool in reducing and understanding logic expressions. Try to visualize their effects using truth tables or circuit analogies!",
//             speed: 30
//           }
//         ];
//       case 1:
//         return [
//           {
//             text: "Boolean Algebra isn't just about operators — it's also governed by a set of laws that describe how Boolean values behave under different operations.",
//             speed: 25
//           },
//           {
//             text: "These laws help us simplify logic circuits, reduce code conditions, and make smarter decisions in both hardware and software.",
//             speed: 25
//           },
//           {
//             text: "Ready to dive into the core of logic?",
//             speed: 40
//           }
//         ];
//       case 2:
//         return [
//           {
//             text: "Before diving into complex logic circuits or digital system designs, it's essential to master the 10 foundational laws of Boolean Algebra.",
//             speed: 25
//           },
//           {
//             text: "These laws are the building blocks that allow us to manipulate, simplify, and optimize Boolean expressions — which is crucial in both programming and hardware logic.",
//             speed: 25
//           },
//           {
//             text: "💡Tip: Think of them as the grammar rules of logic. Just as you need grammar to construct proper sentences, you need these laws to build and simplify logical statements.",
//             speed: 30
//           },
//           {
//             text: "Each law describes how Boolean variables interact through operators like AND (·), OR (+), and NOT ('). Let's explore each of the 10 essential laws — explained simply with examples so you can apply them with confidence.",
//             speed: 25
//           }
//         ];
//       default:
//         return null;
//     }
//   };

//   // Handle advancing to next section
//   const nextSection = () => {
//     if (currentSection < sections.length - 1) {
//       setCurrentSection(currentSection + 1);
//       setContentVisible(false);
//       setSectionProgress(0);
//     }
//   };

//   // Handle going back to previous section
//   const prevSection = () => {
//     if (currentSection > 0) {
//       setCurrentSection(currentSection - 1);
//       setContentVisible(false);
//     }
//   };

//   // Handle quiz answer selection
//   const handleAnswerSelect = (index) => {
//     setSelectedAnswer(index);
//   };

//   // Check answer and provide feedback
//   const checkAnswer = () => {
//     setShowFeedback(true);
//     if (selectedAnswer === 1) { // Correct answer index
//       setSectionProgress(prev => Math.min(prev + 25, 100));
//     }
//   };

//   // Continue after feedback
//   const continueLearning = () => {
//     setShowFeedback(false);
//     setSelectedAnswer(null);
//     if (sectionProgress >= 100) {
//       nextSection();
//     }
//   };

//   // Define sections content
//   const sections = [
//     // Laws of Boolean Algebra Section
//     {
//       render: () => (
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <div className="flex flex-col">
//             <h1 className="text-2xl font-bold text-gray-800 mb-6">
//               {typedTexts["0-0"] || ""}
//               {currentlyTyping === "0-0" && <span className="inline-block w-2 h-5 bg-gray-500 ml-1 animate-pulse"></span>}
//             </h1>

//             {completedTyping["0-0"] && (
//               <div className="text-base text-gray-700 mb-4 transition-opacity duration-500 opacity-100">
//                 <h2 className="text-xl font-bold text-gray-800 my-4">🎯 In this lesson, you will:</h2>
//                 <div>
//                   {typedTexts["0-1"] || ""}
//                   {currentlyTyping === "0-1" && <span className="inline-block w-2 h-5 bg-gray-500 ml-1 animate-pulse"></span>}
//                 </div>
//               </div>
//             )}
            
//             {completedTyping["0-1"] && (
//               <div className="mt-6 bg-yellow-100 p-4 rounded-xl border-l-4 border-yellow-400 transition-opacity duration-500 opacity-100">
//                 <p className="text-gray-600 italic">
//                   {typedTexts["0-2"] || ""}
//                   {currentlyTyping === "0-2" && <span className="inline-block w-2 h-5 bg-gray-500 ml-1 animate-pulse"></span>}
//                 </p>
//               </div>
//             )}
            
//             {completedTyping["0-2"] && (
//               <div className="mt-4 transition-opacity duration-500 opacity-100">
//                 <button 
//                   onClick={nextSection}
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Continue
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )
//     },

//     // Introduction Section
//     {
//       render: () => (
//         <div className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="text-base leading-relaxed">
//               {typedTexts["1-0"] || ""}
//               {currentlyTyping === "1-0" && <span className="inline-block w-2 h-5 bg-gray-500 ml-1 animate-pulse"></span>}
//             </div>
            
//             {completedTyping["1-0"] && (
//               <div className="mt-4 transition-opacity duration-500 opacity-100">
//                 <p className="text-base leading-relaxed">
//                   {typedTexts["1-1"] || ""}
//                   {currentlyTyping === "1-1" && <span className="inline-block w-2 h-5 bg-gray-500 ml-1 animate-pulse"></span>}
//                 </p>
//               </div>
//             )}
            
//             {completedTyping["1-1"] && (
//               <div className="mt-6 flex items-center justify-between transition-opacity duration-500 opacity-100">
//                 <div className="bg-blue-200 p-4 rounded-xl border-l-4 border-l-blue-400 w-full">
//                   <strong>
//                     {typedTexts["1-2"] || ""}
//                     {currentlyTyping === "1-2" && <span className="inline-block w-2 h-5 bg-gray-500 ml-1 animate-pulse"></span>}
//                   </strong>
//                 </div>
//               </div>
//             )}
            
//             {completedTyping["1-2"] && (
//               <div className="mt-6 flex justify-between transition-opacity duration-500 opacity-100">
//                 <button 
//                   onClick={prevSection}
//                   className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
//                 >
//                   Back
//                 </button>
//                 <button 
//                   onClick={nextSection}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//                 >
//                   Continue
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )
//     },

//     // Understanding the Laws Section
//     {
//       render: () => (
//         <div className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="p-4">
//               <div className="text-base leading-relaxed text-gray-800">
//                 {typedTexts["2-0"] || ""}
//                 {currentlyTyping === "2-0" && <span className="inline-block w-2 h-5 bg-gray-500 ml-1 animate-pulse"></span>}
//               </div>
              
//               {completedTyping["2-0"] && (
//                 <div className="mt-4 transition-opacity duration-500 opacity-100">
//                   <p className="text-base leading-relaxed text-gray-800">
//                     {typedTexts["2-1"] || ""}
//                     {currentlyTyping === "2-1" && <span className="inline-block w-2 h-5 bg-gray-500 ml-1 animate-pulse"></span>}
//                   </p>
//                 </div>
//               )}
              
//               {completedTyping["2-1"] && (
//                 <div className="mt-6 flex items-center justify-between transition-opacity duration-500 opacity-100">
//                   <div className="bg-yellow-100 p-4 rounded-xl border-l-4 border-l-yellow-400 w-full">
//                     <p className="text-sm text-black italic">
//                       {typedTexts["2-2"] || ""}
//                       {currentlyTyping === "2-2" && <span className="inline-block w-2 h-5 bg-gray-500 ml-1 animate-pulse"></span>}
//                     </p>
//                   </div>
//                 </div>
//               )}
              
//               {completedTyping["2-2"] && (
//                 <div className="mt-4 transition-opacity duration-500 opacity-100">
//                   <p className="text-base leading-relaxed text-gray-800">
//                     {typedTexts["2-3"] || ""}
//                     {currentlyTyping === "2-3" && <span className="inline-block w-2 h-5 bg-gray-500 ml-1 animate-pulse"></span>}
//                   </p>
//                 </div>
//               )}
              
//               {completedTyping["2-3"] && (
//                 <div className="mt-6 bg-blue-50 p-4 rounded-lg mb-6 transition-opacity duration-500 opacity-100">
//                   <h3 className="font-semibold text-blue-800 mb-2">💬 Professor Logic says:</h3>
//                   <p className="text-gray-700 italic">
//                     "The beauty of Boolean Algebra is that just 10 simple laws can describe the behavior of all digital systems - from a simple light switch to the most complex computer processors!"
//                   </p>
//                 </div>
//               )}
              
//               {completedTyping["2-3"] && (
//                 <div className="mt-6 flex justify-between">
//                   <button 
//                     onClick={prevSection}
//                     className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
//                   >
//                     Back
//                   </button>
//                   <button 
//                     onClick={nextSection}
//                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
//                   >
//                     Next Law
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )
//     },

//     // Annulment Laws
//     {
//       render: () => (
//         <div className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
//           <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
//             <h2 className="text-xl font-bold text-orange-800 mb-4">📘 Annulment Laws</h2>
            
//             <div className="bg-orange-50 p-4 rounded-lg mb-6">
//               <div className="flex items-start">
//                 <div className="bg-orange-100 p-2 rounded-full mr-3">
//                   <span className="text-orange-800 font-bold">💡</span>
//                 </div>
//                 <p className="text-gray-700">
//                   <span className="font-semibold">Annulment Laws</span> describe how certain operations can "annul" or override variables regardless of their value.
//                 </p>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//                 <h3 className="font-semibold text-lg mb-2">Annulment Law for AND (·)</h3>
//                 <div className="bg-gray-100 p-2 rounded text-center mb-2">
//                   <span className="font-mono text-lg">A · 0 = 0</span>
//                 </div>
//                 <p className="text-gray-600">
//                   When you AND any variable with 0, the result is always 0.
//                 </p>
//               </div>
              
//               <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//                 <h3 className="font-semibold text-lg mb-2">Annulment Law for OR (+)</h3>
//                 <div className="bg-gray-100 p-2 rounded text-center mb-2">
//                   <span className="font-mono text-lg">A + 1 = 1</span>
//                 </div>
//                 <p className="text-gray-600">
//                   When you OR any variable with 1, the result is always 1.
//                 </p>
//               </div>
//             </div>
            
//             <div className="bg-blue-50 p-4 rounded-lg mb-6">
//               <h3 className="font-semibold text-blue-800 mb-2">💬 Practical Application</h3>
//               <p>
//                 In circuit design, these laws help us understand how certain inputs can dominate a circuit's behavior. For example, if ANY input to an AND gate is 0, the output will always be 0 regardless of other inputs.
//               </p>
//             </div>
            
//             <div className="mt-6 flex justify-between">
//               <button 
//                 onClick={prevSection}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
//               >
//                 Back
//               </button>
//               <button 
//                 onClick={nextSection}
//                 className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
//               >
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//       )
//     },

//     // De Morgan's Laws 
//     {
//       render: () => (
//         <div className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
//           <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
//             <h2 className="text-xl font-bold text-red-800 mb-4">📘 De Morgan's Laws</h2>
            
//             <div className="bg-red-50 p-4 rounded-lg mb-6">
//               <div className="flex items-start">
//                 <div className="bg-red-100 p-2 rounded-full mr-3">
//                   <span className="text-red-800 font-bold">🔍</span>
//                 </div>
//                 <p className="text-gray-700">
//                   <span className="font-semibold">De Morgan's Laws</span> are powerful tools that help us transform complex expressions by showing the relationship between complementation and the basic operations.
//                 </p>
//               </div>
//             </div>
            
//             <div className="space-y-6 mb-6">
//               <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//                 <h3 className="font-semibold text-lg mb-2">First De Morgan's Law</h3>
//                 <div className="bg-gray-100 p-2 rounded text-center mb-2">
//                   <span className="font-mono text-lg">(A + B)' = A' · B'</span>
//                 </div>
//                 <p className="text-gray-600">
//                   The complement of a sum equals the product of the complements.
//                 </p>
//               </div>
              
//               <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
//                 <h3 className="font-semibold text-lg mb-2">Second De Morgan's Law</h3>
//                 <div className="bg-gray-100 p-2 rounded text-center mb-2">
//                   <span className="font-mono text-lg">(A · B)' = A' + B'</span>
//                 </div>
//                 <p className="text-gray-600">
//                   The complement of a product equals the sum of the complements.
//                 </p>
//               </div>
//             </div>
            
//             <div className="bg-green-50 p-4 rounded-lg mb-6">
//               <h3 className="font-semibold text-green-800 mb-2">💬 Real-World Example</h3>
//               <p>
//                 Imagine a security system where an alarm triggers when BOTH motion AND heat are detected. Using De Morgan's laws, we can determine that the alarm won't trigger when EITHER motion is NOT detected OR heat is NOT detected.
//               </p>
//             </div>
            
//             <div className="mt-6 flex justify-between">
//               <button 
//                 onClick={prevSection}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
//               >
//                 Back
//               </button>
//               <button 
//                 onClick={nextSection}
//                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
//               >
//                 Continue
//               </button>
//             </div>
//           </div>
//         </div>
//       )
//     },

//     // Conclusion
//     {
//       render: () => (
//         <div className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
//           <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-md">
//             <h2 className="text-2xl font-bold text-purple-800 mb-4">🎉 Congratulations!</h2>
            
//             <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
//               <p className="text-gray-700">
//                 You've learned some of the fundamental laws of Boolean Algebra! These laws are the foundation for:
//               </p>
//               <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
//                 <li>Simplifying complex logic circuits</li>
//                 <li>Optimizing digital system designs</li>
//                 <li>Creating efficient algorithms</li>
//                 <li>Understanding how computers process logical decisions</li>
//               </ul>
//             </div>
            
//             <div className="bg-blue-50 p-4 rounded-lg mb-6">
//               <h3 className="font-semibold text-blue-800 mb-2">💬 Next Steps</h3>
//               <p>
//                 Try applying these laws to simplify Boolean expressions on your own, and see how much you can reduce complex logic statements!
//               </p>
//             </div>
            
//             <div className="mt-6 flex justify-between">
//               <button 
//                 onClick={prevSection}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
//               >
//                 Back
//               </button>
//               <button 
//                 onClick={() => setCurrentSection(0)}
//                 className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
//               >
//                 Restart Lesson
//               </button>
//             </div>
//           </div>
//         </div>
//       )
//     }
//   ];

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4">
//       {sections[currentSection].render()}
//     </div>
//   );
// }