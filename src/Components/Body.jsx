import React, { useState } from "react"
import BodyLeft from "./BodyLeft"
import BodyMid from "./BodyMid"
import BodyRight from "./BodyRight"
import GetInput from "./GetInput"
import {useSelector} from "react-redux"
import axios from "axios"
import ChangeRequest from "./ChangeRequest"
import ChangableRequest from "./ChangableRequest"
import ActivityLog from "./ActivityLog"
import DeleteRequest from "./DeleteRequests"
import Settings from "./Settings"
import RequestWithComments from "./reqestWithComments"

const url = "http://localhost:5000/api/requests/getreqtypes/";
export default function Body(props){
    const user = useSelector(state => state.User);
    const clickedOne = useSelector(state => state.BodyPartClickReducer);
    const [reqTitle,changeReqTitle] = useState("");
    var reqType;
    if(clickedOne.id==="R1"){
        reqType = clickedOne.payload.req_type;
    }
    
    React.useEffect(()=>{
        if(reqType){
            if(clickedOne.id==="R1"){
                axios.get(url+clickedOne.payload.req_type).then(function(response){
                    const title = response.data.title_one + " "+response.data.title_two;
                    changeReqTitle(title);
                });
                
            
        }
        }

        },[reqType]);

    
    
    return <div className="container-fluid">
    <div className="row">

        <BodyLeft
        isStaff = {props.isStaff}
        />

        {clickedOne.id === "0" && <BodyMid
            firstName = {props.firstName}
        />}
        {clickedOne.id ==="1" && <GetInput
            title = {clickedOne.payload.textOne +" "+ clickedOne.payload.textTwo}
        />}
        
        {clickedOne.id==="B1" && <ChangeRequest/>}
        {clickedOne.id==="B2" && <ActivityLog/>}
        {clickedOne.id==="B3" && <DeleteRequest/>}
        {clickedOne.id==="S1" && <Settings
        />}

        {clickedOne.id==="R1" && clickedOne.payload.changable && <ChangableRequest
            title = {reqTitle}
            indexNumber = {clickedOne.payload.index}
            name = {user.name}
            key_ID = {clickedOne.payload.key_id}
            description = {clickedOne.payload.description}
            sentence = {clickedOne.payload.sentence}
            file = {clickedOne.payload.file}
            original_name = {clickedOne.payload.original_Name}

        />}

        {clickedOne.id==="R1" && !clickedOne.payload.changable && <RequestWithComments
            title = {reqTitle}
            indexNumber = {clickedOne.payload.index}
            name = {user.name}
            key_ID = {clickedOne.payload.key_id}
            description = {clickedOne.payload.description}
            sentence = {clickedOne.payload.sentence}
            file = {clickedOne.payload.file}
            original_name = {clickedOne.payload.original_Name}
        />}
        
        
        
        


        <BodyRight/>
      
 
    </div>
    </div>
}