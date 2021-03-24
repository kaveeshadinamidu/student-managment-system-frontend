import React,{useState} from "react"
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from "./Title"
import InputBox from "./InputBox"
import axios from "axios"



const addRequstType = "http://localhost:5000/api/requests/addrequesttype";

export default function NewRequestInput(props){
    
    function addReqestType(event){
        const reqVal = event.target.request.value;
        const colorVal = event.target.requestColor.value;
        const data ={
            reqVal,
            colorVal
        }
        axios.post(addRequstType,data).then((response)=>{
            if (response)
                toast.success("Request Added Sucessfully!");
            else
                toast.warn("Error in Request Adding!");
        })
        event.preventDefault();
    }



    return <div className="col-6 input-column">
    <div className="form-group">
        <ToastContainer />
        </div>
    <div className = "get-input-column">
    <Title
            class = "get-input-title"
                text1 = "Add a Request Type"
            />
    </div>
    <form onSubmit={addReqestType} name="request-forum">
    
    <Title
        text1 = "Add Reqest Type"
        class = "get-input-sub-titles"  
    />
    <Title
            class = "remaining-words-style"
            text1 = "Requests word will add automatically"
        />
    <InputBox
        length = "60"
        place = "Enter the First Word"
        name = "request"
    />
    <Title
            class = "get-input-sub-titles"
            text1 = "Add Color Code in Hex"
        />
        <Title
            class = "remaining-words-style"
            text1 = "Like #123456"
        />
    <InputBox
        length = "60"
        place = "Add Color Code"
        name = "requestColor"
    />
    <div className="remaining-words">
        
    </div>
    <div className="submit-button">
    <button type="submit" className="btn btn-outline-warning btn-lg">Add The Request</button>
    </div>
    </form>
    </div>
}