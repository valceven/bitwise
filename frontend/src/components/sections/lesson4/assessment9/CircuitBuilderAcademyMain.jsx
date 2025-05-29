import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Clock, Award, BookOpen, ArrowRight, Info, Zap, Target, Timer, Star, RotateCcw, Play, Settings, Search, Lightbulb, Cpu, AlertTriangle, Shield, Calculator, Home, Wrench, Trash2, TestTube, Layers } from "lucide-react"

// Enhanced color palette
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
  pinkz: "#FF6B9D",
  mintgreenz: "#51E5A8",
  lavenderz: "#B794F6",
  coralz: "#FF8A80",
  tealz: "#26C6DA",
  indigoz: "#5C7CFA",
  emeraldz: "#10B981",
  rosez: "#FB7185",
  violetz: "#8B5CF6",
  ambez: "#F59E0B",
  limez: "#84CC16",
  skyz: "#0EA5E9"
}

// Typewriter Component
const Typewriter = ({ text, delay = 50, className = "", onComplete }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(currentIndex + 1)
      }, delay)
      
      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      if (onComplete) onComplete()
    }
  }, [currentIndex, delay, text, isComplete, onComplete])

  return <span className={className}>{displayText}</span>
}

// Connection Point Component
const ConnectionPoint = ({ 
  gateId, 
  pointId, 
  position, 
  type, // 'input' or 'output'
  isConnecting, 
  onConnectionClick,
  isConnected = false 
}) => {
  return (
    <circle
      cx={position.x}
      cy={position.y}
      r="3"
      fill={isConnected ? (type === 'input' ? colors.coralz : colors.emeraldz) : 
            (type === 'input' ? 'red' : 'green')}
      stroke="black"
      strokeWidth="1"
      className={`cursor-pointer transition-all hover:scale-150 ${isConnecting ? 'animate-pulse' : ''}`}
      onClick={() => onConnectionClick(gateId, pointId, type, position)}
      style={{ zIndex: 100 }}
    />
  )
}

