export interface iCurrency {
  name: string;
  iso: string;
  number_decimals: number;
  default_locale?: string;
  symbols: {
    primary: string;
    narrow?: string;
  };
}

export const currenciesData: iCurrency[] = [
  {
    name: "Euro",
    iso: "EUR",
    number_decimals: 2,
    symbols: {
      primary: "€",
      narrow: "€",
    },
    default_locale: "de",
  },
  {
    name: "Japanese Yen",
    iso: "JPY",
    number_decimals: 0,
    symbols: {
      primary: "¥",
      narrow: "¥",
    },
    default_locale: "ja-JP",
  },
  {
    name: "New Polish Zloty",
    iso: "PLN",
    number_decimals: 2,
    symbols: {
      primary: "PLN",
      narrow: "zł",
    },
    default_locale: "pl",
  },
  {
    name: "Pound Sterling",
    iso: "GBP",
    number_decimals: 2,
    symbols: {
      primary: "£",
      narrow: "£",
    },
    default_locale: "en-GB",
  },
  {
    name: "Swiss Franc",
    iso: "CHF",
    number_decimals: 2,
    symbols: {
      primary: "CHF",
    },
    default_locale: "fr-CH",
  },
  {
    name: "Ukraine Hryvnia",
    iso: "UAH",
    number_decimals: 2,
    symbols: {
      primary: "UAH",
      narrow: "₴",
    },
    default_locale: "uk-UA",
  },
  {
    name: "US Dollars",
    iso: "USD",
    number_decimals: 2,
    symbols: {
      primary: "US$",
      narrow: "$",
    },
    default_locale: "en-US",
  },
];
