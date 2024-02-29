import { useEffect, useState } from "react";
import "./Home.css";
import {} from "react-dropdown";
import { TiArrowSortedUp } from "react-icons/ti";

import { Link, useNavigate } from "react-router-dom";

import { getData } from "../Data";

function Home() {
  const [dropdownOn, setOn] = useState(false);
  const [index, setIndex] = useState(-1);

  const [username, setUsername] = useState("");

  const [topics, setTopics] = useState<any>([]);

  // const [topics, setTopics] = useState<String[]>([]);
  const [activities, setActivities] = useState<String[][]>([[]]);

  const nav = useNavigate();

  const openDrop = (key: number) => {
    if (key == index) {
      setOn(false);
      setIndex(-1);
    } else {
      setOn(true);
      setIndex(key);
    }
  };

  const logout = async (e: any) => {
    e.preventDefault();

    const data = {
      username: window.sessionStorage.getItem("user"),
      signIn: false,
    };
    await fetch("https://codeninjaspython.onrender.com/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    } as RequestInit)
      .then((res) => {
        console.log("post request sent");
        if (res.status == 200) {
          console.log("good");
          window.sessionStorage.setItem("user", "");
          nav("/", { replace: true });
        } else if (res.status == 201) {
          console.log("Logged in already");
        } else {
          console.log("bad username");
        }
        // console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setUsername(window.sessionStorage.getItem("user") || "");

    // setTopics(Object.keys(loc.state.topicList));

    // setActivities(Object.values(loc.state.topicList));
  }, [window.sessionStorage.getItem("user")]);

  useEffect(() => {
    console.log("RUNNING HOME");
    getData().then((data) => {
      setTopics(data.topics);
      setActivities(data.activities);
    });

    getStars();
  }, []);
  return (
    <>
      <div className="Home">
        <div className="Bar">
          <div className="Bar-Left">
            <img className="Python-Image" src="/Images/pythonLogo.png"></img>
          </div>
          <div className="Bar-Middle"></div>

          <div className="Bar-Right">
            <h1 id="Bar-Text" style={{ marginRight: "2%" }}>
              {username}
            </h1>
            <button
              className="Signout-Button"
              onClick={(e) => {
                logout(e);
              }}
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="Activities-Wrapper">
          <ul
            className="Activities-List"
            style={
              dropdownOn && activities[index].length > 0
                ? { height: `${800 + 100 * activities[index].length}px` }
                : { height: "900px" }
            }
          >
            {topics.map((topic: any, key: number) => {
              return (
                <>
                  <li className="Activity-Dropdown" key={key}>
                    <div className="Activity-Name">{topic}</div>
                    <button
                      className="Dropdown-Button"
                      key={key}
                      onClick={() => {
                        openDrop(key);
                      }}
                    >
                      <TiArrowSortedUp style={{ fontSize: "3rem" }} />
                    </button>
                  </li>
                  {index == key &&
                  activities[index].length > 0 &&
                  dropdownOn ? (
                    <div
                      className="Activities-Dropdown-Wrapper"
                      style={{ height: `${115 * activities[index].length}px` }}
                    >
                      {activities[index].map((activity: any, key: number) => {
                        return (
                          <Link
                            className="Activity-Link"
                            key={key}
                            to={`/activity?name=${activity.link}`}
                            state={{
                              link: activity.link,
                            }}
                            style={{
                              height: `${100 / activities[index].length}%`,
                              marginLeft: "10%",
                            }}
                            onClick={() => {
                              window.sessionStorage.setItem(
                                "link",
                                activity.link
                              );
                            }}
                          >
                            {activity.activity}
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
