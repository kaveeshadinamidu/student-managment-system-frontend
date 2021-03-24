import React,{useState} from "react"
import Title from "./Title"
import Activity from "./Activity"
import {useSelector} from "react-redux"
import axios from 'axios'

const url = "http://localhost:5000/api/getactivity/";

function createActivity(act){
    return <Activity
        title = {act.description}
        date = {act.date}
        time = {act.time}
        key = {act.time}
        
    />
}

export default function ActivityLog(props){
    const user = useSelector(state => state.User);
    const [activity,activityChange] = useState([]);
    const id = user.id;
    const data = { id};
    try{

        React.useEffect(()=>{
            if (id){
                axios.post(url,data).then(function(response){
                
                    activityChange(response.data.reverse());
                          
                });
            }
            
        },[id]);   
    }catch (err){
        console.log(err);
    }


    return <div className="col-6 input-column">
    <div className = "get-input-column">
    <Title
            text1 = "Activity Log"
            class = "get-input-title"
        />

    </div>
        {activity.map(createActivity)}

    </div>
}