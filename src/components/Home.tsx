import { useState } from "react";
import "./Home.css"
import { } from "react-dropdown"
import { TiArrowSortedUp } from "react-icons/ti";
import { activities, categories, links } from "../../data.tsx"

import { Link } from "react-router-dom";


function Home() {

    const [dropdownOn, setOn] = useState(false);
    const [index, setIndex] = useState(0);


    const openDrop = (key: number) => {
        if (key == index) {
            setOn(false)
            setIndex(-1)
        } else {
            setOn(true)
            setIndex(key)
        }

    }

    const username = "KyleCarbonell"
    return <>

        <div className="Home">
            <div className="Bar">
                <h1 id="Bar-Text" style={{ marginRight: "70%" }}>CodeNinjas Python</h1>
                <h1 id="Bar-Text">Kyle.Carbonell</h1>
            </div>
            <div className="Activities-Wrapper">
                <ul className="Activities-List">
                    {categories.map((activity, key) => {
                        return (
                            <>
                                <li className="Activity-Dropdown" key={key}  >
                                    <div className="Activity-Name">
                                        {activity}
                                    </div>
                                    <button className="Dropdown-Button" key={key} onClick={() => {
                                        openDrop(key)
                                    }}>
                                        <TiArrowSortedUp style={{ fontSize: "3rem" }} />
                                    </button>
                                </li>
                                {(index == key && index < activities.length && activities[index].length > 0 && dropdownOn) ? <div className="Activities-Dropdown-Wrapper" style={{ height: "25%" }}>
                                    {
                                        activities[index].map((activity, key) => {
                                            var value = links[index][key]
                                            console.log(value)
                                            return (
                                                <Link
                                                    className="Activity-Link"
                                                    key={key}
                                                    to={`/activity`}
                                                    state={{
                                                        name: activity,
                                                        link: `${username}-${value}`
                                                    }}
                                                    style={{ height: "40%", marginLeft: "10%" }}
                                                    onClick={() => {
                                                        // window.open(`https://replit.com/@razorpooandpee/${username}-${value}`)
                                                    }}>
                                                    {activity}
                                                </Link>
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