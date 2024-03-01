let topics: any = null;
let activities: any = null;
async function getActivity() {
  console.log("In Activity");
  // const call = "http://localhost:8000";
  const call = "https://codeninjaspython.onrender.com";
  console.log(call);
  const data = await fetch(`${call}/getActivities`);
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

export { getData, topics, activities };
