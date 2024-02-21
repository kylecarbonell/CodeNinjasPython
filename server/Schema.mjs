const activitySchema = (i, username) => {
  const temp = {
    submitted: false,
    code: "",
    author: username,
    activity: `Activity ${i}`,
  };
  return temp;
};
export { activitySchema };
