import { NumberData } from "../data/Numbers";

// TODO: pass the numbers from outside


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
