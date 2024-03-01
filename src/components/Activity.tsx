import { Link, useLocation } from "react-router-dom";
import "./Activity.css";
import { IoIosArrowBack } from "react-icons/io";

// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/theme-tomorrow_night";
// import "ace-builds/src-noconflict/ext-language_tools"

import Editor from "@monaco-editor/react";

import { useEffect, useState } from "react";

function Activity(this: any) {
  var { state } = useLocation();
  // var [params, setParams] = useSearchParams();
  // var [instructOpen, setInstructOpen] = useState(false);
  var [activity, setActivities] = useState<any>({});

  var [code, setCode] = useState("");
  var [output, setOutput] = useState<string>();

  var [tabIndex, setTabIndex] = useState<number>(0);

  async function submit() {
    // console.log(state.activity);
    const data = await fetch("https://codeninjaspython.onrender.com/submit");
    const json = await data.json();
    console.log(json);
    console.log("Inside submit");
  }

  async function refresh(e: Event) {
    e.preventDefault();
    console.log("OUTPUT", window.localStorage.getItem("code"));
    const data = {
      user: window.sessionStorage.getItem("user"),
      link: window.sessionStorage.getItem("link"),
      code: window.localStorage.getItem("code"),
    };
    await fetch("http://localhost:8000/saveCode", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  async function getUser() {
    const data = await fetch(
      `http://localhost:8000/getUser?name=${window.sessionStorage.getItem(
        "user"
      )}&activity=${window.sessionStorage.getItem("link")}`
    );

    const json = await data.json();
    console.log(json);
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
    console.log(Object(json));

    setOutput(json);
  };

  useEffect(() => {
    console.log(activity);
    setCode(activity.code);
  }, [activity]);

  useEffect(() => {
    window.localStorage.setItem("code", code || "");
  }, [code]);

  useEffect(() => {
    console.log(state);
    getUser();
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", refresh);

    return window.removeEventListener("beforeunload", () => {
      console.log("REMOVED");
    });
  }, []);

  onkeydown = async (e: any) => {
    if (e.ctrlKey && e.keyCode == "S".charCodeAt(0)) {
      e.preventDefault();
      refresh(e);
    }
  };

  return (
    <>
      <div className="Activity">
        <div className="Activity-Title">
          <Link className="BackButton" to={"/home"}>
            <IoIosArrowBack />
          </Link>
          <div className="Activity-Title-Wrapper">
            <h1>{activity.name}</h1>
          </div>
        </div>
        <div className="Activity-Content">
          <div className="Activity-Code">
            <Editor
              height="90vh"
              language="python"
              defaultValue={code || ""}
              theme="vs-dark"
              onChange={(e: any) => {
                setCode(e || "");
              }}
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
              >
                Console
              </li>
              <li
                className="Tab"
                onClick={(e) => {
                  setTabIndex(e.currentTarget.value);
                }}
                value={1}
              >
                Instructions
              </li>
              <li
                className="Tab"
                onClick={(e) => {
                  setTabIndex(e.currentTarget.value);
                }}
                value={2}
              >
                Grading
              </li>
            </ul>

            {/* CONSOLE LOG OUTPUT */}
            {tabIndex == 0 && (
              <div className="Output-Panel" style={{ visibility: "visible" }}>
                <pre>{output}</pre>
              </div>
            )}
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
              <div className="Tab-Panel">
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
