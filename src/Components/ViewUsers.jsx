import React,{useState} from "react"
import axios from 'axios'
import UserProfile from "../Components/UserProfile"
import Title from "./Title"

const url = "http://localhost:5000/api/getusers/";

function createUserProfile(user){
    return <UserProfile
            key = {user.id}
            index = {user.id}
            name = {user.name}
            
    />
}

export default function ViewUsers(props){
    const [users,getUsers] = useState([]);
    try{

        React.useEffect(()=>{
            axios.get(url).then(function(response){
                getUsers(response.data);
                      
            });
        },[]);   
    }catch (err){
        console.log(err);
    }
    
    
    return <div className="col-6 request-view-column">
            <div className = "request-view-title">
            <Title
                text1 = "Users"
                class = "get-input-title"
            />
            
            {users.map(createUserProfile)}
            </div>        
    </div>
    
    
}
