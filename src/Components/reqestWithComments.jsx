import React,{useState} from "react"
import Title from "./Title"
import ReadOnly from "./ReadOnlyInput"
import {useDispatch} from "react-redux"
import {MidBoxClicked} from "../Redux/Actions"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getFile = "http://localhost:5000/api/requests/getfile/";
const getFileCheck = "http://localhost:5000/api/requests/getfilecheck/";
const getFileNames = "http://localhost:5000/api/requests/getFileNames/";
const getCommentsUrl = "http://localhost:5000/api/requestitems/get/comments/";
const getStat = "http://localhost:5000/api/requests/getstatusrequest/";
const getMail = "http://localhost:5000/api/requestitems/get/viewerMail/";

export default function RequestWithComments(props){
    
    const dispatch = useDispatch();
    const [fileAvailable,isFileAvailable] = useState(true);
    const [fileToUpload,uploadFile] = useState(null);
    
    const [additionalVal,getaddtionalComments] = useState("");
    const [sentenceVal,getSentenceComments] = useState("");
    const [descriptionVal,getDescriptionComments] = useState("");
    const [filesVal,getFilesComments] = useState("");

    const [accepted,isAccepted] = useState(false);
    const [declined,isDeclined] = useState(false);

    const [instructorMail,getInstructorMail] = useState("");

    React.useEffect(()=>{
        if(props.key_ID){
            axios.get(getMail+props.key_ID).then((response)=>{
                getInstructorMail(response.data[0].email);
            });
            axios.get(getStat+props.key_ID).then((response)=>{
                console.log(response.data);
                if(response.data[0].accepted === 1){
                    isAccepted(true);
                    
                }else if (response.data[0].declined === 1){
                    isDeclined(true);
                }else{
                    isDeclined(false);
                    isAccepted(false);
                }
            });
        }
    },[props.key_ID])

    function getCommentsToFile(){
        axios.get(getCommentsUrl+props.key_ID).then((response)=>{
            getaddtionalComments(response.data[0].additional_comments);
            getSentenceComments(response.data[0].reason_comment);
            getDescriptionComments(response.data[0].description_comment);
            getFilesComments(response.data[0].files_comment);
        });
    }
    


    function getFilesFromDB(){
        console.log(getFileNames+props.key_ID);
        axios.get(getFileNames+props.key_ID).then(function(response){
            console.log("Getting the files!");
            const fileName = response.data[0].files;
            axios.get(getFileCheck+fileName).then(function(response){
                
            }).catch(function(err){
                isFileAvailable(false);
                if(err){
                    console.log("Hello");
                }
            });

            
            axios.get(getFile+response.data[0].files,{responseType: 'arraybuffer'}).then(function(response){
                uploadFile(response.data);   
            }).catch(function(err){
                console.log(err);
                isFileAvailable(false);
            });
                
        
        });
    }

    React.useEffect(()=>{
        getFilesFromDB();
        getCommentsToFile();
}   ,[]);

    function downloadFiles(){
        
        const file = window.URL.createObjectURL(
        new Blob([fileToUpload], { type: "application/pdf" })
      );
        window.open(file);
    }

    function contactInstuctor(){
        if(instructorMail){
            var email = instructorMail;
            document.location = "mailto:"+email;
        }else{
            toast.error("Instructor Do not setup the email!")
        }
        
    }


    return<div className="col-6 input-column">
    <div className="form-group">
        <ToastContainer />
        </div>
    <div className = "get-input-column">
    <Title
            class = "get-input-title"
                text1 = {props.title}
            />
    </div>

    {accepted && <Title
        text1 = "This Request has Accepted!"
        class = "accepted-title"
        
    />}
    {declined && <Title
        text1 = "This Request has Declined!"
        class = "declined-title"
        
    />}
    <form>
    
    
    <Title
        text1 = "Index Number"
        class = "get-input-sub-titles"
        
    />
    <ReadOnly
        value = {props.indexNumber}
        
    />
    <Title
        text1 = "Name"
        class = "get-input-sub-titles"
        
    />
    <ReadOnly
        value = {props.name}
        
    />
    <Title
        text1 = "Reason"
        class = "get-input-sub-titles"
        
        
    />
    <ReadOnly
        value = {props.sentence}
        
    />
    <textarea readOnly value={sentenceVal}  name="sentenceComment" className="form-control input-box" placeholder = "Add Comments......." rows="10" maxLength="1000"  ></textarea>
    
    

    <Title
        text1 = "Description"
        class = "get-input-sub-titles"
        
    />
    <textarea readOnly name="description" value={props.description} className="form-control input-box" placeholder = "Description........" rows="10" maxLength="1000"  ></textarea>
    <textarea readOnly value={descriptionVal}  name="descriptionComment" className="form-control input-box" placeholder = "Add Comments........" rows="10" maxLength="1000"  ></textarea>
    
    
    <Title
        text1 = "Attached Files"
        class = "get-input-sub-titles"
        
    />
    {fileAvailable && <div><div >
        <button type="button" className="btn btn-outline-warning btn " onClick={downloadFiles}>View Attachments</button>
        <div>
        <textarea readOnly value={filesVal} name="filesComment" className="form-control input-box" placeholder = "Add Comments........" rows="10" maxLength="1000"  ></textarea>
        
        </div>
    </div>
    
    </div> }
    <Title
        text1 = "Additional Comments"
        class = "get-input-sub-titles"   
    />

    <textarea value={additionalVal} readOnly name="additionalCommentInput" className="form-control input-box" placeholder = "Add Comments........" rows="10" maxLength="1000"  ></textarea>
    </form>
    <div className="submit-button">
    <button type="button" onClick={contactInstuctor} className="btn btn-outline-info submit-button">Contact The Instructor</button>
    </div>
    <button type="button" className="btn btn-outline-warning btn-lg back-button-to-requests" onClick={()=> dispatch(MidBoxClicked("B1")) }>Back</button>
    </div>
}