import React,{ useState } from "react"
import axios from 'axios'
import Button from './Button'
import Title from "./LogInHeader"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Studentlogged,Stafflogged,SuperLogged,UserLogged} from "../Redux/Actions"
import {useDispatch} from "react-redux"
import addActivity from "../Components/Data/AddActivity"

const url = "http://localhost:5000/api/login";

function LogIn(props){

  const[forgotPassword,forgot] = useState(false);


  const dispatch = useDispatch();

  React.useEffect(()=>{
    axios.get(url).then(function(response){
      if(response.data){
      if(response.data===-1){
        var frm = document.getElementsByName('loginInput')[0];
        frm.reset();
        toast.error('Wrong Username Or Password!');
      }else if(response.data[0].accounttype === "1"){
        dispatch(Studentlogged());
        dispatch(UserLogged(response.data[0]));
        addActivity(response.data[0].id,"Logged In");
      }else if(response.data[0].accounttype  === "2"){
        dispatch(Stafflogged(response.data[0]));
        dispatch(UserLogged(response.data[0]));
        addActivity(response.data[0].id,"Logged In");
      }else if(response.data[0].accounttype  === "3"){
        dispatch(SuperLogged(response.data[0]));
        dispatch(UserLogged(response.data[0]));
        addActivity(response.data[0].id,"Logged In");
      }
    }
    });
  
    },[]);


  function sendRequest(event){
    event.preventDefault();
    const userName = event.target.userName.value;
    const Password = event.target.password.value;
    const data = {
      username: userName,
      password: Password
    };
    
    axios.post(url,data).then(function(response){
      if(response.data===-1){
        var frm = document.getElementsByName('loginInput')[0];
        frm.reset();
        toast.error('Wrong Username Or Password!');
      }else if(response.data[0].accounttype === "1"){
        dispatch(Studentlogged());
        dispatch(UserLogged(response.data[0]));
        addActivity(response.data[0].id,"Logged In");
      }else if(response.data[0].accounttype  === "2"){
        dispatch(Stafflogged(response.data[0]));
        dispatch(UserLogged(response.data[0]));
        addActivity(response.data[0].id,"Logged In");
      }else if(response.data[0].accounttype  === "3"){
        dispatch(SuperLogged(response.data[0]));
        dispatch(UserLogged(response.data[0]));
        addActivity(response.data[0].id,"Logged In");
      }
    });  
}
  function passwordForgot(){
    forgot(true);
  }

    return <div className="login-interface">
    <div className="form-group">
        <ToastContainer />
        </div>
    <form name="loginInput" className="form-signin vertical-center" onSubmit={sendRequest} >
    <img className="mb-4" src="images/campuslogo.png" alt="" width="100" height="100"/>
    {!forgotPassword?<Title text="Log In"/>:<Title text="Reset Password"/>}
    <input autoComplete="off" type="text" name="userName"  className="form-control top"  placeholder="Username" required autoFocus></input>
    {!forgotPassword?<input autoComplete="off" autoComplete="off" type="password" name="password" className="form-control bottom" placeholder="Password" required></input>:null}
    {forgotPassword?<Button 
    text="Reset Password"
      
    />:
    <Button 
    text="Sign In"/>}
    {!forgotPassword?<div className="forgot-password">
    <a onClick={passwordForgot} className="text-secondary" href="#">forgot password?</a>
    </div>:null}
    <p className="mt-5 mb-3 text-muted">&copy; Null Byte</p>
    </form>
  </div>
}

export default LogIn