function Admin() {
    const createUser = async () => {
        const data = { username: "kyle.carbonell" }
        await fetch("http://localhost:8000/create", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        } as RequestInit)
    }

    return <button onClick={createUser}>create</button>
}

export default Admin;