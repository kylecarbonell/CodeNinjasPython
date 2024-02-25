const activitySchema = (i, username) => {
  const temp = {
    submitted: false,
    code: "",
    author: username,
    activity: `Activity${i}`,

    grade: -1,
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