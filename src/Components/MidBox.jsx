import React,{ useState } from "react"
import Title from "./Title"
import {useDispatch} from "react-redux"
import {MidBoxClicked} from "../Redux/Actions"

export default function Midbox(props){

    const dispatch = useDispatch();
    const[isOver,overDiv] = useState(false);

    function mouseOver(){
        overDiv(true);
    }
    function mouseFinish(){
        overDiv(false);
    }

    return <a href="#" onClick={()=> dispatch(MidBoxClicked(props.id))}>
        <div className="mid-box" style={{backgroundColor:props.color}} onMouseOver={mouseOver} onMouseLeave={mouseFinish}>
        {isOver?<div className ="mid-box-upper-line-animation">
        </div>
        :<div className ="mid-box-upper-line">
        </div>}
        <Title
            class = "mid-box-text"
            text1 = {props.text1}
            text2 = {props.text2}
        />
</div>
    </a>
}