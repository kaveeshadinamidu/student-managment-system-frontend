import React, { useState } from "react"
import Recent from "./Recent"

import Title from "./Title"
import {useSelector} from "react-redux"
import axios from "axios"
const urlGet = "http://localhost:5000/api/requests/getRequestsID/";
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

export default function ChangeRequest(props){

    const user = useSelector(state => state.User);
    const id = user.id;
    const [requests,getRequests] = useState([]);
    React.useEffect(()=>{
        if(id){
        axios.get(urlGet+id).then(function(response){
            console.log(response);
               getRequests(response.data)
        });
    }
        },[id]);


    return <div className="col-6 request-view-column">
            <div className = "request-view-title">
            <Title
                text1 = "Requests"
                class = "get-input-title"
            />
            </div>
            
            {requests.map(createRecent)}
            
            
    </div>
    
}
