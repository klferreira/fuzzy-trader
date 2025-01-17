import qs from "querystring";
import axios from "axios";

const apiHost = "http://api.marketstack.com/v1";

export default () => {
  const get = (endpoint, params) => 
    axios
      .get(
        `${apiHost}${endpoint}?access_key=${
          process.env.MARKETSTACK_ACCESS_KEY
        }&symbols=${params.symbols.join(",")}`
      )
      .then((res) => res.data.data);

  return {
    getPrices: (params) => get("/eod/latest", params),
  };
};
