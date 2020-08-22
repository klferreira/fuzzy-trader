import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AssetSchema = new mongoose.Schema({
  symbol: String,
  amount: Number
}, { timestamps: true })

const WalletSchema = new mongoose.Schema({
  stocks: [AssetSchema],
  cryptos: [AssetSchema]
}, { timestamps: true })

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  wallet: {
    type: WalletSchema
  }
});

UserSchema.method("compare", (input, original) => bcrypt.compare(input, original));

const User = mongoose.model("User", UserSchema);

export default User;
