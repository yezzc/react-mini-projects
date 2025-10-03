import React, { useState } from "react";
import "./TextAnalyser.css";

function TextAnalyser() {
  const [text, setText] = useState("");

  const countWords = (str) =>
    str.trim() === "" ? 0 : str.trim().split(/\s+/).length;

  const countVowels = (str) =>
    (str.match(/[aeiouAEIOU]/g) || []).length;

  return (
    <div className="analyser-container">
      <h1 className="title">Text Analyser</h1>
      <textarea
        className="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        rows="8"
      />
      <div className="results">
        <p><strong>Number of Words:</strong> {countWords(text)}</p>
        <p><strong>Number of Vowels:</strong> {countVowels(text)}</p>
      </div>
    </div>
  );
}

export default TextAnalyser;
