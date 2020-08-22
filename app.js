import path from "path";
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

if (process.env.NODE_ENV !== "production") dotenv.config();

import loadRoutes from "./routes";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

loadRoutes(app);

mongoose
  .connect(process.env.MLAB_URI, { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => console.log("Successfully connected to database"))
  .catch((err) => {
    throw err;
  });

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Listening on port ", port));
