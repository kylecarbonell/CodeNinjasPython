import { Link, useLocation } from "react-router-dom";
import "./Activity.css";
import { IoIosArrowBack } from "react-icons/io";
import { CodeBlock, nord } from "react-code-blocks";
import { useEffect, useState } from "react";

function Activity() {
  var { state } = useLocation();
  // var [params, setParams] = useSearchParams();
  var [instructOpen, setInstructOpen] = useState(false);
  var [activity, setActivities] = useState<any>({});

  async function submit() {
    // console.log(state.activity);
    const data = await fetch("https://codeninjaspython.onrender.com/submit");
    const json = await data.json();
    console.log(json);
    console.log("Inside submit");
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
    const code = `
def ip(w):
  cleaned_word = w.lower()
    
  return cleaned_word == cleaned_word[::-1]

input_word = a
if ip(input_word):
    print(f"{input_word} is a palindrome!")
else:
    print(f"{input_word} is not a palindrome.")
`;

    console.log(code);
    const data = { code: code };

    const test = await fetch(
      `https://codeninjaspython-j08d.onrender.com/execute`,
      {
        method: "post",
        body: JSON.stringify(data),
      }
    );
    const json = await test.json();
    console.log(json);
  };

  useEffect(() => {
    console.log(state);
    getUser();
  }, []);

  return (
    <>
      {instructOpen ? (
        <div
          className="Instructions-Wrapper"
          onClick={() => {
            setInstructOpen(false);
          }}
        >
          <div className="Instructions">
            <iframe
              className="Instruction-Pdf"
              src="Instructions/PrintingAndVariables/Resume2024.pdf#toolbar=0&navpanes=0"
            />
          </div>
        </div>
      ) : (
        <></>
      )}

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
            <CodeBlock
              text={activity.code}
              language="python"
              showLineNumbers={true}
              theme={nord}
            />
          </div>
          <div className="Activity-Grading">
            <h1>Graded by {activity.sensei}</h1>
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
          <button
            className="Activity-Button-Container"
            onClick={() => {
              setInstructOpen(true);
            }}
          >
            Open Instructions
          </button>
        </div>
      </div>
    </>
  );
}

export default Activity;