// Logic Gate Component for Circuit Building
const LogicGate = ({ 
  type, 
  id, 
  position, 
  onDrag, 
  onConnectionClick, 
  isSelected, 
  connections = [],
  isConnecting = false 
}) => {
  const gateRef = useRef(null)
  
  // Define connection points for each gate type
  const getConnectionPoints = () => {
    const points = []
    const baseX = position.x
    const baseY = position.y
    
    switch (type) {
      case 'AND':
      case 'NAND':
        points.push(
          { id: 'in1', type: 'input', x: baseX - 5, y: baseY + 15 },
          { id: 'in2', type: 'input', x: baseX - 5, y: baseY + 35 },
          { id: 'out', type: 'output', x: baseX + (type === 'NAND' ? 70 : 65), y: baseY + 25 }
        )
        break
      case 'OR':
      case 'NOR':
        points.push(
          { id: 'in1', type: 'input', x: baseX - 5, y: baseY + 15 },
          { id: 'in2', type: 'input', x: baseX - 5, y: baseY + 35 },
          { id: 'out', type: 'output', x: baseX + (type === 'NOR' ? 55 : 50), y: baseY + 25 }
        )
        break
      case 'XOR':
        points.push(
          { id: 'in1', type: 'input', x: baseX - 10, y: baseY + 15 },
          { id: 'in2', type: 'input', x: baseX - 10, y: baseY + 35 },
          { id: 'out', type: 'output', x: baseX + 50, y: baseY + 25 }
        )
        break
      case 'NOT':
        points.push(
          { id: 'in1', type: 'input', x: baseX - 5, y: baseY + 25 },
          { id: 'out', type: 'output', x: baseX + 50, y: baseY + 25 }
        )
        break
      case 'INPUT':
        points.push(
          { id: 'out', type: 'output', x: baseX + 40, y: baseY + 25 }
        )
        break
      case 'OUTPUT':
        points.push(
          { id: 'in1', type: 'input', x: baseX + 10, y: baseY + 25 }
        )
        break
    }
    return points
  }
  
  const gateSymbols = {
    AND: (
      <g>
        <path d="M0 0 L35 0 Q60 0 60 25 Q60 50 35 50 L0 50 Z" fill="white" stroke="black" strokeWidth="2"/>
        <text x="30" y="30" fontSize="10" textAnchor="middle" fill="black" fontWeight="bold">AND</text>
      </g>
    ),
    OR: (
      <g>
        <path d="M0 0 Q35 0 45 25 Q35 50 0 50 Q20 25 0 0" fill="white" stroke="black" strokeWidth="2"/>
        <text x="22" y="30" fontSize="10" textAnchor="middle" fill="black" fontWeight="bold">OR</text>
      </g>
    ),
    NOT: (
      <g>
        <path d="M0 0 L35 25 L0 50 Z" fill="white" stroke="black" strokeWidth="2"/>
        <circle cx="40" cy="25" r="5" fill="white" stroke="black" strokeWidth="2"/>
        <text x="15" y="30" fontSize="8" textAnchor="middle" fill="black" fontWeight="bold">NOT</text>
      </g>
    ),
    NAND: (
      <g>
        <path d="M0 0 L35 0 Q60 0 60 25 Q60 50 35 50 L0 50 Z" fill="white" stroke="black" strokeWidth="2"/>
        <circle cx="65" cy="25" r="5" fill="white" stroke="black" strokeWidth="2"/>
        <text x="30" y="30" fontSize="9" textAnchor="middle" fill="black" fontWeight="bold">NAND</text>
      </g>
    ),
    NOR: (
      <g>
        <path d="M0 0 Q35 0 45 25 Q35 50 0 50 Q20 25 0 0" fill="white" stroke="black" strokeWidth="2"/>
        <circle cx="50" cy="25" r="5" fill="white" stroke="black" strokeWidth="2"/>
        <text x="22" y="30" fontSize="9" textAnchor="middle" fill="black" fontWeight="bold">NOR</text>
      </g>
    ),
    XOR: (
      <g>
        <path d="M0 0 Q35 0 45 25 Q35 50 0 50 Q20 25 0 0" fill="white" stroke="black" strokeWidth="2"/>
        <path d="M-8 0 Q12 25 -8 50" fill="none" stroke="black" strokeWidth="2"/>
        <text x="22" y="30" fontSize="9" textAnchor="middle" fill="black" fontWeight="bold">XOR</text>
      </g>
    ),
    INPUT: (
      <g>
        <rect x="0" y="10" width="35" height="30" fill="#E3F2FD" stroke="black" strokeWidth="2" rx="4"/>
        <text x="17" y="30" fontSize="12" textAnchor="middle" fill="black" fontWeight="bold">{id}</text>
      </g>
    ),
    OUTPUT: (
      <g>
        <rect x="15" y="10" width="35" height="30" fill="#E8F5E8" stroke="black" strokeWidth="2" rx="4"/>
        <text x="32" y="30" fontSize="12" textAnchor="middle" fill="black" fontWeight="bold">Y</text>
      </g>
    )
  }

  const connectionPoints = getConnectionPoints()

  return (
    <motion.div
      ref={gateRef}
      drag={!isConnecting}
      dragMomentum={false}
      onDrag={onDrag}
      className={`absolute ${isConnecting ? 'cursor-crosshair' : 'cursor-move'} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        zIndex: isSelected ? 10 : 1
      }}
      whileHover={{ scale: isConnecting ? 1 : 1.05 }}
      whileDrag={{ scale: isConnecting ? 1 : 1.1, zIndex: 20 }}
    >
      <svg width="100" height="60" viewBox="-15 -10 100 70">
        {gateSymbols[type]}
        {/* Render connection points */}
        {connectionPoints.map(point => {
          const isConnected = connections.some(conn => 
            (conn.from.gateId === id && conn.from.pointId === point.id) ||
            (conn.to.gateId === id && conn.to.pointId === point.id)
          )
          return (
            <ConnectionPoint
              key={point.id}
              gateId={id}
              pointId={point.id}
              position={{ x: point.x - position.x, y: point.y - position.y }}
              type={point.type}
              isConnecting={isConnecting}
              onConnectionClick={onConnectionClick}
              isConnected={isConnected}
            />
          )
        })}
      </svg>
    </motion.div>
  )
}

// Connection Wire Component
const ConnectionWire = ({ from, to, isValid = true, onClick }) => {
  if (!from || !to) return null
  
  // Calculate control points for a smooth S-curve
  const dx = to.x - from.x
  const dy = to.y - from.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  // Create smooth curves based on distance
  const curve = Math.min(distance * 0.4, 100)
  const cp1x = from.x + curve
  const cp1y = from.y
  const cp2x = to.x - curve
  const cp2y = to.y
  
  const pathD = `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`
  
  return (
    <svg 
      className="absolute top-0 left-0 pointer-events-none"
      width="100%" 
      height="100%"
      style={{ zIndex: 0 }}
    >
      <defs>
        <marker
          id={`arrowhead-${isValid ? 'valid' : 'invalid'}`}
          markerWidth="12"
          markerHeight="8"
          refX="4"
          refY="5"
          orient="auto"
        >
          <polygon
            points="1 4, 4 5, 1 6"
            fill={isValid ? colors.emeraldz : colors.coralz}
            stroke={isValid ? colors.emeraldz : colors.coralz}
            strokeWidth="1"
          />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Glow effect background */}
      <path
        d={pathD}
        stroke={isValid ? colors.emeraldz : colors.coralz}
        strokeWidth="8"
        fill="none"
        opacity="0.3"
        filter="url(#glow)"
      />
      
      {/* Main wire */}
      <path
        d={pathD}
        stroke={isValid ? colors.emeraldz : colors.coralz}
        strokeWidth="4"
        fill="none"
        strokeDasharray={isValid ? "none" : "10,5"}
        markerEnd={`url(#arrowhead-${isValid ? 'valid' : 'invalid'})`}
        className="cursor-pointer pointer-events-auto hover:stroke-width-6 transition-all"
        onClick={onClick}
        style={{
          filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))"
        }}
      />
      
      {/* Signal flow animation */}
      {isValid && (
        <circle r="3" fill={colors.yellowz} opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href={`#path-${from.x}-${from.y}-${to.x}-${to.y}`}/>
          </animateMotion>
        </circle>
      )}
      
      {/* Hidden path for animation reference */}
      <path
        id={`path-${from.x}-${from.y}-${to.x}-${to.y}`}
        d={pathD}
        fill="none"
        stroke="none"
      />
    </svg>
  )
}

