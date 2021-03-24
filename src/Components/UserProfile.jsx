import React from "react"
import Title from "../Components/Title"

export default function UserProfile(props){
    return <div className = "user-profile-box">
            <Title
                text1 = {props.name}
                class = "username-box-text"
            />
            

            <Title
                text1 = {props.index}
                class = "username-box-index"
            />
           

    </div>
}