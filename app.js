import path from "path";
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) =>
  res.json({ status: "live", env: process.env.NODE_ENV })
);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Listening on port ", port));
