import { useEffect, useState } from "react";
import "./AdminHome.css"

interface props {
    users: any,
    setUsers: (v: any) => void
}

function AdminHome(props: props) {
    const [search, setSearch] = useState("")

    const getUsers = async () => {
        console.log("HRE IN CALL")
        // const call = "https://codeninjaspython.onrender.com"
        const call = "http://localhost:8000"
        const data = await fetch(`${call}/admin`)

        const json = await data.json();
        console.log(json)

        props.setUsers(json)
    }

    const handleSignIn = async (name: string) => {
        // const call = "https://codeninjaspython.onrender.com"
        const call = "http://localhost:8000"

        const data = { username: name }

        console.log(data)
        await fetch(`${call}/checkin`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then(() => {
            getUsers()

        })
    }

    useEffect(() => {
        getUsers();
    }, [])


    return (<>
        <div className="Admin-Content">
            <div className="Admin-Checkin-Wrapper">
                <div className="Admin-Content-Checkin">
                    <div className="Checked-Bar">
                        <h1 style={{ paddingLeft: "5%", marginRight: "15%" }}>Check in</h1>
                        <input
                            className="CheckedIn-Search"
                            type="Text"
                            placeholder="Search Ninja"
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />
                    </div>
                    <div className="Checkin-Content">
                        {props.users.map((ninja: any) => {
                            {
                                return ((ninja.name.toLowerCase().includes(search.toLowerCase()) && ninja.signedIn == false) &&
                                    <div className="ninja-container">
                                        <div style={{ width: "50%", paddingTop: "3%", marginTop: "0%" }}>
                                            <h1 style={{ marginBottom: "0%", marginTop: "0%" }}>{ninja.name}</h1>
                                            <h2 style={{ marginTop: "0%", fontSize: "1rem" }}>Python / level 2</h2>
                                        </div>
                                        <div className="Button-Container">
                                            {!ninja.signedIn &&
                                                <button className="Checkin-Button" onClick={() => { handleSignIn(ninja.username) }}>Check in</button>
                                            }

                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className="Admin-Content-Checkedin">
                    <div className="Checked-Bar">
                        <h1 style={{ paddingLeft: "5%" }}>Checked in</h1>
                    </div>
                    <div className="Checkedin-Content">
                        {props.users.map((ninja: any) => {
                            {
                                return (ninja.signedIn == true &&
                                    <div className="ninja-container">
                                        <div style={{ width: "100%", paddingTop: "3%", marginTop: "0%", marginLeft: "2%" }}>
                                            <h1 style={{ marginBottom: "0%", marginTop: "0%" }}>{ninja.name}</h1>
                                            <h2 style={{ marginTop: "0%", fontSize: "1rem" }}>Python / level 2</h2>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>

                </div>
            </div>
            <div className="Ninja-Help">
                <h1 style={{ paddingLeft: "5%" }}>Help</h1>
            </div>
        </div>
    </>)
}

export default AdminHome;