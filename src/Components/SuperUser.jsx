import React  ,{useState} from "react"
import NavigationBar from "../Components/NavigationBar"
import SuperBody from "../Components/superUserBody"
import {useSelector} from "react-redux"
import axios from "axios"
const url2 = "http://localhost:5000/api/getuserdetails/username/";
export default function SuperUser(props){
    const user = useSelector(state => state.User);
    const id = user.id;
    const [username,changeUsername] = useState("");
    React.useEffect(()=>{
        if (id) {
        
        axios.get(url2+id).then(function(response){
            changeUsername(response.data[0].username);
                    
            });
    }     
    },[id]);

    function changeUser(){
        axios.get(url2+id).then(function(response){
            changeUsername(response.data[0].username);
                    
            });
    }

    return <div>
        <NavigationBar
            username = {username}
         />

        <SuperBody
            firstName = "Super"
        />
    </div>
}