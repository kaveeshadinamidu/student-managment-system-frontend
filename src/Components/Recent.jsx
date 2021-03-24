import React,{ useState } from "react"
import Title from "./Title"
import Dot from "./Dot"
import {useDispatch} from "react-redux"
import {RecentRequestClicked} from "../Redux/Actions"

export default function Recent(props){

    const dispatch = useDispatch();
    
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
            
        {isOver && <button type="button" className="btn btn-outline-warning view-request-button" onClick = {()=>{dispatch(RecentRequestClicked(props))}}>View Request</button>}
            </div>
            <div className="col circle-container">
                {props.changable?<Dot

                color="#00917c"
                    />:<Dot

                color="#aa2b1d"
                />
                    }
                
            </div>
        </div>

        </div>
        
        
</div>
    </a>
}