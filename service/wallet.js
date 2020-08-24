import Ticker from "../models/Ticker";

export default () => {
  const addToWallet = async (asset, wallet) => {
    const ticker = await Ticker.findOne({ symbol: asset.symbol });
    if (!ticker) {
      throw new Error("Invalid symbol");
    }

    let found = false;
    const assetType = ticker.type === "CRYPTO" ? "cryptos" : "stocks";
    
    for (let i = 0; i < wallet[assetType].length; i++) {
      if (wallet[assetType][i].symbol === asset.symbol) {
        wallet[assetType][i].amount += asset.amount;
        found = true;
      }
    }

    if (!found) {
      wallet[assetType].push({
        symbol: asset.symbol,
        amount: asset.amount,
      });
    }

    return wallet;
  };

  return {
    addToWallet,
  };
};
