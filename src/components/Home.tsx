import { useEffect, useState } from "react";
import "./Home.css";
import {} from "react-dropdown";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { getData } from "../Data";

function Home() {
  const [dropdownOn, setOn] = useState(false);
  const [index, setIndex] = useState(-1);

  const [username, setUsername] = useState("");

  const [topics, setTopics] = useState<any>([]);
  const [stars, setStars] = useState<any>([]);
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

  async function getStars() {
    const data = await fetch(
      `http://localhost:8000/getStars?name=${window.sessionStorage.getItem(
        "user"
      )}`
    );

    const json = await data.json();
    console.log("THIS IS STARS", json);

    setStars(Object.entries(json));
  }

  const logout = async (e: any) => {
    e.preventDefault();
    window.sessionStorage.setItem("user", "");
    nav("/", { replace: true });
  };

  useEffect(() => {
    setUsername(window.sessionStorage.getItem("user") || "");

    // setTopics(Object.keys(loc.state.topicList));

    // setActivities(Object.values(loc.state.topicList));
  }, [window.sessionStorage.getItem("user")]);

  useEffect(() => {
    console.log("GETTING ALL DATA");
    getData().then((data) => {
      setTopics(data.topics);
      setActivities(data.activities);
    });

    getStars();
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
                    <div className="Activity-Name" key={topic}>
                      {topic}
                    </div>
                    <button
                      className="Dropdown-Button"
                      key={key}
                      onClick={() => {
                        openDrop(key);
                      }}
                    >
                      {dropdownOn ? (
                        <TiArrowSortedUp style={{ fontSize: "3rem" }} />
                      ) : (
                        <TiArrowSortedDown style={{ fontSize: "3rem" }} />
                      )}
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
                            <div className="Link-Title">
                              {activity.activity}
                            </div>

                            <div className="Link-Stars">
                              {stars.map((act: any) => {
                                var [link, grade] = act;
                                if (link == activity.link) {
                                  console.log("Grade of ", link, " is ", grade);
                                  // console.log("IN MAP", act)
                                  let stars = [];
                                  for (let i = 0; i < 3; i++) {
                                    console.log(grade);
                                    if (grade >= 1) {
                                      stars.push(<FaStar />);
                                    } else if (grade < 1 && grade > 0) {
                                      stars.push(<FaStarHalfAlt />);
                                    } else {
                                      stars.push(<FaRegStar />);
                                    }

                                    grade -= 1;
                                  }
                                  return stars;
                                }
                              })}
                            </div>
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
