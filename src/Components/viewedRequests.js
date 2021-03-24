import React, { useState } from "react"
import RecentStaff from "./RecentStaff"
import InputBox from "./InputBox"
import Title from "./Title"
import {useSelector} from "react-redux"
function createRecent(request){
    
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
    
    
}



export default function ViewedRequests(props){
    
    const user = useSelector(state => state.User);
    const id = user.id;
    return <div className="col-6 request-view-column">
            
            <div className = "request-view-title">
            <Title
            class = "get-input-title"
                text1 = {"Viewed "+props.title}
            />
            </div>
            
            <div className="container-fluid">
            <div className="row">
        
            <div className="col-sm">
                    
        
            </div>
            </div>

            </div>
            {props.requests.map(createRecent)}
            
            
    </div>
    
}
