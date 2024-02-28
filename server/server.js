import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import puppeteer from "puppeteer-extra";
import { db, act } from "./Mongo.mjs";
import { activitySchema } from "./Data/Schema.mjs";

const app = express();

import dotenv from "dotenv";

dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

dotenv.config();

const con = process.env.REACT_APP_MONGO_CON;
const PORT = process.env.REACT_APP_SERVER_PORT;
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

app.get("/submit", async (req, res) => {});

app.get("/instructions", async (req, res) => {
  res.send("instructions");
  res.status(200);
});

/**
 * Checks if the user exists in the database
 * Logs them in, if they exist
 */
app.post("/login", async (req, res) => {
  // console.log(req.body.username);
  // const getUser = { username: req.body.username };
  // const command = { $set: { signedIn: req.body.signIn } };
  // const login = await db.collection("Python").updateOne(getUser, command);

  const username = req.body.username;
  const names = await act.listCollections().toArray();
  let found = false;
  for (let j = 0; j < names.length; j += 1) {
    console.log(names[j]);
    if (names[j].name == username) {
      res.status(200).send("Account Found");
      found = true;
    }
  }
  if (!found) {
    res.status(202).send("User not found");
  }

  console.log(login);
  // if (
  //   login.modifiedCount == 1 ||
  //   (login.modifiedCount == 0 && login.matchedCount == 1)
  // ) {
  //   console.log("good");
  //   res.status(200);
  // } else {
  //   console.log("bad");
  //   res.status(202);
  // }
  res.send("Logged in successfully");
});

/**
 * Creates users account collection that
 * stores their activities
 *
 * Headers : {username : name of the user}
 * Status {200 : completed adding collection,
 *        400 : user already exists}
 *
 */
app.post("/create", async (req, res) => {
  const username = req.body.username;

  const names = await act.listCollections().toArray();
  let found = false;
  for (let j = 0; j < names.length; j += 1) {
    if (names[j].name == username) {
      found = true;
    }
  }
  if (!found) {
    await act.createCollection(username, {});
    res.status(200).send("Account created");
  } else {
    res.status(401).send("Username exists already");
  }
});

/**
 * Creates documents for given user
 * Used in pair with app.post('/create') to finish
 * creating a users account with all 32 activities
 *
 * Headers : {username : name of the user}
 * Status {200 : completed adding docs,
 *        400 : Could not find the user}
 *
 */
app.post("/createDoc", async (req, res) => {
  const username = req.body.username;

  const names = await act.listCollections().toArray();
  let found = false;
  for (let j = 0; j < names.length; j += 1) {
    found = true;
    if (names[j].name == username) {
      for (let i = 1; i <= 32; i += 1) {
        const addDoc = await act
          .collection(username)
          .insertOne(activitySchema(i, username));
      }
    }
  }

  if (found) {
    res.send(`Completed adding docs for user : ${username}`).status(200);
  } else {
    res.send(`Could not find user: ${username}`).status(400);
  }
});

app.get("/getActivities", async (req, res) => {
  console.log("HERE IN ACT");
  const topics = await act
    .collection("ActivityList")
    .findOne({ topicList: { $exists: true } });

  const docs = act
    .collection("ActivityList")
    .find({ topicList: { $exists: false } });

  // console.log(topic.topicList);
  const topicList = {};

  for (const i of topics.topicList) {
    topicList[i] = [];
  }

  // console.log(topicList);

  for await (const doc of docs) {
    topicList[doc.group].push(doc);
    // console.log("THIS IS DICT");
    // console.log(topicList);
  }

  res.json({ topics: topicList });
});

app.get("/getUser", async (req, res) => {
  const username = req.query.name;
  const actNum = req.query.activity;
  console.log(actNum);

  const activity = await act.collection(username).findOne({ link: actNum });

  res.json(activity);
});

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
