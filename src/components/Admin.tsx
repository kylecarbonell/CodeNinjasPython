import "./Admin.css";

function Admin() {
  const name = "kyle.carbonell";

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

    const code2 = "print('hellow orld')";

    console.log(code);
    const data = { code: code };

    const test = await fetch(`http://127.0.0.1:5000/execute`, {
      method: "post",
      body: JSON.stringify(data),
    });
    const json = await test.json();
    console.log(json);
  };

  return (
    <>
      <button onClick={createUser}>create</button>
      <button onClick={createDoc}>Docs</button>
      <div className="Admin">
        <div className="Admin-Bar">This is bar</div>
        <div className="Admin-Content">
          This is me
          <button onClick={execute} style={{ height: "50%", width: "20%" }}>
            Run Python
          </button>
        </div>
      </div>
    </>
  );
}

export default Admin;
