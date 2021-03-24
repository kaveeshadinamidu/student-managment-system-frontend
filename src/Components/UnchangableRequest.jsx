import React,{useState} from "react"
import Title from "./Title"
import ReadOnly from "./ReadOnlyInput"
import {useDispatch} from "react-redux"
import {MidBoxClicked} from "../Redux/Actions"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const getFullName = "http://localhost:5000/api/getusers/fullName/";
const getFile = "http://localhost:5000/api/requests/getfile/";
const requestStat = "http://localhost:5000/api/requests/setstatus/";
const getStat = "http://localhost:5000/api/requests/getstatusrequest/";
const getFileCheck = "http://localhost:5000/api/requests/getfilecheck/";
const getFileNames = "http://localhost:5000/api/requests/getFileNames/";
const addCommentsUrl = "http://localhost:5000/api/requestitems/add/comments";
const getCommentsUrl = "http://localhost:5000/api/requestitems/get/comments/";


export default function UnChangableRequest(props){
    
    const dispatch = useDispatch();
    const [fileAvailable,isFileAvailable] = useState(true);
    const [fileToUpload,uploadFile] = useState(null);
    const [sentenceCommentl,chageSentence] = useState(1000);
    const [descriptionCommentl,chageDescription] = useState(1000);
    const [filesCommentl,chageFiles] = useState(1000);
    const [fullName,changeFullName] = useState("");
    const [sentenceVal,getSentenceComments] = useState("");
    const [descriptionVal,getDescriptionComments] = useState("");
    const [filesVal,getFilesComments] = useState("");
    const [additionalVal,getAdditionalComments] = useState("");
    const [additionalComment,additionalCommentChanging] = useState(1000);

    const [accepted,isAccepted] = useState(false);
    const [declined,isDeclined] = useState(false);

    let isTrueToGetFileInput = true;
    function getCommentsToFile(){
        axios.get(getCommentsUrl+props.key_ID).then((response)=>{
            getAdditionalComments(response.data[0].additional_comments);
            getSentenceComments(response.data[0].reason_comment);
            getDescriptionComments(response.data[0].description_comment);
            getFilesComments(response.data[0].files_comment);
        });
    }
    

    function sentenceChanging(event){
        chageSentence(1000-event.target.value.length);
    }
    function descriptionChanging(event){
        chageDescription(1000-event.target.value.length);
    }
    function filesChanging(event){
        chageFiles(1000-event.target.value.length);
    }
    function additionalChanging(event){
        additionalCommentChanging(1000-event.target.value.length);
    }

    function getFilesFromDB(){
        console.log(getFileNames+props.key_ID);
        axios.get(getFileNames+props.key_ID).then(function(response){
            console.log("Getting the files!");
            const fileName = response.data[0].files;
            axios.get(getFileCheck+fileName).then(function(response){
                
            }).catch(function(err){
                isFileAvailable(false);
                isTrueToGetFileInput = false;
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
        if(props.key_ID){
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

    React.useEffect(()=>{
        if(props.indexNumber){
            axios.get(getFullName+props.indexNumber).then((response)=>{
                changeFullName(response.data[0].name)
            });
        }

        
}   ,[props.indexNumber]);

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

    function addComments(event){
        event.preventDefault();
        let filesComment;
        if (isTrueToGetFileInput){
            filesComment = event.target.filesComment.value;
        }else{
            filesComment = "";
        }
        const sentenceComment = event.target.sentenceComment.value;
        const descriptionComment = event.target.descriptionComment.value;
        
        const additionalComment = event.target.additionalCommentInput.value;
        const data = {
            id:props.key_ID,
            sentenceComment,
            descriptionComment,
            filesComment,
            additionalComment
        }


        axios.post(addCommentsUrl,data).then((response)=>{
            toast.success('Comments Added Sucessfully!');
            getCommentsToFile();
        });;
        
    }

    function requestAccept(){
        axios.get(requestStat+props.key_ID+"/1").then((response)=>{
            toast.success("Request Set as Accepted");
            isAccepted(true);
            isDeclined(false);
        });
    }
    function requestDecline(){
        axios.get(requestStat+props.key_ID+"/0").then((response)=>{
            toast.error("Request Set as Declined");
            isDeclined(true);
            isAccepted(false);
        });
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
    <form onSubmit={addComments}>
    
    
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
        value = {fullName}
        
    />
    <Title
        text1 = "Reason"
        class = "get-input-sub-titles"
        
        
    />
    <ReadOnly
        value = {props.sentence}
        
    />
    <textarea defaultValue={sentenceVal} onChange={sentenceChanging} name="sentenceComment" className="form-control input-box" placeholder = "Add Comments......." rows="10" maxLength="1000"  ></textarea>
    <div className="remaining-words">
        <Title
            class = "remaining-words-style"
            text1 = {sentenceCommentl+" chars permitted"}
        />
    </div>

    <Title
        text1 = "Description"
        class = "get-input-sub-titles"
        
    />
    <textarea readOnly name="description" value={props.description} className="form-control input-box" placeholder = "Description........" rows="10" maxLength="1000"  ></textarea>
    <textarea defaultValue={descriptionVal} onChange={descriptionChanging} name="descriptionComment" className="form-control input-box" placeholder = "Add Comments........" rows="10" maxLength="1000"  ></textarea>
    <div className="remaining-words">
        <Title
            class = "remaining-words-style"
            text1 = {descriptionCommentl+" chars permitted"}
        />
    </div>

    <Title
        text1 = "Additional Comments"
        class = "get-input-sub-titles"   
    />

    <textarea defaultValue={additionalVal} onChange={additionalChanging} name="additionalCommentInput" className="form-control input-box" placeholder = "Add Comments........" rows="10" maxLength="1000"  ></textarea>
    <div className="remaining-words">
        <Title
            class = "remaining-words-style"
            text1 = {additionalComment+" chars permitted"}
        />
    </div>
    <Title
        text1 = "Attached Files"
        class = "get-input-sub-titles"
        
    />
    {fileAvailable && <div><div >
        <button type="button" className="btn btn-outline-warning btn " onClick={downloadFiles}>View Attachments</button>
        <div>
        <textarea defaultValue={filesVal} onChange={filesChanging} name="filesComment" className="form-control input-box" placeholder = "Add Comments........" rows="10" maxLength="1000"  ></textarea>
        
        </div>
    </div>
    <div className="remaining-words">

    
    <Title
            class = "remaining-words-style"
            text1 = {filesCommentl+" chars permitted"}
        />
        </div>
    </div> }
    <div className="submit-button">
    <button type="submit" className="btn btn-outline-warning btn-lg back-button-to-requests" >Add Comments</button>
    </div>
    
    </form>
    {!accepted && !declined && <div className="submit-button">
        <div className="submit-button">
        <button type="button" onClick={requestAccept} className="btn btn-outline-success btn-lg back-button-to-requests" >Accept the Request</button> 
        </div>
        <div className="submit-button">
        <button type="button" onClick={requestDecline} className="btn btn-outline-danger btn-lg back-button-to-requests" >Decline the Request</button>
        </div>
    </div>}
    <button type="button" className="btn btn-outline-warning btn-lg back-button-to-requests" onClick={()=> dispatch(MidBoxClicked("SF1")) }>Back</button>
    </div>
}