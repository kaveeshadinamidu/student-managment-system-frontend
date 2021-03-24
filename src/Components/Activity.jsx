import React from "react"
import Title  from "./Title"
export default function Activity(props){
    return <div className= "activity-box">
        <Title
            class = "activity-box-text"
            text1 = {props.title}
        />

        <Title
            text1 = {props.date}
            class = "activity-box-date"
        />
        <Title
            text1 = {props.time}
            class = "activity-box-time"
        />
    </div>
}