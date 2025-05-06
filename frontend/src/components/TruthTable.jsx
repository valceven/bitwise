import React, { useEffect, useState } from "react";

export default function TruthTable() {
  const rows = [
    { r: true, s: true },
    { r: true, s: false },
    { r: false, s: true },
    { r: false, s: false },
  ];

  const expressionTemplates = [
    "s ∨ r",
    "s ∧ r",
    "s ⊕ r",
    "¬s ∨ r",
    "¬r ∧ s",
    "¬(s ∧ r)",
    "¬(s ∨ r)",
    "¬s ⊕ r",
  ];

  const [expression, setExpression] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [results, setResults] = useState([null, null, null, null]);
  const [score, setScore] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [expressionInfo, setExpressionInfo] = useState("");

  const evaluate = (row, expr) => {
    const { r, s } = row;

    switch (expr) {
      case "s ∨ r":
        return s || r;
      case "s ∧ r":
        return s && r;
      case "s ⊕ r":
        return s !== r;
      case "¬s ∨ r":
        return !s || r;
      case "¬r ∧ s":
        return !r && s;
      case "¬(s ∧ r)":
        return !(s && r);
      case "¬(s ∨ r)":
        return !(s || r);
      case "¬s ⊕ r":
        return (!s) !== r;
      default:
        return false;
    }
  };

  const getExpressionInfo = (expr) => {
    switch (expr) {
      case "s ∨ r":
        return "OR (∨): True when at least one variable is true";
      case "s ∧ r":
        return "AND (∧): True only when both variables are true";
      case "s ⊕ r":
        return "XOR (⊕): True when variables have different values";
      case "¬s ∨ r":
        return "NOT-OR: True when either NOT s is true OR r is true";
      case "¬r ∧ s":
        return "NOT-AND: True when NOT r is true AND s is true";
      case "¬(s ∧ r)":
        return "NAND: True when it's NOT the case that both s AND r are true";
      case "¬(s ∨ r)":
        return "NOR: True when it's NOT the case that either s OR r is true";
      case "¬s ⊕ r":
        return "NOT-XOR: True when NOT s has the same value as r";
      default:
        return "";
    }
  };

  // Random expression generator
  const generateRandomExpression = () => {
    const random = expressionTemplates[Math.floor(Math.random() * expressionTemplates.length)];
    setExpression(random);
    setExpressionInfo(getExpressionInfo(random));
    return random;
  };

  const generateNewProblem = () => {
    const expr = generateRandomExpression();
    const correct = rows.map(row => evaluate(row, expr) ? "T" : "F");
    setCorrectAnswers(correct);
    setAnswers(["", "", "", ""]);
    setResults([null, null, null, null]);
    setScore(null);
    setShowExplanation(false);
  };

  useEffect(() => {
    generateNewProblem();
  }, []);

  const handleChange = (index, value) => {
    const upper = value.toUpperCase();
    if (upper === "T" || upper === "F" || upper === "") {
      const newAnswers = [...answers];
      newAnswers[index] = upper;
      setAnswers(newAnswers);
    }
  };

  const checkAnswers = () => {
    // Only check if all answers are filled
    if (answers.some(ans => ans === "")) {
      alert("Please fill in all answers before checking");
      return;
    }
    
    const newResults = answers.map((ans, i) => ans === correctAnswers[i]);
    const totalCorrect = newResults.filter(r => r).length;
    setResults(newResults);
    setScore(totalCorrect);
  };

  const revealAnswers = () => {
    setAnswers([...correctAnswers]);
    setResults(correctAnswers.map(() => true));
    setScore(correctAnswers.length);
    setShowExplanation(true);
  };

  const renderExplanation = () => {
    if (!showExplanation) return null;
    
    return (
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-bold text-lg mb-2">Explanation of {expression}</h3>
        <p className="mb-2">{expressionInfo}</p>
        <table className="w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">r</th>
              <th className="border p-2">s</th>
              <th className="border p-2">{expression}</th>
              <th className="border p-2">Explanation</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              let explanation = "";
              switch (expression) {
                case "s ∨ r":
                  explanation = `${row.s ? "T" : "F"} OR ${row.r ? "T" : "F"} = ${correctAnswers[i]}`;
                  break;
                case "s ∧ r":
                  explanation = `${row.s ? "T" : "F"} AND ${row.r ? "T" : "F"} = ${correctAnswers[i]}`;
                  break;
                case "s ⊕ r":
                  explanation = `${row.s ? "T" : "F"} XOR ${row.r ? "T" : "F"} = ${correctAnswers[i]} (values are ${row.s !== row.r ? "different" : "the same"})`;
                  break;
                case "¬s ∨ r":
                  explanation = `NOT ${row.s ? "T" : "F"} OR ${row.r ? "T" : "F"} = ${!row.s ? "T" : "F"} OR ${row.r ? "T" : "F"} = ${correctAnswers[i]}`;
                  break;
                case "¬r ∧ s":
                  explanation = `NOT ${row.r ? "T" : "F"} AND ${row.s ? "T" : "F"} = ${!row.r ? "T" : "F"} AND ${row.s ? "T" : "F"} = ${correctAnswers[i]}`;
                  break;
                case "¬(s ∧ r)":
                  explanation = `NOT(${row.s ? "T" : "F"} AND ${row.r ? "T" : "F"}) = NOT(${row.s && row.r ? "T" : "F"}) = ${correctAnswers[i]}`;
                  break;
                case "¬(s ∨ r)":
                  explanation = `NOT(${row.s ? "T" : "F"} OR ${row.r ? "T" : "F"}) = NOT(${row.s || row.r ? "T" : "F"}) = ${correctAnswers[i]}`;
                  break;
                case "¬s ⊕ r":
                  explanation = `NOT ${row.s ? "T" : "F"} XOR ${row.r ? "T" : "F"} = ${!row.s ? "T" : "F"} XOR ${row.r ? "T" : "F"} = ${correctAnswers[i]} (values are ${!row.s !== row.r ? "different" : "the same"})`;
                  break;
              }
              
              return (
                <tr key={i}>
                  <td className="border p-2 text-center">{row.r ? "T" : "F"}</td>
                  <td className="border p-2 text-center">{row.s ? "T" : "F"}</td>
                  <td className="border p-2 text-center font-bold">{correctAnswers[i]}</td>
                  <td className="border p-2">{explanation}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Logic Truth Table</h2>
      
      <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="mb-2"><strong>Instructions:</strong> Fill in the truth table with "T" for true or "F" for false based on the given logical expression.</p>
        <p><strong>Symbols:</strong> ∨ = OR, ∧ = AND, ⊕ = XOR (exclusive OR), ¬ = NOT</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-center">
          Current Expression: <span className="text-blue-600">{expression}</span>
        </h3>
      </div>
      
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border">r</th>
              <th className="px-6 py-3 border">s</th>
              <th className="px-6 py-3 border">{expression}</th>
              <th className="px-6 py-3 border">Result</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-center border">
                  {row.r ? "T" : "F"}
                </td>
                <td className="px-6 py-4 font-medium text-center border">
                  {row.s ? "T" : "F"}
                </td>
                <td className="px-6 py-4 text-center border">
                  <input
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 p-1 text-center border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 text-lg"
                    value={answers[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    placeholder="?"
                  />
                </td>
                <td className="px-6 py-4 text-center border">
                  {results[i] !== null && (
                    <span 
                      className={`text-2xl ${results[i] ? "text-green-500" : "text-red-500"}`}
                      title={results[i] ? "Correct!" : `The correct answer is ${correctAnswers[i]}`}
                    >
                      {results[i] ? "✓" : "✗"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-4">
        <button
          onClick={checkAnswers}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Check Answers
        </button>
        <button
          onClick={revealAnswers}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Reveal Answers
        </button>
        <button
          onClick={generateNewProblem}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          New Problem
        </button>
      </div>

      {score !== null && (
        <div className="text-center text-lg mb-6">
          <p className={`font-bold ${score === rows.length ? "text-green-600" : "text-blue-600"}`}>
            Score: {score} / {rows.length}
            {score === rows.length && " - Perfect!"}
          </p>
        </div>
      )}
      
      {renderExplanation()}
    </div>
  );
}