import express from "express";

import Ticker from "../models/Ticker";

import PricingService from "../service/pricing";
import StockClient from "../lib/stock-client";
import CryptoClient from "../lib/crypto-client";

const router = express.Router();

const stock = StockClient();
const crypto = CryptoClient();

const service = PricingService(stock, crypto);

router.get("/all", (req, res, next) =>
  Ticker.find()
    .lean()
    .then((tickers) => service.getPrices(tickers))
    .then((prices) => res.json(prices))
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    })
);

router.get("/crypto", (req, res, next) =>
  Ticker.find({ type: "CRYPTO" })
    .lean()
    .then(service.getCryptoPrices)
    .then((prices) => res.json(prices))
    .catch((err) => res.status(500).send(err))
);

router.get("/stock", (req, res, next) =>
  Ticker.find({ type: "STOCK" })
    .lean()
    .then(service.getStockPrices)
    .then((prices) => res.json(prices))
    .catch((err) => res.status(500).send(err))
);

export default router;
