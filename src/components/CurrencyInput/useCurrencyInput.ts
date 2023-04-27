import { useEffect, useState } from "react";

interface iUseCurrencyInput {
  defaultValue?: number;
  centsSeparator?: string;
  groupSeparator?: string;
}

const defaultCentSeparator = ".";
const defaultGroupSeparator = ",";

export const useCurrencyInput = ({
  defaultValue,
  centsSeparator = defaultCentSeparator,
  groupSeparator = defaultGroupSeparator,
}: iUseCurrencyInput) => {
  const [val, setVal] = useState("0");
  const [numericVal, setNumericVal] = useState(0);

  useEffect(() => {
    if (!defaultValue) return;
    const validNumber = !isNaN(defaultValue) && !Array.isArray(defaultValue);
    const newVal = validNumber
      ? makeLocaleString(defaultValue.toString())
      : "0";
    setVal(newVal);
    setNumericVal(makeNumberValue(newVal));
  }, []);

  const cutAllButDigits = (val: string) => val.replace(/\D/g, "");

  const localizeValueAndReplaceDelimeters = (val: number) => {
    const formatter = Intl.NumberFormat("en-US");
    return formatter
      .format(val)
      .replaceAll(",", groupSeparator)
      .replace(".", centsSeparator);
  };

  const makeLocaleString = (val: string) => {
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

  const makeNumberValue = (val: string) => {
    const onlySeparator = val === centsSeparator;
    return onlySeparator
      ? 0
      : Number(
          val
            .replace(RegExp(`[^\\d\\${centsSeparator}]`, "g"), "")
            .replace(RegExp(`\\${centsSeparator}`), ".")
        );
  };

  const setCursorPosition = (
    target: EventTarget & HTMLInputElement,
    step?: number
  ) => {
    target.selectionDirection = "forward";
    const selectionStart = target.selectionStart || 0;
    window.requestAnimationFrame(() => {
      target.selectionStart = !!step ? selectionStart + step : selectionStart;
      target.selectionEnd = !!step ? selectionStart + step : selectionStart;
    });
  };

  const onBlur = () => setVal(localizeValueAndReplaceDelimeters(numericVal));

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
      setCursorPosition(
        target,
        value === centsSeparator
          ? 1
          : Number(makeLocaleString(value).length - pv.length >= 2)
      );

      return makeLocaleString(value);
    });
  };

  return {
    onChange,
    makeLocaleString,
    val,
    numericVal,
    onBlur,
  };
};
