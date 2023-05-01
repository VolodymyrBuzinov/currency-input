import { useEffect, useState } from "react";

interface iUseCurrencyInput {
  defaultValue?: number;
  centsSeparator?: string;
  groupSeparator?: string;
}

const defaultCentSeparator = ".";
const defaultGroupSeparator = ",";

/**
 * Custom currency input hook
 * @param {number} defaultValue default input value in number format
 * @param {string} centsSeparator a string to separate cents
 * @param {string} groupSeparator a string to separate dozens, hundreds, thousands, millions etc.
 * @returns {object}  {onChange,val, numericVal, onBlur} input state management methods
 */

export const useCurrencyInput = ({
  defaultValue,
  centsSeparator = defaultCentSeparator,
  groupSeparator = defaultGroupSeparator,
}: iUseCurrencyInput) => {
  const [val, setVal] = useState("0");
  const [numericVal, setNumericVal] = useState(0);

  /**
   * Effect is checking defaultValue prop validity and set valid values
   */

  useEffect(() => {
    if (!defaultValue) return;
    const validNumber = !isNaN(defaultValue) && !Array.isArray(defaultValue);
    const newVal = validNumber
      ? makeLocaleString(defaultValue.toString())
      : "0";
    setVal(newVal);
    setNumericVal(makeNumberValue(newVal));
  }, []);

  /**
   * Filters all except numbers
   * @param {string} val - string to filter
   * @return {string} - filtered string
   */

  const cutAllButDigits = (val: string): string => val.replace(/\D/g, "");

  /**
   * Localizes numeric value and change default delimeters to delimeters from props
   * @param {number} val - number to localize
   * @return {string} - localized string
   */

  const localizeValueAndReplaceDelimeters = (val: number): string => {
    const formatter = Intl.NumberFormat("en-US");
    return formatter
      .format(val)
      .replaceAll(",", groupSeparator)
      .replace(".", centsSeparator);
  };

  /**
   * Makes locale string to show visually changed value in the input
   * @param {string} val - string to localize
   * @return {string} - localized string
   */

  const makeLocaleString = (val: string): string => {
    let newVal = val;
    const separatorIndex = newVal.indexOf(centsSeparator);
    const onlySeparator = separatorIndex === 0 && newVal.length === 1;
    const splittedVal = newVal.split(`${centsSeparator}`);
    const symbolsAfterDot = splittedVal?.[1];

    if (onlySeparator) return `0${centsSeparator}`;

    const localizedValue = localizeValueAndReplaceDelimeters(
      Number(cutAllButDigits(splittedVal?.[0]))
    );

    if (!symbolsAfterDot && separatorIndex >= 1)
      return `${localizedValue}${centsSeparator}`;

    return !!symbolsAfterDot
      ? `${localizedValue}${centsSeparator}${symbolsAfterDot}`
      : localizedValue;
  };

  /**
   * Makes numeric value from the localized value
   * @param {string} val - string to make a number
   * @return {number}
   */

  const makeNumberValue = (val: string): number => {
    const onlySeparator = val === centsSeparator;
    return onlySeparator
      ? 0
      : Number(
          val
            .replace(RegExp(`[^\\d\\${centsSeparator}]`, "g"), "")
            .replace(RegExp(`\\${centsSeparator}`), ".")
        );
  };

  /**
   * Sets a caret position in the input
   * @param {object} target - HTML Dom Element
   * @param {step} number - step for moving caret position
   */

  const setCursorPosition = (
    target: EventTarget & HTMLInputElement,
    step: number
  ) => {
    let newStep = step;
    target.selectionDirection = "forward";
    if (target.value.length === 1) newStep = 2;
    const isNegative = newStep < 0;
    const selectionStart = target.selectionStart || 0;
    const newVal = isNegative ? selectionStart - 1 : selectionStart + 1;
    window.requestAnimationFrame(() => {
      target.selectionStart = Math.abs(newStep) > 1 ? newVal : selectionStart;
      target.selectionEnd = Math.abs(newStep) > 1 ? newVal : selectionStart;
    });
  };

  /**
   * Localizes and sets the numeric value in the input
   */

  const onBlur = () => setVal(localizeValueAndReplaceDelimeters(numericVal));

  /**
   * Handles input value changes
   * @param {object} e - React Change Event instance
   */

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const target = e.target;

    const regex = RegExp(`[^\\d\\${centsSeparator}\\${groupSeparator}]`, "g");
    const dotsCount = value.replace(RegExp(`[^\\${centsSeparator}]`, "g"), "");
    const splittedVal = value.split(`${centsSeparator}`);
    const symbolsAfterDot = splittedVal?.[1];

    if (regex.test(value) || dotsCount.length > 1) return;

    if (!!symbolsAfterDot) {
      value =
        cutAllButDigits(splittedVal?.[0]) +
        centsSeparator +
        cutAllButDigits(symbolsAfterDot).slice(0, 2);
    }

    setNumericVal(makeNumberValue(value));

    setVal((pv) => {
      setCursorPosition(target, makeLocaleString(value).length - pv.length);
      return makeLocaleString(value);
    });
  };

  return {
    onChange,
    val,
    numericVal,
    onBlur,
  };
};
