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
  const [groupSeparator, setGroupSeparator] = useState("");
  //refactor locales , two selects for locales and second for currency

  useEffect(() => {
    getSymbolAndCentsSeparator();
  }, []);

  const getSymbolAndCentsSeparator = () => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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
    const nextElementAfterSeparator =
      separatorIndex >= 0 ? newVal[separatorIndex + 1] : "";

    if (onlySeparator) return (newVal = `0${centsSeparator}`);

    if (separatorIndex + 1 === newVal.length || nextElementAfterSeparator)
      return newVal;

    const formatter = Intl.NumberFormat("en-US");

    const localizedValue = formatter.format(Number(newVal.replace(/\D/g, "")));

    return localizedValue;
  };

  const handleBLur = () => setVal(makeLocaleString(val));

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    const selectionStart = target.selectionStart;
    const selectionEnd = target.selectionEnd;
    if (value.length !== selectionEnd)
      window.requestAnimationFrame(() => {
        target.selectionStart = selectionStart;
        target.selectionEnd = selectionStart;
      });

    const regex = RegExp(`[^\\d\\${centsSeparator}\\${groupSeparator}]`, "g");
    const separatorIndex = value.indexOf(centsSeparator);
    const newVal = value.replace(regex, "");
    const maxLength = newVal.indexOf(centsSeparator) + 4;
    const separatorCount = newVal.match(/\./g);

    const doubleGroupSeparator = RegExp(`[\\${groupSeparator}]{2,}`, "g");

    if (!!value.match(doubleGroupSeparator)?.length) return;

    if (regex.test(value)) return;

    if (!!separatorCount && separatorCount.length > 1) return;

    if (separatorIndex >= 1 && maxLength === newVal.length) return;

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
    handleBLur,
  };
};
