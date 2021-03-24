import React,{ useState } from "react"
import Title from "./Title"
import Dot from "./Dot"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const deleteFile = "http://localhost:5000/api/requests/getfile/delete/";
const deleteReqDetails = "http://localhost:5000/api/requests/deletereq/";
export default function Recent(props){

    function deleteRequest(){
        axios.delete(deleteFile+props.file).then(function(response){
            toast.success('File Deleted!');
            
        }).catch(function (err){
            toast.error('File Deletion Error!');
        });
        axios.delete(deleteReqDetails+props.key_id).then((response)=>{
            toast.success('Request Deleted!')
        }).catch((err)=>{
            toast.error('Error in Deletion!')
        });
        
    }
    
    function mouseOver(){

        OverClicked(true);
    }

    function mouseLeave(){

        OverClicked(false);
    }

    const[isOver,OverClicked] = useState(false);

    return <a href="#">
    <div className="form-group">
        <ToastContainer />
        </div>
        <div className="recent-box" onMouseOver = {mouseOver} onMouseLeave = {mouseLeave}>
        <Title
            class = "recent-request"
            text1 = {props.sentence}
        />
        <div className="container-fluid">
        <div className="row">
            <div className="col">
            
        {isOver &&props.changable && <button onClick={deleteRequest} type="button" className="btn btn-outline-warning view-request-button">Delete Request</button>}
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