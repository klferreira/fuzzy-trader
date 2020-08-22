export default () => {
  return {
    getPrices: () =>
      Promise.resolve([
        {
          open: 477.05,
          high: 499.472,
          low: 477.0,
          close: 497.48,
          volume: 83410275.0,
          adj_high: 499.472,
          adj_low: 477.0,
          adj_close: 497.48,
          adj_open: 477.05,
          adj_volume: 83410275.0,
          symbol: "AAPL",
          exchange: "XNAS",
          date: "2020-08-21T00:00:00+0000",
        },
        {
          open: 2044.76,
          high: 2095.49,
          low: 2025.05,
          close: 2049.98,
          volume: 21241998.0,
          adj_high: 2095.49,
          adj_low: 2025.05,
          adj_close: 2049.98,
          adj_open: 2044.76,
          adj_volume: 21241998.0,
          symbol: "AMZN",
          exchange: "XNAS",
          date: "2020-08-21T00:00:00+0000",
        },
      ]),
  };
};
