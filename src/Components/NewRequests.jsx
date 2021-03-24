import React, { useState } from "react"
import RecentStaff from "./RecentStaff"
import InputBox from "./InputBox"
import Title from "./Title"
import {useSelector} from "react-redux"
import axios from "axios"
const urlGet = "http://localhost:5000/api/requests/getRequests/new";
const urlAllRequests = "http://localhost:5000/api/requestitems/all";
const urlGetTypedRequests = "http://localhost:5000/api/requestitems/type/";
const urlSearchRequests = "http://localhost:5000/api/requestitems/search/";

function createRecent(request){
    const time1 = new Date(request.date +" "+request.time);
    
    const time2 = new Date();
    const period = (time2-time1)/(1000*60*60);
    const delayTime = 30*60*1000;
    if (!request.viewed ){
        return <RecentStaff
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
    }else{
        return null;
    }
    
}



export default function NewRequests(props){
    const [dropItems,dropChange] = useState([]);
    const user = useSelector(state => state.User);
    const id = user.id;
    const [requests,getRequests] = useState([]);

    function dropClicked(event){
        console.log(event.target.name);
        if (event.target.name === "0"){
            getAllRequests();
        }else{
        axios.get(urlGetTypedRequests+event.target.name).then(function(response){
            getRequests(response.data);
     });
    }
    }

    function createDropItem(item){
        return <a key ={item.req_type_id} name={item.req_type_id} className="dropdown-item drop-item" onClick={dropClicked} href="#">{item.title_one +" "+ item.title_two+"s"}</a>
    }
    function getAllRequests(){
        axios.get(urlGet).then(function(response){
            console.log(response.data);
            getRequests(response.data);
     });
    }
    
    React.useEffect(()=>{
        getAllRequests();

        axios.get(urlAllRequests).then((response)=>{
            dropChange(response.data);
        })
    
        },[]);

    

    return <div className="col-6 request-view-column">
            
            <div className = "request-view-title">
            <Title
                text1 = "Requests"
                class = "get-input-title"
            />
            </div>
            
            <div className="container-fluid">
            <div className="row">
            <div className="col-sm">
                    <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="fas fa-search"></i> Filter Requests
        </button>
        <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton">
            <a name = "0" className="dropdown-item drop-item" onClick={dropClicked} href="#">All</a>
            {dropItems.map(createDropItem)}
        </div>
        </div>
            </div>
            </div>

            </div>
            {requests.map(createRecent)}
            
            
    </div>
    
}
