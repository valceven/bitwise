import { useState, useEffect } from "react";
import {
  Calculator,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Zap,
  Shuffle,
  Delete,
  Trash2,
  Target,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  Info,
  Brain,
  RotateCcw,
  FastForward,
  Pause,
  PlayCircle,
} from "lucide-react";

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
  skyz: "#0EA5E9",
};

// Comprehensive Boolean Laws Reference
const booleanLaws = {
  identity: {
    name: "Identity Laws",
    rules: ["A + 0 = A", "A · 1 = A"],
    description: "Adding 0 or multiplying by 1 doesn't change the value",
    hint: "These are like the identity elements in math - they don't change anything!",
  },
  null: {
    name: "Null Laws",
    rules: ["A + 1 = 1", "A · 0 = 0"],
    description: "Adding 1 always gives 1, multiplying by 0 always gives 0",
    hint: "Think of these as 'dominating' operations - one value takes over completely.",
  },
  idempotent: {
    name: "Idempotent Laws",
    rules: ["A + A = A", "A · A = A"],
    description: "A variable combined with itself equals itself",
    hint: "Doing the same operation twice with the same variable is redundant.",
  },
  complement: {
    name: "Complement Laws",
    rules: ["A + A' = 1", "A · A' = 0"],
    description: "A variable combined with its complement",
    hint: "A variable is either true or false - combining both covers all possibilities!",
  },
  doublecomplement: {
    name: "Double Complement",
    rules: ["(A')' = A"],
    description: "The complement of a complement is the original",
    hint: "Double negative makes a positive - same logic applies here!",
  },
  absorption: {
    name: "Absorption Laws",
    rules: ["A + (A · B) = A", "A · (A + B) = A"],
    description: "A variable absorbs terms containing itself",
    hint: "If A is already there, additional conditions with A become redundant.",
  },
  demorgan: {
    name: "De Morgan's Laws",
    rules: ["(A + B)' = A' · B'", "(A · B)' = A' + B'"],
    description: "Complement distributes over operations with inversion",
    hint: "When you negate a compound expression, flip the operation AND negate each term.",
  },
  commutative: {
    name: "Commutative Laws",
    rules: ["A + B = B + A", "A · B = B · A"],
    description: "Order of variables doesn't matter",
    hint: "Just like addition and multiplication in regular math!",
  },
  associative: {
    name: "Associative Laws",
    rules: ["(A + B) + C = A + (B + C)", "(A · B) · C = A · (B · C)"],
    description: "Grouping of variables doesn't matter",
    hint: "Parentheses can be moved around without changing the result.",
  },
  distributive: {
    name: "Distributive Laws",
    rules: [
      "A · (B + C) = (A · B) + (A · C)",
      "A + (B · C) = (A + B) · (A + C)",
    ],
    description: "Operations can be distributed over each other",
    hint: "Like factoring in algebra - you can factor out or distribute terms.",
  },
};

// Enhanced Boolean Expression Parser with proper logic
class BooleanExpressionParser {
  constructor() {
    this.steps = [];
    this.stepCounter = 0;
    this.targetForm = "simplified";
  }

