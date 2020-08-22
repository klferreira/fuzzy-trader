import qs from 'querystring';
import axios from "axios";

const apiHost = "https://apiv2.bitcoinaverage.com";

export default (apiKey) => {
  const get = (endpoint, params) => {
    const url = `${apiHost}${endpoint}?${qs.stringify(params)}`;

    return axios
      .get(url, { headers: { "x-ba-key": apiKey } })
      .then((res) => res.data);
  }

  const getPrices = (tickers, params) => {
    Promise.all(
      tickers.map(ticker => get(`/indices/global/ticker/${ticker}`, params))
    ).then((res) => res.map(r => r.data));
  };

  return {
    getPrices
  };
};
