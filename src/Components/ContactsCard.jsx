import React,{ useState } from "react"
import ContactName from "./ContactName"


export default function ContactCard(props){
    function mouseisOver(){
        view(true);
    }
    function mouseOver(){
        view(false);
    }

    function sendEmail(){
        var email = props.mail;
        document.location = "mailto:"+email;
    }
    

    const[isOver,view] = useState(false);

    return <a href="#">
        
        <div className="contact-card" onMouseOver={mouseisOver} onMouseLeave={mouseOver}>
            <ContactName
                name = {props.name}
            />
            
            {isOver && <div className=" contact-card-buttons">
            <button type="button" className="btn btn-outline-warning contact-card-button" onClick={sendEmail}>Email</button>
            {/* <button type="button" className="btn btn-outline-warning contact-card-button" onClick={sendingMessage}>Message</button> */}
            
            </div>}
            
            
        </div>
    </a>
}