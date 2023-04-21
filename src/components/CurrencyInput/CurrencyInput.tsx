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
    locale,
    currency,
    setCurrency,
  } = useCurrencyInput();

  return (
    <div className="CurrencyInput-wrap">
      <span>Locale</span>
      <select
        className="CurrencyInput-locale"
        name="locale"
        value={locale}
        onChange={({ target: { value } }) => setLocale(value)}
      >
        {locales.map((localeItem) => (
          <option key={localeItem} value={localeItem}>
            {localeItem}
          </option>
        ))}
      </select>
      <span className="CurrencyInput-label">Currency</span>
      <select
        className="CurrencyInput-currency"
        name="currency"
        value={currency}
        onChange={({ target: { value } }) => setCurrency(value)}
      >
        {currencies.map((currencyItem) => (
          <option key={currencyItem} value={currencyItem}>
            {currencyItem}
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