// Truth Table Component
const TruthTable = ({ inputs, expectedOutput, actualOutput, title = "Truth Table Validation" }) => {
  const inputNames = Object.keys(inputs[0])
  
  return (
    <div className="p-4 rounded-lg" style={{ backgroundColor: `${colors.cyanz}10` }}>
      <h4 className="font-bold mb-3 text-center" style={{ color: colors.cyanz }}>
        {title}
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="border-b-2" style={{ borderColor: colors.cyanz }}>
              {inputNames.map(name => (
                <th key={name} className="p-2 font-bold" style={{ color: colors.grayz }}>
                  {name}
                </th>
              ))}
              <th className="p-2 font-bold" style={{ color: colors.grayz }}>Expected</th>
              <th className="p-2 font-bold" style={{ color: colors.grayz }}>Your Circuit</th>
              <th className="p-2 font-bold" style={{ color: colors.grayz }}>✓</th>
            </tr>
          </thead>
          <tbody>
            {inputs.map((row, idx) => {
              const isCorrect = expectedOutput[idx] === actualOutput[idx]
              return (
                <tr key={idx} className="border-b" style={{ borderColor: `${colors.cyanz}30` }}>
                  {inputNames.map(name => (
                    <td key={name} className="p-2 font-mono" style={{ color: colors.grayz }}>
                      {row[name]}
                    </td>
                  ))}
                  <td className="p-2 font-mono font-bold" 
                      style={{ color: colors.grayz }}>
                    {expectedOutput[idx]}
                  </td>
                  <td className="p-2 font-mono font-bold" 
                      style={{ color: actualOutput[idx] !== undefined ? colors.grayz : colors.coralz }}>
                    {actualOutput[idx] !== undefined ? actualOutput[idx] : "?"}
                  </td>
                  <td className="p-2">
                    {actualOutput[idx] !== undefined && (
                      isCorrect ? 
                        <CheckCircle className="h-4 w-4 mx-auto" style={{ color: colors.emeraldz }} /> :
                        <XCircle className="h-4 w-4 mx-auto" style={{ color: colors.coralz }} />
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Circuit Builder Academy Component
const CircuitBuilderAcademy = ({ 
  onComplete, 
  onFinish,
  attemptsRemaining = 3, 
  currentAttempt = 1, 
  maxAttempts = 3, 
  studentAssessmentId 
}) => {
  const [currentCase, setCurrentCase] = useState(0)
  const [score, setScore] = useState(0)
  const [circuitsBuilt, setCircuitsBuilt] = useState(0)
  const [gameState, setGameState] = useState('intro') // intro, playing, testing, case_solved, completed
  const [showInstructions, setShowInstructions] = useState(true)
  const [instructionStep, setInstructionStep] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  
  // Circuit building state
  const [gates, setGates] = useState([])
  const [connections, setConnections] = useState([])
  const [selectedGate, setSelectedGate] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectFrom, setConnectFrom] = useState(null)
  const [actualOutput, setActualOutput] = useState([])
  const [testingMode, setTestingMode] = useState(false)
  const [circuitErrors, setCircuitErrors] = useState([])

  const canvasRef = useRef(null)

  // Instructions for the academy
  const instructions = [
    "Welcome to the Digital Circuit Architect Academy! 🏗️⚡ You'll design real circuits from Boolean expressions.",
    "Your mission: Build functional digital circuits by dragging gates and connecting wires to match given expressions.",
    "Start with simple expressions like 'Y = A AND B', then progress to complex ones like 'Y = (A OR B) AND (NOT C)'.",
    "Drag gates from the palette, drop them on the canvas, then click connection points to wire them together.",
    "Test your circuits with all input combinations to verify they match the Boolean expression perfectly!"
  ]

  // Circuit building challenges with progressive difficulty
  const architectCases = [
    {
      id: 1,
      title: "Basic AND Logic Designer",
      difficulty: "Apprentice",
      scenario: "Design a circuit where the output is HIGH only when BOTH inputs A and B are HIGH.",
      device: "🚪 Secure Door Controller",
      expression: "Y = A AND B",
      requiredGates: ["AND"],
      inputs: ["A", "B"],
      truthTable: {
        inputs: [
          { "A": 0, "B": 0 },
          { "A": 0, "B": 1 },
          { "A": 1, "B": 0 },
          { "A": 1, "B": 1 }
        ],
        output: [0, 0, 0, 1]
      },
      hint: "You need one AND gate with inputs A and B connected to it, and its output connected to Y.",
      points: 150,
      description: "Connect input A to the first input of an AND gate, input B to the second input, and the AND gate output to Y."
    },

    {
      id: 2,
      title: "Basic OR Logic Designer",
      difficulty: "Apprentice",
      scenario: "Design a circuit where the output is HIGH when EITHER input A OR input B (or both) is HIGH.",
      device: "🚨 Emergency Alert System", 
      expression: "Y = A OR B",
      requiredGates: ["OR"],
      inputs: ["A", "B"],
      truthTable: {
        inputs: [
          { "A": 0, "B": 0 },
          { "A": 0, "B": 1 },
          { "A": 1, "B": 0 },
          { "A": 1, "B": 1 }
        ],
        output: [0, 1, 1, 1]
      },
      hint: "You need one OR gate. Connect both inputs A and B to the OR gate, then connect its output to Y.",
      points: 150,
      description: "Connect input A to the first input of an OR gate, input B to the second input, and the OR gate output to Y."
    },

    {
      id: 3,
      title: "Inversion Circuit Architect",
      difficulty: "Architect",
      scenario: "Design a circuit that inverts the input signal - when A is HIGH, output should be LOW, and vice versa.",
      device: "📺 Signal Inverter",
      expression: "Y = NOT A",
      requiredGates: ["NOT"],
      inputs: ["A"],
      truthTable: {
        inputs: [
          { "A": 0 },
          { "A": 1 }
        ],
        output: [1, 0]
      },
      hint: "You need one NOT gate. Connect input A to the NOT gate, then connect the NOT gate output to Y.",
      points: 180,
      description: "Connect input A to the input of a NOT gate, and the NOT gate output to Y."
    },

    {
      id: 4,
      title: "Compound Logic Designer",
      difficulty: "Architect",
      scenario: "Design a circuit for: output HIGH when A is HIGH AND B is LOW.",
      device: "🔐 Access Control System",
      expression: "Y = A AND (NOT B)",
      requiredGates: ["AND", "NOT"],
      inputs: ["A", "B"],
      truthTable: {
        inputs: [
          { "A": 0, "B": 0 },
          { "A": 0, "B": 1 },
          { "A": 1, "B": 0 },
          { "A": 1, "B": 1 }
        ],
        output: [0, 0, 1, 0]
      },
      hint: "First invert B using a NOT gate, then use an AND gate to combine A with the inverted B.",
      points: 250,
      description: "Connect B to a NOT gate, then connect A and the NOT gate output to an AND gate, finally connect the AND output to Y."
    },

    {
      id: 5,
      title: "Advanced Logic Architect",
      difficulty: "Master",
      scenario: "Design a circuit for: output HIGH when (A OR B) AND the input C is LOW.",
      device: "🏭 Industrial Safety Controller",
      expression: "Y = (A OR B) AND (NOT C)",
      requiredGates: ["OR", "AND", "NOT"],
      inputs: ["A", "B", "C"],
      truthTable: {
        inputs: [
          { "A": 0, "B": 0, "C": 0 },
          { "A": 0, "B": 0, "C": 1 },
          { "A": 0, "B": 1, "C": 0 },
          { "A": 0, "B": 1, "C": 1 },
          { "A": 1, "B": 0, "C": 0 },
          { "A": 1, "B": 0, "C": 1 },
          { "A": 1, "B": 1, "C": 0 },
          { "A": 1, "B": 1, "C": 1 }
        ],
        output: [0, 0, 1, 0, 1, 0, 1, 0]
      },
      hint: "Create (A OR B) with an OR gate, invert C with a NOT gate, then AND these two results together.",
      points: 350,
      description: "Use an OR gate for (A OR B), a NOT gate for (NOT C), then combine both outputs with an AND gate connected to Y."
    },

    {
      id: 6,
      title: "Expert Circuit Architect", 
      difficulty: "Master",
      scenario: "Design a complex circuit: output HIGH when A is HIGH OR when both B and C are HIGH.",
      device: "🎛️ Multi-Input Logic Controller",
      expression: "Y = A OR (B AND C)",
      requiredGates: ["OR", "AND"],
      inputs: ["A", "B", "C"],
      truthTable: {
        inputs: [
          { "A": 0, "B": 0, "C": 0 },
          { "A": 0, "B": 0, "C": 1 },
          { "A": 0, "B": 1, "C": 0 },
          { "A": 0, "B": 1, "C": 1 },
          { "A": 1, "B": 0, "C": 0 },
          { "A": 1, "B": 0, "C": 1 },
          { "A": 1, "B": 1, "C": 0 },
          { "A": 1, "B": 1, "C": 1 }
        ],
        output: [0, 0, 0, 1, 1, 1, 1, 1]
      },
      hint: "First create (B AND C) with an AND gate, then use an OR gate to combine A with this result.",
      points: 400,
      description: "Connect B and C to an AND gate, then connect A and the AND gate output to an OR gate, with the OR output going to Y."
    }
  ]

  // Calculate totals
  const totalQuestions = architectCases.length
  const totalPossiblePoints = architectCases.reduce((sum, case_) => sum + case_.points, 0)

  // Initialize gates for current case
  useEffect(() => {
    if (gameState === 'playing') {
      const currentProblem = architectCases[currentCase]
      const initialGates = []
      
      // Add input gates
      currentProblem.inputs.forEach((input, idx) => {
        initialGates.push({
          id: input,
          type: 'INPUT',
          position: { x: 40, y: 50 + idx * 80 },
          isFixed: true
        })
      })
      
      // Add output gate
      initialGates.push({
        id: 'Y',
        type: 'OUTPUT', 
        position: { x: 580, y: 120 },
        isFixed: true
      })
      
      setGates(initialGates)
      setConnections([])
      setActualOutput([])
    }
  }, [currentCase, gameState])

  const startGame = () => {
    setGameState('playing')
    setShowInstructions(false)
  }

  const nextInstruction = () => {
    if (instructionStep < instructions.length - 1) {
      setInstructionStep(instructionStep + 1)
    } else {
      startGame()
    }
  }

  const addGate = (gateType) => {
    const newGate = {
      id: `${gateType}_${Date.now()}`,
      type: gateType,
      position: { x: 180 + Math.random() * 320, y: 80 + Math.random() * 180 },
      isFixed: false
    }
    setGates([...gates, newGate])
  }

  const updateGatePosition = (gateId, newPosition) => {
    setGates(gates.map(gate => 
      gate.id === gateId ? { ...gate, position: newPosition } : gate
    ))
  }

  const deleteGate = (gateId) => {
    setGates(gates.filter(gate => gate.id !== gateId))
    setConnections(connections.filter(conn => 
      conn.from.gateId !== gateId && conn.to.gateId !== gateId
    ))
  }

  const clearCircuit = () => {
    const fixedGates = gates.filter(gate => gate.isFixed)
    setGates(fixedGates)
    setConnections([])
    setActualOutput([])
    setCircuitErrors([])
    setIsConnecting(false)
    setConnectFrom(null)
  }

  // Handle connection point clicks
  const handleConnectionClick = (gateId, pointId, pointType, absolutePosition) => {
    const gate = gates.find(g => g.id === gateId)
    if (!gate) return
    
    const connectionPoint = {
      gateId,
      pointId,
      pointType,
      position: absolutePosition,
      gateType: gate.type
    }
    
    if (!isConnecting) {
      // Start connection from output point
      if (pointType === 'output') {
        setConnectFrom(connectionPoint)
        setIsConnecting(true)
      }
    } else {
      // Complete connection to input point
      if (pointType === 'input' && connectFrom) {
        // Validate connection
        if (connectFrom.gateId !== gateId && connectFrom.pointType === 'output') {
          // Check if this input is already connected
          const existingConnection = connections.find(conn => 
            conn.to.gateId === gateId && conn.to.pointId === pointId
          )
          
          if (!existingConnection) {
            const newConnection = {
              from: connectFrom,
              to: connectionPoint
            }
            setConnections([...connections, newConnection])
          }
        }
      }
      
      // Reset connection state
      setIsConnecting(false)
      setConnectFrom(null)
    }
  }

  // Delete a connection
  const deleteConnection = (connectionIndex) => {
    setConnections(connections.filter((_, idx) => idx !== connectionIndex))
  }

  // Get absolute position of connection point
  const getAbsoluteConnectionPosition = (gate, pointId) => {
    const baseX = gate.position.x
    const baseY = gate.position.y
    
    const connectionMap = {
      'INPUT': { 'out': { x: baseX + 40, y: baseY + 25 } },
      'OUTPUT': { 'in1': { x: baseX + 10, y: baseY + 25 } },
      'AND': { 
        'in1': { x: baseX - 5, y: baseY + 15 },
        'in2': { x: baseX - 5, y: baseY + 35 },
        'out': { x: baseX + 65, y: baseY + 25 }
      },
      'NAND': { 
        'in1': { x: baseX - 5, y: baseY + 15 },
        'in2': { x: baseX - 5, y: baseY + 35 },
        'out': { x: baseX + 70, y: baseY + 25 }
      },
      'OR': { 
        'in1': { x: baseX - 5, y: baseY + 15 },
        'in2': { x: baseX - 5, y: baseY + 35 },
        'out': { x: baseX + 50, y: baseY + 25 }
      },
      'NOR': { 
        'in1': { x: baseX - 5, y: baseY + 15 },
        'in2': { x: baseX - 5, y: baseY + 35 },
        'out': { x: baseX + 55, y: baseY + 25 }
      },
      'XOR': { 
        'in1': { x: baseX - 10, y: baseY + 15 },
        'in2': { x: baseX - 10, y: baseY + 35 },
        'out': { x: baseX + 50, y: baseY + 25 }
      },
      'NOT': { 
        'in1': { x: baseX - 5, y: baseY + 25 },
        'out': { x: baseX + 50, y: baseY + 25 }
      }
    }
    
    return connectionMap[gate.type]?.[pointId] || { x: baseX, y: baseY }
  }

  // Evaluate the actual circuit built by the user
  const evaluateUserCircuit = (inputValues) => {
    const errors = []
    
    // Build a map of gate outputs
    const gateOutputs = new Map()
    
    // Set input values
    const currentProblem = architectCases[currentCase]
    currentProblem.inputs.forEach(inputName => {
      const inputGate = gates.find(g => g.id === inputName && g.type === 'INPUT')
      if (inputGate) {
        gateOutputs.set(inputGate.id, inputValues[inputName])
      }
    })
    
    // Iteratively evaluate gates until all are resolved
    let changed = true
    let iterations = 0
    const maxIterations = 20 // Prevent infinite loops
    
    while (changed && iterations < maxIterations) {
      changed = false
      iterations++
      
      gates.forEach(gate => {
        if (gate.type === 'INPUT' || gateOutputs.has(gate.id)) return
        
        // Get inputs for this gate
        const gateInputs = {}
        let allInputsAvailable = true
        
        // Find connections to this gate's inputs
        connections.forEach(conn => {
          if (conn.to.gateId === gate.id) {
            const inputValue = gateOutputs.get(conn.from.gateId)
            if (inputValue !== undefined) {
              gateInputs[conn.to.pointId] = inputValue
            } else {
              allInputsAvailable = false
            }
          }
        })
        
        // Evaluate gate if all inputs are available
        if (allInputsAvailable) {
          let output
          
          switch (gate.type) {
            case 'AND':
              if ('in1' in gateInputs && 'in2' in gateInputs) {
                output = gateInputs.in1 && gateInputs.in2 ? 1 : 0
              }
              break
            case 'OR':
              if ('in1' in gateInputs && 'in2' in gateInputs) {
                output = gateInputs.in1 || gateInputs.in2 ? 1 : 0
              }
              break
            case 'NOT':
              if ('in1' in gateInputs) {
                output = gateInputs.in1 ? 0 : 1
              }
              break
            case 'NAND':
              if ('in1' in gateInputs && 'in2' in gateInputs) {
                output = !(gateInputs.in1 && gateInputs.in2) ? 1 : 0
              }
              break
            case 'NOR':
              if ('in1' in gateInputs && 'in2' in gateInputs) {
                output = !(gateInputs.in1 || gateInputs.in2) ? 1 : 0
              }
              break
            case 'XOR':
              if ('in1' in gateInputs && 'in2' in gateInputs) {
                output = (gateInputs.in1 !== gateInputs.in2) ? 1 : 0
              }
              break
            case 'OUTPUT':
              if ('in1' in gateInputs) {
                output = gateInputs.in1
              }
              break
          }
          
          if (output !== undefined) {
            gateOutputs.set(gate.id, output)
            changed = true
          }
        }
      })
    }
    
    // Get the final output
    const outputGate = gates.find(g => g.id === 'Y' && g.type === 'OUTPUT')
    const finalOutput = outputGate ? gateOutputs.get(outputGate.id) : undefined
    
    // Check for errors
    if (iterations >= maxIterations) {
      errors.push("Circuit has cycles or infinite loops")
    }
    
    if (finalOutput === undefined) {
      errors.push("Output Y is not connected or cannot be evaluated")
    }
    
    return { output: finalOutput, errors }
  }

  // Simulate circuit logic using actual connections
  const simulateCircuit = () => {
    const currentProblem = architectCases[currentCase]
    const results = []
    const allErrors = []
    
    currentProblem.truthTable.inputs.forEach(inputRow => {
      const { output, errors } = evaluateUserCircuit(inputRow)
      results.push(output)
      allErrors.push(...errors)
    })
    
    setCircuitErrors([...new Set(allErrors)]) // Remove duplicates
    setActualOutput(results)
    return results
  }

  const testCircuit = () => {
    setTestingMode(true)
    const results = simulateCircuit()
    const currentProblem = architectCases[currentCase]
    
    // Check if circuit is correct - compare actual results with expected
    const isCorrect = results.every((result, idx) => 
      result !== undefined && result === currentProblem.truthTable.output[idx]
    )
    
    // Also check if there are any circuit errors
    const hasErrors = circuitErrors.length > 0
    
    // Record the answer
    const answerData = {
      questionIndex: currentCase,
      isCorrect: isCorrect && !hasErrors,
      hintsUsed: hintsUsed,
      caseDifficulty: currentProblem.difficulty,
      caseTitle: currentProblem.title,
      circuitCorrect: isCorrect,
      circuitErrors: [...circuitErrors],
      actualOutput: [...results],
      expectedOutput: [...currentProblem.truthTable.output],
      pointsEarned: (isCorrect && !hasErrors) ? Math.max(100, currentProblem.points - (hintsUsed * 25)) : 0
    }
    setUserAnswers([...userAnswers, answerData])
    
    if (isCorrect && !hasErrors) {
      const points = Math.max(100, currentProblem.points - (hintsUsed * 25))
      setScore(score + points)
      setCircuitsBuilt(circuitsBuilt + 1)
      setGameState('case_solved')
      
      setTimeout(() => {
        if (currentCase < architectCases.length - 1) {
          nextCase()
        } else {
          completeGame()
        }
      }, 3000)
    } else {
      // Circuit is incorrect, stay in testing mode to show errors
      setTimeout(() => {
        setTestingMode(false)
      }, 2000)
    }
  }

  const nextCase = () => {
    setCurrentCase(currentCase + 1)
    setGameState('playing')
    setShowHint(false)
    setHintsUsed(0)
    setTestingMode(false)
    setActualOutput([])
    setCircuitErrors([])
    setIsConnecting(false)
    setConnectFrom(null)
  }

  const completeGame = () => {
    setGameState('completed')
    setIsCompleted(true)
  }

  const handleFinish = () => {
    const finalScore = Math.round((score / totalPossiblePoints) * 100)
    const assessmentData = {
      percentage: finalScore,
      score: score,
      totalQuestions: totalQuestions,
      totalPossiblePoints: totalPossiblePoints,
      circuitsBuilt: circuitsBuilt,
      userAnswers: userAnswers,
      currentAttempt: currentAttempt,
      maxAttempts: maxAttempts
    }
    
    if (onFinish) {
      onFinish(assessmentData)
    } else if (onComplete) {
      onComplete(assessmentData)
    }
  }

  const resetGame = () => {
    setCurrentCase(0)
    setScore(0)
    setCircuitsBuilt(0)
    setGameState('intro')
    setShowInstructions(true)
    setInstructionStep(0)
    setShowHint(false)
    setHintsUsed(0)
    setUserAnswers([])
    setIsCompleted(false)
    setGates([])
    setConnections([])
    setActualOutput([])
    setTestingMode(false)
    setCircuitErrors([])
    setIsConnecting(false)
    setConnectFrom(null)
  }

  const showHintHandler = () => {
    setShowHint(true)
    setHintsUsed(hintsUsed + 1)
  }

  // Completion Screen (Fixed - now shows proper results)
  if (gameState === 'completed') {
    const accuracy = Math.round((circuitsBuilt / architectCases.length) * 100)
    const finalScore = Math.round((score / totalPossiblePoints) * 100)
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center"
             style={{ background: `linear-gradient(135deg, ${colors.emeraldz}, ${colors.tealz})` }}>
          <Award className="h-12 w-12 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold" style={{ color: colors.grayz }}>
          Circuit Architect Mission Complete! 🎉
        </h2>
        
        {/* Score Circle */}
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg mx-auto"
          style={{
            background: `conic-gradient(${colors.indigoz} ${finalScore * 3.6}deg, ${colors.offwhite} 0deg)`,
            color: colors.indigoz,
          }}
        >
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
            {finalScore}%
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${colors.indigoz}20` }}>
            <div className="text-2xl font-bold" style={{ color: colors.indigoz }}>{finalScore}%</div>
            <div className="text-sm" style={{ color: colors.grayz }}>Final Score</div>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${colors.ambez}20` }}>
            <div className="text-2xl font-bold" style={{ color: colors.ambez }}>{score}</div>
            <div className="text-sm" style={{ color: colors.grayz }}>Points Earned</div>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${colors.emeraldz}20` }}>
            <div className="text-2xl font-bold" style={{ color: colors.emeraldz }}>{circuitsBuilt}</div>
            <div className="text-sm" style={{ color: colors.grayz }}>Circuits Built</div>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${colors.tealz}20` }}>
            <div className="text-2xl font-bold" style={{ color: colors.tealz }}>{accuracy}%</div>
            <div className="text-sm" style={{ color: colors.grayz }}>Success Rate</div>
          </div>
        </div>

        <div className="p-6 rounded-xl" 
             style={{ backgroundColor: finalScore >= 80 ? `${colors.emeraldz}10` : finalScore >= 60 ? `${colors.tealz}10` : `${colors.ambez}10` }}>
          <h3 className="font-bold text-lg mb-2" 
              style={{ color: finalScore >= 80 ? colors.emeraldz : finalScore >= 60 ? colors.tealz : colors.ambez }}>
            {finalScore >= 80 ? "Master Circuit Architect! 🏗️" :
             finalScore >= 60 ? "Expert Digital Designer! ⚡" :
             finalScore >= 40 ? "Good Circuit Builder! 👍" : "Apprentice Engineer! 📚"}
          </h3>
          <p className="text-sm" style={{ color: colors.grayz }}>
            {finalScore >= 80 ? "Outstanding! You've mastered digital circuit design and Boolean logic implementation." :
             finalScore >= 60 ? "Excellent work! You show strong skills in circuit building and logic gate connections." :
             finalScore >= 40 ? "Well done! You're developing solid circuit design skills and Boolean understanding." :
             "Good effort! Keep practicing to improve your circuit building and Boolean logic skills."}
          </p>
        </div>

        {/* Results Summary */}
        <div className="rounded-xl shadow-lg overflow-hidden w-full max-w-md mx-auto"
             style={{ background: `linear-gradient(135deg, ${colors.white}, ${colors.tealz}10)` }}>
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.indigoz }}>
              Your Results:
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg"
                   style={{ backgroundColor: `${colors.skyz}10` }}>
                <span className="font-medium">Circuits Designed:</span>
                <span className="font-bold" style={{ color: colors.indigoz }}>
                  {totalQuestions} / {totalQuestions}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg"
                   style={{ backgroundColor: `${colors.emeraldz}10` }}>
                <span className="font-medium">Successfully Built:</span>
                <span className="font-bold" style={{ color: colors.emeraldz }}>
                  {circuitsBuilt} / {totalQuestions}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg"
                   style={{ backgroundColor: `${colors.indigoz}10` }}>
                <span className="font-medium">Final Score:</span>
                <span className="font-bold text-xl" style={{ color: colors.indigoz }}>
                  {finalScore}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg"
                   style={{ backgroundColor: `${colors.ambez}10` }}>
                <span className="font-medium">Attempt:</span>
                <span className="font-bold" style={{ color: colors.ambez }}>
                  {currentAttempt} / {maxAttempts}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Only show restart if attempts remaining */}
          {attemptsRemaining > 1 && (
            <motion.button
              onClick={resetGame}
              className="px-6 py-3 rounded-lg font-medium transition-all"
              style={{ backgroundColor: colors.tealz, color: colors.white }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="h-4 w-4 mr-2 inline" />
              🔄 Try Again ({attemptsRemaining - 1} attempts left)
            </motion.button>
          )}
          
          {/* Finish Assessment Button */}
          <motion.button
            onClick={handleFinish}
            className="px-6 py-3 rounded-lg font-medium transition-all"
            style={{ backgroundColor: colors.emeraldz, color: colors.white }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Award className="h-4 w-4 mr-2 inline" />
            Finish Assessment
          </motion.button>
        </div>
      </motion.div>
    )
  }

  // Intro/Instructions Screen
  if (gameState === 'intro' && showInstructions) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
               style={{ background: `linear-gradient(135deg, ${colors.indigoz}, ${colors.tealz})` }}>
            <span className="text-3xl">🏗️</span>
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: colors.grayz }}>
            Digital Circuit Architect Academy
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-xl shadow-lg min-h-32"
          style={{ background: `linear-gradient(135deg, ${colors.white}, ${colors.indigoz}10)` }}
        >
          <div className="text-lg leading-relaxed" style={{ color: colors.grayz }}>
            <Typewriter
              text={instructions[instructionStep]}
              delay={30}
              onComplete={() => setTimeout(() => {}, 1000)}
            />
          </div>
        </motion.div>

        {/* Show attempt information */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 mb-2">
            📝 Attempt <strong>{currentAttempt}</strong> of <strong>{maxAttempts}</strong>
          </p>
          <p className="text-xs text-blue-600">
            {attemptsRemaining > 1
              ? `You have ${attemptsRemaining - 1} attempts remaining after this one.`
              : "This is your final attempt!"}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {instructions.map((_, idx) => (
              <div
                key={idx}
                className="w-3 h-3 rounded-full transition-all"
                style={{
                  backgroundColor: idx <= instructionStep ? colors.indigoz : colors.grayz + "40"
                }}
              />
            ))}
          </div>
          
          <motion.button
            onClick={nextInstruction}
            className="px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
            style={{ backgroundColor: colors.indigoz, color: colors.white }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {instructionStep === instructions.length - 1 ? (
              <>Start Building! <Wrench className="h-5 w-5 ml-2 inline" /></>
            ) : (
              <>Next <ArrowRight className="h-5 w-5 ml-2 inline" /></>
            )}
          </motion.button>
        </div>
      </div>
    )
  }

  // Case Solved Screen
  if (gameState === 'case_solved') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
             style={{ background: `linear-gradient(135deg, ${colors.emeraldz}, ${colors.tealz})` }}>
          <CheckCircle className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold" style={{ color: colors.grayz }}>
          Circuit Built Successfully! 🎉
        </h2>
        
        <div className="text-6xl">⚡</div>
        
        <p className="text-lg" style={{ color: colors.grayz }}>
          Perfect! Your circuit matches the Boolean expression. Moving to the next challenge...
        </p>
      </motion.div>
    )
  }

  const currentProblem = architectCases[currentCase]
  
  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center p-4 rounded-xl" 
        style={{ backgroundColor: `${colors.indigoz}20` }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" style={{ color: colors.indigoz }} />
            <span className="font-bold" style={{ color: colors.indigoz }}>Score: {score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" style={{ color: colors.emeraldz }} />
            <span className="font-bold" style={{ color: colors.emeraldz }}>Built: {circuitsBuilt}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full font-bold text-sm"
               style={{ 
                 backgroundColor: currentProblem.difficulty === 'Apprentice' ? `${colors.emeraldz}20` :
                                  currentProblem.difficulty === 'Architect' ? `${colors.indigoz}20` : `${colors.coralz}20`,
                 color: currentProblem.difficulty === 'Apprentice' ? colors.emeraldz :
                        currentProblem.difficulty === 'Architect' ? colors.indigoz : colors.coralz
               }}>
            {currentProblem.difficulty}
          </div>
          <div className="px-3 py-1 rounded-full font-bold"
               style={{ backgroundColor: colors.tealz, color: colors.white }}>
            Case {currentCase + 1}/{architectCases.length}
          </div>
        </div>
      </motion.div>

      {/* Case Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold mb-2" style={{ color: colors.grayz }}>
          🏗️ {currentProblem.title}
        </h3>
        <div className="text-3xl mb-2">{currentProblem.device}</div>
        <p className="text-lg mb-4" style={{ color: colors.grayz }}>
          {currentProblem.scenario}
        </p>
        <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: `${colors.indigoz}10` }}>
          <h4 className="font-bold mb-2" style={{ color: colors.indigoz }}>
            Boolean Expression to Build:
          </h4>
          <div className="text-xl font-mono font-bold" style={{ color: colors.grayz }}>
            {currentProblem.expression}
          </div>
        </div>
      </motion.div>

      {/* Gate Palette */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl" 
        style={{ backgroundColor: `${colors.tealz}10` }}
      >
        <h4 className="font-bold mb-4 text-center" style={{ color: colors.tealz }}>
          🔧 Gate Palette - Click to add gates to your circuit
        </h4>
        <div className="flex gap-4 justify-center flex-wrap">
          {["AND", "OR", "NOT", "NAND", "NOR", "XOR"].map(gateType => (
            <motion.button
              key={gateType}
              onClick={() => addGate(gateType)}
              className="px-6 py-3 rounded-lg border-2 transition-all hover:scale-105 font-bold"
              style={{ 
                backgroundColor: colors.white,
                borderColor: colors.tealz,
                color: colors.grayz,
                minWidth: '80px'
              }}
              whileHover={{ scale: 1.05, borderColor: colors.indigoz }}
              whileTap={{ scale: 0.95 }}
            >
              {gateType}
            </motion.button>
          ))}
        </div>
        <div className="text-center mt-3 text-sm" style={{ color: colors.grayz }}>
          💡 Click a gate type to add it to your circuit, then drag it to position
        </div>
      </motion.div>

      {/* Circuit Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="relative"
      >
        <div 
          ref={canvasRef}
          className="w-full h-96 rounded-xl border-2 relative overflow-hidden"
          style={{ 
            backgroundColor: `${colors.white}`,
            borderColor: colors.indigoz,
            backgroundImage: `radial-gradient(circle, ${colors.grayz}15 1px, transparent 1px)`,
            backgroundSize: '25px 25px',
            minHeight: '400px'
          }}
        >
          {/* Render gates */}
          {gates.map(gate => (
            <LogicGate
              key={gate.id}
              id={gate.id}
              type={gate.type}
              position={gate.position}
              onDrag={(event, info) => {
                if (!gate.isFixed && !isConnecting) {
                  updateGatePosition(gate.id, {
                    x: Math.max(0, Math.min(700, gate.position.x + info.delta.x)),
                    y: Math.max(0, Math.min(320, gate.position.y + info.delta.y))
                  })
                }
              }}
              onConnectionClick={handleConnectionClick}
              isSelected={selectedGate === gate.id}
              connections={connections}
              isConnecting={isConnecting}
            />
          ))}
          
          {/* Render connections */}
          {connections.map((connection, idx) => {
            const fromGate = gates.find(g => g.id === connection.from.gateId)
            const toGate = gates.find(g => g.id === connection.to.gateId)
            
            if (!fromGate || !toGate) return null
            
            const fromPos = getAbsoluteConnectionPosition(fromGate, connection.from.pointId)
            const toPos = getAbsoluteConnectionPosition(toGate, connection.to.pointId)
            
            return (
              <ConnectionWire 
                key={idx} 
                from={fromPos} 
                to={toPos}
                isValid={true}
                onClick={() => deleteConnection(idx)}
              />
            )
          })}
          
          {/* Temporary connection line while connecting */}
          {isConnecting && connectFrom && (
            <svg 
              className="absolute top-0 left-0 pointer-events-none"
              width="100%" 
              height="100%"
              style={{ zIndex: 5 }}
            >
              <line
                x1={connectFrom.position.x}
                y1={connectFrom.position.y}
                x2={connectFrom.position.x + 50}
                y2={connectFrom.position.y}
                stroke={colors.ambez}
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          )}
        </div>
        
        {/* Canvas Controls */}
        <div className="flex justify-between items-center mt-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex gap-3">
            <motion.button
              onClick={clearCircuit}
              className="px-5 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
              style={{ backgroundColor: colors.coralz, color: colors.white }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="h-4 w-4" />
              Clear Circuit
            </motion.button>
            <motion.button
              onClick={testCircuit}
              disabled={testingMode}
              className="px-5 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
              style={{ 
                backgroundColor: testingMode ? colors.grayz : colors.emeraldz, 
                color: colors.white,
                opacity: testingMode ? 0.7 : 1
              }}
              whileHover={{ scale: testingMode ? 1 : 1.05 }}
              whileTap={{ scale: testingMode ? 1 : 0.95 }}
            >
              <TestTube className="h-4 w-4" />
              {testingMode ? "Testing Circuit..." : "Test My Circuit"}
            </motion.button>
            {isConnecting && (
              <motion.button
                onClick={() => {
                  setIsConnecting(false)
                  setConnectFrom(null)
                }}
                className="px-5 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
                style={{ backgroundColor: colors.ambez, color: colors.white }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ❌ Cancel Connection
              </motion.button>
            )}
          </div>
          
          {/* Connection Instructions */}
          <div className="text-center px-4">
            <div className="text-sm font-medium mb-1" style={{ color: colors.indigoz }}>
              {isConnecting ? "🔗 Connecting Mode" : "🖱️ Connection Guide"}
            </div>
            <div className="text-xs" style={{ color: colors.grayz }}>
              {isConnecting ? 
                "Click a red input point to complete the wire connection" :
                "Click green output points → red input points to create wires"
              }
            </div>
          </div>
          
          {/* Hint Button */}
          {!showHint ? (
            <button
              onClick={showHintHandler}
              className="flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all hover:scale-105"
              style={{ backgroundColor: `${colors.yellowz}30`, color: colors.ambez, border: `2px solid ${colors.yellowz}` }}
            >
              <Lightbulb className="h-4 w-4" />
              💡 Need a Hint? (-25 pts)
            </button>
          ) : (
            <div className="max-w-xs p-4 rounded-lg border-2" 
                 style={{ 
                   backgroundColor: `${colors.yellowz}10`,
                   borderColor: colors.yellowz,
                   color: colors.ambez
                 }}>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4" />
                <span className="font-bold text-sm">💡 Circuit Hint:</span>
              </div>
              <p className="text-xs leading-relaxed">{currentProblem.hint}</p>
            </div>
          )}
        </div>
        
        {/* Circuit Errors Display */}
        {circuitErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border-2"
            style={{ 
              backgroundColor: `${colors.coralz}10`,
              borderColor: colors.coralz
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5" style={{ color: colors.coralz }} />
              <span className="font-bold" style={{ color: colors.coralz }}>Circuit Issues:</span>
            </div>
            <ul className="text-sm space-y-1">
              {circuitErrors.map((error, idx) => (
                <li key={idx} style={{ color: colors.grayz }}>• {error}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>

      {/* Truth Table Validation */}
      {actualOutput.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <TruthTable 
            inputs={currentProblem.truthTable.inputs}
            expectedOutput={currentProblem.truthTable.output}
            actualOutput={actualOutput}
          />
        </motion.div>
      )}

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="text-sm mb-2" style={{ color: colors.grayz }}>
          Building Progress
        </div>
        <div className="w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: colors.indigoz }}
            initial={{ width: 0 }}
            animate={{ width: `${((currentCase + 1) / architectCases.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function CircuitBuilderAcademyMain({ 
  onComplete, 
  onFinish,
  attemptsRemaining = 3, 
  currentAttempt = 1, 
  maxAttempts = 3, 
  studentAssessmentId 
}) {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto pb-16 px-4 min-h-screen" 
         style={{ background: `linear-gradient(135deg, ${colors.offwhite}, ${colors.indigoz}05)` }}>
      <div className="rounded-2xl shadow-xl p-8" style={{ backgroundColor: colors.white }}>
        <CircuitBuilderAcademy 
          onComplete={onComplete} 
          onFinish={onFinish}
          attemptsRemaining={attemptsRemaining}
          currentAttempt={currentAttempt}
          maxAttempts={maxAttempts}
          studentAssessmentId={studentAssessmentId}
        />
      </div>
    </div>
  )
}