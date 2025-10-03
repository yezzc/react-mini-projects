import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [input, setInput] = useState("");
  const [isDeg, setIsDeg] = useState(true);
  const [memory, setMemory] = useState(0);

  const handleClick = (value) => setInput(input + value);
  const handleClear = () => setInput("");
  const handleBackspace = () => setInput(input.slice(0, -1));

  const handleCalculate = () => {
    try {
      let expr = input
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/exp\(/g, "Math.exp(")
        .replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)))
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/\^/g, "**");

      if (isDeg) {
        expr = expr
          .replace(/Math\.sin\(([^)]+)\)/g, "Math.sin(($1)*Math.PI/180)")
          .replace(/Math\.cos\(([^)]+)\)/g, "Math.cos(($1)*Math.PI/180)")
          .replace(/Math\.tan\(([^)]+)\)/g, "Math.tan(($1)*Math.PI/180)");
      }

      // eslint-disable-next-line no-eval
      setInput(eval(expr).toString());
    } catch {
      setInput("Error");
    }
  };

  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1);
  };

  const handleMemory = (action) => {
    switch (action) {
      case "MC": setMemory(0); break;
      case "MR": setInput(input + memory.toString()); break;
      case "M+": setMemory(memory + parseFloat(input || 0)); break;
      case "M-": setMemory(memory - parseFloat(input || 0)); break;
      default: break;
    }
  };

  const handlePercent = () => {
    try {
      setInput((parseFloat(input) / 100).toString());
    } catch {
      setInput("Error");
    }
  };

  const handlePlusMinus = () => {
    try {
      setInput((parseFloat(input) * -1).toString());
    } catch {
      setInput("Error");
    }
  };

  const handleSquare = () => {
    try {
      setInput(Math.pow(parseFloat(input), 2).toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="calculator-wrapper">
      <h1 className="title-box">Scientific Calculator</h1>

      <div className="calculator">
        <input type="text" value={input} readOnly className="display" />

        <div className="buttons">
          {/* Memory row */}
          <button onClick={() => handleMemory("MC")}>MC</button>
          <button onClick={() => handleMemory("MR")}>MR</button>
          <button onClick={() => handleMemory("M+")}>M+</button>
          <button onClick={() => handleMemory("M-")}>M-</button>
          <button onClick={handlePercent}>%</button> {/* NEW */}

          {/* Controls */}
          <button className="clear" onClick={handleClear}>C</button>
          <button onClick={handleBackspace}>⌫</button>
          <button onClick={() => setIsDeg(!isDeg)}>
            {isDeg ? "DEG" : "RAD"}
          </button>
          <button onClick={() => handleClick("(")}>(</button>
          <button onClick={() => handleClick(")")}>)</button>

          {/* Digits */}
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("/")}>÷</button>
          <button onClick={handleSquare}>x²</button> {/* NEW */}

          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("*")}>×</button>
          <button onClick={handlePlusMinus}>±</button> {/* NEW */}

          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("-")}>−</button>
          <button className="equal" onClick={handleCalculate}>=</button>

          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={() => handleClick("+")}>+</button>
          <button onClick={() => handleClick("√(")}>√</button>
          <button onClick={() => handleClick("^")}>xʸ</button>

          {/* Scientific functions */}
          <button onClick={() => handleClick("sin(")}>sin</button>
          <button onClick={() => handleClick("cos(")}>cos</button>
          <button onClick={() => handleClick("tan(")}>tan</button>
          <button onClick={() => handleClick("log(")}>log</button>
          <button onClick={() => handleClick("ln(")}>ln</button>
          <button onClick={() => handleClick("exp(")}>exp</button>
          <button onClick={() => handleClick("!")}>n!</button>
          <button onClick={() => handleClick("1/")}>1/x</button>
          <button onClick={() => handleClick("π")}>π</button>
          <button onClick={() => handleClick("e")}>e</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
