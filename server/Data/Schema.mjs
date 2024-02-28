import { Double } from "bson";

const activitySchema = (i, username) => {
  const temp = {
    submitted: false,
    code: "",
    author: username,
    name: `Activity ${i}`,
    link: `activity${i}`,

    grade: -1.0,
    sensei: "",
    comments: "",
    incomplete: true,
  };

  return temp;
};

const userSchema = (user) => {
  const temp = {
    username: user,
  };
};

export { activitySchema };
