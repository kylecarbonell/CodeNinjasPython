
import './App.css'



function App() {


  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log("SUBMITTING")

    const data = await fetch("https://codeninjaspython.onrender.com/login")

    if (data.ok) {
      // const json = await data.json();
      console.log(data)

    }
  }

  return (
    <div className='App'>
      <div className='Login-Wrapper'>
        <div className='Login-Title'>
          <h1 style={{ color: "white" }}>Python</h1>
        </div>
        <div className='Login-Content'>
          <h1 style={{ color: "white", fontSize: "1.5rem" }}>Ready to code?</h1>
          <form className='Login-Form' onSubmit={onSubmit}>
            <input
              className='Login-Input'
              type='text'
              placeholder='Username'
            />
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
