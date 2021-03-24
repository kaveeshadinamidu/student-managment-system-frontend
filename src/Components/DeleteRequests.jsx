import React,{useState} from "react"
import Title from "./Title"
import DeleteReq from "./DeleteReq"
import axios from "axios"
import {useSelector} from "react-redux"
const urlGet = "http://localhost:5000/api/requests/getRequests/";

function createReq(request){
    if (!request.viewed){
    return <DeleteReq
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
        return null
    }

}


export default function DeleteRequest(props){
    const [reqests,getRequests] = useState([]);
    const user = useSelector(state => state.User);
    const id = user.id;

    function setRequests(){
        axios.get(urlGet+id).then(function(response){
            getRequests(response.data)
     });
    }

    React.useEffect(()=>{
        if(id){
            setRequests();
        }
        
    
        },[id]);
    return <div className="col-6 request-view-column">
    <div className = "get-input-column">
    <Title
            class = "get-input-title"
                text1 = "Delete Requests"
            />
    </div>
    {reqests.map(createReq)}
    </div>
}