import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import puppeteer from "puppeteer-extra";
import { db, act } from "./Mongo.mjs";
// import { activitySchema } from "./Schema.mjs";

const app = express();

import dotenv from "dotenv";

dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.REACT_APP_ADMIN_PORT;

app.post("/login", async (req, res) => {
  console.log(req.body.username);
  const user = { username: req.body.username };
  const command = { $set: { signedIn: req.body.signIn } };
  const login = await db.collection("Python").updateOne(user, command);
  console.log(login);
  if (
    login.modifiedCount == 1 ||
    (login.modifiedCount == 0 && login.matchedCount == 1)
  ) {
    console.log("good");
    res.status(200);
  } else {
    console.log("bad");
    res.status(202);
  }
  res.send();
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
  const test = await act.createCollection(username, {});
  if (test.codeName == "NamespaceExists") {
    res.status(400).send("username exists");
  } else {
    res.status(200).send("Good");
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
  const user = req.body.username;

  const names = await act.listCollections().toArray();
  let found = false;
  for (let j = 0; j < names.length; j += 1) {
    found = true;
    if (names[j].name == user) {
      for (let i = 1; i <= 32; i += 1) {
        const addDoc = await act.collection(user).insertOne(activitySchema(i));
      }
    }
  }

  if (found) {
    res.send(`Completed adding docs for user : ${user}`).status(200);
  } else {
    res.send(`Could not find user: ${user}`).status(400);
  }
});

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
