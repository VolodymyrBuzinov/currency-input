import { FC } from "react";
import { useCurrencyInput } from "./useCurrencyInput";

export const CurrencyInput: FC = () => {
  const { val, onChange, makeLocaleString, currencySymbol, handleBLur } =
    useCurrencyInput();

  return (
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
  );
};
