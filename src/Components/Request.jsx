import React,{ useState } from "react"
import RequestTitle from "./RequestTitle"
import {useDispatch} from "react-redux"
import {RequestBoxClicked} from "../Redux/Actions"



export default function Request(props){

    const dispatch = useDispatch();
    function itemClicked(){
        dispatch(RequestBoxClicked(props));
    }


    function OnMouse(){
        onMouseDiv(true);
        
    }
    function leaveMouse(){
        onMouseDiv(false);
    }

    const[onOver,onMouseDiv] = useState(false);
    return <a href="#">
        {onOver?<div className="request-box-hover" onMouseOver={OnMouse}  onClick={itemClicked} onMouseLeave={leaveMouse}>
        <div className="request-box-line-enlarge" style={{backgroundColor:props.color}}>

        </div>
        
        <RequestTitle
            textOne = {props.textOne}
            textTwo = {props.textTwo}
        />
    
    </div>
        :
        <div className="request-box" onMouseOver={OnMouse} onMouseLeave={leaveMouse}>
        <div className="request-box-line" style={{backgroundColor:props.color}}>

        </div>
        
        <RequestTitle
            textOne= {props.textOne}
            textTwo = {props.textTwo}
        />
    
    </div>
        }
        
    </a>
    
}