  parse(expression) {
    let cleaned = expression.replace(/\s+/g, "");
    // Normalize operators
    cleaned = cleaned.replace(/\*/g, "·");
    cleaned = cleaned.replace(/AND/gi, "·");
    cleaned = cleaned.replace(/OR/gi, "+");
    cleaned = cleaned.replace(/NOT/gi, "'");
    cleaned = cleaned.replace(/~/g, "'");
    cleaned = cleaned.replace(/!/g, "'");
    // Handle implicit multiplication
    cleaned = cleaned.replace(/([A-Z0-1])'?([A-Z(])/g, "$1·$2");
    cleaned = cleaned.replace(/([)])([A-Z(])/g, "$1·$2");
    cleaned = cleaned.replace(/([A-Z0-1])(\()/g, "$1·$2");
    return cleaned;
  }

  simplify(expression, targetForm = "simplified") {
    this.steps = [];
    this.stepCounter = 0;
    this.targetForm = targetForm;
    const current = this.parse(expression);

    if (!this.isValidExpression(current)) {
      throw new Error("Invalid Boolean expression");
    }

    this.addStep(
      current,
      "Original Expression",
      "Starting with the given Boolean expression",
      "start",
      "This is your original expression. Let's simplify it step by step!"
    );

    let simplified = current;
    const maxIterations = 25;
    let iteration = 0;
    let lastExpression = "";

    // Apply simplification rules
    while (iteration < maxIterations && simplified !== lastExpression) {
      lastExpression = simplified;
      simplified = this.applyAllSimplificationRules(simplified);
      iteration++;
    }

    // Convert to target form if specified
    if (targetForm === "sop") {
      simplified = this.convertToSOP(simplified);
    } else if (targetForm === "pos") {
      simplified = this.convertToPOS(simplified);
    }

    // Mark final step
    if (this.steps.length === 1) {
      const formText =
        targetForm === "sop"
          ? " (already in SOP form)"
          : targetForm === "pos"
          ? " (already in POS form)"
          : "";
      this.addStep(
        simplified,
        "Already Simplified",
        `Expression is already in its simplest form${formText}`,
        "final",
        "Great! This expression was already in its simplest form."
      );
    } else {
      if (this.steps.length > 1) {
        this.steps[this.steps.length - 1].type = "final";
        const formText =
          targetForm === "sop"
            ? " in Sum of Products (SOP) form"
            : targetForm === "pos"
            ? " in Product of Sums (POS) form"
            : "";
        this.steps[
          this.steps.length - 1
        ].hint = `🎉 Congratulations! You've reached the final simplified form${formText}.`;
      }
    }

    return {
      result: simplified,
      steps: this.steps,
      totalSteps: this.steps.length,
      lawsUsed: [
        ...new Set(
          this.steps
            .map((s) => s.lawUsed)
            .filter((l) => l !== "Original Expression")
        ),
      ],
      targetForm,
    };
  }

  convertToSOP(expression) {
    let result = expression;

    // Apply distributive law to expand products
    const distributivePattern = /([A-Z]'?)\s*·\s*\(([^)]+)\)/g;
    let match;
    while ((match = distributivePattern.exec(result)) !== null) {
      const variable = match[1];
      const terms = match[2].split("+").map((t) => t.trim());
      const distributed = terms
        .map((term) => `(${variable}·${term})`)
        .join("+");
      result = result.replace(match[0], distributed);
      this.addStep(
        result,
        "Distributive Laws",
        `Distributing ${variable} over (${match[2]})`
      );
    }

    return result;
  }

  convertToPOS(expression) {
    let result = expression;

    // Apply factoring to get POS form
    result = this.factorExpression(result);

    return result;
  }

  factorExpression(expression) {
    let result = expression;

    // Look for common factors in OR expressions
    const orTerms = result.split("+").map((t) => t.trim());
    if (orTerms.length > 1) {
      const commonVars = this.findCommonFactors(orTerms);
      if (commonVars.length > 0) {
        result = this.applyFactoring(orTerms, commonVars);
      }
    }

    return result;
  }

  findCommonFactors(terms) {
    if (terms.length === 0) return [];

    const firstTermVars = this.extractVariables(terms[0]);
    return firstTermVars.filter((variable) =>
      terms.every((term) => this.extractVariables(term).includes(variable))
    );
  }

  extractVariables(term) {
    const matches = term.match(/[A-Z]'?/g);
    return matches || [];
  }

  applyFactoring(terms, commonVars) {
    if (commonVars.length === 0) return terms.join("+");

    const factor = commonVars[0];
    const remaining = terms.map((term) => {
      return term
        .replace(new RegExp(factor + "\\s*·\\s*", "g"), "")
        .replace(new RegExp("\\s*·\\s*" + factor, "g"), "")
        .replace(new RegExp("^" + factor + "$", "g"), "1");
    });

    const factored = `${factor}·(${remaining.join("+")})`;
    this.addStep(factored, "Factoring", `Factoring out common term ${factor}`);
    return factored;
  }

  isValidExpression(expr) {
    let parenCount = 0;
    for (const char of expr) {
      if (char === "(") parenCount++;
      if (char === ")") parenCount--;
      if (parenCount < 0) return false;
    }
    return parenCount === 0;
  }

  addStep(expression, lawUsed, explanation, type = "intermediate", hint = "") {
    this.stepCounter++;
    this.steps.push({
      stepNumber: this.stepCounter,
      expression,
      lawUsed,
      explanation,
      hint: hint || this.getHintForLaw(lawUsed),
      type,
      id: Date.now() + Math.random(),
    });
  }

  getHintForLaw(lawName) {
    const lawKey = Object.keys(booleanLaws).find(
      (key) => booleanLaws[key].name === lawName
    );
    return lawKey
      ? booleanLaws[lawKey].hint
      : "Think about what this step accomplishes in simplification.";
  }

  applyAllSimplificationRules(expr) {
    let simplified = expr;

    // Apply rules in logical order
    const rules = [
      () => this.applyParenthesesRemoval(simplified),
      () => this.applyDoubleComplementLaws(simplified),
      () => this.applyNullLaws(simplified),
      () => this.applyIdentityLaws(simplified),
      () => this.applyComplementLaws(simplified),
      () => this.applyIdempotentLaws(simplified),
      () => this.applyAbsorptionLaws(simplified),
      () => this.applyDistributiveLaws(simplified),
      () => this.applyDeMorganLaws(simplified),
      () => this.applyAdvancedSimplification(simplified),
    ];

    for (const rule of rules) {
      const result = rule();
      if (result !== simplified) {
        return result;
      }
    }

    return simplified;
  }

  applyParenthesesRemoval(expr) {
    const singleVarPattern = /\(([A-Z]'?)\)/g;
    const newResult = expr.replace(singleVarPattern, "$1");
    if (newResult !== expr) {
      this.addStep(
        newResult,
        "Parentheses Removal",
        "Removing unnecessary parentheses"
      );
      return newResult;
    }
    return expr;
  }

  applyAdvancedSimplification(expr) {
    // Handle more complex patterns

    // Handle implicit multiplication
    let result = expr.replace(/([A-Z]'?)\(([^)]+)\)/g, "$1·($2)");
    if (result !== expr) {
      this.addStep(
        result,
        "Implicit Multiplication",
        "Converting implicit multiplication to explicit"
      );
      return result;
    }

    // X + X·Y = X (advanced absorption)
    let pattern = /([A-Z]'?)\+\1·([A-Z]'?)/g;
    result = expr.replace(pattern, "$1");
    if (result !== expr) {
      this.addStep(result, "Absorption Laws", "A + A·B = A");
      return result;
    }

    // X·Y + X = X (commutative absorption)
    pattern = /([A-Z]'?)·([A-Z]'?)\+\1/g;
    result = expr.replace(pattern, "$1");
    if (result !== expr) {
      this.addStep(result, "Absorption Laws", "A·B + A = A");
      return result;
    }

    // X·(X + Y) = X (advanced absorption)
    pattern = /([A-Z]'?)·\(\1\+([A-Z]'?)\)/g;
    result = expr.replace(pattern, "$1");
    if (result !== expr) {
      this.addStep(result, "Absorption Laws", "A·(A + B) = A");
      return result;
    }

    return expr;
  }

  applyIdentityLaws(expr) {
    const patterns = [
      {
        pattern: /([A-Z])\+0/g,
        replacement: "$1",
        law: "Identity Laws",
        explanation: "A + 0 = A",
      },
      {
        pattern: /0\+([A-Z])/g,
        replacement: "$1",
        law: "Identity Laws",
        explanation: "0 + A = A",
      },
      {
        pattern: /([A-Z])·1/g,
        replacement: "$1",
        law: "Identity Laws",
        explanation: "A · 1 = A",
      },
      {
        pattern: /1·([A-Z])/g,
        replacement: "$1",
        law: "Identity Laws",
        explanation: "1 · A = A",
      },
    ];

    for (const { pattern, replacement, law, explanation } of patterns) {
      const newResult = expr.replace(pattern, replacement);
      if (newResult !== expr) {
        this.addStep(newResult, law, explanation);
        return newResult;
      }
    }
    return expr;
  }

  applyNullLaws(expr) {
    const patterns = [
      {
        pattern: /([A-Z])\+1/g,
        replacement: "1",
        law: "Null Laws",
        explanation: "A + 1 = 1",
      },
      {
        pattern: /1\+([A-Z])/g,
        replacement: "1",
        law: "Null Laws",
        explanation: "1 + A = 1",
      },
      {
        pattern: /([A-Z])·0/g,
        replacement: "0",
        law: "Null Laws",
        explanation: "A · 0 = 0",
      },
      {
        pattern: /0·([A-Z])/g,
        replacement: "0",
        law: "Null Laws",
        explanation: "0 · A = 0",
      },
    ];

    for (const { pattern, replacement, law, explanation } of patterns) {
      const newResult = expr.replace(pattern, replacement);
      if (newResult !== expr) {
        this.addStep(newResult, law, explanation);
        return newResult;
      }
    }
    return expr;
  }

  applyIdempotentLaws(expr) {
    // A + A = A
    let pattern = /([A-Z]'?)\+\1(?![A-Z'])/g;
    let result = expr.replace(pattern, "$1");
    if (result !== expr) {
      this.addStep(result, "Idempotent Laws", "A + A = A");
      return result;
    }

    // A · A = A
    pattern = /([A-Z]'?)·\1(?![A-Z'])/g;
    result = expr.replace(pattern, "$1");
    if (result !== expr) {
      this.addStep(result, "Idempotent Laws", "A · A = A");
      return result;
    }

    return expr;
  }

  applyComplementLaws(expr) {
    const patterns = [
      {
        pattern: /([A-Z])\+\1'/g,
        replacement: "1",
        law: "Complement Laws",
        explanation: "A + A' = 1",
      },
      {
        pattern: /([A-Z])'\+\1/g,
        replacement: "1",
        law: "Complement Laws",
        explanation: "A' + A = 1",
      },
      {
        pattern: /([A-Z])·\1'/g,
        replacement: "0",
        law: "Complement Laws",
        explanation: "A · A' = 0",
      },
      {
        pattern: /([A-Z])'·\1/g,
        replacement: "0",
        law: "Complement Laws",
        explanation: "A' · A = 0",
      },
    ];

    for (const { pattern, replacement, law, explanation } of patterns) {
      const newResult = expr.replace(pattern, replacement);
      if (newResult !== expr) {
        this.addStep(newResult, law, explanation);
        return newResult;
      }
    }
    return expr;
  }

  applyDoubleComplementLaws(expr) {
    const double = expr.replace(/([A-Z])''/g, "$1");
    if (double !== expr) {
      this.addStep(double, "Double Complement", "(A')' = A");
      return double;
    }
    return expr;
  }

  applyAbsorptionLaws(expr) {
    const patterns = [
      // A + A·B = A
      {
        pattern: /([A-Z]'?)\+\1·([A-Z]'?)/g,
        replacement: "$1",
        explanation: "A + A·B = A",
      },
      // A·B + A = A
      {
        pattern: /([A-Z]'?)·([A-Z]'?)\+\1/g,
        replacement: "$1",
        explanation: "A·B + A = A",
      },
      // A·(A + B) = A
      {
        pattern: /([A-Z]'?)·\(\1\+([A-Z]'?)\)/g,
        replacement: "$1",
        explanation: "A·(A + B) = A",
      },
      // (A + B)·A = A
      {
        pattern: /\(([A-Z]'?)\+([A-Z]'?)\)·\1/g,
        replacement: "$1",
        explanation: "(A + B)·A = A",
      },
      // A + (A·B) = A
      {
        pattern: /([A-Z]'?)\+\(\1·([A-Z]'?)\)/g,
        replacement: "$1",
        explanation: "A + (A·B) = A",
      },
    ];

    for (const { pattern, replacement, explanation } of patterns) {
      const newResult = expr.replace(pattern, replacement);
      if (newResult !== expr) {
        this.addStep(newResult, "Absorption Laws", explanation);
        return newResult;
      }
    }
    return expr;
  }

  applyDistributiveLaws(expr) {
    const patterns = [
      // A·(B + C) = A·B + A·C
      {
        pattern: /([A-Z]'?)·\(([A-Z]'?)\+([A-Z]'?)\)/g,
        replacement: "($1·$2)+($1·$3)",
        explanation: "A·(B + C) = (A·B) + (A·C)",
      },
      // (A + B)·C = A·C + B·C
      {
        pattern: /\(([A-Z]'?)\+([A-Z]'?)\)·([A-Z]'?)/g,
        replacement: "($1·$3)+($2·$3)",
        explanation: "(A + B)·C = (A·C) + (B·C)",
      },
    ];

    for (const { pattern, replacement, explanation } of patterns) {
      const newResult = expr.replace(pattern, replacement);
      if (newResult !== expr) {
        this.addStep(newResult, "Distributive Laws", explanation);
        return newResult;
      }
    }
    return expr;
  }

  applyDeMorganLaws(expr) {
    const patterns = [
      // (A + B)' = A'·B'
      {
        pattern: /\(([A-Z]'?)\+([A-Z]'?)\)'/g,
        replacement: "$1'·$2'",
        explanation: "(A + B)' = A'·B'",
      },
      // (A·B)' = A' + B'
      {
        pattern: /\(([A-Z]'?)·([A-Z]'?)\)'/g,
        replacement: "$1'+$2'",
        explanation: "(A·B)' = A' + B'",
      },
      // Handle triple complements
      {
        pattern: /([A-Z])'''/g,
        replacement: "$1'",
        explanation: "A''' = A'",
      },
    ];

    for (const { pattern, replacement, explanation } of patterns) {
      const newResult = expr.replace(pattern, replacement);
      if (newResult !== expr) {
        this.addStep(newResult, "De Morgan's Laws", explanation);
        return newResult;
      }
    }
    return expr;
  }
}

// Random Expression Generator
const generateRandomExpression = (difficulty = "medium") => {
  const variables = ["A", "B", "C", "D"];

  const patterns = {
    easy: [
      () => {
        const v = variables[Math.floor(Math.random() * 2)];
        const easyPatterns = [
          `${v} + ${v}`,
          `${v} · ${v}`,
          `${v} + 0`,
          `${v} · 1`,
          `${v} + 1`,
          `${v} · 0`,
          `${v} + ${v}'`,
          `${v} · ${v}'`,
          `${v}''`,
        ];
        return easyPatterns[Math.floor(Math.random() * easyPatterns.length)];
      },
    ],
    medium: [
      () => {
        const v1 = variables[Math.floor(Math.random() * 3)];
        const v2 = variables[Math.floor(Math.random() * 3)];
        const mediumPatterns = [
          `${v1} + (${v1} · ${v2})`,
          `${v1} · (${v1} + ${v2})`,
          `(${v1} + ${v2})'`,
          `${v1}' + ${v1}`,
          `${v1}' · ${v1}`,
        ];
        return mediumPatterns[
          Math.floor(Math.random() * mediumPatterns.length)
        ];
      },
    ],
    hard: [
      () => {
        const v1 = variables[Math.floor(Math.random() * 4)];
        const v2 = variables[Math.floor(Math.random() * 4)];
        const v3 = variables[Math.floor(Math.random() * 4)];
        const hardPatterns = [
          `${v1} + (${v2} · ${v3}) + ${v1}`,
          `(${v1} + ${v2})' · ${v3}`,
          `${v1} · (${v2} + ${v3}') + ${v1}'`,
          `((${v1} + ${v2}) · ${v3})'`,
          `${v1} · (${v1} + ${v2}) + ${v3}`,
        ];
        return hardPatterns[Math.floor(Math.random() * hardPatterns.length)];
      },
    ],
    "very hard": [
      () => {
        const v1 = variables[Math.floor(Math.random() * 4)];
        const v2 = variables[Math.floor(Math.random() * 4)];
        const v3 = variables[Math.floor(Math.random() * 4)];
        const v4 = variables[Math.floor(Math.random() * 4)];
        const veryHardPatterns = [
          `((${v1} + ${v2}) · (${v3} + ${v4}))' + ${v1} · ${v2}'`,
          `${v1} · (${v2} + ${v3}') + (${v1} + ${v2})' · ${v3} + ${v4}`,
          `(${v1}' · ${v2} + ${v3}) · ((${v1} + ${v2}') + ${v4}')`,
          `${v1} + ${v2} · (${v3}' + ${v4}) + ${v1}' · ${v2}' + ${v3}`,
        ];
        return veryHardPatterns[
          Math.floor(Math.random() * veryHardPatterns.length)
        ];
      },
    ],
  };

  const selectedPatterns = patterns[difficulty];
  const pattern =
    selectedPatterns[Math.floor(Math.random() * selectedPatterns.length)];
  return pattern();
};

// Calculator Button Component
const CalcButton = ({
  children,
  onClick,
  className = "",
  style = {},
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-3 rounded-lg font-bold text-sm border-2 transition-all hover:scale-105 active:scale-95 ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{
        backgroundColor: colors.white,
        borderColor: colors.cyanz,
        color: colors.grayz,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

// Step Display Component
const InteractiveStepDisplay = ({
  step,
  isActive,
  isVisible,
  showHint,
  onToggleHint,
}) => {
  if (!isVisible) return null;

  const getStepColor = () => {
    switch (step.type) {
      case "start":
        return colors.cyanz;
      case "final":
        return colors.emeraldz;
      default:
        return colors.violetz;
    }
  };

  const getStepIcon = () => {
    switch (step.type) {
      case "start":
        return <PlayCircle className="h-4 w-4" />;
      case "final":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <ArrowRight className="h-4 w-4" />;
    }
  };

  return (
    <div
      className={`p-6 rounded-xl border-l-4 transition-all ${
        isActive
          ? "ring-2 ring-blue-300 shadow-xl transform scale-[1.02]"
          : "shadow-lg"
      }`}
      style={{
        backgroundColor:
          step.type === "start"
            ? `${colors.cyanz}10`
            : step.type === "final"
            ? `${colors.emeraldz}10`
            : `${colors.violetz}08`,
        borderLeftColor: getStepColor(),
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm shadow-lg"
          style={{ backgroundColor: getStepColor() }}
        >
          {step.stepNumber}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {getStepIcon()}
              <span
                className="font-bold text-lg"
                style={{ color: getStepColor() }}
              >
                {step.lawUsed}
              </span>
            </div>

            {step.hint && (
              <button
                onClick={onToggleHint}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all hover:scale-105"
                style={{
                  backgroundColor: showHint
                    ? colors.yellowz
                    : `${colors.yellowz}30`,
                  color: showHint ? colors.grayz : colors.yellowz,
                }}
              >
                <Lightbulb className="h-3 w-3" />
                {showHint ? "Hide Hint" : "Show Hint"}
              </button>
            )}
          </div>

          <div
            className="text-2xl font-mono font-bold mb-3 p-4 rounded-lg border-2 shadow-inner"
            style={{
              backgroundColor: colors.white,
              color: colors.grayz,
              borderColor: getStepColor(),
            }}
          >
            {step.expression}
          </div>

          <p
            className="text-sm mb-2 font-medium"
            style={{ color: colors.grayz }}
          >
            {step.explanation}
          </p>

          {showHint && step.hint && (
            <div
              className="mt-3 p-3 rounded-lg border-l-4 transition-all"
              style={{
                backgroundColor: `${colors.yellowz}10`,
                borderLeftColor: colors.yellowz,
              }}
            >
              <div className="flex items-start gap-2">
                <Brain
                  className="h-4 w-4 mt-1"
                  style={{ color: colors.yellowz }}
                />
                <div>
                  <p
                    className="text-sm font-bold mb-1"
                    style={{ color: colors.yellowz }}
                  >
                    💡 Hint:
                  </p>
                  <p className="text-sm" style={{ color: colors.grayz }}>
                    {step.hint}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ current, total, onStepClick }) => {
  const progress = total > 1 ? (current / (total - 1)) * 100 : 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold" style={{ color: colors.violetz }}>
          Progress: Step {current + 1} of {total}
        </span>
        <span className="text-sm" style={{ color: colors.grayz }}>
          {Math.round(progress)}% Complete
        </span>
      </div>

      <div
        className="h-3 rounded-full overflow-hidden"
        style={{ backgroundColor: `${colors.violetz}20` }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            backgroundColor: colors.violetz,
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onStepClick(i)}
            className={`w-3 h-3 rounded-full border-2 transition-all hover:scale-125 ${
              i <= current ? "opacity-100" : "opacity-30"
            }`}
            style={{
              backgroundColor: i <= current ? colors.violetz : "transparent",
              borderColor: colors.violetz,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Main Component
const InteractiveBooleanAlgebraSolver = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showHints, setShowHints] = useState({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [error, setError] = useState("");
  const [studyMode, setStudyMode] = useState(true);
  const [outputForm, setOutputForm] = useState("simplified");

  const parser = new BooleanExpressionParser();

  // Auto-play functionality
  useEffect(() => {
    let interval = null;
    if (isAutoPlaying && result && currentStepIndex < result.steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= result.steps.length - 1) {
            setIsAutoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    } else if (isAutoPlaying) {
      setIsAutoPlaying(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, result, currentStepIndex]);

  const handleSolve = () => {
    if (!expression.trim()) return;
    try {
      setError("");
      const solution = parser.simplify(expression, outputForm);
      setResult(solution);
      setCurrentStepIndex(0);
      setShowHints({});
      setIsAutoPlaying(false);
      setStudyMode(true);
    } catch (error) {
      setError(error.message);
      setResult(null);
    }
  };

  const handleNextStep = () => {
    if (result && currentStepIndex < result.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStepIndex || !studyMode) {
      setCurrentStepIndex(stepIndex);
    }
  };

  const handleAutoPlay = () => {
    if (!result || isAutoPlaying) return;

    setIsAutoPlaying(true);
    setStudyMode(false);
  };

  const handleToggleHint = (stepId) => {
    setShowHints((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setShowHints({});
    setStudyMode(true);
    setIsAutoPlaying(false);
  };

  const handleButtonClick = (value) => {
    setExpression((prev) => prev + value);
    setError("");
  };

  const handleClear = () => {
    setExpression("");
    setResult(null);
    setError("");
    setCurrentStepIndex(0);
    setShowHints({});
  };

  const handleBackspace = () => {
    setExpression((prev) => prev.slice(0, -1));
    setError("");
  };

  const handleRandomExpression = () => {
    const randomExpr = generateRandomExpression(difficulty);
    setExpression(randomExpr);
    setResult(null);
    setError("");
  };

  const quickExamples = {
    easy: ["A + A", "A · 0", "A + 0", "A''"],
    medium: ["A + A'", "A · A'", "(A+B)'", "A+(A·B)"],
    hard: ["(A+B)·(A+C)", "A'·B+A·B'", "(A·B)'+(A+B)", "A·(B+C)+A'"],
    "very hard": [
      "((A+B)·(C+D))'",
      "A·(B+C')+A'·B'",
      "(A'·B+C)·(A+B')",
      "A+(B·C+D')'·A'",
    ],
  };

  return (
    <div
      className=""
      style={{
        background: `linear-gradient(135deg, ${colors.offwhite}, ${colors.cyanz}10)`,
      }}
    >
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${colors.violetz}, ${colors.cyanz})`,
            }}
          >
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: colors.grayz }}
          >
            Interactive Boolean Algebra Solver
          </h1>
          <p className="text-lg" style={{ color: colors.grayz }}>
            Learn step-by-step Boolean simplification with interactive guidance!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Input & Calculator */}
          <div className="lg:col-span-1 space-y-6">
            {/* Expression Input */}
            <div
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: colors.white }}
            >
              <h3
                className="text-xl font-bold mb-4 flex items-center gap-2"
                style={{ color: colors.violetz }}
              >
                <Calculator className="h-5 w-5" />
                Expression Builder
              </h3>

              <div
                className={`p-4 border-2 rounded-lg mb-4 min-h-16 flex items-center text-lg font-mono ${
                  error ? "border-red-500 bg-red-50" : ""
                }`}
                style={{
                  borderColor: error ? colors.redz : colors.cyanz,
                  backgroundColor: error ? `${colors.redz}10` : colors.offwhite,
                }}
              >
                {expression || "Enter Boolean expression..."}
              </div>

              {error && (
                <div
                  className="mb-4 p-3 rounded-lg"
                  style={{
                    backgroundColor: `${colors.redz}10`,
                    color: colors.redz,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    <span className="font-bold">Error:</span>
                  </div>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}

              {/* Calculator Grid */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <CalcButton onClick={() => handleButtonClick("A")}>
                  A
                </CalcButton>
                <CalcButton onClick={() => handleButtonClick("B")}>
                  B
                </CalcButton>
                <CalcButton onClick={() => handleButtonClick("C")}>
                  C
                </CalcButton>
                <CalcButton onClick={() => handleButtonClick("D")}>
                  D
                </CalcButton>

                <CalcButton onClick={() => handleButtonClick(" + ")}>
                  OR (+)
                </CalcButton>
                <CalcButton onClick={() => handleButtonClick(" · ")}>
                  AND (·)
                </CalcButton>
                <CalcButton onClick={() => handleButtonClick("'")}>
                  NOT (')
                </CalcButton>
                <CalcButton onClick={() => handleButtonClick("(")}>
                  ( )
                </CalcButton>

                <CalcButton onClick={() => handleButtonClick("0")}>
                  0
                </CalcButton>
                <CalcButton onClick={() => handleButtonClick("1")}>
                  1
                </CalcButton>
                <CalcButton
                  onClick={handleBackspace}
                  style={{
                    backgroundColor: colors.ambez,
                    color: colors.white,
                    borderColor: colors.ambez,
                  }}
                >
                  <Delete className="h-4 w-4" />
                </CalcButton>
                <CalcButton
                  onClick={handleClear}
                  style={{
                    backgroundColor: colors.redz,
                    color: colors.white,
                    borderColor: colors.redz,
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </CalcButton>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleRandomExpression}
                  className="p-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-105"
                  style={{ backgroundColor: colors.ambez, color: colors.white }}
                >
                  <Shuffle className="h-4 w-4" />
                  Random
                </button>
                <button
                  onClick={handleSolve}
                  disabled={!expression.trim()}
                  className="p-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:hover:scale-100"
                  style={{
                    backgroundColor: expression.trim()
                      ? colors.emeraldz
                      : colors.grayz,
                    color: colors.white,
                    opacity: expression.trim() ? 1 : 0.5,
                  }}
                >
                  <Zap className="h-4 w-4" />
                  Solve
                </button>
              </div>
            </div>

            {/* Difficulty & Examples */}
            <div
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: `${colors.cyanz}10` }}
            >
              <h3
                className="text-lg font-bold mb-3 flex items-center gap-2"
                style={{ color: colors.cyanz }}
              >
                <Target className="h-5 w-5" />
                Quick Examples & Settings
              </h3>

              <div className="mb-3">
                <label
                  className="text-sm font-bold mb-2 block"
                  style={{ color: colors.cyanz }}
                >
                  Difficulty:
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-2 rounded border-2 text-sm mb-3"
                  style={{ borderColor: colors.cyanz }}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="very hard">Very Hard</option>
                </select>

                <label
                  className="text-sm font-bold mb-2 block"
                  style={{ color: colors.cyanz }}
                >
                  Output Form:
                </label>
                <select
                  value={outputForm}
                  onChange={(e) => setOutputForm(e.target.value)}
                  className="w-full p-2 rounded border-2 text-sm"
                  style={{ borderColor: colors.cyanz }}
                >
                  <option value="simplified">Simplified</option>
                  <option value="sop">Sum of Products (SOP)</option>
                  <option value="pos">Product of Sums (POS)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {quickExamples[difficulty].map((ex, idx) => (
                  <button
                    key={idx}
                    onClick={() => setExpression(ex)}
                    className="p-2 text-sm rounded border font-mono hover:bg-white transition-all"
                    style={{ borderColor: colors.cyanz, color: colors.grayz }}
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Boolean Laws Reference */}
            <div
              className="p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: `${colors.ambez}10` }}
            >
              <h3
                className="text-lg font-bold mb-3 flex items-center gap-2"
                style={{ color: colors.ambez }}
              >
                <BookOpen className="h-5 w-5" />
                Boolean Laws Reference
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {Object.entries(booleanLaws).map(([key, law]) => (
                  <div key={key} className="text-sm">
                    <div
                      className="font-bold mb-1"
                      style={{ color: colors.ambez }}
                    >
                      {law.name}:
                    </div>
                    <div
                      className="text-xs mb-1"
                      style={{ color: colors.grayz }}
                    >
                      {law.description}
                    </div>
                    {law.rules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="font-mono text-xs ml-2 mb-1"
                        style={{ color: colors.grayz }}
                      >
                        • {rule}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Interactive Results */}
          <div className="lg:col-span-2 space-y-6">
            {result ? (
              <>
                {/* Result Summary with Controls */}
                <div
                  className="p-6 rounded-xl shadow-lg"
                  style={{ backgroundColor: `${colors.emeraldz}10` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3
                        className="text-2xl font-bold flex items-center gap-2 mb-2"
                        style={{ color: colors.emeraldz }}
                      >
                        <CheckCircle className="h-6 w-6" />
                        Final Result{" "}
                        {result.targetForm === "sop"
                          ? "(SOP)"
                          : result.targetForm === "pos"
                          ? "(POS)"
                          : "(Simplified)"}
                      </h3>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock
                            className="h-4 w-4"
                            style={{ color: colors.violetz }}
                          />
                          <span style={{ color: colors.grayz }}>
                            <strong>{result.totalSteps}</strong> steps
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award
                            className="h-4 w-4"
                            style={{ color: colors.ambez }}
                          />
                          <span style={{ color: colors.grayz }}>
                            <strong>{result.lawsUsed.length}</strong> laws used
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lightbulb
                            className="h-4 w-4"
                            style={{ color: colors.cyanz }}
                          />
                          <span style={{ color: colors.grayz }}>
                            <strong>
                              {Math.round(
                                ((expression.length - result.result.length) /
                                  expression.length) *
                                  100
                              )}
                              %
                            </strong>{" "}
                            simplified
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleAutoPlay}
                        disabled={isAutoPlaying}
                        className="px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all hover:scale-105 disabled:hover:scale-100"
                        style={{
                          backgroundColor: isAutoPlaying
                            ? colors.grayz
                            : colors.violetz,
                          color: colors.white,
                          opacity: isAutoPlaying ? 0.5 : 1,
                        }}
                      >
                        {isAutoPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <FastForward className="h-4 w-4" />
                        )}
                        {isAutoPlaying ? "Playing..." : "Auto Play"}
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all hover:scale-105"
                        style={{
                          backgroundColor: colors.ambez,
                          color: colors.white,
                        }}
                      >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                      </button>
                    </div>
                  </div>

                  <div
                    className="text-3xl font-mono font-bold p-4 rounded-lg border-2 mb-4"
                    style={{
                      backgroundColor: colors.white,
                      color: colors.grayz,
                      borderColor: colors.emeraldz,
                    }}
                  >
                    {result.result}
                  </div>

                  {result.lawsUsed.length > 0 && (
                    <div>
                      <p
                        className="text-sm font-bold mb-2"
                        style={{ color: colors.emeraldz }}
                      >
                        Laws Applied:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.lawsUsed.map((law, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: colors.emeraldz,
                              color: colors.white,
                            }}
                          >
                            {law}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive Step Display */}
                <div
                  className="p-6 rounded-xl shadow-lg"
                  style={{ backgroundColor: colors.white }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3
                      className="text-xl font-bold flex items-center gap-2"
                      style={{ color: colors.violetz }}
                    >
                      <Brain className="h-5 w-5" />
                      Interactive Step-by-Step Solution
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: colors.grayz }}>
                        Study Mode:
                      </span>
                      <button
                        onClick={() => setStudyMode(!studyMode)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all hover:scale-105 ${
                          studyMode ? "bg-green-500" : "bg-gray-400"
                        } text-white`}
                      >
                        {studyMode ? "ON" : "OFF"}
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <ProgressBar
                    current={currentStepIndex}
                    total={result.steps.length}
                    onStepClick={handleStepClick}
                  />

                  {/* Current Step Display */}
                  <div className="mb-6">
                    <InteractiveStepDisplay
                      step={result.steps[currentStepIndex]}
                      isActive={true}
                      isVisible={true}
                      showHint={showHints[result.steps[currentStepIndex]?.id]}
                      onToggleHint={() =>
                        handleToggleHint(result.steps[currentStepIndex]?.id)
                      }
                    />
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handlePreviousStep}
                      disabled={currentStepIndex === 0}
                      className="px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all hover:scale-105 disabled:hover:scale-100"
                      style={{
                        backgroundColor:
                          currentStepIndex === 0 ? colors.grayz : colors.cyanz,
                        color: colors.white,
                        opacity: currentStepIndex === 0 ? 0.5 : 1,
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </button>

                    <div className="text-center">
                      <span
                        className="text-sm font-bold"
                        style={{ color: colors.violetz }}
                      >
                        Step {currentStepIndex + 1} of {result.steps.length}
                      </span>
                    </div>

                    <button
                      onClick={handleNextStep}
                      disabled={currentStepIndex >= result.steps.length - 1}
                      className="px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all hover:scale-105 disabled:hover:scale-100"
                      style={{
                        backgroundColor:
                          currentStepIndex >= result.steps.length - 1
                            ? colors.grayz
                            : colors.emeraldz,
                        color: colors.white,
                        opacity:
                          currentStepIndex >= result.steps.length - 1 ? 0.5 : 1,
                      }}
                    >
                      {currentStepIndex >= result.steps.length - 1
                        ? "Complete!"
                        : "Next Step"}
                      {currentStepIndex < result.steps.length - 1 && (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div
                  className="text-center p-8 rounded-xl"
                  style={{ backgroundColor: `${colors.cyanz}10` }}
                >
                  <Brain
                    className="h-20 w-20 mx-auto mb-4"
                    style={{ color: colors.cyanz }}
                  />
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: colors.cyanz }}
                  >
                    Ready to Learn Boolean Algebra!
                  </h3>
                  <p className="text-lg mb-4" style={{ color: colors.grayz }}>
                    Build a Boolean expression using the calculator buttons,
                    then click Solve to start the interactive step-by-step
                    learning experience.
                  </p>
                  <button
                    onClick={handleRandomExpression}
                    className="px-6 py-3 rounded-lg font-bold flex items-center gap-2 mx-auto transition-all hover:scale-105"
                    style={{
                      backgroundColor: colors.ambez,
                      color: colors.white,
                    }}
                  >
                    <Shuffle className="h-4 w-4" />
                    Try Random Expression
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveBooleanAlgebraSolver;
