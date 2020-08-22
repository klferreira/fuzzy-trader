import path from "path";
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";

import loadRoutes from "./routes";

var app = express();

const isProduction = process.env.NODE_ENV === "production";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

loadRoutes(app);

if (!isProduction) {
  dotenv.config()
}

mongoose.connect(process.env.MLAB_URI)
  .then(() => console.log('Successfully connected to database'))
  .catch(err => {
    throw err
  })

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Listening on port ", port));
