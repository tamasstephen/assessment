import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {
  parseNumbers,
  buildThreeDigitNumStr,
  processNumber,
} from "./utils/utils";
import { numbers } from "./data/Numbers";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("testing number building form strings", () => {
  expect(
    buildThreeDigitNumStr("hundred", {
      hundreds: "nine",
      tens: "fiftyone",
    })
  ).toEqual("nine hundred and fiftyone");

  expect(
    buildThreeDigitNumStr("hundred", {
      hundreds: "nine",
      tens: "",
    })
  ).toEqual("nine hundred");
});

test("testing 3 nums to equal test value", () => {
  expect(parseNumbers("12", "hundred", numbers)).toEqual("twelve");
  expect(parseNumbers("32", "million", numbers)).toEqual("thirty-two million");
  expect(parseNumbers("9", "thousand", numbers)).toEqual("nine thousand");
  expect(parseNumbers("211", "hundred", numbers)).toEqual(
    "two hundred and eleven"
  );
  expect(parseNumbers("918", "hundred", numbers)).toEqual(
    "nine hundred and eighteen"
  );

  expect(parseNumbers("920", "thousand", numbers)).toEqual(
    "nine hundred and twenty thousand"
  );
  expect(parseNumbers("900", "hundred", numbers)).toEqual("nine hundred");
  expect(parseNumbers("9", "thousand", numbers)).toEqual("nine thousand");
  expect(parseNumbers("99", "million", numbers)).toEqual("ninety-nine million");
});

test("convert numbers to proper string representation", () => {
  expect(processNumber("7", numbers)).toEqual("seven");
  expect(processNumber("42", numbers)).toEqual("forty-two");
  expect(processNumber("1999", numbers)).toEqual(
    "one thousand nine hundred and ninety-nine"
  );
  expect(processNumber("2001", numbers)).toEqual("two thousand and one");
  expect(processNumber("17999", numbers)).toEqual(
    "seventeen thousand nine hundred and ninety-nine"
  );
  expect(processNumber("100001", numbers)).toEqual(
    "one hundred thousand and one"
  );
  expect(processNumber("342251", numbers)).toEqual(
    "three hundred and forty-two thousand two hundred and fifty-one"
  );
  expect(processNumber("1300420", numbers)).toEqual(
    "one million three hundred thousand four hundred and twenty"
  );
});