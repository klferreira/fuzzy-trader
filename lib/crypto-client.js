import qs from "querystring";
import axios from "axios";

const apiHost = "https://apiv2.bitcoinaverage.com";

export default () => {
  const get = (endpoint, params) => {
    const url = `${apiHost}${endpoint}?${qs.stringify(params)}`;

    return axios
      .get(url, {
        headers: { "x-ba-key": process.env.BITCOIN_AVERAGE_ACCESS_KEY },
      })
  };

  const getPrices = ({ symbols }, params) =>
    Promise.all(
      symbols.map((symbol) => get(`/indices/global/ticker/${symbol}USD`, params))
    ).then((res) => res.map((r) => r.data));

  return {
    getPrices,
  };
};
