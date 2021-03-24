import React,{useState} from "react"
import Title from "./Title"
import ReadOnly from "./ReadOnlyInput"
import InputBox from "./InputBox"
import {useDispatch} from "react-redux"
import {MidBoxClicked} from "../Redux/Actions"
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"


const getFile = "http://localhost:5000/api/requests/getfile/";
const getFileCheck = "http://localhost:5000/api/requests/getfilecheck/";
const getFileNames = "http://localhost:5000/api/requests/getFileNames/";
const deleteFile = "http://localhost:5000/api/requests/getfile/delete/";
const changeReq = "http://localhost:5000/api/requests/changerequest";
const addFile = "http://localhost:5000/api/requests/addrequest/addfile";
const updateFileNames = "http://localhost:5000/api/requests/setfilenames";
export default function ChangableRequest(props){
    const dispatch = useDispatch();
    const [loaded,fileLoad] = useState(0);
    const [fileAvailable,isFileAvailable] = useState(true);
    const [fileToUpload,uploadFile] = useState(null);
    const [newFile,newFileUpload] = useState(null);
    const [sentenceLength,chageLength] = useState(60);
    const [descriptionLength,chageDescription] = useState(60);

    function typingSentence(val){
        chageLength(60-val.length);
    }

    function descriptionChange(event){
        chageDescription(1000-event.target.value.length);
    }

    function fileChanged(event){
        newFileUpload(event.target.files[0]);
    }

    function getFilesFromDB(){
        console.log(getFileNames+props.key_ID);
        var fileLive = false;
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
}   ,[]);  


    function removeAttachments(){
        axios.delete(deleteFile+props.file).then(function(response){
            toast.success('File Deleted!')
            uploadFile(null);
            getFilesFromDB();
        }).catch(function (err){
            toast.error('File Deletion Error!');
        });
        isFileAvailable(false);
    }
   

    function viewFile(){
        
        const file = window.URL.createObjectURL(
            new Blob([fileToUpload], { type: "application/pdf" })
          );
        window.open(file);
    }

    function changeRequest(event){
        event.preventDefault();
        const data1 = new FormData();
        data1.append('file', newFile);

        const data = {
            id:props.key_ID,
            sentence : event.target.sentence.value,
            description:event.target.description.value

        };
        axios.put(changeReq,data).then((response)=>{
            
            toast.success('Request Modified Suceesfully!');
        }).catch(function(err){
            
            toast.error('Error in Modifing details!');
        });

        if (newFile){
            
            axios.post(addFile,data1,{onUploadProgress: ProgressEvent => {
                
                fileLoad((ProgressEvent.loaded / ProgressEvent.total*100));
                }}).then(function(response){
                    console.log(response);
                    const data3 = {
                        id:props.key_ID,
                        pdf:response.data.filename,
                        original_name:response.data.originalname,
                    }
                    newFileUpload(null);
                    setTimeout(function() {
                        fileLoad(0);
                      }, 2000);
                    axios.put(updateFileNames,data3).then((response)=>{
                        getFilesFromDB();
                        isFileAvailable(true);
                    });
                    toast.success('File Uploaded Suceesfully!');
                });
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
    <form onSubmit={changeRequest}>
    <InputBox
        length = "60"
        name = "sentence"
        place = "Enter the Reason"
        defaultvalue = {props.sentence}
        callback = {typingSentence}
        callAvailable = {true}
    />
    <div className="remaining-words">
        <Title
            class = "remaining-words-style"
            text1 = {sentenceLength + " chars permitted"}
        />
    </div>

    <Title
        text1 = "Description"
        class = "get-input-sub-titles"
        
    />
    <textarea onChange = {descriptionChange} name="description" defaultValue={props.description} className="form-control input-box" placeholder = "Description........" rows="10" required maxLength="1000" ></textarea>
    <div className="remaining-words">
        <Title
            class = "remaining-words-style"
            text1 = {descriptionLength+" chars permitted"}
        />
    </div>

    
    {fileAvailable ? <div>
        <button type="button" className="btn btn-outline-warning btn back-button-to-requests" onClick={viewFile}>View Attachments</button>
        <button type="button" className="btn btn-outline-warning btn back-button-to-requests" onClick={removeAttachments}>Remove Attachments</button>
    </div> : <div>
    <Title
        text1 = "Attach PDF Files"
        class = "get-input-sub-titles"
        
    />
    <div className="form-group files">
                <label>Upload Your File </label>
                <input onChange={fileChanged} name = "images" type="file" className="form-control file-upload" accept="application/pdf"/>
              </div>
    <div className="form-group progress-bar">

    <Progress max="100" color="success" value={loaded} >{Math.round(loaded,2) }%</Progress>

    </div>
    </div>}
    <div className="submit-button">
    <button type="submit" className="btn btn-outline-warning btn-lg" >Change The Request</button>
    <button type="button" className="btn btn-outline-warning btn-lg back-button-to-requests" onClick={()=> dispatch(MidBoxClicked("B1")) }>Back</button>
    </div>
    </form>
    </div>
}