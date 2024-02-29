import "./Admin.css"

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

    const test = async () => {
        const data = { code: "print('hello')", language: "python", input: "" }
        // await fetch("http://localhost:8000/compile", {
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        // })
        const test = await fetch("http://127.0.0.1:5000/test")
        console.log(test)
        console.log(await test.json())
    }

    return (
        <>
            {/* <button onClick={createUser}>create</button>
      <button onClick={createDoc}>Docs</button> */}
            <div className="Admin">
                <div className="Bar">
                    This is bar
                </div>
                <div className="Content">
                    This is me
                    <button onClick={test}></button>
                </div>
            </div>

        </>
    );
}

export default Admin;
