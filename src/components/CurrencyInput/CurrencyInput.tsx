import { FC } from "react";
import { currencies, locales, useCurrencyInput } from "./useCurrencyInput";

export const CurrencyInput: FC = () => {
  const {
    val,
    onChange,
    makeLocaleString,
    currencySymbol,
    handleBLur,
    setLocale,
    setCurrency,
  } = useCurrencyInput();

  return (
    <div className="CurrencyInput-wrap">
      <select
        name="locale"
        onChange={({ target: { value } }) => setLocale(value)}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale}
          </option>
        ))}
      </select>
      <select
        name="currency"
        onChange={({ target: { value } }) => setCurrency(value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <div className="CurrencyInput-content">
        <p className="CurrencyInput-symbol">{currencySymbol}</p>
        <input
          value={makeLocaleString(val)}
          className="CurrencyInput"
          type="text"
          onChange={onChange}
          onBlur={handleBLur}
        />
      </div>
    </div>
  );
};
