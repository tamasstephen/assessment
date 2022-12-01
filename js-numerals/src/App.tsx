import React, { useState, useRef } from "react";
import { numbers } from "./data/Numbers";
import "./App.css";
import { processNumber } from "./utils/utils";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputState, setInputState] = useState<string>("");
  const [numberAsString, setNumberAsString] = useState<string>(
    "Please provide a number"
  );

  const handleInputChange = () => {
    const value = inputEl.current?.value;
    if (
      typeof value === "string" &&
      parseInt(value) &&
      !/[a-zA-Z]/.test(value)
    ) {
      const newNumber = parseInt(value);
      setInputValue(newNumber.toString());
      setNumberAsString(processNumber(value, numbers));
      inputState === "input-error" && setInputState("");
    } else {
      if (value === undefined || /[a-zA-Z]/.test(value)) {
        setNumberAsString("Only numbers are allowed");
        setInputState("input-error");
      } else {
        setNumberAsString("Please provide a number");
        setInputValue("");
      }
    }
  };

  const inputEl = useRef<HTMLInputElement>(null);

  return (
    <div className="App">
      <div className="converter-card__result-wrapper">
        <p className="converter-card__result">{numberAsString}</p>
      </div>
      <div className="converter-card">
        <h2 className="converter-card__title">Convert numbers to string!</h2>
        <p className="converter-card__lead">
          Use our converter and get your favourite{" "}
          <span className="emph">NUMBER as STRING</span>!!!
        </p>
        <input
          className={`converter-card__input ${inputState}`}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          ref={inputEl}
        />
      </div>
    </div>
  );
}

export default App;
