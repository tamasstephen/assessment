import { NumberData } from "../data/Numbers";

export const parseNumbers = (
  number: number,
  localValue: string,
  numbers: NumberData
) => {
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
    const ten = numbers["ten"][tenNum];
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
