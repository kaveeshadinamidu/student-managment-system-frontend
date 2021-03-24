import React,{useState} from "react"
import Title from "./Title"
import ReadOnly from "./ReadOnlyInput"
import InputBox from "./InputBox"
import axios from 'axios'
import PasswordInput from "./PasswordInput"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {useSelector,useDispatch} from "react-redux"
import {SettingsChanged} from "../Redux/Actions"
const url = "http://localhost:5000/api/getuserdetails/";
const addUrl = "http://localhost:5000/api/getuserdetails/add";
const usernameUrl = "http://localhost:5000/api/getuserdetails/username/";
const changePasswordUrl = "http://localhost:5000/api/getuserdetails/changePassword";

export default function Settings(props){
    const user = useSelector(state => state.User);
    const id = user.id;
    const dispatch = useDispatch();
   
    function changePasswordClicked(event){
        event.preventDefault();

        const newPass = event.target.newPassword.value;
        const newPassRepeat = event.target.newPasswordRepeat.value;
        if (newPass !== newPassRepeat){
            toast.error('Passwords mismatch!');
        }else{
        const data3 = {
            id:id,
            currentPassword:event.target.currentPassword.value,
            newPass,
            newPassRepeat
        }

        axios.put(changePasswordUrl,data3).then(function(response){
            if(response.data){
                toast.success('Password Change Succesfully!');
                var frm = document.getElementsByName('passwordforum')[0];
                frm.reset();
            }else{
                toast.error('Wrong Password Try Again!');
            }
        });

    }

    }


    function ChangeDetailsClicked(event){
        event.preventDefault();
        const user_name = event.target.username.value;
        const data = {
            id:id,
            first_name:event.target.first_name.value,
            second_name:event.target.second_name.value,
            email:event.target.email.value,
            phone_number:event.target.phone_number.value,
            faculty:event.target.faculty.value
        };

        const data1 = {
            id:id,
            username:user_name
        };


        axios.put(addUrl,data).then(function(response){
            if (response) {
                
                toast.success('Details Chage Sucessfully!');
                loadDetails();
                
            }else
                toast.error('Error in changing the details! Try Again!');
        });

        axios.put(usernameUrl,data1).then(function(response){
            toast.success('Username Changed Succesfully!');
            loadDetails();
        });


        
    }

    const firstState = {
            first_name:"Not Set",
            second_name:"Not Set",
            email:"Not Set",
            phone_number:"Not Set",
            faculty:"Not Set"
    };
    const [changePassword,change] = useState(false);
    const [changeDetails,detailsChange] = useState(false);
    const [details,getDetails] = useState(firstState); 
    const [UserName,changeUsername] = useState("Cannot get!");
    
    function loadDetails(){
        axios.get(url+id).then(function(response){
            if (response.data.length !== 0) {
                getDetails(response.data[0]);
            }   
        });
        axios.get(usernameUrl+id).then(function(response){
            changeUsername(response.data[0].username)
        });
    }

    React.useEffect(()=>{
        loadDetails();

    },[]);
    
    return <div className="col-6 body-column settings-column">
    <div className="form-group">
        <ToastContainer />
        </div>
            <div className = "get-input-column">
            <Title
                class = "settings-title"
                text1 = "Settings"
            />
            
    </div>
    <Title
        text1 = "Index Number"
        class = "get-input-sub-titles"
        
    />
    <ReadOnly
        value = {id}
        
    />
    <form onSubmit={ChangeDetailsClicked}>
    <Title
        text1 = "First Name"
        class = "get-input-sub-titles"
        
    />
    {changeDetails?<InputBox defaultvalue = {details.first_name} name="first_name"/>
    :<ReadOnly
        value = {details.first_name}
        
    />}
    
    <Title
        text1 = "Second Name"
        class = "get-input-sub-titles"
        
    />
    {changeDetails?<InputBox defaultvalue = {details.second_name} name="second_name"/>
    :<ReadOnly
        value = {details.second_name}
        
    />}
    <Title
        text1 = "Username"
        class = "get-input-sub-titles"
        
    />
    {changeDetails?<InputBox defaultvalue = {UserName} name="username"/>
    :<ReadOnly
        value = {UserName}
        
    />}

    <Title
        text1 = "Email"
        class = "get-input-sub-titles"
        
    />
    {changeDetails?<InputBox defaultvalue = {details.email} name="email"/>
    :<ReadOnly
        value = {details.email}
        
    />}

    <Title
        text1 = "Phone Number"
        class = "get-input-sub-titles"
        
    />
    {changeDetails?<InputBox defaultvalue = {details.phone_number} name="phone_number"/>
    :<ReadOnly
        value = {details.phone_number}
        
    />}
    <Title
        text1 = "Faculty"
        class = "get-input-sub-titles"
        
    />
    {changeDetails?<InputBox defaultvalue = {details.faculty} name="faculty"/>
    :<ReadOnly
        value = {details.faculty}
        
    />}
    

    <div className="submit-button">
    
    <button type="button" className="btn btn-outline-warning btn-lg change-password" onClick={()=>detailsChange(true)}>Change Details</button>
    {changeDetails && <button type="submit" className="btn btn-outline-warning btn-lg change-password">Change</button>}
    {changeDetails && <button type="button" className="btn btn-outline-warning btn-lg change-password" onClick={()=>detailsChange(false)}>Back</button>}
    </div>
    </form>


    <form onSubmit={changePasswordClicked} name="passwordforum">
    {changePassword && <div className="change-password-forum">
        <Title
        text1 = "Enter Current Password"
        class = "change-password-title"
        
    />
    <PasswordInput
        name = "currentPassword"
        place = "Current Password"
    />
    <Title
        text1 = "Enter New Password"
        class = "change-password-title"
        
    />
    <PasswordInput
        name = "newPassword"
        place = "Enter New Password"
    />
    <PasswordInput
        name = "newPasswordRepeat"
        place = "Enter Again"
    />
    <button type="submit" className="btn btn-outline-warning btn-lg change-password">Change</button>
    <button type="button" className="btn btn-outline-warning btn-lg change-password" onClick={()=>change(false)}>Back</button>
    </div>}
    <div className="submit-button">
    <button type="button" className="btn btn-outline-warning btn-lg change-password" onClick={()=>change(true)}>Change Password</button>
    </div>
    </form>
    </div>
}