import { CurrencyInput } from "components/CurrencyInput/CurrencyInput";
import "assets/index.scss";
import { useCurrencyInput } from "components/CurrencyInput/useCurrencyInput";

function App() {
  const { val, onChange, currencySymbol, onBlur } = useCurrencyInput({
    defaultValue: 111111111111 as any,
  });

  return (
    <div className="App">
      <CurrencyInput
        onChange={onChange}
        onBlur={onBlur}
        value={val}
        currencySymbol={currencySymbol}
      />
    </div>
  );
}

export default App;
