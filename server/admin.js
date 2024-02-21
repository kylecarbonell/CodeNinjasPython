import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import puppeteer from "puppeteer-extra";
import { db, act } from "./Mongo.mjs";
// import { activitySchema } from "./Schema.mjs";

const app = express();

import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.REACT_APP_ADMIN_PORT;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Admin Server running on port " + PORT);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
