import express from "express";

import User from "../models/User";

const router = express.Router();

router.get("/", (req, res) => {
  User.findById(req.user.id)
    .then((user) => res.json(user))
    .catch(() => res.status(404).json({ message: "Not found" }));
});

export default router;
