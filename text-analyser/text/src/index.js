import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";   // ✅ Must match filename exactly

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
