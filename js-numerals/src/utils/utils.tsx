import { NumberData } from "../data/Numbers";

// TODO: pass the numbers from outside


const getNumStringByRules = (localValue: string, num: string, numbers: NumberData) => {
  const versions = {
    "onlyzeros" : ``
  }
  const isZero = parseInt(num.substring(1)) === 0 ? "onlyzeros" : "mixed";
  const isHundred = num.length === 3 ? "isHundred" : "lessThanHundred";
}

export const parseNumbers = (num: string, localValue: string, numbers: NumberData) => {
  if (!parseInt(num)) {
    return;
  }
  const number = parseInt(num);
  if (number < 20) {
    return numbers["first"][number];
  }

  const numberAsString = number.toString();
  const hundreds = numbers["first"][convertNthNumber(0, numberAsString)];

  const ten = ((num: number) => {
    if (num < 20) {
      return numbers["first"][num];
    }
    const tenNum = convertNthNumber(0, num.toString());
    if (num % 100 === 0) {
    }
    const ten = numbers["ten"][tenNum];

    if (num % 10 === 0) {
    }

    const one = numbers["first"][num - tenNum * 10];

    return ten + one;
  })(number - Math.floor(number / 100) * 100);

  //TODO: parse the correct order (no tens and ones, in case of one proper values)
  return localValue === "hundred"
    ? `${hundreds} ${localValue} and ${ten}`
    : `${hundreds} hundred and ${ten} ${localValue}`;
};

const convertNthNumber = (idx: number, numberAsString: string) =>
  parseInt(numberAsString.charAt(idx));
