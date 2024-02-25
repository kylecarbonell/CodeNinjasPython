import { useEffect, useState } from "react";
import "./App.css";

import { useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const [activities, setActivities] = useState([]);
  const test = "Hi";

  async function getActivity() {
    const data = await fetch("http://localhost:8000/getActivities");
    const json = await data.json();
    console.log(json);
  }
  useEffect(() => {
    getActivity();
  }, []);

  const onSubmit = async (e: any, signIn: boolean) => {
    e.preventDefault();
    console.log("SUBMITTING");

    const data = { username: name, signIn: signIn };
    await fetch("https://codeninjaspython.onrender.com/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    } as RequestInit)
      .then((res) => {
        console.log("post request sent");
        if (res.status == 200) {
          console.log("good");
          window.sessionStorage.setItem("user", name);
          nav("/home", { replace: true, state: { activities, test } });
          setError("");
        } else {
          console.log("bad username");
          setError(
            "User not found: Please check if your username has been entered correctly"
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = async (e: any, signIn: boolean) => {
    e.preventDefault();
    console.log("SUBMITTING");

    const data = {
      username: window.sessionStorage.getItem("user"),
      signIn: signIn,
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
          window.sessionStorage.setItem("user", name);
          nav("/home", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    logout(e, false);
    return (e.returnValue = "Are sure?");
  });

  return (
    <div className="App">
      <div className="Login-Wrapper">
        <div className="Login-Image-Wrapper">
          <img
            className="Login-Image"
            src="../public/Images/pythonLogo.png"
          ></img>
        </div>
        <div className="Login-Title-Wrapper">
          <h1 className="Title" style={{ color: "white" }}>
            Codeninjas <span style={{ fontSize: "8rem" }}>|</span>{" "}
            <span className="Python-Text">
              <span>Python</span> <span>Belt</span>
            </span>
          </h1>
        </div>
        <div className="Login-Content">
          <form className="Login-Form" onSubmit={(e) => onSubmit(e, true)}>
            <input
              className="Login-Input"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {error != "" ? (
              <div className="Error-Message">
                <h1>{error}</h1>
              </div>
            ) : null}

            <button className="Login-Button">
              <h1>Log in</h1>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
