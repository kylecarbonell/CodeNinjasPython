import { useState } from "react";
import "./Admin.css";
import "./AdminHome"
import AdminHome from "./AdminHome";
// import AdminReviews from "./AdminReviews";

function Admin() {
  const name = "shirley.nguyen";
  const [users, setUsers] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [tab, setTab] = useState("")



  const createDoc = async () => {
    console.log("In the admin req");
    const data = { username: name };



    await fetch("https://codeninjaspython.onrender.com/createDoc", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    } as RequestInit).then(async (res) => {
      const text = await res.text();
      console.log(text);
    });
  };

  const createUser = async () => {
    const data = { username: name };
    console.log("Working on creating user");
    await fetch("https://codeninjaspython.onrender.com/create", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    } as RequestInit).then(async (res) => {
      const status = await res.status;
      if (status == 200) {
        const text = await res.text();
        console.log(text);
        createDoc();
      }
    });
  };

  const getReviews = async () => {
    const call = "http://localhost:8000"
    const data = await fetch(`${call}/getAllReviews`)
    const json = await data.json();
    console.log(json)
    setReviews(json)
  }


  return (
    <>
      <div className="Admin">
        <div className="Admin-Bar">
          <div className="Admin-Bar-Content">
            <button className="Admin-Bar-Button">
              <img className="Bar-Image" src="/home.svg" onClick={() => {
                setTab("Home")
              }}></img>
              Home
            </button>
            <button className="Admin-Bar-Button" onClick={() => {
              getReviews()
              setTab("Reviews")
            }}>
              <img className="Bar-Image" src="/reviews.svg"></img>
              Reviews
            </button>
            <button className="Admin-Bar-Button" onClick={() => {
              setTab("Ninjas")
            }}>
              <img className="Bar-Image" src="/my-ninja.svg"></img>
              My Ninjas
            </button>
            <button className="Admin-Bar-Button" onClick={() => {
              setTab("Support")
            }}>
              <img className="Bar-Image" src="/support.svg"></img>
              Support
            </button>
          </div>
          <div className="Admin-Bar-Account">
            <button className="Admin-Account-Buttons">
              <img className="Account-Image" src="/user.jpg" style={{ borderRadius: "30px", width: "40%" }} />
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
          </div>
          {
            tab == "Home" && <AdminHome users={users} setUsers={setUsers} />
          }
          {
            // tab == "Reviews" && <AdminReviews reviews={reviews} setReviews={setReviews}></AdminReviews>
            tab == "Reviews" && <>
              <h1>hi</h1>
              {
                reviews.map((review: any) => {
                  console.log(review)
                  return (
                    <>
                      <div>
                        <h1>{review.author}</h1>
                        <h1>{review.name}</h1>
                      </div>
                    </>
                  )
                })
              }
            </>
          }


        </div>
      </div >

      <button onClick={createUser}></button>
    </>
  );
}

export default Admin;
