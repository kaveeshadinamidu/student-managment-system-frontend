import React,{useState} from "react"
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from "./Title"
import InputBox from "./InputBox"
import ReadOnly from "./ReadOnlyInput"
import axios from "axios"
import {useSelector} from "react-redux"

const url = "http://localhost:5000/api/getuserdetails/";
const urlADD = "http://localhost:5000/api/requests/addrequest";
const addFile = "http://localhost:5000/api/requests/addrequest/addfile";

export default function GetInput(props){
    const clickedOne = useSelector(state => state.BodyPartClickReducer);
    const user = useSelector(state => state.User);
    const id = user.id;
    const [fileToUpload,uploadFile] = useState(null);
    const [loaded,fileLoad] = useState(0);
    const [reasonLen,changeLen] = useState(60);
    const [descriptionLean,changeDis] = useState(1000);

    function typeReason(val){
        changeLen(60-val.length);
    }

    function descriptionChange(event){
        changeDis(1000 - event.target.value.length);
    }

    function fileChange(event){
        uploadFile(event.target.files[0]);
        
    }
    function submitRequest(event){
        const reason = event.target.reason.value;
        const description = event.target.description.value;
        const reqId = clickedOne.payload.id;
        
        
        const data1 = new FormData();
        data1.append('file', fileToUpload);
        axios.post(addFile,data1,{onUploadProgress: ProgressEvent => {
                
            fileLoad((ProgressEvent.loaded / ProgressEvent.total*100));
            }}).then(function(response){
                console.log(response);
                toast.success('File Uploaded Suceesfully!');
                const data = {
                    id,
                    reason,
                    description,
                    pdf:response.data.filename,
                    original_name:response.data.originalname,
                    reqId
                }
                uploadFile(null);
                axios.post(urlADD,data).then(function(response){
                    toast.success('Request Added Suceesfully!');
                    var frm = document.getElementsByName('request-forum')[0];
                    frm.reset();
                    setTimeout(function() {
                        fileLoad(0);
                      }, 2000);
                    
            }).catch(err => { 
                toast.error('Request Data upload Error!');
            });



        }).catch(err => { 
            toast.error('File Upload Error');
        });
        

        event.preventDefault();
    }



    const first_Details = {
        ID: " ", 
        first_name: " ", 
        second_name: " "};
    const [details,getDetails] = useState(first_Details);
    React.useEffect(()=>{
        if(id){
            axios.get(url+id).then(function(response){
                if (response.data.length !== 0) {
                    getDetails(response.data[0]);
                }   
            }); 
        }
        },[id]);
    return <div className="col-6 input-column">
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
        value = {details.ID}
        
    />
    <Title
        text1 = "Name"
        class = "get-input-sub-titles"
        
    />
    <ReadOnly
        value = {details.first_name + " " + details.second_name}
        
    />
    <form onSubmit={submitRequest} name="request-forum">
    
    <Title
        text1 = "Sentence"
        class = "get-input-sub-titles"
        
        
    />
    <InputBox
        length = "60"
        place = "Enter the Reason"
        name = "reason"
        callback = {typeReason}
        callAvailable = {true}
    />
    <div className="remaining-words">
        <Title
            class = "remaining-words-style"
            text1 = {reasonLen+" chars remaining"}
        />
    </div>

    <Title
        text1 = "Description"
        class = "get-input-sub-titles"
        
    />
    <textarea onChange={descriptionChange} name="description" className="form-control input-box" placeholder = "Description........" rows="10" required maxLength="1000" ></textarea>
    <div className="remaining-words">
        <Title
            class = "remaining-words-style"
            text1 = {descriptionLean+" chars permitted"}
        />
    </div>

    <Title
        text1 = "Attach PDF documents"
        class = "get-input-sub-titles"
        
    />
     <div className="form-group files">
                <label>Upload Your File </label>
                <input onChange={fileChange} name = "images" type="file" className="form-control file-upload" accept="application/pdf"/>
              </div>
              <div className="form-group progress-bar">

        <Progress max="100" color="success" value={loaded} >{Math.round(loaded,2) }%</Progress>

            </div>
    
    
    
    <div className="submit-button">
    <button type="submit" className="btn btn-outline-warning btn-lg">Submit The Request</button>
    </div>
    </form>
    </div>
}