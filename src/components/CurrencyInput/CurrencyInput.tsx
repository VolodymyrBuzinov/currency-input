import { FC } from "react";

interface iCurrencyInput {
  value: string;
  changeCallback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currencySymbol: string;
}

export const CurrencyInput: FC<iCurrencyInput> = ({
  changeCallback,
  value,
  currencySymbol,
}) => {
  return (
    <div className="CurrencyInput-wrap">
      <div className="CurrencyInput-content">
        <p className="CurrencyInput-symbol">{currencySymbol}</p>
        <input
          autoFocus
          value={value}
          className="CurrencyInput"
          type="text"
          onChange={changeCallback}
        />
      </div>
    </div>
  );
};
