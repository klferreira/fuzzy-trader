import express from "express";

import Ticker from "../models/Ticker";

import PricingService from "../service/pricing";
import mockedStockClient from "../lib/mock/stock-client";
import mockedCryptoClient from "../lib/mock/crypto-client";

const router = express.Router();

const stock = mockedStockClient();
const crypto = mockedCryptoClient();

const service = PricingService(stock, crypto);

router.get("/all", (req, res, next) =>
  Ticker.find()
    .then((tickers) => tickers.map((t) => t.toObject()))
    .then(service.getPrices)
    .then((prices) => res.json(prices))
    .catch((err) => res.status(500).send(err))
);

router.get("/crypto", (req, res, next) =>
  Ticker.find({ type: "CRYPTO" })
    .then((tickers) => tickers.map((t) => t.toObject()))
    .then(service.getCryptoPrices)
    .then((prices) => res.json(prices))
    .catch((err) => res.status(500).send(err))
);

router.get("/stock", (req, res, next) =>
  Ticker.find({ type: "STOCK" })
    .then((tickers) => tickers.map((t) => t.toObject()))
    .then(service.getStockPrices)
    .then((prices) => res.json(prices))
    .catch((err) => res.status(500).send(err))
);

export default router;
