function Admin() {
  const createDoc = async () => {
    console.log("In the admin req");
    const data = { username: "kyle.carbonell" };

    await fetch("http://localhost:8000/createDoc", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    } as RequestInit);
  };

  const createUser = async () => {
    const data = { username: "kyle.carbonell" };

    await fetch("http://localhost:8000/create", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    } as RequestInit).then(async () => {});
  };

  return <button onClick={createUser}>create</button>;
}

export default Admin;
