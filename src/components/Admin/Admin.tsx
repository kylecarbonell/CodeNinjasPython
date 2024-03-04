import { useState } from "react";
import "./Admin.css";
import "./AdminHome";
import AdminHome from "./AdminHome";
// import AdminReviews from "./AdminReviews";
import { IoIosAddCircleOutline } from "react-icons/io";

function Admin() {
  const name = "shirley.nguyen";
  const [users, setUsers] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [tab, setTab] = useState("");

  const [pythonCheck, setPythonCheck] = useState(false);
  const [jsCheck, setJsCheck] = useState(false);

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
    const call = "http://localhost:8000";
    const data = await fetch(`${call}/getAllReviews`);
    const json = await data.json();
    console.log(json);
    setReviews(json);
  };

  const submitAddForm = async (e: any) => {
    e.preventDefault();
    const name: string = e.target[0].value;
    const parent: string = e.target[1].value;
    let username: string = name.toLowerCase().split(" ").join(".");

    let i = 1;
    console.log(users.username);
    // console.log(users.username.includes(username));
    for (let doc of users) {
      if (doc.username == username) {
        username = username + `${i}`;
        i += 1;
      }
    }

    const data = {
      name: name,
      parent: parent,
      username: username,
      signedIn: false,
      class: "Python",
      time: 0,
    };

    await fetch(`http://localhost:8000/createUser`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

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
          <div className="Admin-Content-Bar">Hello, Sensei Kyle</div>
          {tab == "Home" && <AdminHome users={users} setUsers={setUsers} />}
          {
            // tab == "Reviews" && <AdminReviews reviews={reviews} setReviews={setReviews}></AdminReviews>
            tab == "Add" && (
              <>
                <div className="Admin-Home-Content">
                  <form
                    className="Admin-Home-Form"
                    onSubmit={(e: any) => {
                      submitAddForm(e);
                    }}
                  >
                    <h1
                      style={{
                        height: "10%",
                        marginTop: "0",
                        borderBottom: "2px solid black",
                      }}
                    >
                      Add Ninja
                    </h1>
                    <div className="Form-Content">
                      <div className="Form-Input-Wrapper">
                        <h1 className="Form-Label">Ninja Name: </h1>
                        <input
                          name="NinjaName"
                          className="Form-Input"
                          placeholder="Ninja"
                          type="text"
                        />
                      </div>
                      <div className="Form-Input-Wrapper">
                        <h1 className="Form-Label">Parent's Name: </h1>
                        <input
                          name="ParentName"
                          className="Form-Input"
                          placeholder="Parent"
                          type="text"
                        />
                      </div>
                      <div className="Form-Input-Wrapper">
                        <h1
                          className="Form-Label"
                          style={{ marginRight: "10%" }}
                        >
                          Class:{" "}
                        </h1>
                        <h1 style={{ fontSize: "1.5rem" }}>Python</h1>
                        <input
                          name="Python-Button"
                          className="Form-Input"
                          placeholder="John Doe"
                          type="checkbox"
                          style={{ marginLeft: "-10%" }}
                          defaultValue={"false"}
                          onClick={() => {
                            setPythonCheck(!pythonCheck);
                          }}
                        />
                        <h1 style={{ fontSize: "1.5rem" }}>Javascript</h1>
                        <input
                          name="Javascript-Button"
                          className="Form-Input"
                          placeholder="John Doe"
                          type="checkbox"
                          defaultValue={"false"}
                          style={{ marginLeft: "-10%" }}
                          onClick={() => {
                            setJsCheck(!jsCheck);
                          }}
                        />
                      </div>
                      <button className="Submit-Button">Submit</button>
                    </div>
                  </form>
                </div>
              </>
            )
          }
        </div>
      </div>

      <button onClick={createUser}></button>
    </>
  );
}

export default Admin;
