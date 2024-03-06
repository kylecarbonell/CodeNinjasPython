import { useEffect, useState } from "react";
import "./Admin.css";
import "./AdminHome";
import AdminHome from "./AdminHome";
// import AdminReviews from "./AdminReviews";
import { IoIosAddCircleOutline } from "react-icons/io";
import AdminAdd from "./AdminAdd";

import { call } from "../../../server/Data/data";
import AdminNinja from "./AdminNinja";

function Admin() {
  const [users, setUsers] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [tab, setTab] = useState("Home");
  const [userData, setUserData] = useState<any>({});

  const [search, setSearch] = useState("");

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
            <div style={{ width: "50%" }}>Hello, Sensei Kyle</div>

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
                    console.log(rev);
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
        </div>
      </div>
    </>
  );
}

export default Admin;
