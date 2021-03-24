import React from "react"
import MidBox from "./MidBox"
import Title from "./Title"



export default function SaddBodyMid(props){
    
    return <div className="col-6 body-column">
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <Title
                    class = "main-title"
                    text1 = "Welcome Back,"
                    text2 = {props.firstName}
                />
            </div>
            <div className="col">
            <img className = "main-image"src="Images/mainImage.png" width="400px"/>
            </div>
        </div>
    </div>

    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <MidBox
                id = "SF1"
                text1 = "New"
                text2 = "Requests"
                color = "#5948ff"
                />
            </div>
            <div className="col">
            <MidBox
                id = "B2"
                text1 = "Activity Log"
                color = "#0ca12d"
                />
            </div>
            <div className="col">
            <MidBox
                id = "SV3"
                text1 = "Add Request"
                text2 = "Types"
                color = "#fe9e02"
                />
            </div>
        </div>
    </div>
    
    
  </div>
}