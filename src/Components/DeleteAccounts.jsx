import React,{useState} from "react"
import UserProfileDelete from "../Components/UserProfileDelete"
import Title from "../Components/Title"
import axios from 'axios'

const url = "http://localhost:5000/api/getusers/search/";
function createUserProfile(user){
    
    return <UserProfileDelete
            key = {user.id}
            index = {user.id}
            name = {user.name}
            
    />
}


export default function DeleteAccounts(props){
    const [users,getUsers] = useState([]);
    

    function getProfiles(event){
        const val = event.target.value;
        if (val){
        axios.get(url+val).then(function(response){
            getUsers(response.data)
                
        });
        }else{
            getUsers([]);
        }
    }
     
    

    return <div className = "col-6 request-view-column">
            <div className = "request-view-title">
            <Title
                text1 = "Enter the Index or Username"
                class = "get-input-title"
            />
            <div className = "delete-account-forum">
            <form>

            
            <input type="text" name="inputVal" className="form-control input-box"  placeholder="Enter the index or Username" onChange={getProfiles}/>
            </form>
            </div>
            
            {users.map(createUserProfile)}
            
            </div>
    </div>
}