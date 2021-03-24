import React, { useState } from "react"
import Request from "../Components/Request"
import ViewUsers from "../Components/ViewUsers"
import BodyRight from "./BodyRight"
import AddUSer from "../Components/AddUser"
import {useSelector} from "react-redux"
import SuperBodyMid from "../Components/SuperBodyMid"
import DeleteAccounts from "../Components/DeleteAccounts"
import ActivityLog from "./ActivityLog"
import Settings from "./Settings"
import axios from "axios"

const url = "http://localhost:5000/api/getusers/name/";

export default function SuperBody(props){

    const user = useSelector(state => state.User);
    const id = user.id;
    
    const clickedOne = useSelector(state => state.BodyPartClickReducer);
    const [firstName,getName] = useState("");

    
    React.useEffect(()=>{
        if(id){
        axios.get(url+id).then(function(response){
            getName(response.data);
                  
        });
    }
    },[clickedOne.id]); 

    
    console.log(clickedOne.id);


    React.useEffect(()=>{
        if(id){
        axios.get(url+id).then(function(response){
            getName(response.data);
                  
        });
    }
    },[id]); 
    
    return <div className="container-fluid">
    <div className="row">

        <div className="col request-column">
            <Request
                identifier = "SR"
                id = "SR"
                textOne = "Add Student"
                textTwo = "Account"
                color = "#5948ff"
            />
            <Request
                identifier = "SR"
                id = "SR1"
                textOne = "Add Staff"
                textTwo = "Account"
                color = "#fe9e02"
            />
            <Request
                identifier = "SR"
                id = "SR2"
                textOne = "Add Super"
                textTwo = "Account"
                color = "#0ca12d"
            />


        </div>

        {clickedOne.id === "0"  &&<SuperBodyMid
            firstName = {firstName}
        />}
        {clickedOne.id ==="SR" && <AddUSer
            title = {clickedOne.payload.textOne +" "+ clickedOne.payload.textTwo}
        />}
        
        {clickedOne.id==="SV1" && <ViewUsers/>}
        {clickedOne.id==="B2" && <ActivityLog/>}
        {clickedOne.id==="SV3" && <DeleteAccounts
            title = "Add a Request"
            class = "get-input-title"
        />}
        {clickedOne.id==="S1" && <Settings/>}

        <BodyRight/>
      
 
    </div>
    </div>
}