// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { parseNumbers } from "./utils/utils";
import { numbers } from "./data/Numbers";

describe("testing 3 nums to equal test value", () => {
  expect(parseNumbers(12, "hundred", numbers)).toMatch("twelve");
  expect(parseNumbers(211, "hundred", numbers)).toMatch(
    "two hundred and eleven"
  );
  expect(parseNumbers(918, "hundred", numbers)).toMatch(
    "nine hundred and eighteen"
  );
});
