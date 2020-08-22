import mongoose from "mongoose";

const TickerSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  type: String,
});

const Ticker = mongoose.model("Ticker", TickerSchema);

export default Ticker;
