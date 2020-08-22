import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

import User from "../models/User";

const router = express.Router();

const createJwtToken = (user) =>
  jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "2h" });

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) return res.status(500).json({ message: "Something went wrong" });

    if (!user) return res.status(401).json({ message });

    res.json({ token: createJwtToken(user) });
  })(req, res, next);
});

router.post("/register", (req, res) => {
  const { password, name, email } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, email, password: hash })
      .then(() => res.json({ message: "User created" }))
      .catch(() => res.status(400).json({ message: "User already exists" }));
  });
});

export default router;
