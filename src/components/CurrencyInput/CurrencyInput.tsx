import { useOnClickOutside } from "hooks/useOnCLickOutside";
import { FC, MutableRefObject, useRef } from "react";
import { currenciesData } from "./currenciesData";
import { useCurrencyInput } from "./useCurrencyInput";

export const CurrencyInput: FC = () => {
  const {
    val,
    onChange,
    currency,
    showMenu,
    setShowMenu,
    onSelect,
    makeLocaleString,
    handleBLur,
  } = useCurrencyInput();
  const wrapRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  useOnClickOutside(wrapRef, () => setShowMenu(false));

  return (
    <div className="CurrencyInput-content" ref={wrapRef}>
      <div className="CurrencyInput-control" onClick={() => setShowMenu(true)}>
        <svg className="CurrencyInput-select" viewBox="0 0 32 32">
          <path d="M16.001 19.314l-8.485-8.485 2.828-2.829 5.657 5.657 5.657-5.657 2.828 2.828-8.485 8.486zM8 28h16v-4h-16v4z"></path>
        </svg>
        <span className="CurrencyInput-currency">{currency?.iso}</span>
      </div>
      <div className="CurrencyInput-wrap">
        <input
          value={makeLocaleString(val)}
          className="CurrencyInput"
          type="text"
          onChange={onChange}
          onBlur={handleBLur}
        />
      </div>

      {showMenu && (
        <div className="CurrencyInput-menu">
          {currenciesData.map((item) => (
            <span
              className="CurrencyInput-menu-item"
              key={item.name}
              onClick={() => onSelect(item)}
            >
              {item.iso} - {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
