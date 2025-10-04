import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [subjects, setSubjects] = useState([{ grade: "", credits: "" }]);
  const [sgpa, setSgpa] = useState(null);

  const gradePoints = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5,
    F: 0,
  };

  // Auto update SGPA whenever subjects change
  useEffect(() => {
    calculateSGPA();
  }, [subjects]);

  const handleChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, { grade: "", credits: "" }]);
  };

  const calculateSGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach((subj) => {
      const points = gradePoints[subj.grade];
      const credits = parseFloat(subj.credits);
      if (!isNaN(points) && !isNaN(credits)) {
        totalPoints += points * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits > 0) {
      setSgpa((totalPoints / totalCredits).toFixed(2));
    } else {
      setSgpa(null);
    }
  };

  const resetAll = () => {
    setSubjects([{ grade: "", credits: "" }]);
    setSgpa(null);
  };

  const percentage = sgpa ? (sgpa * 9.5).toFixed(2) : null;

  return (
    <div className="container">
      <h1>SGPA Calculator</h1>

      {subjects.map((subj, index) => (
        <div className="subject" key={index}>
          <select
            value={subj.grade}
            onChange={(e) => handleChange(index, "grade", e.target.value)}
          >
            <option value="">Select Grade</option>
            {Object.keys(gradePoints).map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Credits"
            value={subj.credits}
            onChange={(e) => handleChange(index, "credits", e.target.value)}
          />
        </div>
      ))}

      <div className="buttons">
        <button onClick={addSubject}>Add Subject</button>
        <button onClick={resetAll}>Reset</button>
      </div>

      {sgpa && (
        <div className="result">
          <h3>Your SGPA: {sgpa}</h3>
          <p>Equivalent Percentage: {percentage}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
