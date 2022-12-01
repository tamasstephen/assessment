import React, { useState, useRef } from "react";
import { numbers } from "./data/Numbers";
import logo from "./logo.svg";
import "./App.css";
import { processNumber } from "./utils/utils";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [numberAsString, setNumberAsString] = useState<string>("");

  const handleInputChange = () => {
    const value = inputEl.current?.value;
    if (typeof value === "string" && parseInt(value)) {
      const newNumber = parseInt(value);
      setInputValue(newNumber.toString());
      setNumberAsString(processNumber(value, numbers));
    } else {
      setInputValue("");
      setNumberAsString("");
    }
  };

  const inputEl = useRef<HTMLInputElement>(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          ref={inputEl}
        />
        <p style={{ color: "white" }}>{numberAsString}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
