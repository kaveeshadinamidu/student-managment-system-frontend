import React from "react"
import LogIn from "./Login";
import Student from "./Student"
import Staff from "./Staff"
import SuperUser from "./SuperUser"
import {useSelector} from "react-redux"



export default function App(){
    const loggedUser = useSelector(state => state.LogInReducer);
    
    return <div>
        {loggedUser===0?
        <LogIn /> : loggedUser===3?<SuperUser/> : loggedUser===2? <Staff 
        isStaff = {true}
        /> : loggedUser===1? <Student isStaff = {false}/>:null}
        </div>
        }