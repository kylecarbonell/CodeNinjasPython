import { useEffect, useState } from "react";
import "./Home.css";
import {} from "react-dropdown";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { CiLock } from "react-icons/ci";

import { Link, useNavigate } from "react-router-dom";

import { getData } from "../Data";
import { call, getImage } from "../../server/Data/data";

function Home() {
  const [dropdownOn, setOn] = useState(false);
  const [index, setIndex] = useState(-1);

  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<any>({});

  const [topics, setTopics] = useState<any>([]);
  const [stars, setStars] = useState<any>([]);

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
      `${call}/getStars?name=${window.sessionStorage.getItem("user")}`
    );

    const json = await data.json();
    console.log("THIS IS STARS", json);

    setStars(Object.entries(json));
  }

  /**FIXME */
  const logout = async (e: any) => {
    e.preventDefault();
    window.sessionStorage.setItem("user", "");
    nav("/", { replace: true });
  };

  useEffect(() => {
    setUsername(window.sessionStorage.getItem("user") || "");
  }, [window.sessionStorage.getItem("user")]);

  useEffect(() => {
    console.log("GETTING ALL DATA");
    getData().then((data) => {
      console.log("THIS IS DATA", data);
      setTopics(data.topics);
      setActivities(data.activities);
      setUserData(data.userData);
    });

    getStars();
  }, []);

  useEffect(() => {
    console.log("ACTIVITY" + activities);
  }, [activities]);

  return (
    <>
      <div className="Home">
        <div className="Bar">
          <div className="Bar-Left">
            <img
              className="Python-Image"
              src={getImage("pythonLogo.jpg")}
            ></img>
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
          <ul className="Activities-List">
            {topics.map((topic: any, key: number) => {
              // console.log(activities)
              return (
                <>
                  <div
                    className="Activity-Dropdown-Container"
                    style={
                      key == index
                        ? {
                            height: `${
                              75 * activities[index].length +
                              100 +
                              15 * activities[index].length
                            }px`,
                          }
                        : {}
                    }
                    // style={key == index ? { height: "auto" } : {}}
                  >
                    <li className="Activity-Dropdown" key={key}>
                      <div className="Activity-Name" key={topic}>
                        {topic}
                      </div>
                      {key + 1 > userData.level ? (
                        <CiLock className="Dropdown-Button  " />
                      ) : (
                        <button
                          className="Dropdown-Button"
                          key={key}
                          onClick={() => {
                            if (key + 1 <= userData.level) {
                              openDrop(key);
                            }
                          }}
                        >
                          {key == index ? (
                            <TiArrowSortedUp style={{ fontSize: "3rem" }} />
                          ) : (
                            <TiArrowSortedDown style={{ fontSize: "3rem" }} />
                          )}
                        </button>
                      )}
                    </li>
                    {index == key &&
                      activities[index].length > 0 &&
                      dropdownOn && (
                        <div className="Activities-Dropdown-Wrapper">
                          {activities[index].map(
                            (activity: any, key: number) => {
                              return (
                                <Link
                                  className="Activity-Link"
                                  key={key}
                                  to={`/activity?name=${activity.link}`}
                                  state={{
                                    link: activity.link,
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
                                        console.log(
                                          "Grade of ",
                                          link,
                                          " is ",
                                          grade
                                        );
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
                            }
                          )}
                        </div>
                      )}
                  </div>
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
