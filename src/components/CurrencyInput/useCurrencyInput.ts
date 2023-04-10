import { useState } from "react";
import { iCurrency } from "./currenciesData";

export const useCurrencyInput = () => {
  const [currency, setCurrency] = useState<iCurrency>({
    name: "US Dollars",
    iso: "USD",
    number_decimals: 2,
    symbols: {
      primary: "US$",
      narrow: "$",
    },
    default_locale: "en-US",
  });

  const [showMenu, setShowMenu] = useState(false);
  const [val, setVal] = useState("0");

  const makeLocaleString = (val: string) => {
    let newVal = val;
    const dotIndex = newVal.indexOf(".");
    const onlyDot = dotIndex === 0 && newVal.length === 1;
    const nextElementAfterDot =
      dotIndex >= 0 ? newVal[dotIndex + 1] : undefined;

    if (onlyDot) return (newVal = "0.");

    if (dotIndex >= 1 || !!nextElementAfterDot) return newVal;

    const formattedValue = getLocaleString(newVal);

    return formattedValue;
  };

  const getLocaleString = (value: string) => {
    const parsedVal = parseLocaleString(value);

    const formatter = Intl.NumberFormat(currency.default_locale, {
      maximumFractionDigits: 2,
    });

    return formatter.format(Number(parsedVal));
  };

  const parseLocaleString = (val: string) => {
    let newVal = val;
    const decimalSeparator = new Intl.NumberFormat(currency.default_locale, {
      maximumFractionDigits: 2,
    })
      .format(1111)
      .replace(/1/g, "");

    newVal = val.replace(new RegExp("\\" + decimalSeparator, "gm"), "");

    return newVal;
  };

  const validValue = (val: string) =>
    new RegExp(/^(0|[0-9]+)?(\.)?([0-9]{1,2})?$/gm).test(val);

  const handleBLur = () => setVal(getLocaleString(val));

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    const selectionStart = target.selectionStart;
    const selectionEnd = target.selectionEnd;
    if (value.length !== selectionEnd) {
      window.requestAnimationFrame(() => {
        target.selectionStart = selectionStart;
        target.selectionEnd = selectionStart;
      });
    }
    const parsedVal = parseLocaleString(value);
    if (!validValue(parsedVal.toString())) return;
    setVal(value);
  };

  const onSelect = (item: iCurrency) => {
    setShowMenu(false);
    setCurrency(item);
  };

  return {
    onChange,
    val,
    setVal,
    currency,
    setCurrency,
    showMenu,
    setShowMenu,
    onSelect,
    makeLocaleString,
    handleBLur,
  };
};
