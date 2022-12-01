import { NumberData } from "../data/Numbers";

// TODO: pass the numbers from outside

  export const processNumber = (num: string, numbers: NumberData) => {
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
          const lastArrIdx = acc.length - 1;
          acc[lastArrIdx].push(curr);
          return acc;
        }
      }, [])
      .map((numGroup) => numGroup.reverse().join(""));

    const LOCALS = ["hundred", "thousand", "million", "billion"];

    //TODO: We need to check if the first number in the array is not empty if not than if it contains an and
    const elements = groupedNums.map((nums, idx) =>
      parseNumbers(nums, LOCALS[idx], numbers)
    );
    return elements.reverse().join(" ");
  };

export const buildThreeDigitNumStr = (
  localValue: string,
  numStrings: { hundreds: string; tens: string }
) => {
  const hasNotTensOrOnes = numStrings.tens === "";
  if (localValue === "hundred" && hasNotTensOrOnes) {
    return `${numStrings.hundreds} hundred`;
  } else if (localValue === "hundred") {
    return `${numStrings.hundreds} hundred and ${numStrings.tens}`;
  } else if (hasNotTensOrOnes) {
    return `${numStrings.hundreds} hundred ${localValue}`;
  }
  return `${numStrings.hundreds} hundred and ${numStrings.tens} ${localValue}`;
};

export const parseNumbers = (
  num: string,
  localValue: string,
  numbers: NumberData
) => {
  if (!parseInt(num)) {
    return "";
  }
  const number = parseInt(num);
  if (number < 20) {
    return localValue === "hundred"
      ? numbers["first"][number]
      : `${numbers["first"][number]} ${localValue}`;
  }

  const getTens = (num: number) => {
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

    return ten + one;
  };

  if (number < 100) {
    const tens = getTens(number);
    return localValue === "hundred" ? tens : `${tens} ${localValue}`;
  }

  const numberAsString = number.toString();
  const hundreds = numbers["first"][convertNthNumber(0, numberAsString)];

  const ten = getTens(number - Math.floor(number / 100) * 100);

  //TODO: parse the correct order (no tens and ones, in case of one proper values)
  return buildThreeDigitNumStr(localValue, { hundreds: hundreds, tens: ten });
};

const convertNthNumber = (idx: number, numberAsString: string) =>
  parseInt(numberAsString.charAt(idx));
