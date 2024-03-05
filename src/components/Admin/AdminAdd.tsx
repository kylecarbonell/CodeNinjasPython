import { useState } from "react";
import { call } from "../../../server/Data/data";


interface props {
  users: any;
  getUsers: any;
  setTab: (v: string) => any;
}

function AdminAdd(props: props) {
  const [pythonCheck, setPythonCheck] = useState(false);
  const [jsCheck, setJsCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitAddForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const name: string = e.target[0].value;
    const parent: string = e.target[1].value;
    const normUser: string = name.toLowerCase().split(" ").join(".");
    let username = normUser;
    let i = 1;

    console.log(username);
    props.getUsers();
    console.log(props.users);
    for (let doc of props.users) {
      console.log(doc);
      if (doc.username == username) {
        username = normUser + `${i}`;
        console.log("USERNAME", username);
        i += 1;
      }
    }
    1;
    const data = {
      name: name,
      parent: parent,
      username: username,
      signedIn: false,
      time: 0,
    };

    console.log(data);

    // const call = "https://codeninjaspython.onrender.com";

    console.log("Working on creating user");
    await fetch(`${call}/create`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    } as RequestInit).then(async (res) => {
      const status = await res.status;
      if (status == 200) {
        const text = await res.text();
        console.log(text);
        createDoc(data.username);
      }
    });
  };

  const createDoc = async (username: string) => {
    console.log("In the admin req");
    const data = { username: username };

    // const call = "https://codeninjaspython.onrender.com";
    const call = "http://localhost:8000";

    await fetch(`${call}/createDoc`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    } as RequestInit).then(async (res) => {
      const text = await res.text();
      console.log(text);
      props.getUsers();
      window.location.reload();
      setLoading(true);
    });
  };

  return (
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
              <h1 className="Form-Label" style={{ marginRight: "10%" }}>
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
            {!loading && <button className="Submit-Button">Submit</button>}
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminAdd;
