import React,{useState} from "react"
import Title from "./Title"
import InputBox from "./InputBox"
import {useSelector} from "react-redux"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import addActivity from "../Components/Data/AddActivity"

const url = "http://localhost:5000/api/signup/";
const addUrl = "http://localhost:5000/api/getuserdetails/add";
export default function Adduser(props){
    
    const clickedOne = useSelector(state => state.BodyPartClickReducer);
    function addUser(event){
        event.preventDefault();
        const index = event.target.index.value;
        const name = event.target.name.value;
        const username = event.target.username.value;
        const password = event.target.password.value;
        var accountType = clickedOne.payload.id;
        if (accountType==="SR"){
            accountType = 1;
        }else if (accountType==="SR1"){
            accountType = 2;
        }else if (accountType==="SR2"){
            accountType = 3;
        }

        const data = {
            index : index,
            name : name,
            username : username,
            password : password,
            accountType: accountType,
        }

        const firstState = {
            id:index,
            first_name:"Not Set",
            second_name:"Not Set",
            email:"Not Set",
            phone_number:"Not Set",
            faculty:"Not Set"
    };

        axios.post(url,data).then(function(response){
            
            if (response.data) {
                toast.success("Account Created Succesfully!");
                var frm = document.getElementsByName('create-account')[0];
                frm.reset();
            }
        });


        axios.post(addUrl,firstState).then(function(response){
            if(!response){
                toast.error("Error in Creating the account!");
            }
        });
        
    }

    return <div className="col-6 input-column">
    <div className="form-group">
        <ToastContainer />
        </div>
    <div className = "get-input-column">
    <Title
            class = "get-input-title"
                text1 = {props.title}
            />

    
            
    </div>
    <form name="create-account" onSubmit={addUser}>
    
    
    <Title
        text1 = "Index Number"
        class = "get-input-sub-titles"
        
    />
    <InputBox
        name = "index"
        place = "Enter the Index Number"
        
    />
    <Title
        text1 = "Name"
        class = "get-input-sub-titles"
        
    />
    <InputBox
        name = "name"
        place = "Enter the name"
    />
    <Title
        text1 = "Username"
        class = "get-input-sub-titles"
        
    />
    <InputBox
        name = "username"
        place = "Enter the username"
    />

    <Title
        text1 = "Enter Password"
        class = "get-input-sub-titles"
        
    />

    <InputBox
        name = "password"
        place = "Enter the Password"
    />
    
    <div className="submit-button">
    <button type="submit" className="btn btn-outline-warning btn-lg">Create the Account</button>
    </div>
    </form>
    </div>
}