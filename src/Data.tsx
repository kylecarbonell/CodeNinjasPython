import { call } from "../server/Data/data";

let topics: any = null;
let activities: any = null;
async function getActivity() {
  const username = window.sessionStorage.getItem("user")
  console.log("USERNAME", username)
  const data = await fetch(`${call}/getActivities?` + new URLSearchParams({
    name: username || ""
  }));
  const json = await data.json().then((res) => {
    return {
      topics: Object.keys(res.topics),
      activities: Object.values(res.topics),
      userData: res.userData
    };
  });

  return json;
}

async function getData() {
  console.log("STARTING CALL");
  const data = await getActivity();
  const topics = data.topics;
  const activities: any = data.activities;
  const userData = data.userData;
  return { topics, activities, userData };
}

export { getData, topics, activities };
