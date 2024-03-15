import { useEffect, useState } from "react";
import { /*useLocation,*/ useNavigate } from "react-router-dom";
import "./Activity.css";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";

import { call, pythonCall } from "../../server/Data/data";
import EditorComp from "./Editor/EditorComp";


function Activity(this: any) {

  // var { state } = useLocation();
  // var [params, setParams] = useSearchParams();
  // var [instructOpen, setInstructOpen] = useState(false);
  var [activity, setActivities] = useState<any>({});

  var [code, setCode] = useState("");
  var [run, setRun] = useState<any>([]);

  var [tabIndex, setTabIndex] = useState<number>(0);
  var [loading, setLoading] = useState<boolean>(false);

  const nav = useNavigate();

  async function submit() {
    const data = {
      username: window.sessionStorage.getItem("user"),
      link: window.sessionStorage.getItem("link"),
    };
    await fetch(`${call}/submit`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
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
    const data = await fetch(
      `${call}/getUser?name=${window.sessionStorage.getItem(
        "user"
      )}&activity=${window.sessionStorage.getItem("link")}`
    );

    const json = await data.json();
    // console.log("HERE IN JSON", json);
    setActivities(json);
  }

  const execute = async () => {
    console.log(code);
    const data = { code: code };

    saveCode()
    const test = await fetch(`${pythonCall}/execute`, {
      method: "post",
      body: JSON.stringify(data),
    });
    const json = await test.json();

    setRun([...run, Object(json)]);
  };

  useEffect(() => {
    window.localStorage.setItem("code", code);
  }, [code]);

  useEffect(() => {
    // console.log("HERE IN ACTIVITY", activity);
    setCode(activity.code);
  }, [activity]);

  useEffect(() => {
    getUser();

    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      saveCode();
    });

    window.addEventListener("onunload", () => {
      window.sessionStorage.setItem("code", "");
    });
  }, []);

  onkeydown = async (e: any) => {
    if ((e.ctrlKey || e.metaKey) && e.keyCode == "S".charCodeAt(0)) {
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
            <EditorComp setCode={setCode} activity={activity} />
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

            <div
              className="Panels"
              style={tabIndex == 1 ? { overflowY: "hidden" } : {}}
            >
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

              {/* Instructions */}
              {tabIndex == 1 && (
                <div className="Instructions-Panel">
                  <iframe
                    className="Instruction-Pdf"
                    src={`/${activity.link}.pdf#toolbar=0&navpanes=0`}
                  />
                </div>
              )}

              {/* Grading */}
              {tabIndex == 2 && (
                <div className="Grade-Panel">
                  <h1>Have test cases here, send if all tests complete to be graded</h1>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="Activity-Buttons">
          <button
            className="Activity-Button-Container"
            onClick={() => {
              execute();
              setTabIndex(0);
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
        </div>
      </div>
    </>
  );
}

export default Activity;
