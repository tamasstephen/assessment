import {
  buildThreeDigitNumStr,
  parseNumbers,
  processNumber,
  convertNumbersToString,
} from "./utils/utils";
import { numbers } from "./data/Numbers";

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

test("convert numbers to string if british", () => {
  expect(convertNumbersToString("7", numbers, true)).toEqual("seven");
  expect(convertNumbersToString("1999", numbers, true)).toEqual(
    "nineteen hundred and ninety-nine"
  );
  expect(convertNumbersToString("1800", numbers, true)).toEqual(
    "eighteen hundred"
  );
  expect(convertNumbersToString("1701", numbers, true)).toEqual(
    "seventeen hundred and one"
  );
  expect(convertNumbersToString("1211", numbers, true)).toEqual(
    "twelve hundred and eleven"
  );
  expect(convertNumbersToString("0211", numbers, true)).toEqual(
    "two hundred and eleven"
  );
  expect(convertNumbersToString("0210", numbers, true)).toEqual(
    "two hundred and ten"
  );
  expect(convertNumbersToString("0201", numbers, true)).toEqual(
    "two hundred and one"
  );
  expect(convertNumbersToString("2000", numbers, true)).toEqual("two thousand");
  expect(convertNumbersToString("1000", numbers, true)).toEqual("one thousand");
});

test("convert numbers to string if not british", () => {
  expect(convertNumbersToString("7", numbers, false)).toEqual("seven");

  expect(convertNumbersToString("1999", numbers, false)).toEqual(
    "one thousand nine hundred and ninety-nine"
  );
  expect(convertNumbersToString("1800", numbers, false)).toEqual(
    "one thousand and eight hundred"
  );
  expect(convertNumbersToString("1701", numbers, false)).toEqual(
    "one thousand seven hundred and one"
  );
  expect(convertNumbersToString("1211", numbers, false)).toEqual(
    "one thousand two hundred and eleven"
  );
  expect(convertNumbersToString("0211", numbers, false)).toEqual(
    "two hundred and eleven"
  );
  expect(convertNumbersToString("0210", numbers, false)).toEqual(
    "two hundred and ten"
  );
  expect(convertNumbersToString("0201", numbers, false)).toEqual(
    "two hundred and one"
  );
});