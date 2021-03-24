import React, { useState } from "react"
import BodyLeft from "./BodyLeft"
import BodyRight from "./BodyRight"
import UnchangableRequest from "./UnchangableRequest"
import {useSelector} from "react-redux"
import NewRequests from "./NewRequests"
import StaffBodyMid from "../Components/StaffBodyMid"
import DeleteAccounts from "../Components/DeleteAccounts"
import ActivityLog from "./ActivityLog"
import Settings from "./Settings"
import axios from "axios"
import ViewedRequests from "../Components/viewedRequests"
import NewRequestInput from "../Components/newRequestInput"

const url = "http://localhost:5000/api/getusers/name/";
const url1 = "http://localhost:5000/api/requests/getreqtypes/";
const urlGetTypedRequests = "http://localhost:5000/api/requestitems/type/ID/";
export default function StaffBody(props){
    const user = useSelector(state => state.User);
    const id = user.id;
    const clickedOne = useSelector(state => state.BodyPartClickReducer);
    const [firstName,getName] = useState("");
    const [requests,getRequests] = useState([]);
    

    React.useEffect(()=>{
        if(id){
        axios.get(url+id).then(function(response){
            getName(response.data);
                  
        });
    }
    },[id]); 
    
    const [reqTitle,changeReqTitle] = useState("");
    if(clickedOne.id==="R1"){
            console.log("Unchange");
            axios.get(url1+clickedOne.payload.req_type).then(function(response){
                const title = response.data.title_one + " "+response.data.title_two;
                changeReqTitle(title);
            });
            
        
    }
    if (clickedOne.id==="1"){
        axios.get(urlGetTypedRequests+clickedOne.payload.id+"/"+id).then(function(response){
            getRequests(response.data)
     });
    }


    return <div className="container-fluid">
    <div className="row">
        <BodyLeft
        isStaff = {props.isStaff}
        />
        

        {clickedOne.id === "0" && <StaffBodyMid
            firstName = {firstName}
        />}
        {clickedOne.id==="R1" && <UnchangableRequest
            title = {reqTitle}
            indexNumber = {clickedOne.payload.index}
            description = {clickedOne.payload.description}
            sentence = {clickedOne.payload.sentence}
            file = {clickedOne.payload.file}
            key_ID = {clickedOne.payload.key_id}
        />}
        
        {clickedOne.id==="SF1" && <NewRequests/>}
        {clickedOne.id==="1" && <ViewedRequests
            title = {clickedOne.payload.textOne+" "+clickedOne.payload.textTwo}
            key_Id = {clickedOne.payload.id}
            viewChange = {true}
            requests = {requests}
        />}
        {clickedOne.id==="B2" && <ActivityLog/>}
        {clickedOne.id==="SV3"  && <NewRequestInput
            title = "Add a Request"
            class = "get-input-title"
        />}
        {clickedOne.id==="S1" && <Settings/>}

        <BodyRight/>
      
 
    </div>
    </div>
}