import "./Admin.css";

function Admin() {
  const name = "shirley.nguyen";

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

  return (
    <>
      <div className="Admin">
        <div className="Admin-Bar">
          <div className="Admin-Bar-Content">
            <button className="Admin-Bar-Button">
              <img className="Bar-Image" src="/home.svg"></img>
              Home
            </button>
            <button className="Admin-Bar-Button">
              <img className="Bar-Image" src="/reviews.svg"></img>
              Reviews
            </button>
            <button className="Admin-Bar-Button">
              <img className="Bar-Image" src="/my-ninja.svg"></img>
              My Ninjas
            </button>
            <button className="Admin-Bar-Button">
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
          <div className="Admin-Content">
            <div className="Admin-Checkin-Wrapper">
              <div className="Admin-Content-Checkin">Checkin</div>
              <div className="Admin-Content-Checkedin">
                Checked in
              </div>
            </div>
            <div className="Ninja-Help">
              Help
            </div>
          </div>

        </div>
      </div >
    </>
  );
}

export default Admin;
