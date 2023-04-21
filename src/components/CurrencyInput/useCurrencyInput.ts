import { useEffect, useState } from "react";

export const currencies = ["EUR", "JPY", "PLN", "GBP", "CHF", "UAH", "USD"];

export const locales = [
  "de",
  "ja-JP",
  "pl",
  "en-GB",
  "fr-CH",
  "uk-UA",
  "en-US",
];

export const useCurrencyInput = () => {
  const [locale, setLocale] = useState("en-US");
  const [currency, setCurrency] = useState("USD");
  const [val, setVal] = useState("0");
  const [centsSeparator, setCentsSeparator] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [groupSeparator, setGroupSeparator] = useState("");

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

  const makeLocaleString = (val: string) => {
    let newVal = val;
    const separatorIndex = newVal.indexOf(centsSeparator);
    const onlySeparator = separatorIndex === 0 && newVal.length === 1;
    const splittedVal = newVal.split(`${centsSeparator}`);
    const symbolsAfterDot = splittedVal?.[1];

    if (onlySeparator) return `0${centsSeparator}`;

    const formatter = Intl.NumberFormat(locale);

    const localizedValue = formatter.format(
      Number(splittedVal?.[0].replace(/\D/g, ""))
    );

    if (!symbolsAfterDot && separatorIndex >= 1)
      return `${localizedValue}${centsSeparator}`;

    return !!symbolsAfterDot
      ? `${localizedValue}${centsSeparator}${symbolsAfterDot}`
      : localizedValue;
  };

  const handleBLur = () => {
    const newVal = Number(
      val
        .replace(RegExp(`\\${centsSeparator}`), ".")
        .replace(RegExp(`[^\\d\\.]`, "g"), "")
    );
    setVal(Intl.NumberFormat(locale).format(newVal));
  };

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    let value = target.value;

    const selectionStart = target.selectionStart;
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

    if (regex.test(value) || dotsCount.length > 1) return;

    if (!!symbolsAfterDot && symbolsAfterDot?.length > 2)
      value =
        splittedVal?.[0].replace(/\D/g, "") +
        centsSeparator +
        symbolsAfterDot.slice(0, 2);

    setVal(value);
  };

  return {
    onChange,
    val,
    setVal,
    makeLocaleString,
    currencySymbol,
    handleBLur,
    locale,
    setLocale,
    currency,
    setCurrency,
  };
};
