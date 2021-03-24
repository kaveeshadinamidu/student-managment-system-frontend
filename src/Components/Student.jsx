import React, { useState } from "react"
import NavigationBar from "./NavigationBar"
import Body from "./Body"
import axios from "axios"
import {useSelector} from "react-redux"
const url = "http://localhost:5000/api/getuserdetails/";
const url2 = "http://localhost:5000/api/getuserdetails/username/";
export default function Student(props){
    const [firstName,changeName] = useState("");
    const [username,changeUsername] = useState("");
    const user = useSelector(state => state.User);
    const id = user.id;

    React.useEffect(()=>{
        if (id){
        axios.get(url+id).then(function(response){
            changeName(response.data[0].first_name);
            
        });
        axios.get(url2+id).then(function(response){
            changeUsername(response.data[0].username);
            
        });
    }
    },[id]);
   
    return <div>
        <NavigationBar
            username = {username}
         />

        <Body
            isStaff = {props.isStaff}
            firstName = {firstName}
        />
    </div>
}