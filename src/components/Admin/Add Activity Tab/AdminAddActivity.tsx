import { useRef } from "react";
import "./AdminAddActivity.css"

interface Props {
    activities: any,
    index: number,
    setActivities: (e: any) => void
}




function AdminAddActivity(props: Props) {
    const draggedItem = useRef<any>();
    const draggedEnter = useRef<any>();

    const dragStart = (index: number) => {
        draggedItem.current = index;
    };

    const dragEnter = (e: any, index: number) => {
        e.preventDefault()
        draggedEnter.current = index;


        if (draggedEnter.current != draggedItem.current) {
            e.currentTarget.style.borderTop = "2px solid white"
        }
    };

    const dragExit = (e: any) => {
        console.log("here")
        e.currentTarget.style.borderTop = ""
    }


    const dragEnd = (e: any) => {
        dragExit(e)
        e.preventDefault()
        if (draggedItem.current == draggedEnter.current) {
            return;
        }

        const fullList = [...props.activities];
        const copyListItems = [...props.activities[props.index]];
        const dragItemContent = copyListItems[draggedItem.current];
        copyListItems.splice(draggedItem.current, 1);
        copyListItems.splice(draggedEnter.current, 0, dragItemContent);
        fullList[props.index] = copyListItems;

        draggedItem.current = null;
        draggedEnter.current = null;


        props.setActivities(fullList);
    };

    return (
        <>
            <div className="Add-Activity-Container">
                {props.activities[props.index].map((val: any, index: number) => {
                    return (
                        <div className="Activity-Item-Container"
                            onDragOver={(e) => {
                                dragEnter(e, index);
                            }}
                            onDragLeave={(e: any) => { dragExit(e) }}
                            onDrop={(e) => { dragEnd(e) }}
                        >
                            <div
                                className="Activity-Item"
                                draggable={true}
                                onDragStart={() => {
                                    dragStart(index);
                                }}

                            >
                                <h1>{val.activity}</h1>
                            </div>
                        </div>
                    );

                })}
            </div>
        </>
    )
}

export default AdminAddActivity;