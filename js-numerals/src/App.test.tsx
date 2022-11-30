import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { parseNumbers, buildThreeDigitNumStr } from "./utils/utils";
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
  expect(parseNumbers("32", "million", numbers)).toEqual("thirtytwo million");
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
  expect(parseNumbers("99", "million", numbers)).toEqual("ninetynine million");
});