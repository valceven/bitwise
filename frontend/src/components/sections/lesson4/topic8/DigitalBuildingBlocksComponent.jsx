import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DigitalBuildingBlocksComponent = () => {
  const [selectedBlock, setSelectedBlock] = useState('mux');
  
  // Multiplexer states
  const [muxInputs, setMuxInputs] = useState([false, true, false, true]); // I0, I1, I2, I3
  const [muxSelects, setMuxSelects] = useState([false, false]); // S0, S1
  
  // Demultiplexer states
  const [demuxInput, setDemuxInput] = useState(true); // Input
  const [demuxSelects, setDemuxSelects] = useState([false, false]); // S0, S1
  
  // Half adder states
  const [halfAdderA, setHalfAdderA] = useState(false);
  const [halfAdderB, setHalfAdderB] = useState(false);
  
  // Full adder states
  const [fullAdderA, setFullAdderA] = useState(false);
  const [fullAdderB, setFullAdderB] = useState(false);
  const [fullAdderCin, setFullAdderCin] = useState(false);
  
  // Multiplexer calculation
  const calculateMuxOutput = () => {
    const index = (muxSelects[1] ? 2 : 0) + (muxSelects[0] ? 1 : 0);
    return muxInputs[index];
  };
  
  // Demultiplexer calculation
  const calculateDemuxOutputs = () => {
    const outputs = [false, false, false, false];
    const index = (demuxSelects[1] ? 2 : 0) + (demuxSelects[0] ? 1 : 0);
    if (demuxInput) {
      outputs[index] = true;
    }
    return outputs;
  };
  
  // Half adder calculation
  const calculateHalfAdder = () => {
    const sum = halfAdderA !== halfAdderB; // XOR
    const carry = halfAdderA && halfAdderB; // AND
    return { sum, carry };
  };
  
  // Full adder calculation
  const calculateFullAdder = () => {
    const sum = (fullAdderA !== fullAdderB) !== fullAdderCin; // A XOR B XOR Cin
    const carry = (fullAdderA && fullAdderB) || (fullAdderCin && (fullAdderA !== fullAdderB)); // (A AND B) OR (Cin AND (A XOR B))
    return { sum, carry };
  };
  
  // Get results based on selected block
  const getResult = () => {
    switch(selectedBlock) {
      case 'mux': return calculateMuxOutput();
      case 'demux': return calculateDemuxOutputs();
      case 'half-adder': return calculateHalfAdder();
      case 'full-adder': return calculateFullAdder();
      default: return null;
    }
  };
  
  const result = getResult();
  
  // Toggle MUX inputs
  const toggleMuxInput = (index) => {
    const newInputs = [...muxInputs];
    newInputs[index] = !newInputs[index];
    setMuxInputs(newInputs);
  };
  
  // Toggle MUX select lines
  const toggleMuxSelect = (index) => {
    const newSelects = [...muxSelects];
    newSelects[index] = !newSelects[index];
    setMuxSelects(newSelects);
  };
  
  // Toggle DEMUX select lines
  const toggleDemuxSelect = (index) => {
    const newSelects = [...demuxSelects];
    newSelects[index] = !newSelects[index];
    setDemuxSelects(newSelects);
  };
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 rounded-lg bg-[#F1F6F1] shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#29314D] mb-4">
        <span className="text-[#56CCF2]">Digital Building Blocks</span>
      </h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 text-[#29314D]"
      >
        <p className="mb-4">
          By combining logic gates, we can create more complex digital building blocks that serve as
          fundamental components in digital systems. These include multiplexers, demultiplexers, 
          adders, and many other specialized circuits.
        </p>
      </motion.div>
      
      {/* Block Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        <h3 className="text-xl font-semibold text-[#29314D] mb-4">Select a Digital Building Block:</h3>
        
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedBlock('mux')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedBlock === 'mux' ? 'bg-[#56CCF2] text-white' : 'bg-[#F1F6F1] text-[#29314D] hover:bg-[#DAC3FF]'
            }`}
          >
            Multiplexer (MUX)
          </button>
          <button
            onClick={() => setSelectedBlock('demux')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedBlock === 'demux' ? 'bg-[#F2994A] text-white' : 'bg-[#F1F6F1] text-[#29314D] hover:bg-[#DAC3FF]'
            }`}
          >
            Demultiplexer (DEMUX)
          </button>
          <button
            onClick={() => setSelectedBlock('half-adder')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedBlock === 'half-adder' ? 'bg-[#27AE60] text-white' : 'bg-[#F1F6F1] text-[#29314D] hover:bg-[#DAC3FF]'
            }`}
          >
            Half Adder
          </button>
          <button
            onClick={() => setSelectedBlock('full-adder')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedBlock === 'full-adder' ? 'bg-[#6E61FF] text-white' : 'bg-[#F1F6F1] text-[#29314D] hover:bg-[#DAC3FF]'
            }`}
          >
            Full Adder
          </button>
        </div>
      </motion.div>
      
      {/* Block Description and Diagram */}
      <motion.div
        key={`block-${selectedBlock}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md mb-6"
      >
        {/* Multiplexer (MUX) */}
        {selectedBlock === 'mux' && (
          <div>
            <h3 className="text-xl font-semibold text-[#56CCF2] mb-3">Multiplexer (MUX)</h3>
            
            <div className="mb-4">
              <p className="text-[#29314D] mb-2">
                A multiplexer (MUX) is a data selector that selects one of several input data sources and 
                forwards it to a single output line. The selection is controlled by select lines.
              </p>
              <ul className="list-disc list-inside text-[#29314D] ml-4 mb-2">
                <li>Data inputs (I₀, I₁, I₂, I₃, ...): The input signals to be selected from</li>
                <li>Select inputs (S₀, S₁, ...): Control signals that determine which input to route to the output</li>
                <li>Output (Y): The selected input signal</li>
              </ul>
              <p className="text-[#29314D]">
                With n select lines, a multiplexer can select from 2ⁿ different input lines.
              </p>
              
              {/* MUX Diagram */}
              <div className="mt-4 flex justify-center">
                <svg width="200" height="180" viewBox="0 0 200 180" className="border border-[#DAC3FF] rounded-lg bg-white p-2">
                  {/* MUX Box */}
                  <rect x="65" y="30" width="70" height="120" fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2" rx="5" />
                  
                  {/* Input Lines */}
                  <line x1="15" y1="50" x2="65" y2="50" stroke="#29314D" strokeWidth="2" />
                  <line x1="15" y1="70" x2="65" y2="70" stroke="#29314D" strokeWidth="2" />
                  <line x1="15" y1="90" x2="65" y2="90" stroke="#29314D" strokeWidth="2" />
                  <line x1="15" y1="110" x2="65" y2="110" stroke="#29314D" strokeWidth="2" />
                  
                  {/* Output Line */}
                  <line x1="135" y1="80" x2="185" y2="80" stroke="#29314D" strokeWidth="2" />
                  
                  {/* Select Lines */}
                  <line x1="100" y1="150" x2="100" y2="170" stroke="#29314D" strokeWidth="2" />
                  <line x1="90" y1="150" x2="90" y2="170" stroke="#29314D" strokeWidth="2" />
                  
                  {/* Text Labels */}
                  <text x="25" y="55" fill="#29314D" fontSize="12" textAnchor="start">I₀</text>
                  <text x="25" y="75" fill="#29314D" fontSize="12" textAnchor="start">I₁</text>
                  <text x="25" y="95" fill="#29314D" fontSize="12" textAnchor="start">I₂</text>
                  <text x="25" y="115" fill="#29314D" fontSize="12" textAnchor="start">I₃</text>
                  
                  <text x="170" y="85" fill="#29314D" fontSize="12" textAnchor="middle">Y</text>
                  
                  <text x="90" y="180" fill="#29314D" fontSize="12" textAnchor="middle">S₀</text>
                  <text x="100" y="180" fill="#29314D" fontSize="12" textAnchor="middle">S₁</text>
                  
                  {/* MUX Label */}
                  <text x="100" y="90" fill="#56CCF2" fontSize="14" fontWeight="bold" textAnchor="middle">4:1</text>
                  <text x="100" y="105" fill="#56CCF2" fontSize="14" fontWeight="bold" textAnchor="middle">MUX</text>
                </svg>
              </div>
            </div>
            
            {/* MUX Interactive Controls */}
            <div className="bg-[#F1F6F1] p-4 rounded-lg">
              <h4 className="font-semibold text-[#29314D] mb-3">4-to-1 Multiplexer (2 select lines)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h5 className="font-semibold text-[#29314D] mb-2">Data Inputs:</h5>
                  <div className="space-y-2">
                    {muxInputs.map((value, index) => (
                      <div key={index} className="flex items-center">
                        <label className="block text-[#29314D] w-8">I{index}:</label>
                        <button
                          onClick={() => toggleMuxInput(index)}
                          className={`w-16 h-8 rounded-lg font-bold ${
                            value ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                          }`}
                        >
                          {value ? '1' : '0'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-[#29314D] mb-2">Select Lines:</h5>
                  <div className="space-y-2">
                    {muxSelects.map((value, index) => (
                      <div key={index} className="flex items-center">
                        <label className="block text-[#29314D] w-8">S{index}:</label>
                        <button
                          onClick={() => toggleMuxSelect(index)}
                          className={`w-16 h-8 rounded-lg font-bold ${
                            value ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                          }`}
                        >
                          {value ? '1' : '0'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center items-center mt-6 p-4 border-t border-[#DAC3FF]">
                <div className="text-center">
                  <h5 className="font-semibold text-[#29314D] mb-2">Selected Input:</h5>
                  <p className="text-[#29314D] mb-1">
                    {muxSelects[1] ? (muxSelects[0] ? 'I₃' : 'I₂') : (muxSelects[0] ? 'I₁' : 'I₀')}
                  </p>
                  <div className="mt-2">
                    <span className="font-semibold text-[#29314D]">Output (Y):</span>
                    <div
                      className={`w-16 h-8 rounded-lg font-bold inline-flex items-center justify-center ml-2 ${
                        result ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                      }`}
                    >
                      {result ? '1' : '0'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-[#DAC3FF] p-3 rounded-lg">
              <h5 className="font-semibold text-[#29314D] mb-1">Applications:</h5>
              <ul className="list-disc list-inside text-[#29314D] ml-4">
                <li>Data selection and routing in digital systems</li>
                <li>Implementation of programmable logic</li>
                <li>Communication channels selection</li>
                <li>Memory address decoding</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Demultiplexer (DEMUX) */}
        {selectedBlock === 'demux' && (
          <div>
            <h3 className="text-xl font-semibold text-[#F2994A] mb-3">Demultiplexer (DEMUX)</h3>
            
            <div className="mb-4">
              <p className="text-[#29314D] mb-2">
                A demultiplexer (DEMUX) does the opposite of a multiplexer. It takes a single input and 
                routes it to one of several outputs based on select lines.
              </p>
              <ul className="list-disc list-inside text-[#29314D] ml-4 mb-2">
                <li>Data input (D): The input signal to be routed</li>
                <li>Select inputs (S₀, S₁, ...): Control signals that determine which output to route the input to</li>
                <li>Outputs (Y₀, Y₁, Y₂, Y₃, ...): The possible destination lines for the input signal</li>
              </ul>
              <p className="text-[#29314D]">
                With n select lines, a demultiplexer can route the input to one of 2ⁿ different output lines.
              </p>
              
              {/* DEMUX Diagram */}
              <div className="mt-4 flex justify-center">
                <svg width="220" height="180" viewBox="0 0 220 180" className="border border-[#DAC3FF] rounded-lg bg-white p-2">
                  {/* DEMUX Box */}
                  <polygon points="80,30 160,60 160,120 80,150" fill="#F1F6F1" stroke="#F2994A" strokeWidth="2" />
                  
                  {/* Input Line */}
                  <line x1="40" y1="90" x2="80" y2="90" stroke="#29314D" strokeWidth="2" />
                  
                  {/* Output Lines */}
                  <line x1="160" y1="70" x2="200" y2="70" stroke="#29314D" strokeWidth="2" />
                  <line x1="160" y1="90" x2="200" y2="90" stroke="#29314D" strokeWidth="2" />
                  <line x1="160" y1="110" x2="200" y2="110" stroke="#29314D" strokeWidth="2" />
                  <line x1="160" y1="130" x2="200" y2="130" stroke="#29314D" strokeWidth="2" />
                  
                  {/* Select Lines */}
                  <line x1="100" y1="150" x2="100" y2="170" stroke="#29314D" strokeWidth="2" />
                  <line x1="140" y1="150" x2="140" y2="170" stroke="#29314D" strokeWidth="2" />
                  
                  {/* Text Labels */}
                  <text x="50" y="85" fill="#29314D" fontSize="12" textAnchor="start">D</text>
                  
                  <text x="185" y="75" fill="#29314D" fontSize="12" textAnchor="middle">Y₀</text>
                  <text x="185" y="95" fill="#29314D" fontSize="12" textAnchor="middle">Y₁</text>
                  <text x="185" y="115" fill="#29314D" fontSize="12" textAnchor="middle">Y₂</text>
                  <text x="185" y="135" fill="#29314D" fontSize="12" textAnchor="middle">Y₃</text>
                  
                  <text x="100" y="180" fill="#29314D" fontSize="12" textAnchor="middle">S₀</text>
                  <text x="140" y="180" fill="#29314D" fontSize="12" textAnchor="middle">S₁</text>
                  
                  {/* DEMUX Label */}
                  <text x="120" y="90" fill="#F2994A" fontSize="14" fontWeight="bold" textAnchor="middle">1:4</text>
                  <text x="120" y="110" fill="#F2994A" fontSize="14" fontWeight="bold" textAnchor="middle">DEMUX</text>
                </svg>
              </div>
            </div>
            
            {/* DEMUX Interactive Controls */}
            <div className="bg-[#F1F6F1] p-4 rounded-lg">
              <h4 className="font-semibold text-[#29314D] mb-3">1-to-4 Demultiplexer (2 select lines)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h5 className="font-semibold text-[#29314D] mb-2">Data Input:</h5>
                  <div className="flex items-center">
                    <label className="block text-[#29314D] w-8">D:</label>
                    <button
                      onClick={() => setDemuxInput(!demuxInput)}
                      className={`w-16 h-8 rounded-lg font-bold ${
                        demuxInput ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                      }`}
                    >
                      {demuxInput ? '1' : '0'}
                    </button>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-[#29314D] mb-2">Select Lines:</h5>
                  <div className="space-y-2">
                    {demuxSelects.map((value, index) => (
                      <div key={index} className="flex items-center">
                        <label className="block text-[#29314D] w-8">S{index}:</label>
                        <button
                          onClick={() => toggleDemuxSelect(index)}
                          className={`w-16 h-8 rounded-lg font-bold ${
                            value ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                          }`}
                        >
                          {value ? '1' : '0'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center items-center mt-6 p-4 border-t border-[#DAC3FF]">
                <div>
                  <h5 className="font-semibold text-[#29314D] mb-2 text-center">Outputs:</h5>
                  <div className="grid grid-cols-2 gap-4">
                    {result.map((value, index) => (
                      <div key={index} className="flex items-center">
                        <label className="block text-[#29314D] w-8">Y{index}:</label>
                        <div
                          className={`w-16 h-8 rounded-lg font-bold flex items-center justify-center ${
                            value ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                          }`}
                        >
                          {value ? '1' : '0'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-[#DAC3FF] p-3 rounded-lg">
              <h5 className="font-semibold text-[#29314D] mb-1">Applications:</h5>
              <ul className="list-disc list-inside text-[#29314D] ml-4">
                <li>Data distribution in digital systems</li>
                <li>Memory address decoding</li>
                <li>Communication channel allocation</li>
                <li>Serial-to-parallel conversion</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Half Adder */}
        {selectedBlock === 'half-adder' && (
          <div>
            <h3 className="text-xl font-semibold text-[#27AE60] mb-3">Half Adder</h3>
            
            <div className="mb-4">
              <p className="text-[#29314D] mb-2">
                A half adder is a digital circuit that performs the addition of two single binary digits and
                produces a sum and a carry output.
              </p>
              <ul className="list-disc list-inside text-[#29314D] ml-4 mb-2">
                <li>Inputs: Two single-bit binary values (A and B)</li>
                <li>Outputs: Sum (S) and Carry (C)</li>
              </ul>
              <p className="text-[#29314D]">
                The half adder uses an XOR gate for the sum and an AND gate for the carry output.
              </p>
              
              {/* Half Adder Diagram */}
              <div className="mt-4 flex justify-center">
                <svg width="280" height="180" viewBox="0 0 280 180" className="border border-[#DAC3FF] rounded-lg bg-white p-2">
                  {/* Inputs */}
                  <line x1="30" y1="60" x2="90" y2="60" stroke="#29314D" strokeWidth="2" />
                  <text x="50" y="55" fill="#29314D" fontSize="12" textAnchor="middle">A</text>
                  
                  <line x1="30" y1="120" x2="90" y2="120" stroke="#29314D" strokeWidth="2" />
                  <text x="50" y="115" fill="#29314D" fontSize="12" textAnchor="middle">B</text>
                  
                  {/* XOR Gate */}
                  <path d="M90,45 C100,45 110,45 120,60 C130,75 130,105 120,120 C110,135 100,135 90,135 Z" 
                        fill="#F1F6F1" stroke="#56CCF2" strokeWidth="2" />
                  <path d="M90,60 C95,60 100,60 100,60" stroke="#29314D" strokeWidth="1.5" />
                  <path d="M90,120 C95,120 100,120 100,120" stroke="#29314D" strokeWidth="1.5" />
                  <text x="110" y="95" fill="#29314D" fontSize="16" textAnchor="middle">⊕</text>
                  
                  {/* AND Gate */}
                  <path d="M170,45 C180,45 190,45 200,60 C210,75 210,105 200,120 C190,135 180,135 170,135 Z" 
                        fill="#F1F6F1" stroke="#9B51E0" strokeWidth="2" />
                  <path d="M170,60 C175,60 180,60 180,60" stroke="#29314D" strokeWidth="1.5" />
                  <path d="M170,120 C175,120 180,120 180,120" stroke="#29314D" strokeWidth="1.5" />
                  <text x="190" y="95" fill="#29314D" fontSize="16" textAnchor="middle">∧</text>
                  
                  {/* Connections */}
                  <line x1="70" y1="60" x2="70" y2="60" stroke="#29314D" strokeWidth="1.5" />
                  <line x1="70" y1="120" x2="70" y2="120" stroke="#29314D" strokeWidth="1.5" />
                  
                  {/* A wire to AND gate */}
                  <line x1="70" y1="60" x2="70" y2="90" stroke="#29314D" strokeWidth="1.5" />
                  <line x1="70" y1="90" x2="150" y2="90" stroke="#29314D" strokeWidth="1.5" />
                  <line x1="150" y1="60" x2="150" y2="90" stroke="#29314D" strokeWidth="1.5" />
                  <line x1="150" y1="60" x2="170" y2="60" stroke="#29314D" strokeWidth="1.5" />
                  
                  {/* B wire to AND gate */}
                  <line x1="70" y1="120" x2="70" y2="150" stroke="#29314D" strokeWidth="1.5" />
                  <line x1="70" y1="150" x2="150" y2="150" stroke="#29314D" strokeWidth="1.5" />
                  <line x1="150" y1="120" x2="150" y2="150" stroke="#29314D" strokeWidth="1.5" />
                  <line x1="150" y1="120" x2="170" y2="120" stroke="#29314D" strokeWidth="1.5" />
                  
                  {/* Outputs */}
                  <line x1="120" y1="90" x2="240" y2="90" stroke="#29314D" strokeWidth="2" />
                  <text x="230" y="85" fill="#29314D" fontSize="12" textAnchor="middle">Sum (S)</text>
                  
                  <line x1="200" y1="90" x2="240" y2="150" stroke="#29314D" strokeWidth="2" />
                  <text x="230" y="165" fill="#29314D" fontSize="12" textAnchor="middle">Carry (C)</text>
                  
                  {/* Half Adder Label */}
                  <text x="140" y="25" fill="#27AE60" fontSize="14" fontWeight="bold" textAnchor="middle">Half Adder</text>
                </svg>
              </div>
            </div>
            
            {/* Half Adder Interactive Controls */}
            <div className="bg-[#F1F6F1] p-4 rounded-lg">
              <h4 className="font-semibold text-[#29314D] mb-3">Half Adder</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h5 className="font-semibold text-[#29314D] mb-2">Inputs:</h5>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <label className="block text-[#29314D] w-8">A:</label>
                      <button
                        onClick={() => setHalfAdderA(!halfAdderA)}
                        className={`w-16 h-8 rounded-lg font-bold ${
                          halfAdderA ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                        }`}
                      >
                        {halfAdderA ? '1' : '0'}
                      </button>
                    </div>
                    <div className="flex items-center">
                      <label className="block text-[#29314D] w-8">B:</label>
                      <button
                        onClick={() => setHalfAdderB(!halfAdderB)}
                        className={`w-16 h-8 rounded-lg font-bold ${
                          halfAdderB ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                        }`}
                      >
                        {halfAdderB ? '1' : '0'}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-[#29314D] mb-2">Logic Gates:</h5>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <label className="block text-[#29314D] w-14">XOR:</label>
                      <div className="bg-[#56CCF2] text-white rounded-lg px-3 py-1">
                        A ⊕ B = {halfAdderA !== halfAdderB ? '1' : '0'}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <label className="block text-[#29314D] w-14">AND:</label>
                      <div className="bg-[#9B51E0] text-white rounded-lg px-3 py-1">
                        A · B = {halfAdderA && halfAdderB ? '1' : '0'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center items-center mt-6 p-4 border-t border-[#DAC3FF]">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <h5 className="font-semibold text-[#29314D] mb-2">Sum (S):</h5>
                    <div
                      className={`w-16 h-8 rounded-lg font-bold inline-flex items-center justify-center ${
                        result.sum ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                      }`}
                    >
                      {result.sum ? '1' : '0'}
                    </div>
                    <p className="text-[#29314D] text-sm mt-1">A ⊕ B</p>
                  </div>
                  <div className="text-center">
                    <h5 className="font-semibold text-[#29314D] mb-2">Carry (C):</h5>
                    <div
                      className={`w-16 h-8 rounded-lg font-bold inline-flex items-center justify-center ${
                        result.carry ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                      }`}
                    >
                      {result.carry ? '1' : '0'}
                    </div>
                    <p className="text-[#29314D] text-sm mt-1">A · B</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <h5 className="font-semibold text-[#29314D] mb-2">Binary Addition Result:</h5>
                <div className="inline-block bg-[#DAC3FF] px-4 py-2 rounded-lg text-[#29314D]">
                  <span className="font-mono">
                    {halfAdderA ? '1' : '0'} + {halfAdderB ? '1' : '0'} = {result.carry ? '1' : ''}{result.sum ? '1' : '0'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-[#DAC3FF] p-3 rounded-lg">
              <h5 className="font-semibold text-[#29314D] mb-1">Limitations:</h5>
              <p className="text-[#29314D] mb-2">
                The half adder can only add two single bits and cannot account for a carry input from a previous 
                addition. For multi-bit additions, a full adder is needed.
              </p>
              <h5 className="font-semibold text-[#29314D] mb-1">Applications:</h5>
              <ul className="list-disc list-inside text-[#29314D] ml-4">
                <li>Least significant bit (LSB) addition in arithmetic logic units (ALUs)</li>
                <li>Basic component in binary counters</li>
                <li>Building block for more complex adders</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Full Adder */}
        {selectedBlock === 'full-adder' && (
          <div>
            <h3 className="text-xl font-semibold text-[#6E61FF] mb-3">Full Adder</h3>
            
            <div className="mb-4">
              <p className="text-[#29314D] mb-2">
                A full adder is a digital circuit that performs addition of three bits: two input bits and a carry 
                input from a previous addition. It produces a sum and a carry output.
              </p>
              <ul className="list-disc list-inside text-[#29314D] ml-4 mb-2">
                <li>Inputs: Two single-bit binary values (A and B) and a carry input (Cin)</li>
                <li>Outputs: Sum (S) and Carry out (Cout)</li>
              </ul>
              <p className="text-[#29314D]">
                A full adder can be constructed using two half adders and an OR gate, or using a combination of 
                XOR, AND, and OR gates.
              </p>
              
              {/* Full Adder Diagram */}
              <div className="mt-4 flex justify-center">
                <svg width="320" height="220" viewBox="0 0 320 220" className="border border-[#DAC3FF] rounded-lg bg-white p-2">
                  {/* First Half Adder */}
                  <rect x="80" y="30" width="80" height="60" fill="#F1F6F1" stroke="#27AE60" strokeWidth="2" rx="3" />
                  <text x="120" y="65" fill="#27AE60" fontSize="11" fontWeight="bold" textAnchor="middle">Half Adder</text>
                  
                  {/* Second Half Adder */}
                  <rect x="180" y="70" width="80" height="60" fill="#F1F6F1" stroke="#27AE60" strokeWidth="2" rx="3" />
                  <text x="220" y="105" fill="#27AE60" fontSize="11" fontWeight="bold" textAnchor="middle">Half Adder</text>
                  
                  {/* OR Gate */}
                  <path d="M200,150 Q220,150 230,165 Q240,180 230,195 Q220,210 200,210 Z" 
                        fill="#F1F6F1" stroke="#F14E3A" strokeWidth="2" />
                  <text x="215" y="180" fill="#29314D" fontSize="14" textAnchor="middle">≥1</text>
                  
                  {/* Inputs */}
                  <line x1="20" y1="50" x2="80" y2="50" stroke="#29314D" strokeWidth="2" />
                  <text x="40" y="45" fill="#29314D" fontSize="12" textAnchor="middle">A</text>
                  
                  <line x1="20" y1="70" x2="80" y2="70" stroke="#29314D" strokeWidth="2" />
                  <text x="40" y="65" fill="#29314D" fontSize="12" textAnchor="middle">B</text>
                  
                  <line x1="20" y1="110" x2="180" y2="110" stroke="#29314D" strokeWidth="2" />
                  <text x="40" y="105" fill="#29314D" fontSize="12" textAnchor="middle">Cin</text>
                  
                  {/* Connections */}
                  <line x1="160" y1="50" x2="180" y2="50" stroke="#29314D" strokeWidth="2" />
                  <line x1="180" y1="50" x2="180" y2="90" stroke="#29314D" strokeWidth="2" />
                  
                  <line x1="160" y1="70" x2="170" y2="70" stroke="#29314D" strokeWidth="2" />
                  <line x1="170" y1="70" x2="170" y2="180" stroke="#29314D" strokeWidth="2" />
                  <line x1="170" y1="180" x2="200" y2="180" stroke="#29314D" strokeWidth="2" />
                  
                  <line x1="260" y1="90" x2="290" y2="90" stroke="#29314D" strokeWidth="2" />
                  <text x="280" y="85" fill="#29314D" fontSize="12" textAnchor="middle">Sum (S)</text>
                  
                  <line x1="260" y1="110" x2="270" y2="110" stroke="#29314D" strokeWidth="2" />
                  <line x1="270" y1="110" x2="270" y2="160" stroke="#29314D" strokeWidth="2" />
                  <line x1="270" y1="160" x2="200" y2="160" stroke="#29314D" strokeWidth="2" />
                  
                  <line x1="230" y1="180" x2="290" y2="180" stroke="#29314D" strokeWidth="2" />
                  <text x="280" y="175" fill="#29314D" fontSize="12" textAnchor="middle">Cout</text>
                  
                  {/* Full Adder Label */}
                  <text x="160" y="15" fill="#6E61FF" fontSize="14" fontWeight="bold" textAnchor="middle">Full Adder (using Half Adders)</text>
                </svg>
              </div>
            </div>
            
            {/* Full Adder Interactive Controls */}
            <div className="bg-[#F1F6F1] p-4 rounded-lg">
              <h4 className="font-semibold text-[#29314D] mb-3">Full Adder</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h5 className="font-semibold text-[#29314D] mb-2">Inputs:</h5>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <label className="block text-[#29314D] w-10">A:</label>
                      <button
                        onClick={() => setFullAdderA(!fullAdderA)}
                        className={`w-16 h-8 rounded-lg font-bold ${
                          fullAdderA ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                        }`}
                      >
                        {fullAdderA ? '1' : '0'}
                      </button>
                    </div>
                    <div className="flex items-center">
                      <label className="block text-[#29314D] w-10">B:</label>
                      <button
                        onClick={() => setFullAdderB(!fullAdderB)}
                        className={`w-16 h-8 rounded-lg font-bold ${
                          fullAdderB ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                        }`}
                      >
                        {fullAdderB ? '1' : '0'}
                      </button>
                    </div>
                    <div className="flex items-center">
                      <label className="block text-[#29314D] w-10">Cin:</label>
                      <button
                        onClick={() => setFullAdderCin(!fullAdderCin)}
                        className={`w-16 h-8 rounded-lg font-bold ${
                          fullAdderCin ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                        }`}
                      >
                        {fullAdderCin ? '1' : '0'}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-[#29314D] mb-2">Intermediate Calculations:</h5>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-[#29314D]">A ⊕ B = </span>
                      <span className={fullAdderA !== fullAdderB ? 'text-[#27AE60] font-semibold' : 'text-[#F14E3A] font-semibold'}>
                        {fullAdderA !== fullAdderB ? '1' : '0'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#29314D]">(A ⊕ B) ⊕ Cin = </span>
                      <span className={(fullAdderA !== fullAdderB) !== fullAdderCin ? 'text-[#27AE60] font-semibold' : 'text-[#F14E3A] font-semibold'}>
                        {(fullAdderA !== fullAdderB) !== fullAdderCin ? '1' : '0'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#29314D]">A · B = </span>
                      <span className={fullAdderA && fullAdderB ? 'text-[#27AE60] font-semibold' : 'text-[#F14E3A] font-semibold'}>
                        {fullAdderA && fullAdderB ? '1' : '0'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#29314D]">Cin · (A ⊕ B) = </span>
                      <span className={fullAdderCin && (fullAdderA !== fullAdderB) ? 'text-[#27AE60] font-semibold' : 'text-[#F14E3A] font-semibold'}>
                        {fullAdderCin && (fullAdderA !== fullAdderB) ? '1' : '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center items-center mt-6 p-4 border-t border-[#DAC3FF]">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <h5 className="font-semibold text-[#29314D] mb-2">Sum (S):</h5>
                    <div
                      className={`w-16 h-8 rounded-lg font-bold inline-flex items-center justify-center ${
                        result.sum ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                      }`}
                    >
                      {result.sum ? '1' : '0'}
                    </div>
                    <p className="text-[#29314D] text-sm mt-1">(A ⊕ B) ⊕ Cin</p>
                  </div>
                  <div className="text-center">
                    <h5 className="font-semibold text-[#29314D] mb-2">Carry Out (Cout):</h5>
                    <div
                      className={`w-16 h-8 rounded-lg font-bold inline-flex items-center justify-center ${
                        result.carry ? 'bg-[#27AE60] text-white' : 'bg-[#F14E3A] text-white'
                      }`}
                    >
                      {result.carry ? '1' : '0'}
                    </div>
                    <p className="text-[#29314D] text-sm mt-1">(A·B) + (Cin·(A⊕B))</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <h5 className="font-semibold text-[#29314D] mb-2">Binary Addition Result:</h5>
                <div className="inline-block bg-[#DAC3FF] px-4 py-2 rounded-lg text-[#29314D]">
                  <span className="font-mono">
                    {fullAdderA ? '1' : '0'} + {fullAdderB ? '1' : '0'} + {fullAdderCin ? '1' : '0'} (Cin) = {result.carry ? '1' : ''}{result.sum ? '1' : '0'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-[#DAC3FF] p-3 rounded-lg">
              <h5 className="font-semibold text-[#29314D] mb-1">Applications:</h5>
              <ul className="list-disc list-inside text-[#29314D] ml-4">
                <li>Basic building block for ripple carry adders, which add multi-bit binary numbers</li>
                <li>Used in Arithmetic Logic Units (ALUs) of processors</li>
                <li>Binary subtraction circuits (using 2's complement)</li>
                <li>Digital comparator circuits</li>
              </ul>
              
              <h5 className="font-semibold text-[#29314D] mt-3 mb-1">Cascading Full Adders:</h5>
              <p className="text-[#29314D]">
                Multiple full adders can be cascaded together to create a ripple carry adder that can add
                multi-bit binary numbers, with the carry output of each adder connected to the carry input
                of the next more significant bit position.
              </p>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Building Blocks Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-semibold text-[#29314D] mb-3">Digital Building Blocks Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#F1F6F1] p-3 rounded-lg border-l-4 border-[#56CCF2]"
          >
            <h4 className="font-semibold text-[#56CCF2]">Multiplexers (MUX)</h4>
            <p className="text-sm text-[#29314D]">Select one of many inputs to pass to a single output line. Essential for data routing.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#F1F6F1] p-3 rounded-lg border-l-4 border-[#F2994A]"
          >
            <h4 className="font-semibold text-[#F2994A]">Demultiplexers (DEMUX)</h4>
            <p className="text-sm text-[#29314D]">Route one input to one of many outputs. Critical for data distribution.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#F1F6F1] p-3 rounded-lg border-l-4 border-[#27AE60]"
          >
            <h4 className="font-semibold text-[#27AE60]">Half Adders</h4>
            <p className="text-sm text-[#29314D]">Add two bits, producing sum and carry outputs. Building blocks for arithmetic circuits.</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-[#F1F6F1] p-3 rounded-lg border-l-4 border-[#6E61FF]"
          >
            <h4 className="font-semibold text-[#6E61FF]">Full Adders</h4>
            <p className="text-sm text-[#29314D]">Add three bits (including carry), essential for multi-bit binary addition.</p>
          </motion.div>
        </div>
        
        <div className="mt-4 bg-[#DAC3FF] bg-opacity-40 p-3 rounded-lg">
          <p className="text-[#29314D]">
            These fundamental digital building blocks form the basis for more complex digital systems, such as 
            arithmetic logic units (ALUs), registers, counters, and memory units that make up modern 
            processors and digital devices.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default DigitalBuildingBlocksComponent;