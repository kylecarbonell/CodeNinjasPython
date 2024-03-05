import { useEffect, useState } from "react";
import "./Admin.css";
import "./AdminHome";
import AdminHome from "./AdminHome";
// import AdminReviews from "./AdminReviews";
import { IoIosAddCircleOutline } from "react-icons/io";
import AdminAdd from "./AdminAdd";

import { call } from "../../../server/Data/data";

function Admin() {
  const [users, setUsers] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [tab, setTab] = useState("Home");

  const getReviews = async () => {
    const data = await fetch(`${call}/getAllReviews`);
    const json = await data.json();
    console.log(json);
    setReviews(json);
  };

  const getUsers = async () => {
    const data = await fetch(`${call}/admin`);
    const json = await data.json();
    console.log(json);

    setUsers(json);
    console.log(reviews);
  };

  useEffect(() => {
    getUsers();
  }, []);

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
                getReviews();
                setTab("Reviews");
              }}
            >
              <img className="Bar-Image" src="/reviews.svg"></img>
              Reviews
            </button>
            <button
              className="Admin-Bar-Button"
              onClick={() => {
                getUsers();
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
            Hello, Sensei Kyle
            {tab == "Ninjas" && <input />}
          </div>
          {tab == "Home" && (
            <AdminHome users={users} setUsers={setUsers} getUsers={getUsers} />
          )}
          {tab == "Add" && (
            <AdminAdd users={users} getUsers={getUsers} setTab={setTab} />
          )}
          {tab == "Ninjas" && (
            <>
              <div className="Ninja-Container">
                {users.map((user: any) => {
                  return (
                    <div className="Ninja-Item">
                      <h1>{user.name}</h1>
                      have button to click
                      on click = fetch activities from ninja to look at each one
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
