import { Double } from "bson";

const activitySchema = (i, username, author) => {
  const temp = {
    submitted: false,
    code: "",
    author: author,
    username: username,
    name: `Activity ${i}`,
    link: `activity${i}`,

    // group: getGroup(i),

    grade: new Double(-1.0),
    sensei: "",
    comments: "",
    incomplete: true,
  };

  return temp;
};

const getGroup = (i) => {
  let topicName = "";
  const topicArr = Object.keys(activityTopics);
  for (let num = 0; num <= topicArr.length; num++) {
    const val = activityTopics[topicArr[num]];
    console.log("KEY", val);
    if (i <= val["end"] && i >= val["start"]) {
      topicName = topicArr[num];
      break;
    }
  }

  return topicName;
};

const activityTemplate = (i) => {
  const temp = {
    link: `activity${i}`,
    group: getGroup(i),
    activity: `Activity ${i}`,
  };

  return temp;
};

const activityTopics = {
  "Printing and Variables": { start: 1, end: 4 },
  "Conditionals (I)": { start: 5, end: 6 },
  "Conditionals (II)": { start: 7, end: 9 },
  Functions: { start: 10, end: 11 },
  "Projects (I)": { start: 12, end: 14 },
  Operators: { start: 15, end: 17 },
  "Loops (I)": { start: 18, end: 20 },
  "Projects (II)": { start: 21, end: 22 },
  "Loops (II)": { start: 23, end: 26 },
  "Return Functions": { start: 27, end: 28 },
  "List and Dictionaries": { start: 29, end: 34 },
  "Projects (III)": { start: 35, end: 38 },
};

export { activitySchema, activityTemplate };
