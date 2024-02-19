import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const app = express();

import dotenv from "dotenv";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

puppeteer.use(StealthPlugin);

dotenv.config();

const con = process.env.REACT_APP_MONGO_CON;
const PORT = 8000;
let i = 0;

// app.get("/Create", async (req, res) => {
//   const myName = "KyleCarbonell";

//   console.log("HERE FIRST");
//   let browser = await puppeteer.launch({
//     headless: false,
//     args: ["--disable-features=site-per-process"],
//   });
//   const page = await browser.newPage();

//   await page.goto("https://replit.com/~");

//   //Enters Password
//   await page.waitForSelector('input[type="password"]');
//   await page.click('input[type="password"]');
//   await page.keyboard.type("Lu2nglu2");

//   //Enters Username
//   await page.type(".css-1ecwrb4", "razorpooandpee@gmail.com").then(async () => {
//     console.log("here");
//   });

//   //Clicks Login Button

//   await page.keyboard.press("Enter").then(async () => {
//     await page.waitForSelector(".css-1dtnej2");
//     await page.goto("https://replit.com/@razorpooandpee");

//     //Clicks Create
//     // await page.click(".css-1dtnej2");

//     //Choose python
//     await page.waitForSelector(".css-12qfl1s");
//     await page.keyboard.type("python");
//     await page.click(".css-155h4ok");

//     //Names Activity
//     await page.waitForSelector(".css-wwxvxh").then(async () => {
//       await page.keyboard.type("KyleCarbonell-Activity1");
//       await page.keyboard.press("Enter").then(async () => {
//         await page.waitForSelector(".css-1loehem");
//         await page.click(".css-1loehem");

//         await page.waitForSelector(".css-1si1nqs");
//         await page.click(".css-1si1nqs");
//       });
//     });
//   });

//   //Creates replit
// });

app.get("/submit", async (req, res) => {
  i += 1;
  res.status(200).json({ number: i });
  console.log(con);
});

app.get("/instructions", async (req, res) => {
  res.send("instructions");
  res.status(200);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
