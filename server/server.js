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

app.post("/submit", async (req, res) => {
  const username = req.body.username;
  console.log(username);
  const link = req.body.link;

  await act
    .collection(username)
    .updateOne({ link: link }, { $set: { submitted: true } });

  res.sendStatus(200);
});

app.get("/instructions", async (req, res) => {
  res.send("instructions");
  res.status(200);
});

/**
 * Checks if the user exists in the database
 * Logs them in, if they exist
 */
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const user = await db.collection("Python").findOne({ username: username });
  if (user == null) {
    res.status(202).send("User not found");
  } else {
    if (user.signedIn == true) {
      res.sendStatus(200);
    } else {
      res.status(201).send("Please checkin again");
    }
  }
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
  console.log(req.body);

  const username = req.body.username;
  const data = req.body;

  console.log(username);

  await db.collection("Python").insertOne(data);
  await act.createCollection(username, {});
  res.status(200).send("Account created");
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
  const name = req.body.name;

  const names = await act.listCollections().toArray();
  let found = false;
  for (let j = 0; j < names.length; j += 1) {
    found = true;
    if (names[j].name == username) {
      for (let i = 1; i <= 38; i += 1) {
        const addDoc = await act
          .collection(username)
          .insertOne(activitySchema(i, username, name));
        // console.log("ADDING DOC ", i);
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
  const username = req.query.name;

  const topics = await act
    .collection("Topics")
    .findOne({ topicList: { $exists: true } });

  const docs = act.collection("ActivityList").find({});

  const user = await db.collection("Python").findOne({ username: username });
  console.log(user);
  const topicList = {};

  for (const i of topics.topicList) {
    topicList[i] = [];
  }

  for await (const doc of docs) {
    topicList[doc.group].push(doc);
  }

  res.json({ topics: topicList, userData: user });
});

app.get("/getUser", async (req, res) => {
  const username = req.query.name;
  const actNum = req.query.activity;
  console.log(actNum);

  const activity = await act.collection(username).findOne({ link: actNum });

  res.json(activity);
});

app.get("/admin", async (req, res) => {
  const arr = [];
  const signedIn = [];
  const users = await db.collection("Python").find({});
  for await (const doc of users) {
    // console.log(doc);
    arr.push(doc);
  }
  res.json(arr);
});

app.post("/checkin", async (req, res) => {
  const username = req.body.username;
  const signIn = await db
    .collection("Python")
    .updateOne(
      { username: username, signedIn: false },
      { $set: { signedIn: true, time: 60 } }
    );
  res.sendStatus(200);
});

app.get("/getStars", async (req, res) => {
  const username = req.query.name;
  const grades = {};

  const activity = act.collection(username).find({});
  for await (const doc of activity) {
    grades[doc.link] = doc.grade;
  }

  res.send(grades);
});

app.post("/saveCode", async (req, res) => {
  const newCode = req.body.code;
  const link = req.body.link;
  const username = req.body.user;
  console.log("HJERERE");

  console.log("CODE NEW", newCode);
  console.log("LINK", link);

  const push = await act
    .collection(username)
    .updateOne({ link: link }, { $set: { code: newCode } });
  console.log(push);

  res.send("");
});

app.get("/getAllReviews", async (req, res) => {
  const names = await act.listCollections().toArray();
  const namesArr = [];
  const reviews = [];
  for (const i of names) {
    if (i.name != "ActivityList" && i.name != "Topics") {
      namesArr.push(i.name);
      console.log(namesArr);
    }
  }

  for (let i = 0; i < namesArr.length; i += 1) {
    const data = await act.collection(namesArr[i]).find({});
    for await (const doc of data) {
      reviews.push(doc);
    }
  }

  res.json(reviews);
});

app.post("/getUserStats", async (req, res) => {
  console.log("HEHREH");
  // const username = req.body.username;
  // console.log(username);

  let dict = {};
  let acts = [];
  let actTopics = [];
  let userData = {};
  let usernames = [];

  const topics = await act
    .collection("Topics")
    .findOne({ topicList: { $exists: true } });

  const activities = await act.collection("ActivityList").find({});

  const getNames = await act.listCollections().toArray();

  for await (let act of activities) {
    actTopics.push(act);
  }

  for await (let name of getNames) {
    usernames.push(name.name);
  }

  for (let username of usernames) {
    if (username == "ActivityList" || username == "Topics") {
      continue;
    }

    const docs = await act.collection(username).find({});
    // console.log(username);

    for (let topic of topics.topicList) {
      dict[topic] = [];
    }

    for await (let doc of docs) {
      acts.push(doc);
    }

    // console.log("STARTING DOCS");
    for (let i = 0; i < acts.length; i++) {
      for (let j = 0; j < actTopics.length; j++) {
        if (acts[i].link == actTopics[j].link) {
          dict[actTopics[j].group].push(acts[i]);
        }
      }
    }
    // console.log("ENDING DOCS");
    userData[username] = dict;

    dict = {};
    acts = [];

    // console.log(userData);
  }
  // console.log("DONEDONE");
  res.send(userData);
});

app.post("/createActivities", async (req, res) => {
  for (let i = 1; i <= 38; i += 1) {
    const addDoc = await act
      .collection("ActivityList")
      .insertOne(activityTemplate(i));
  }
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
