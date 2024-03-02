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
        <div className="Admin-Bar">This is bar</div>
        <div className="Admin-Content">
          This is me
          <button onClick={createUser}>user</button>
          <button onClick={createDoc}>Docs</button>
        </div>
      </div>
    </>
  );
}

export default Admin;
