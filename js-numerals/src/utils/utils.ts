import { NumberData } from "../data/Numbers";

export function convertNumbersToString(
  num: string,
  numbers: NumberData,
  isBritish: boolean
) {
  const number = parseInt(num);
  if (isBritish && 1000 < number && number < 2000) {
    const firstTwoDigit = getTens(parseInt(num.substring(0, 2)), numbers);
    const lastTwoDigit = getTens(parseInt(num.substring(2)), numbers);
    return lastTwoDigit !== ""
      ? `${firstTwoDigit} hundred and ${lastTwoDigit}`
      : `${firstTwoDigit} hundred`;
  } else {
    return processNumber(num, numbers);
  }
}

export function processNumber(num: string, numbers: NumberData) {
  const numArr = num.split("");

  if (num === "0") {
    return "zero";
  }

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
        const lastArrIdx = acc.length - 1;
        acc[lastArrIdx].push(curr);
        return acc;
      }
    }, [])
    .map((numGroup) => numGroup.reverse().join(""));

  const LOCALS = ["hundred", "thousand", "million", "billion"];

  // What if number is longer than locals!!!
  const elements = groupedNums.map((nums, idx) =>
    parseNumbers(nums, LOCALS[idx], numbers)
  );

  const finalElements =
    elements.length > 1 && !elements[0].includes("and") && elements[0] !== ""
      ? [...elements].map((el, idx) => (idx === 0 ? "and " + el : el))
      : elements;

  return finalElements.reverse().join(" ");
}

export function buildThreeDigitNumStr(
  localValue: string,
  numStrings: { hundreds: string; tens: string }
) {
  const hasNotTensOrOnes = numStrings.tens === "";
  if (localValue === "hundred" && hasNotTensOrOnes) {
    return `${numStrings.hundreds} hundred`;
  } else if (localValue === "hundred") {
    return `${numStrings.hundreds} hundred and ${numStrings.tens}`;
  } else if (hasNotTensOrOnes) {
    return `${numStrings.hundreds} hundred ${localValue}`;
  }
  return `${numStrings.hundreds} hundred and ${numStrings.tens} ${localValue}`;
}

function getTens(num: number, numbers: NumberData) {
  if (num === 0) {
    return "";
  }

  if (num < 20) {
    return numbers["first"][num];
  }
  const tenNum = convertNthNumber(0, num.toString());

  const ten = tenNum === 0 ? "" : numbers["ten"][tenNum];

  const one =
    num - tenNum * 10 === 0 ? "" : numbers["first"][num - tenNum * 10];

  return one !== "" ? `${ten}-${one}` : ten;
}

export function parseNumbers(
  num: string,
  localValue: string,
  numbers: NumberData
) {
  if (!parseInt(num)) {
    return "";
  }
  const number = parseInt(num);
  if (number < 20) {
    return localValue === "hundred"
      ? numbers["first"][number]
      : `${numbers["first"][number]} ${localValue}`;
  }

  if (number < 100) {
    const tens = getTens(number, numbers);
    return localValue === "hundred" ? tens : `${tens} ${localValue}`;
  }

  const numberAsString = number.toString();
  const hundreds = numbers["first"][convertNthNumber(0, numberAsString)];

  const ten = getTens(number - Math.floor(number / 100) * 100, numbers);

  return buildThreeDigitNumStr(localValue, {
    hundreds: hundreds,
    tens: ten,
  });
}

function convertNthNumber(idx: number, numberAsString: string) {
  return parseInt(numberAsString.charAt(idx));
}
