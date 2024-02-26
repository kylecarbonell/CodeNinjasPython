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

function getData() {
  console.log("STARTING CALL");
  return getActivity();
}

const data = await getData();
const topics = data.topics;
const activities: any = data.activities;

export { topics, activities };
