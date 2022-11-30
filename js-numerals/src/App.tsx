import React, { useState, useRef } from "react";
import { numbers } from "./data/Numbers";
import logo from "./logo.svg";
import "./App.css";
import { parseNumbers } from "./utils/utils";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [numberAsString, setNumberAsString] = useState<string>("");

  const handleInputChange = () => {
    const value = inputEl.current?.value;
    if (typeof value === "string" && parseInt(value)) {
      const newNumber = parseInt(value);
      getNumberAsString(newNumber);
      setInputValue(newNumber.toString());
      console.log(processNumber(value));
    } else {
      setInputValue("");
    }
  };

  const getNumberAsString = (number: number) => {
    if (number < 20) {
      setNumberAsString(numbers["first"][number]);
    }
    if (99 < number && number < 1000) {
    }
  };

  const processNumber = (num: string) => {
    const numArr = num.split("");

    if (numArr.length < 4) {
      return parseNumbers(num, "hundred", numbers);
    }

    const newNumArr = [...numArr].reverse();
    const groupedNums = newNumArr
      .reduce((acc: string[][], curr: string, idx: number) => {
        if (idx === 0 || idx % 3 === 0) {
          acc.push([curr]);
          return acc;
        } else {
          console.log(curr);
          const lastArrIdx = acc.length - 1;
          acc[lastArrIdx].push(curr);
          return acc;
        }
      }, [])
      .map((numGroup) => numGroup.reverse().join(""));

    console.log(groupedNums);

    const LOCALS = ["hundred", "thousand", "million", "billion"];

    const elements = groupedNums.map((nums, idx) =>
      parseNumbers(nums, LOCALS[idx], numbers)
    );

    console.log(elements);
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
