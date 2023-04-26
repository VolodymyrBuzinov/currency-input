import { CurrencyInput } from "components/CurrencyInput/CurrencyInput";
import "assets/index.scss";
import { useCurrencyInput } from "components/CurrencyInput/useCurrencyInput";

function App() {
  const { val, onChange, currencySymbol } = useCurrencyInput();

  return (
    <div className="App">
      <CurrencyInput
        changeCallback={onChange}
        value={val}
        currencySymbol={currencySymbol}
      />
    </div>
  );
}

export default App;
