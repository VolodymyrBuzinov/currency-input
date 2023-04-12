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
  // const [locale, setLocale] = useState("en-US");
  // const [currency, setCurrency] = useState("USD");
  const [showMenu, setShowMenu] = useState(false);
  const [val, setVal] = useState("0");
  const [centsSeparator, setCentsSeparator] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  //refactor locales , two selects for locales and second for currency

  useEffect(() => {
    getSymbolAndCentsSeparator();
  }, []);

  useEffect(() => {
    //api call to get data from
    let backendValue = 0;

    if (isNaN(Number(backendValue)) || !Number(backendValue)) backendValue = 0;

    setVal(backendValue.toString());
  }, []);

  const getSymbolAndCentsSeparator = () => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const symbolOnly = formatter
      .formatToParts(1111)
      .filter((item) => item.type === "currency");

    const separator = formatter
      .format(1.11)
      .replace(/1/g, "")
      .replace(symbolOnly[0]?.value, "");

    setCentsSeparator(separator);

    setCurrencySymbol(symbolOnly[0]?.value);
  };

  const makeLocaleString = (val: string) => {
    let newVal = val;

    const separatorIndex = newVal.indexOf(centsSeparator);
    const onlySeparator = separatorIndex === 0 && newVal.length === 1;
    const nextElementAfterSeparator =
      separatorIndex >= 0 ? newVal[separatorIndex + 1] : "";

    if (onlySeparator) return (newVal = `0${centsSeparator}`);

    if (separatorIndex + 1 === newVal.length) return newVal;

    const formatter = Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });

    // debug elements count and element after separator

    // debug when separator is on the middle of a string

    const localizedValue = formatter.format(Number(newVal.replace(/\D/g, "")));

    return localizedValue;
  };

  // const handleBLur = () => setVal(getLocaleString(val));

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    const selectionStart = target.selectionStart;
    const selectionEnd = target.selectionEnd;
    if (value.length !== selectionEnd)
      window.requestAnimationFrame(() => {
        target.selectionStart = selectionStart;
        target.selectionEnd = selectionStart;
      });

    setVal(value);
  };

  return {
    onChange,
    val,
    setVal,
    // currency,
    // setCurrency,
    showMenu,
    setShowMenu,
    makeLocaleString,
    currencySymbol,
    // handleBLur,
  };
};
