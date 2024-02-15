import { useState } from "react";
import "./Home.css"
import { } from "react-dropdown"

function Home() {
    const activities = ["Prints and Variables", "While and For loops", "Dictionaries"]
    const activity1 = ["Activity 1", "Activity 2", "Activity 3"]
    const [dropdownOn, setOn] = useState(false);

    const username = "KyleCarbonell"
    return <>

        <div className="Home">
            <div className="Bar">
                <h1 id="Bar-Text" style={{ marginRight: "70%" }}>CodeNinjas Python</h1>
                <h1 id="Bar-Text">Kyle.Carbonell</h1>
            </div>
            <div className="Activities-Wrapper">
                <ul className="Activities-List">
                    {activities.map((activity, key) => {
                        return (
                            <>
                                <li className="Activity-Dropdown" key={key}>
                                    <div className="Activity-Name">
                                        {activity}
                                    </div>
                                    <button className="Dropdown-Button" onClick={() => {
                                        setOn(!dropdownOn)
                                    }}>
                                        ^
                                    </button>
                                </li>
                                {(key == 0 && dropdownOn) ? <div className="Activities-Dropdown-Wrapper" style={{ height: "25%" }}>
                                    {
                                        activity1.map((activity, key) => {
                                            var value = `Activity${key + 1}`;
                                            return (
                                                <button className="Activity-Button" key={key} style={{ height: "40%", marginLeft: "10%" }} onClick={() => {
                                                    window.open(`https://replit.com/@razorpooandpee/${username}-${value}`)
                                                }}>
                                                    {activity}
                                                </button>
                                            )
                                        })
                                    }
                                </div >
                                    : <></>}

                            </>
                        )
                    })}
                </ul>

            </div >

        </div >
    </>
}

export default Home;