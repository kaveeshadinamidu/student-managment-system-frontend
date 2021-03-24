import React, { useState } from "react"
import Request from "./Request"
import axios from "axios"

function createRequest(request){
  return <Request
    textOne = {request.title_one}
    textTwo = {request.title_two}
    color = {request.color}
    id = {request.req_type_id}
    identifier = "1"
    key = {request.req_type_id}
  />
}


function showRequest(request){
  return <Request
    textOne = {request.title_one}
    textTwo = {request.title_two+"s"}
    color = {request.color}
    id = {request.req_type_id}
    identifier = "1"
    key = {request.req_type_id}
  />
}

const url = "http://localhost:5000/api/requests/getreqtypes";
export default function BodyLeft(props){
  const [requestTypes,requests] = useState([]);

  const isStaff = props.isStaff;
  React.useEffect(()=>{
    axios.get(url).then(function(response){
        requests(response.data);
          
    });
    
},[]);
    
    return <div className="col request-column">
    {isStaff?requestTypes.map(showRequest):requestTypes.map(createRequest)}
    
  </div>
}