import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Activity.css";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";

import Editor from "@monaco-editor/react";
import "monaco-themes/themes/Nord.json";

function Activity(this: any) {
  var { state } = useLocation();
  // var [params, setParams] = useSearchParams();
  // var [instructOpen, setInstructOpen] = useState(false);
  var [activity, setActivities] = useState<any>({});

  var [code, setCode] = useState("");
  var [run, setRun] = useState<any>([]);

  var [tabIndex, setTabIndex] = useState<number>(0);
  var [loading, setLoading] = useState<boolean>(false);

  const nav = useNavigate();

  async function submit() {
    // console.log(state.activity);
    const data = await fetch("https://codeninjaspython.onrender.com/submit");
    const json = await data.json();
    console.log(json);
    console.log("Inside submit");
  }

  async function saveCode() {
    console.log("OUTPUT", window.localStorage.getItem("code"));
    const data = {
      user: window.sessionStorage.getItem("user"),
      link: window.sessionStorage.getItem("link"),
      code: window.localStorage.getItem("code"),
    };

    // const call = "http://localhost:8000";
    const call = "https://codeninjaspython.onrender.com";
    console.log(call);
    setLoading(true);
    await fetch(`${call}/saveCode`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    setCode(data.code || "");
  }

  async function getUser() {
    // const call = "http://localhost:8000";
    const call = "https://codeninjaspython.onrender.com";
    const data = await fetch(
      `${call}/getUser?name=${window.sessionStorage.getItem(
        "user"
      )}&activity=${window.sessionStorage.getItem("link")}`
    );

    const json = await data.json();
    console.log("HERE IN JSON", json);
    setActivities(json);
  }

  const execute = async () => {
    console.log(code);
    // const call = "http://127.0.0.1:5000/execute";
    const call = `https://codeninjaspythonserver.onrender.com/execute`;

    // console.log(code);
    const data = { code: code };

    const test = await fetch(call, {
      method: "post",
      body: JSON.stringify(data),
    });
    const json = await test.json();
    const obj = Object(json);
    console.log("OBJECT", obj);
    console.log("code", obj.output);

    setRun([...run, Object(json)]);
  };

  useEffect(() => {
    console.log(run);
  }, [run]);

  useEffect(() => {
    window.localStorage.setItem("code", code);
  }, [code]);

  useEffect(() => {
    console.log("HERE IN ACTIVITY", activity);
    setCode(activity.code);
  }, [activity]);

  useEffect(() => {
    console.log(state);
    getUser();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      saveCode();
    });

    window.addEventListener("onunload", () => {
      window.sessionStorage.setItem("code", "");
    });
  }, []);

  onkeydown = async (e: any) => {
    if (e.ctrlKey && e.keyCode == "S".charCodeAt(0)) {
      e.preventDefault();
      saveCode();
    }
  };

  return (
    <>
      <div className="Activity">
        <div className="Activity-Title">
          <button
            className="BackButton"
            onClick={async () => {
              saveCode();
              if (!loading) {
                nav("/home", { replace: true });
              }
            }}
          >
            <IoIosArrowBack />
          </button>
          <div className="Activity-Title-Wrapper">
            <h1>{activity.name}</h1>
          </div>
        </div>
        <div className="Activity-Content">
          <div className="Activity-Code">
            <Editor
              height="90vh"
              language="python"
              theme="vs-dark"
              onChange={(e: any) => {
                setCode(e);
              }}
              value={activity.code}
              options={{ minimap: { enabled: false } }}
            />
          </div>
          <div className="Activity-Tabs">
            <ul className="Activity-Tabs-List">
              <li
                className="Tab"
                value={0}
                onClick={(e) => {
                  setTabIndex(e.currentTarget.value);
                }}
                style={
                  tabIndex == 0
                    ? { backgroundColor: "var(--darkBlue)" }
                    : { backgroundColor: "var(--lightBlue)" }
                }
              >
                Console
                <button
                  className="Trash-Button"
                  onClick={() => {
                    setRun([]);
                  }}
                >
                  <FaRegTrashCan />
                </button>
              </li>
              <li
                className="Tab"
                onClick={(e) => {
                  setTabIndex(e.currentTarget.value);
                }}
                value={1}
                style={
                  tabIndex == 1
                    ? { backgroundColor: "var(--darkBlue)" }
                    : { backgroundColor: "var(--lightBlue)" }
                }
              >
                Instructions
              </li>
              <li
                className="Tab"
                onClick={(e) => {
                  setTabIndex(e.currentTarget.value);
                }}
                value={2}
                style={
                  tabIndex == 2
                    ? { backgroundColor: "var(--darkBlue)" }
                    : { backgroundColor: "var(--lightBlue)" }
                }
              >
                Grading
              </li>
            </ul>

            <div className="Output-Panel" style={{ visibility: "visible" }}>
              {/* CONSOLE LOG OUTPUT */}
              {tabIndex == 0 &&
                run.map((r: any) => {
                  return (
                    <>
                      <div className="Output-Wrapper">
                        <div className="Output-Runtime">
                          <h1 style={{ width: "50%", paddingLeft: "1%" }}>
                            Run
                          </h1>
                          <h1
                            style={{
                              width: "50%",
                              textAlign: "end",
                              paddingRight: "1%",
                            }}
                          >
                            {r.time}
                          </h1>
                        </div>
                        <div className="Output">
                          <pre
                            style={{
                              fontFamily: "'Times New Roman', Times, serif",
                              fontSize: "1rem",
                            }}
                          >
                            {r.output}
                          </pre>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
            {/* Instructions */}
            {tabIndex == 1 && (
              <div className="Tab-Panel">
                <iframe
                  className="Instruction-Pdf"
                  src="Instructions/PrintingAndVariables/Resume2024.pdf#toolbar=0&navpanes=0"
                />
              </div>
            )}
            {/* Grading */}
            {tabIndex == 2 && (
              <div className="Grade-Panel">
                <h1>Grade</h1>
              </div>
            )}
          </div>
        </div>
        <div className="Activity-Buttons">
          <button
            className="Activity-Button-Container"
            onClick={() => {
              execute();
            }}
          >
            Run
          </button>
          <button
            className="Activity-Button-Container"
            onClick={() => {
              submit();
            }}
          >
            Submit
          </button>
          <button className="Activity-Button-Container">
            Open Instructions
          </button>
        </div>
      </div>
    </>
  );
}

export default Activity;
