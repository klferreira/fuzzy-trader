const parseStockPrice = (price) => ({
  open: price.open,
  high: price.high,
  low: price.low,
  volume: price.volume,
  symbol: price.symbol,
  timestamp: new Date(price.date),
});

const parseCryptoPrice = (price) => ({
  open: price.open.hour,
  high: price.high,
  low: price.low,
  volume: price.volume,
  symbol: price["display_symbol"].split("-").shift(),
  timestamp: new Date(price["display_timestamp"]),
});

export default (stockClient, cryptoClient) => {
  const getStockPrices = (tickers) =>
    stockClient
      .getPrices({ symbols: tickers.map((t) => t.symbol) })
      .then((prices) => prices.map(parseStockPrice))
      .then((prices) =>
        tickers.map((ticker) =>
          Object.assign(ticker, {
            prices: prices.find((price) => price.symbol === ticker.symbol),
          })
        )
      );

  const getCryptoPrices = (tickers) =>
    cryptoClient
      .getPrices({ symbols: tickers.map((t) => t.symbol) })
      .then((prices) => prices.map(parseCryptoPrice))
      .then((prices) =>
        tickers.map((ticker) =>
          Object.assign(ticker, {
            prices: prices.find((price) => price.symbol === ticker.symbol),
          })
        )
      );

  const getPrices = (tickers) => {
    return Promise.all([
      getStockPrices(tickers.filter((t) => t.type === "STOCK")),
      getCryptoPrices(tickers.filter((t) => t.type === "CRYPTO")),
    ]).then(([stocks, cryptos]) => ({ stocks, cryptos }));
  };

  return {
    getPrices,
    getStockPrices,
    getCryptoPrices,
  };
};
