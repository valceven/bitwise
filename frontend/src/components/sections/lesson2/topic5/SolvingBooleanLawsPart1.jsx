import { useState } from 'react';


const BooleanLawsPart1 = () => {
    
   
  const [activePath, setActivePath] = useState(null);
  
  const highlightPath = (path) => {
    setActivePath(path === activePath ? null : path);
  };

  return (
    <div className="bg-white min-h-screen text-blackz ">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="bg-bluez text-white p-8 mb-8 rounded-xl">
          <h1 className="text-3xl font-bold text-center">Different ways of solving using boolean algebra laws   </h1>
        </header>
        
        {/* Introduction Card */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border-l-4 border-bluez">
          <h2 className="text-xl font-bold text-bluez border-b border-lightpurple pb-2 mb-4">Boolean Algebra Is Not Always One-Way</h2>
          <p className="mb-3">
            Boolean Algebra isn't always about finding a single correct answer — it's about reaching the <span className="text-bluez font-bold">most simplified</span> version of a logical expression. Different students (or engineers!) might apply different laws in various orders, but if done correctly, they'll end up with <span className="text-bluez font-bold">equivalent expressions</span>, possibly in different forms.
          </p>
          <p>
            Understanding this flexibility is crucial when designing efficient digital circuits.
          </p>
        </div>
        
        {/* Representation Section */}
        <h2 className="text-xl font-bold text-bluez border-b border-lightpurple pb-2 mt-8 mb-6">Common Ways to Represent Boolean Expressions</h2>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* SOP Card */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6 border-t-4 border-bluez">
            <h3 className="flex items-center font-bold text-lg mb-3">
              <span className="mr-2 text-2xl">🔹</span> Sum of Products (SOP)
            </h3>
            <p className="mb-3"><strong>SOP</strong> is a standard form where a Boolean expression is written as a <strong>sum (OR)</strong> of <strong>products (AND)</strong>.</p>
            <p className="mb-3">Each <strong>product term</strong> (like A·B') represents a condition where the output is <strong>true (1)</strong>. These product terms are then combined using OR (+).</p>
            <div className="bg-offwhite p-4 rounded mb-3 font-mono">
              <strong>Example:</strong> F(A, B) = A'·B + A·B' + A·B
            </div>
            <p className="mb-2">This means F is true when:</p>
            <ul className="list-disc pl-5">
              <li><strong>A is 0 and B is 1</strong>, OR</li>
              <li><strong>A is 1 and B is 0</strong>, OR</li>
              <li><strong>A is 1 and B is 1</strong></li>
            </ul>
          </div>
          
          {/* POS Card */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6 border-t-4 border-darkpurple">
            <h3 className="flex items-center font-bold text-lg mb-3">
              <span className="mr-2 text-2xl">🔸</span> Product of Sums (POS)
            </h3>
            <p className="mb-3"><strong>POS</strong> is another standard form where a Boolean expression is written as a <strong>product (AND)</strong> of <strong>sums (OR)</strong>.</p>
            <p className="mb-3">Each <strong>sum term</strong> (like A + B') represents a condition where the output is <strong>false (0)</strong>. These terms are combined using AND (·).</p>
            <div className="bg-offwhite p-4 rounded mb-3 font-mono">
              <strong>Example:</strong> F(A, B) = (A + B) · (A + B')
            </div>
            <p>This means F is false only when both sum conditions are true, which corresponds to specific input combinations.</p>
          </div>
        </div>
        
        
        
        <div className="bg-offwhite min-h-screen text-blackz">
      <div className="max-w-4xl mx-auto p-6">
        {/* Different Paths Section */}
        <h2 className="text-xl font-bold text-bluez border-b border-lightpurple pb-2 mt-8 mb-6">Different Paths to Simplification</h2>
        
        <div className="mb-8">
          <p className="mb-6">Let's see how we can arrive at the same simplified expression through different paths using the laws we've learned:</p>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-center space-x-6 mb-6">
              <button 
                className={`px-4 py-2 rounded-md transition duration-200 ${activePath === 'path1' ? 'bg-bluez text-white' : 'bg-lightpurple bg-opacity-30 hover:bg-opacity-50 text-grayz'}`} 
                onClick={() => highlightPath('path1')}
              >
                Path 1: Factoring
              </button>
              <button 
                className={`px-4 py-2 rounded-md transition duration-200 ${activePath === 'path2' ? 'bg-bluez text-white' : 'bg-lightpurple bg-opacity-30 hover:bg-opacity-50 text-grayz'}`}
                onClick={() => highlightPath('path2')}
              >
                Path 2: SOP Analysis
              </button>
              <button 
                className={`px-4 py-2 rounded-md transition duration-200 ${activePath === null ? 'bg-bluez text-white' : 'bg-lightpurple bg-opacity-30 hover:bg-opacity-50 text-grayz'}`}
                onClick={() => setActivePath(null)}
              >
                Show Both Paths
              </button>
            </div>
            
            <div className="flex justify-center">
              <div className="w-full max-w-3xl relative">
                {/* Visualization Container */}
                <div className="h-80 relative">
                  {/* Starting Expression */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-0 z-10">
                    <div className="bg-bluez text-white px-6 py-3 rounded-md shadow-md font-bold text-lg">
                      A·B + A·B'
                    </div>
                  </div>
                  
                  {/* Path 1 - Left Side */}
                  <div className={`transition-opacity duration-300 ${(activePath === 'path1' || activePath === null) ? 'opacity-100' : 'opacity-30'}`}>
                    {/* Path 1 Arrow */}
                    <svg className="absolute left-1/4 top-14" width="100" height="50">
                      <defs>
                        <marker id="arrowhead1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill={activePath === 'path1' ? "#6E61FF" : "#9B9B9B"} />
                        </marker>
                      </defs>
                      <line x1="50" y1="0" x2="0" y2="50" stroke={activePath === 'path1' ? "#6E61FF" : "#9B9B9B"} strokeWidth="2" markerEnd="url(#arrowhead1)" />
                    </svg>
                    <div className="absolute left-1/4 top-14 -translate-x-1/2 pl-2 pt-4 text-sm text-grayz italic">
                      Factoring
                    </div>
                    
                    {/* Path 1 Step 1 */}
                    <div className="absolute left-1/4 transform -translate-x-1/2 top-32">
                      <div className={`px-5 py-3 rounded-md shadow-sm font-medium ${activePath === 'path1' ? 'bg-lightpurple bg-opacity-20 border-2 border-bluez' : 'bg-white border border-gray-200'}`}>
                        A·(B + B')
                      </div>
                    </div>
                    
                    {/* Path 1 Arrow 2 */}
                    <svg className="absolute left-1/4 top-48" width="2" height="40">
                      <line x1="1" y1="0" x2="1" y2="40" stroke={activePath === 'path1' ? "#6E61FF" : "#9B9B9B"} strokeWidth="2" strokeDasharray={activePath === 'path1' ? "0" : "4"} />
                    </svg>
                    <div className="absolute left-1/4 top-52 transform translate-x-4 text-xs text-grayz italic max-w-xs">
                      Complement Law: B + B' = 1
                    </div>
                    
                    {/* Path 1 Step 2 */}
                    <div className="absolute left-1/4 transform -translate-x-1/2 top-64">
                      <div className={`px-5 py-3 rounded-md shadow-sm font-medium ${activePath === 'path1' ? 'bg-lightpurple bg-opacity-20 border-2 border-bluez' : 'bg-white border border-gray-200'}`}>
                        A·(1)
                      </div>
                    </div>
                    
                    {/* Path 1 Final Arrow */}
                    <svg className="absolute left-1/3 top-74" width="100" height="30">
                      <line x1="0" y1="0" x2="80" y2="0" stroke={activePath === 'path1' ? "#6E61FF" : "#9B9B9B"} strokeWidth="2" strokeDasharray={activePath === 'path1' ? "0" : "4"} />
                    </svg>
                    <div className="absolute left-1/3 top-70" style={{transform: 'translateX(4rem)'}} >
                      <span className="text-xs text-grayz italic">Identity Law: A·1 = A</span>
                    </div>
                  </div>
                  
                  {/* Path 2 - Right Side */}
                  <div className={`transition-opacity duration-300 ${(activePath === 'path2' || activePath === null) ? 'opacity-100' : 'opacity-30'}`}>
                    {/* Path 2 Arrow */}
                    <svg className="absolute left-3/4 top-14" width="100" height="50">
                      <defs>
                        <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="10 0, 0 3.5, 10 7" fill={activePath === 'path2' ? "#6E61FF" : "#9B9B9B"} />
                        </marker>
                      </defs>
                      <line x1="50" y1="0" x2="100" y2="50" stroke={activePath === 'path2' ? "#6E61FF" : "#9B9B9B"} strokeWidth="2" markerEnd="url(#arrowhead2)" />
                    </svg>
                    <div className="absolute left-3/4 top-14" style={{transform: 'translateX(2rem) translateY(1rem)'}}>
                      <span className="text-sm text-grayz italic">SOP Analysis</span>
                    </div>
                    
                    {/* Path 2 Step 1 */}
                    <div className="absolute left-3/4 transform -translate-x-1/2 top-32">
                      <div className={`px-5 py-3 rounded-md shadow-sm font-medium ${activePath === 'path2' ? 'bg-lightpurple bg-opacity-20 border-2 border-bluez' : 'bg-white border border-gray-200'}`}>
                        A·(1)·B + A·(1)·B'
                      </div>
                    </div>
                    
                    {/* Path 2 Arrow 2 */}
                    <svg className="absolute left-3/4 top-48" width="2" height="40">
                      <line x1="1" y1="0" x2="1" y2="40" stroke={activePath === 'path2' ? "#6E61FF" : "#9B9B9B"} strokeWidth="2" strokeDasharray={activePath === 'path2' ? "0" : "4"} />
                    </svg>
                    <div className="absolute left-3/4 top-52" style={{transform: 'translateX(1rem)'}}>
                      <span className="text-xs text-grayz italic">Identity Law: A·1 = A</span>
                    </div>
                    
                    {/* Path 2 Step 2 */}
                    <div className="absolute left-3/4 transform -translate-x-1/2 top-64">
                      <div className={`px-5 py-3 rounded-md shadow-sm font-medium ${activePath === 'path2' ? 'bg-lightpurple bg-opacity-20 border-2 border-bluez' : 'bg-white border border-gray-200'}`}>
                        A·B + A·B'
                      </div>
                    </div>
                    
                    {/* Path 2 Final Arrow */}
                    <svg className="absolute left-2/3 top-74" width="100" height="30">
                      <line x1="100" y1="0" x2="20" y2="0" stroke={activePath === 'path2' ? "#6E61FF" : "#9B9B9B"} strokeWidth="2" strokeDasharray={activePath === 'path2' ? "0" : "4"} />
                    </svg>
                    <div className="absolute left-1/2 top-70" style={{transform: 'translateX(4rem)'}}>
                      <span className="text-xs text-grayz italic">Distributive Law</span>
                    </div>
                  </div>
                </div>
                
                {/* Final Result - Now outside the paths container */}
                <div className="flex flex-col items-center mt-12">
                  <div className="w-24 h-0.5 bg-grayz opacity-30 mb-6"></div>
                  <div className="bg-greenz text-white px-10 py-4 rounded-md shadow-md font-bold text-xl">
                    A
                  </div>
                  <div className="text-center mt-3 font-medium text-grayz">Final Simplified Expression</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-bluez mb-3">Understanding the Two Approaches</h3>
            <p className="mb-4">Both paths demonstrate different approaches to simplifying the expression A·B + A·B', yet they converge on the same result:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-md border ${activePath === 'path1' ? 'border-bluez bg-lightpurple bg-opacity-10' : 'border-gray-200'}`}>
                <h4 className="font-bold text-grayz mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-bluez text-white flex items-center justify-center mr-2 text-sm">1</span>
                  Path 1: Direct Factoring
                </h4>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Immediately apply factoring to recognize the common term A</li>
                  <li>This gives us A·(B + B')</li>
                  <li>Apply complement law: B + B' = 1</li>
                  <li>Resulting in A·(1)</li>
                  <li>Apply identity law: A·1 = A</li>
                  <li>Final result: A</li>
                </ol>
              </div>
              
              <div className={`p-4 rounded-md border ${activePath === 'path2' ? 'border-bluez bg-lightpurple bg-opacity-10' : 'border-gray-200'}`}>
                <h4 className="font-bold text-grayz mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-bluez text-white flex items-center justify-center mr-2 text-sm">2</span>
                  Path 2: SOP Analysis
                </h4>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Start with expression in SOP form: A·B + A·B'</li>
                  <li>Expand using identity law: A·(1)·B + A·(1)·B'</li>
                  <li>Simplify: A·B + A·B'</li>
                  <li>Apply distributive law to factor out A</li>
                  <li>This gives us A·(B + B')</li>
                  <li>Apply complement law, then identity law</li>
                  <li>Final result: A</li>
                </ol>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-lightpurple bg-opacity-10 rounded-md border border-bluez">
              <p className="flex items-start">
                <span className="text-bluez font-bold text-xl mr-2">✓</span>
                <span>Boolean expressions often have multiple valid simplification paths. The ability to recognize which approach is most efficient for a given expression is a valuable skill in circuit design and programming.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
        
        {/* Why Understanding Multiple Approaches Section */}
        <h2 className="text-xl font-bold text-bluez border-b border-lightpurple pb-2 mt-8 mb-6">Why Understanding Multiple Approaches Matters</h2>
        
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border-l-4 border-bluez">
          <p className="mb-3">In digital circuit design, the same logical function can be implemented in multiple ways. The approach you choose might depend on:</p>
          <ul className="list-disc pl-5 mb-3">
            <li>Available gates and components</li>
            <li>Speed requirements</li>
            <li>Power consumption constraints</li>
            <li>Physical space limitations</li>
          </ul>
          <p>A thorough understanding of Boolean algebra laws gives you the flexibility to find the most efficient implementation for your specific requirements.</p>
        </div>
        
        {/* Footer */}
        <footer className="text-center text-grayz text-sm mt-12 mb-6">
          <p>© 2025 Bitwise</p>
        </footer>
      </div>
    </div>
  );
};

export default BooleanLawsPart1;