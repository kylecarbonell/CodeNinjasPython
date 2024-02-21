
import { useState } from 'react';
import './App.css'

import { useNavigate } from 'react-router-dom';



function App() {

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e: any, signIn: boolean) => {
    e.preventDefault();
    console.log("SUBMITTING")

    const data = { username: name, signIn: signIn }
    await fetch("https://codeninjaspython.onrender.com/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    } as RequestInit)
      .then((res) => {
        console.log("post request sent");
        if (res.status == 200) {
          console.log("good")
          window.sessionStorage.setItem("user", name);
          nav("/home", { replace: true })
          setError("")
        } else {
          console.log("bad username")
          setError("User not found: Please check if your username has been entered correctly")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const logout = async (e: any, signIn: boolean) => {
    e.preventDefault();
    console.log("SUBMITTING")

    const data = { username: window.sessionStorage.getItem("user"), signIn: signIn }
    await fetch("https://codeninjaspython.onrender.com/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    } as RequestInit)
      .then((res) => {
        console.log("post request sent");
        if (res.status == 200) {
          console.log("good")
          window.sessionStorage.setItem("user", name);
          nav("/home", { replace: true })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }



  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    logout(e, false)
    return e.returnValue = "Are sure?";
  })


  return (
    <div className='App'>
      <div className='Login-Wrapper'>
        <div className='Login-Title'>
          <h1 style={{ color: "white" }}>Python</h1>
        </div>
        <div className='Login-Content'>
          <h1 style={{ color: "white", fontSize: "1.5rem" }}>Ready to code?</h1>
          <form className='Login-Form' onSubmit={(e) => onSubmit(e, true)}>
            <input
              className='Login-Input'
              type='text'
              placeholder='Username'
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            {error != "" ?
              <div className='Error-Message'>
                <h1>{error}</h1>
              </div> :
              null
            }

            <button className='Login-Button'>
              <h1>Log in</h1>
            </button>
          </form>
        </div>

      </div>
    </div>

  )
}

export default App
