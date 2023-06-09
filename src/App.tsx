import { CurrencyInput } from "components/CurrencyInput/CurrencyInput";
import "assets/index.scss";
import { useCurrencyInput } from "components/CurrencyInput/useCurrencyInput";

function App() {
  const { val, onChange, onBlur } = useCurrencyInput({
    centsSeparator: ".",
    groupSeparator: " ",
  });

  return (
    <div className="App">
      <CurrencyInput
        onChange={onChange}
        onBlur={onBlur}
        value={val}
        currencySymbol={"$"}
      />
    </div>
  );
}

export default App;
