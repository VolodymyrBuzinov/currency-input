import { useEffect, useState } from "react";

export const currencies = ["EUR", "JPY", "PLN", "GBP", "CHF", "UAH", "USD"];

export const locales = ["de", "ja-JP", "pl", "en-GB", "uk-UA", "en-US"];

export const useCurrencyInput = (
  changeCallback: (v: number) => void,
  defaultValue?: number
) => {
  const [locale, setLocale] = useState("en-US");
  const [currency, setCurrency] = useState("USD");
  const [centsSeparator, setCentsSeparator] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [groupSeparator, setGroupSeparator] = useState("");
  const [val, setVal] = useState("0");

  useEffect(() => {
    if (typeof defaultValue !== "number" || isNaN(defaultValue))
      defaultValue = 0;

    setVal(defaultValue.toString());
  }, [defaultValue]);

  useEffect(() => {
    getSymbolAndCentsSeparator();
  }, [currency, locale]);

  const getSymbolAndCentsSeparator = () => {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    });

    formatter.formatToParts(11111).forEach((item) => {
      item.type === "currency" && setCurrencySymbol(item.value);
      item.type === "decimal" && setCentsSeparator(item.value);
      item.type === "group" && setGroupSeparator(item.value);
    });
  };

  const cutAllButDigits = (val: string) => val.replace(/\D/g, "");

  const makeLocaleString = (val: string) => {
    let newVal = val;
    const separatorIndex = newVal.indexOf(centsSeparator);
    const onlySeparator = separatorIndex === 0 && newVal.length === 1;
    const splittedVal = newVal.split(`${centsSeparator}`);
    const symbolsAfterDot = splittedVal?.[1];

    if (onlySeparator) return `0${centsSeparator}`;

    const formatter = Intl.NumberFormat(locale);

    const localizedValue = formatter.format(
      Number(cutAllButDigits(splittedVal?.[0]))
    );

    if (!symbolsAfterDot && separatorIndex >= 1)
      return `${localizedValue}${centsSeparator}`;

    return !!symbolsAfterDot
      ? `${localizedValue}${centsSeparator}${symbolsAfterDot}`
      : localizedValue;
  };

  const makeNumberValue = (val: string) => {
    return Number(
      val
        .replace(RegExp(`[^\\d\\${centsSeparator}]`, "g"), "")
        .replace(RegExp(`\\${centsSeparator}`), ".")
    );
  };

  const handleBLur = () => {
    // const newVal = Number(
    //   val
    //     .replace(RegExp(`[^\\d\\${centsSeparator}]`, "g"), "")
    //     .replace(RegExp(`\\${centsSeparator}`), ".")
    // );
    // setVal(Intl.NumberFormat(locale).format(newVal));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const target = e.target;

    const selectionStart = target.selectionStart || 0 + 1;
    const selectionEnd = target.selectionEnd;
    if (value.length !== selectionEnd)
      window.requestAnimationFrame(() => {
        target.selectionStart = selectionStart;
        target.selectionEnd = selectionStart;
      });

    const regex = RegExp(`[^\\d\\${centsSeparator}\\${groupSeparator}]`, "g");
    const dotsCount = value.replace(RegExp(`[^\\${centsSeparator}]`, "g"), "");
    const splittedVal = value.split(`${centsSeparator}`);
    const symbolsAfterDot = splittedVal?.[1];
    const valueLength = cutAllButDigits(splittedVal?.[0]).length;

    if (regex.test(value) || dotsCount.length > 1) return;

    if (valueLength > 12) return;

    if (!!symbolsAfterDot) {
      value =
        cutAllButDigits(splittedVal?.[0]) +
        centsSeparator +
        cutAllButDigits(symbolsAfterDot).slice(0, 2);
    }

    changeCallback(makeNumberValue(value));

    setVal(makeLocaleString(value));
  };

  return {
    onChange,
    makeLocaleString,
    currencySymbol,
    handleBLur,
    locale,
    setLocale,
    currency,
    setCurrency,
    val,
  };
};
