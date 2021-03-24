import React, { useState } from "react"
import MidBox from "./MidBox"
import Recent from "./Recent"
import Title from "./Title"
import axios from "axios"
import {useSelector} from "react-redux"
import addActivity from "../Components/Data/AddActivity"
function createRecent(request){
    return <Recent
            key = {request.req_id}
            key_id = {request.req_id}
            id = {request.req_type_id}
            sentence = {request.reason}
            changable = {!request.viewed}
            description = {request.description}
            file = {request.files}
            index = {request.owner_id}
            req_type = {request.req_type_id}
            original_Name = {request.original_file_name}
    />
  }
  const urlGet = "http://localhost:5000/api/requests/getRequestsID/";
export default function BodyMid(props){
    const user = useSelector(state => state.User);
    const id = user.id;
    const [recentRequests,changeRecent] = useState([]);
    React.useEffect(()=>{
        
        
        axios.get(urlGet+id).then(function(response){
               changeRecent(response.data)
        });
    
        },[id]);
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
                id = "B1"
                text1 = "Change"
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
            id = "B3"
            text1 = "Delete"
                text2 = "Requests"
                    color = "#fe9e02"
                />
            </div>
        </div>
    </div>
    <Title
        class = "secondary-title"
        text1 = "Recent Requests"
    />
    
    {recentRequests.map(createRecent)}
  </div>
}