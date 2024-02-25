import { useEffect, useState } from "react";
import "./Home.css";
import { } from "react-dropdown";
import { TiArrowSortedUp } from "react-icons/ti";
import { activities, categories, links } from "../../server/Data/data.tsx";

import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [dropdownOn, setOn] = useState(false);
  const [index, setIndex] = useState(0);
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

  const [username, setUsername] = useState("");
  useEffect(() => {
    console.log(window.sessionStorage.getItem("user"));
    setUsername(window.sessionStorage.getItem("user") || "");
  }, [window.sessionStorage.getItem("user")]);

  return (
    <>
      <div className="Home">
        <div className="Bar">
          <div className="Bar-Left">
            <img
              className="Python-Image"
              src="../public/Images/pythonLogo.png"
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
            {categories.map((activity, key) => {
              return (
                <>
                  <li className="Activity-Dropdown" key={key}>
                    <div className="Activity-Name">{activity}</div>
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
                    index < activities.length &&
                    activities[index].length > 0 &&
                    dropdownOn ? (
                    <div
                      className="Activities-Dropdown-Wrapper"
                      style={{ height: "25%" }}
                    >
                      {activities[index].map((activity, key) => {
                        var value = links[index][key];
                        console.log(value);
                        return (
                          <Link
                            className="Activity-Link"
                            key={key}
                            to={`/activity?name=Activity1`}
                            state={{
                              name: activity,
                              link: `${username}-${value}`,
                            }}
                            style={{ height: "40%", marginLeft: "10%" }}
                          >
                            {activity}
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
