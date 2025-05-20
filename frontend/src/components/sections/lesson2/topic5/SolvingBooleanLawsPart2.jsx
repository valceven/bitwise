import React, { useState } from 'react';

const SolvingBooleanLawsPart2 = () => {
    const [activeTab, setActiveTab] = useState('sop');
    const [showExample1, setShowExample1] = useState(false);
    const [showExample2, setShowExample2] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState({
        q1: '',
        q2: ''
    });
    const [showAnswers, setShowAnswers] = useState(false);
    
    const handleQuizAnswer = (question, answer) => {
        setQuizAnswers({
            ...quizAnswers,
            [question]: answer
        });
    };
    
    const checkAnswers = () => {
        setShowAnswers(true);
    };
    
    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <header className="bg-bluez text-white p-8 rounded-lg shadow-md mb-8">
                    <h1 className="text-3xl font-bold text-center">SOP and POS Forms in Boolean Algebra</h1>
                    <p className="text-center mt-2 text-white">Understanding Canonical Forms and Their Applications</p>
                </header>
                
                {/* Introduction Card */}
                <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border-l-4 border-bluez">
                    <h2 className="text-xl font-bold text-bluez border-b border-bluez pb-2 mb-4">Why SOP and POS Are Useful</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <span className="mr-2 text-xl">🔧</span>
                            <span>Both forms help <strong className="text-bluez">standardize</strong> how we write Boolean expressions, making them easier to analyze and manipulate.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl">💡</span>
                            <span>They allow easy <strong className="text-bluez">implementation into circuits</strong>, using combinations of AND, OR, and NOT gates in predictable patterns.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl">⚡</span>
                            <span>Engineers use these forms in design software to create <strong className="text-bluez">efficient, simplified digital circuits</strong> for everything from smartphones to supercomputers.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl">🔄</span>
                            <span>They provide a <strong className="text-bluez">systematic approach</strong> for converting between truth tables and Boolean expressions.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-xl">🧩</span>
                            <span>These forms are <strong className="text-bluez">fundamental building blocks</strong> that enable complex digital systems through logical composition.</span>
                        </li>
                    </ul>
                </div>
                
                {/* SOP and POS Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
                    <div className="flex border-b">
                        <button 
                            className={`flex-1 py-3 font-medium ${activeTab === 'sop' ? 'bg-bluez text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            onClick={() => setActiveTab('sop')}
                        >
                            Sum of Products (SOP)
                        </button>
                        <button 
                            className={`flex-1 py-3 font-medium ${activeTab === 'pos' ? 'bg-bluez text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            onClick={() => setActiveTab('pos')}
                        >
                            Product of Sums (POS)
                        </button>
                    </div>
                    
                    <div className="p-6">
                        {activeTab === 'sop' ? (
                            <div>
                                <h3 className="text-lg font-bold text-bluez mb-3">Sum of Products (SOP) Form</h3>
                                <p className="mb-4">SOP is a Boolean expression consisting of the sum (OR) of product (AND) terms. It's derived from the rows of a truth table where the output is 1.</p>
                                
                                <div className="bg-bluez p-4 rounded-lg mb-4">
                                    <p className="font-medium text-black">Key Characteristics:</p>
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li>Each product term corresponds to a single row in the truth table where the output is 1</li>
                                        <li>Directly maps to a two-level AND-OR circuit implementation</li>
                                        <li>Also known as disjunctive normal form (DNF)</li>
                                    </ul>
                                </div>
                                
                                <button 
                                    className="text-bluez font-medium flex items-center hover:underline"
                                    onClick={() => setShowExample1(!showExample1)}
                                >
                                    {showExample1 ? 'Hide Example' : 'Show Example'} 
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`ml-1 h-5 w-5 transition-transform ${showExample1 ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                {showExample1 && (
                                    <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="font-medium mb-2">Example: F(x,y,z) = x·y·z + x·y·z̄ + x̄·y·z</p>
                                        <p className="mb-3">This SOP expression means the function is true when:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>x AND y AND z are all true, OR</li>
                                            <li>x AND y are true AND z is false, OR</li>
                                            <li>x is false AND y AND z are true</li>
                                        </ul>
                                        <p className="mt-3 text-gray-700">In a circuit, we'd implement this with AND gates feeding into an OR gate.</p>
                                        <div className="flex justify-center mt-4">
                                            <div className="relative w-64 h-40 bg-white border border-gray-300 rounded-lg">
                                                {/* Simple circuit diagram */}
                                                <div className="absolute left-0 top-8 w-20 h-6 rounded-lg bg-bluez border border-bluez flex items-center justify-center text-xs">AND Gate 1</div>
                                                <div className="absolute left-0 top-20 w-20 h-6 rounded-lg bg-bluez border border-bluez flex items-center justify-center text-xs">AND Gate 2</div>
                                                <div className="absolute left-0 top-32 w-20 h-6 rounded-lg bg-bluez border border-bluez flex items-center justify-center text-xs">AND Gate 3</div>
                                                
                                                <div className="absolute right-0 top-20 w-20 h-6 rounded-lg bg-yellow-200 border border-yellow-400 flex items-center justify-center text-xs">OR Gate</div>
                                                
                                                {/* Connection lines */}
                                                <div className="absolute left-20 top-11 w-24 h-0.5 bg-gray-400"></div>
                                                <div className="absolute left-20 top-23 w-24 h-0.5 bg-gray-400"></div>
                                                <div className="absolute left-20 top-35 w-24 h-0.5 bg-gray-400"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-lg font-bold text-bluez mb-3">Product of Sums (POS) Form</h3>
                                <p className="mb-4">POS is a Boolean expression consisting of the product (AND) of sum (OR) terms. It's derived from the rows of a truth table where the output is 0.</p>
                                
                                <div className="bg-bluez p-4 rounded-lg mb-4">
                                    <p className="font-medium text-black">Key Characteristics:</p>
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li>Each sum term corresponds to a single row in the truth table where the output is 0</li>
                                        <li>Directly maps to a two-level OR-AND circuit implementation</li>
                                        <li>Also known as conjunctive normal form (CNF)</li>
                                    </ul>
                                </div>
                                
                                <button 
                                    className="text-bluez font-medium flex items-center hover:underline"
                                    onClick={() => setShowExample2(!showExample2)}
                                >
                                    {showExample2 ? 'Hide Example' : 'Show Example'} 
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`ml-1 h-5 w-5 transition-transform ${showExample2 ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                {showExample2 && (
                                    <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="font-medium mb-2">Example: F(x,y,z) = (x+y+z)·(x+y+z̄)·(x̄+y+z)</p>
                                        <p className="mb-3">This POS expression means the function is true only when all of these conditions are met:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Either x OR y OR z is true, AND</li>
                                            <li>Either x OR y is true OR z is false, AND</li>
                                            <li>Either x is false OR y is true OR z is true</li>
                                        </ul>
                                        <p className="mt-3 text-gray-700">In a circuit, we'd implement this with OR gates feeding into an AND gate.</p>
                                        <div className="flex justify-center mt-4">
                                            <div className="relative w-64 h-40 bg-white border border-gray-300 rounded-lg">
                                                {/* Simple circuit diagram */}
                                                <div className="absolute left-0 top-8 w-20 h-6 rounded-lg bg-yellow-200 border border-yellow-400 flex items-center justify-center text-xs">OR Gate 1</div>
                                                <div className="absolute left-0 top-20 w-20 h-6 rounded-lg bg-yellow-200 border border-yellow-400 flex items-center justify-center text-xs">OR Gate 2</div>
                                                <div className="absolute left-0 top-32 w-20 h-6 rounded-lg bg-yellow-200 border border-yellow-400 flex items-center justify-center text-xs">OR Gate 3</div>
                                                
                                                <div className="absolute right-0 top-20 w-20 h-6 rounded-lg bg-bluez border border-bluez flex items-center justify-center text-xs">AND Gate</div>
                                                
                                                {/* Connection lines */}
                                                <div className="absolute left-20 top-11 w-24 h-0.5 bg-gray-400"></div>
                                                <div className="absolute left-20 top-23 w-24 h-0.5 bg-gray-400"></div>
                                                <div className="absolute left-20 top-35 w-24 h-0.5 bg-gray-400"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Practical Applications */}
                <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
                    <h2 className="text-xl font-bold text-bluez border-b border-bluez pb-2 mb-4">Practical Applications</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="font-bold text-bluez mb-2">Digital Circuit Design</h3>
                            <p>Engineers use SOP and POS forms to systematically design complex circuits found in:</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>CPU arithmetic logic units (ALUs)</li>
                                <li>Memory address decoders</li>
                                <li>Control systems in industrial automation</li>
                            </ul>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="font-bold text-bluez mb-2">Logic Minimization</h3>
                            <p>These standard forms serve as starting points for techniques like:</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>Karnaugh maps (K-maps)</li>
                                <li>Quine-McCluskey algorithm</li>
                                <li>Computer-aided minimization in VLSI design</li>
                            </ul>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="font-bold text-bluez mb-2">Hardware Description Languages</h3>
                            <p>SOP and POS concepts appear in HDLs like VHDL and Verilog when:</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>Defining combinational logic blocks</li>
                                <li>Creating lookup tables for FPGAs</li>
                                <li>Optimizing synthesizable code</li>
                            </ul>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="font-bold text-bluez mb-2">Computer Science Theory</h3>
                            <p>These forms have theoretical importance in:</p>
                            <ul className="list-disc pl-5 mt-2">
                                <li>SAT solvers and boolean satisfiability problems</li>
                                <li>Database query optimization</li>
                                <li>Formal verification of hardware and software</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Comparison Table */}
                <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
                    <h2 className="text-xl font-bold text-bluez border-b border-bluez pb-2 mb-4">SOP vs POS Comparison</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-bluez">
                                    <th className="border border-bluez p-3 text-left">Feature</th>
                                    <th className="border border-bluez p-3 text-left">Sum of Products (SOP)</th>
                                    <th className="border border-bluez p-3 text-left">Product of Sums (POS)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-bluez p-3 font-medium bg-gray-50">Structure</td>
                                    <td className="border border-bluez p-3">OR of AND terms</td>
                                    <td className="border border-bluez p-3">AND of OR terms</td>
                                </tr>
                                <tr>
                                    <td className="border border-bluez p-3 font-medium bg-gray-50">Derived From</td>
                                    <td className="border border-bluez p-3">Truth table rows where output = 1</td>
                                    <td className="border border-bluez p-3">Truth table rows where output = 0</td>
                                </tr>
                                <tr>
                                    <td className="border border-bluez p-3 font-medium bg-gray-50">Circuit Implementation</td>
                                    <td className="border border-bluez p-3">Two-level AND-OR circuit</td>
                                    <td className="border border-bluez p-3">Two-level OR-AND circuit</td>
                                </tr>
                                <tr>
                                    <td className="border border-bluez p-3 font-medium bg-gray-50">Alternative Name</td>
                                    <td className="border border-bluez p-3">Disjunctive Normal Form (DNF)</td>
                                    <td className="border border-bluez p-3">Conjunctive Normal Form (CNF)</td>
                                </tr>
                                <tr>
                                    <td className="border border-bluez p-3 font-medium bg-gray-50">Best For</td>
                                    <td className="border border-bluez p-3">Functions with few 1s in truth table</td>
                                    <td className="border border-bluez p-3">Functions with few 0s in truth table</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                
                {/* Summary */}
                <div className="bg-gray rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-bluez mb-4">Key Takeaways</h2>
                    <ul className="space-y-2">
                        <li className="flex items-start">
                            <span className="mr-2 text-bluez font-bold">•</span>
                            <span>SOP and POS forms provide <strong>standardized methods</strong> to express Boolean functions</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-bluez font-bold">•</span>
                            <span>These forms serve as the <strong>bridge between truth tables and physical circuits</strong></span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-bluez font-bold">•</span>
                            <span>Understanding both forms allows engineers to <strong>choose the most efficient implementation</strong> based on the specific requirements</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2 text-bluez font-bold">•</span>
                            <span>These canonical forms are <strong>fundamental to computer engineering</strong> and essential building blocks of digital design</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SolvingBooleanLawsPart2;