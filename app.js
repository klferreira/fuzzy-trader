import path from "path";
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";

import Ticker from "./models/Ticker";
import createPricingService from './service/pricing';
import mockedStockClient from './lib/mock/stock-client';
import mockedCryptoClient from './lib/mock/crypto-client';

var app = express();

const isProduction = process.env.NODE_ENV === "production";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

if (!isProduction) {
  dotenv.config()
}

mongoose.connect(process.env.MLAB_URI)
  .then(() => console.log('Successfully connected to database'))
  .catch(err => {
    throw err
  })

app.get("/", (_, res) =>
  res.json({ status: "live", env: process.env.NODE_ENV, mlab: process.env.MLAB_URI })
);

app.get("/prices", (_, res) => {
  const stock = mockedStockClient();
  const crypto = mockedCryptoClient();
  const service = createPricingService(stock, crypto)

  Ticker.find()
    .then(tickers => tickers.map(t => t.toObject()))
    .then(service.getPrices)
    .then(prices => res.json(prices))
})

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Listening on port ", port));
