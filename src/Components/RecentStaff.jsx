import React,{ useState } from "react"
import Title from "./Title"
import axios from "axios"
import {useDispatch} from "react-redux"
import {RecentRequestClicked} from "../Redux/Actions"
import {useSelector} from "react-redux"

const urlsetView = "http://localhost:5000/api/requestitems/viewrequest/";
export default function RecentStaff(props){
    const user = useSelector(state => state.User);
    const id = user.id;
    const dispatch = useDispatch();
    
    function viewRequest(){
        const data = {
            id
        }
        axios.put(urlsetView+props.key_id,data).then((response)=>{

        });
        dispatch(RecentRequestClicked(props))
    }

    function mouseOver(){

        OverClicked(true);
    }

    function mouseLeave(){

        OverClicked(false);
    }

    const[isOver,OverClicked] = useState(false);

    return <a href="#">
        <div className="recent-box" onMouseOver = {mouseOver} onMouseLeave = {mouseLeave}>
        <Title
            class = "recent-request"
            text1 = {props.sentence}
        />
        <div className="container-fluid">
        <div className="row">
            <div className="col">
            
        {isOver && <button type="button" className="btn btn-outline-warning view-request-button" onClick = {viewRequest}>View Request</button>}
            </div>
        </div>

        </div>
        
        
</div>
    </a>
}