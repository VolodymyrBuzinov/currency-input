import { useOnClickOutside } from "hooks/useOnCLickOutside";
import { FC, MutableRefObject, useRef } from "react";
import { useCurrencyInput } from "./useCurrencyInput";

export const CurrencyInput: FC = () => {
  const {
    val,
    onChange,
    setShowMenu,
    makeLocaleString,
    currencySymbol,
    handleBLur,
  } = useCurrencyInput();
  const wrapRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  useOnClickOutside(wrapRef, () => setShowMenu(false));

  return (
    <div className="CurrencyInput-content" ref={wrapRef}>
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
