import { CurrencyInput } from "components/CurrencyInput/CurrencyInput";
import "assets/index.scss";

function App() {
  const changeCallback = (v: number) => {
    console.log(v, "v number in a parent");
  };
  return (
    <div className="App">
      <CurrencyInput changeCallback={changeCallback} />
    </div>
  );
}

export default App;
