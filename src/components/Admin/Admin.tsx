import { useEffect, useState } from "react";
import "./Admin.css";
// import "./AdminHome";
import { IoIosAddCircleOutline } from "react-icons/io";

import { call } from "../../../server/Data/data";
import { getData } from "../../Data";

import Dropdown from "react-dropdown";

import AdminHome from "./Home Tab/AdminHome";
import AdminAdd from "./Add Ninja Tab/AdminAdd";
import AdminAddActivity from "./Add Activity Tab/AdminAddActivity";
import AdminNinja from "./Ninja Tab/AdminNinja";

function Admin() {
  const [users, setUsers] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [tab, setTab] = useState("Home");
  const [userData, setUserData] = useState<any>({});

  const [topics, setTopics] = useState<any>([]);
  const [activities, setActivities] = useState<any>([]);
  const [index, setIndex] = useState(0);

  const [openAdd, setOpenAdd] = useState(false);

  const [search, setSearch] = useState("");

  const submitAdds = async () => {
    await fetch(`${call}/submitAdds`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ acts: activities }),
    }).then(async (res) => {
      const text = await res.text();
      alert(text);
    });
  };

  useEffect(() => {
    console.log(activities);
  }, [activities]);

  const getReviews = async () => {
    const data = await fetch(`${call}/getAllReviews`);
    const json = await data.json();
    // console.log(json);
    setReviews(json);
    console.log(reviews);
  };

  const getUsers = async () => {
    const data = await fetch(`${call}/admin`);
    const json = await data.json();
    // console.log(json);

    setUsers(json);
    // console.log(reviews);
  };

  const getUserData = async () => {
    console.log("GETTING");
    // console.log(data);
    await fetch(`${call}/getUserStats`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const json = await res.json();
      setUserData(json);

      // console.log(json)
    });
  };

  const getNinja = (link: string) => {
    const data = userData[link];
    console.log(data);
  };

  useEffect(() => {
    getUsers();
    getReviews();
    getUserData();
    getData().then((data: any) => {
      setActivities(data.activities);
      setTopics(data.topics);
    });
  }, []);

  useEffect(() => {
    getUsers();
    getReviews();
    getUserData();
  }, [tab]);

  return (
    <>
      <div className="Admin">
        <div className="Admin-Bar">
          <div className="Admin-Bar-Content">
            <button className="Admin-Bar-Button">
              <img
                className="Bar-Image"
                src="/home.svg"
                onClick={() => {
                  setTab("Home");
                }}
              ></img>
              Home
            </button>
            <button
              className="Admin-Bar-Button"
              onClick={() => {
                console.log("USERSGUY:", userData);
                setTab("Reviews");
              }}
            >
              <img className="Bar-Image" src="/reviews.svg"></img>
              Reviews
            </button>
            <button
              className="Admin-Bar-Button"
              onClick={() => {
                setTab("Ninjas");
              }}
            >
              <img className="Bar-Image" src="/my-ninja.svg"></img>
              My Ninjas
            </button>
            <button
              className="Admin-Bar-Button"
              onClick={() => {
                setTab("Support");
              }}
            >
              <img className="Bar-Image" src="/support.svg"></img>
              Support
            </button>
            <button
              className="Admin-Bar-Button"
              onClick={() => {
                setTab("Add");
              }}
            >
              <IoIosAddCircleOutline className="Bar-Image" />
              Add Ninja
            </button>
            <button
              className="Admin-Bar-Button"
              onClick={async () => {
                setTab("AddActivity");

                // await fetch(`${call}/createActivities`, {
                //   method: "post",
                //   headers: { "Content-Type": "application/json" },
                // });
              }}
            >
              <IoIosAddCircleOutline className="Bar-Image" />
              Add Activity
            </button>
          </div>
          <div className="Admin-Bar-Account">
            <button className="Admin-Account-Buttons">
              <img
                className="Account-Image"
                src="/user.jpg"
                style={{
                  borderRadius: "30px",
                  width: "40%",
                }}
              />
              Kyle Carbonell
            </button>
            <button className="Admin-Account-Buttons">
              <img className="Account-Image" src="/logout.svg" />
              Log out
            </button>
          </div>
        </div>
        <div className="Admin-Content-Wrapper">
          <div className="Admin-Content-Bar">
            <div
              style={{
                width: "100%",
                boxSizing: "border-box",
                paddingLeft: "5%",
              }}
            >
              Hello, Sensei Kyle
            </div>

            <div className="Ninja-Search-Bar-Container">
              {tab == "Ninjas" && (
                <input
                  style={{ width: "75%", height: "35%", fontSize: "1.5rem" }}
                  type="Text"
                  placeholder="Search Ninja"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              )}
              {tab == "AddActivity" && (
                <>
                  <Dropdown
                    className="Add-Dropdown"
                    options={topics}
                    menuClassName="Open-Dropdown"
                    onChange={(e) => {
                      for (let i = 0; i < topics.length; i++) {
                        if (topics[i] == e.value) {
                          setIndex(i);
                          break;
                        }
                      }
                    }}
                    placeholder={topics[index]}
                  />
                  <button
                    className="Submit-Adds"
                    onClick={() => {
                      setOpenAdd(!openAdd);
                    }}
                  >
                    Add
                  </button>
                  <button className="Submit-Adds" onClick={submitAdds}>
                    Submit
                  </button>
                </>
              )}
            </div>
          </div>
          {tab == "Home" && (
            <AdminHome users={users} setUsers={setUsers} getUsers={getUsers} />
          )}
          {tab == "Add" && (
            <AdminAdd users={users} getUsers={getUsers} setTab={setTab} />
          )}
          {tab == "Ninjas" && (
            <AdminNinja
              users={users}
              getNinja={getNinja}
              search={search}
              setSearch={setSearch}
            ></AdminNinja>
          )}

          {tab == "Reviews" && (
            <>
              <div className="Review-Container">
                <div className="Review-Filter-Bar"></div>
                <div className="Review-Content-Container">
                  {reviews.map((rev: any) => {
                    // console.log(rev);
                    if (rev.submitted) {
                      return (
                        <>
                          <div className="Review-Item">
                            <h1>{rev.author}</h1>
                            <h2>{rev.name}</h2>
                          </div>
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            </>
          )}

          {tab == "AddActivity" && (
            <AdminAddActivity
              activities={activities}
              index={index}
              setActivities={setActivities}
            />
          )}
        </div>
      </div>

      {openAdd && (
        <div
          className="Add-Modal-Container"
          onClick={(e: any) => {
            console.log(e.target.className);
            if (e.target.className == "Add-Modal-Container") {
              setOpenAdd(false);
            }
          }}
        >
          <form className="Modal-Form">
            <div className="Modal-Input">
              <div className="Modal-Input-Container">
                <h1 className="Modal-Input-Text">Add Activity</h1>
              </div>
              <div className="Modal-Input-Container">
                <h1 className="Modal-Input-Text">Activity Name</h1>
                <input className="Modal-Input-Item"></input>
              </div>
              <div className="Modal-Input-Container">
                <h1 className="Modal-Input-Text">Groupings</h1>
                <input className="Modal-Input-Item"></input>
              </div>
              <div className="Modal-Input-Container">
                <h1 className="Modal-Input-Text">File</h1>
                <input className="Modal-Input-Item"></input>
              </div>
            </div>

            <div className="Modal-Button">
              <button
                style={{ backgroundColor: "var(--lightBlue)", border: 0 }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Admin;
