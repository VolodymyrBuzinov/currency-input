import { FC, InputHTMLAttributes } from "react";

interface iCurrencyInput extends InputHTMLAttributes<HTMLInputElement> {
  currencySymbol: string;
}

export const CurrencyInput: FC<iCurrencyInput> = ({
  currencySymbol,
  ...rest
}) => {
  return (
    <div className="CurrencyInput-wrap">
      <div className="CurrencyInput-content">
        <p className="CurrencyInput-symbol">{currencySymbol}</p>
        <input {...rest} className="CurrencyInput" type="text" />
      </div>
    </div>
  );
};
