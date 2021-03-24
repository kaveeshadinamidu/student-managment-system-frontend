import React from "react"
import Title from "../Components/Title"
import axios from 'axios'
import {useSelector} from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const url = "http://localhost:5000/api/getusers/delete/";
export default function UserProfileDelete(props){

    //This id should connect to the redux store

    const user = useSelector(state => state.User);
    const id = user.id;
    
    function deleteAccount(){
        axios.delete(url+props.index).then(function(response){
            toast.success("Account Deleted Succesfully!");
        }).catch((Err)=>{
            toast.warn("Error with the deletetion of the account!")
        });
    }

    return <div className = "user-profile-delete-box">
    <div className="form-group">
        <ToastContainer />
        </div>
            <Title
                text1 = {props.name}
                class = "username-box-text"
            />
            

            <Title
                text1 = {props.index}
                class = "username-box-index"
            />
            <div style={{textAlign:"right"}} className="delete-button-user-profile">
            <button type="button" className="btn btn-outline-warning contact-card-button" onClick={deleteAccount}>Delete Account</button>
            </div>
           

    </div>
}