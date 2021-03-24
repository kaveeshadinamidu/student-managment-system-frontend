import React from "react"
import {useDispatch} from "react-redux"
import {GotoHome,LogOutUser,Settings,UserLoggedOut} from "../Redux/Actions"
import axios from "axios"
import {useSelector} from "react-redux"
import addActivity from "../Components/Data/AddActivity"
const url = "http://localhost:5000/api/login/logout";

export default function NavigationBar(props){
    const dispatch = useDispatch();
    const user = useSelector(state => state.User);
    const id = user.id;

    function logOut(){
        axios.get(url).then(function(response){
            console.log(response);
        });
        addActivity(id,"Logged Out");
        dispatch(LogOutUser());
        dispatch(GotoHome());
        dispatch(UserLoggedOut());
    }

    return <header>
    
        <nav className=" navbar navbar-expand-lg  bg-dark fixed-top">
            <a className="navbar-brand university-name navbar-item" href="#"><img src="images/campuslogo.png" alt="" width="50" height="50"/>University Of Moratuwa</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                

                <ul className = "navbar-nav ml-auto">
                <li className="nav-item active">
                    <a className="nav-link home navbar-text navbar-item" href="#" onClick = {()=> dispatch(GotoHome())}><i className="fas fa-home"></i> Home <span className="sr-only">(current)</span></a>
      </li>
                <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle user-name navbar-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="fas fa-user "></i> {props.username}
        </a>
        <div className="dropdown-menu dropdown-box " aria-labelledby="navbarDropdown">
          <a className="dropdown-item  drop-item" href="#" onClick={()=> dispatch(Settings())}><i className="fas fa-cog"></i> Settings</a>
          
          <div className="dropdown-divider " ></div>
          <a className="dropdown-item drop-item " href="#" onClick={logOut}><i className="fas fa-sign-out-alt"></i> Sign Out</a>
        </div>
        
      </li>
                </ul>



                
            </div>
        </nav>
        


        </header>
}