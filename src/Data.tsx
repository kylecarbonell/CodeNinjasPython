async function getActivity() {
  console.log("In Activity");
  const data = await fetch("http://localhost:8000/getActivities");
  const json = await data.json().then((res) => {
    return {
      topics: Object.keys(res.topics),
      activities: Object.values(res.topics),
    };
  });

  return json;
}

async function getData() {
  console.log("STARTING CALL");
  const data = await getActivity();
  const topics = data.topics;
  const activities: any = data.activities;
  return { topics, activities };
}
let topics = null;
let activities = null;
getData().then((data) => {
  topics = data.topics;
  activities = data.activities;
});

export { topics, activities };
