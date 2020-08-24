import express from "express";

import User from "../models/User";

import WalletService from "../service/wallet";

const router = express.Router();

const service = WalletService();

router.post("/add", (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => service.addToWallet(req.body, user.wallet.toObject()))
    .then((wallet) =>
      User.updateOne({ _id: req.user.id }, { $set: { wallet } })
    )
    .then(() => res.json({ message: "Wallet updated succesfully" }))
    .catch(() => res.status(400).json({ message: "Something went wrong" }));
});

export default router;
