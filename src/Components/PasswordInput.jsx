import React from "react"



export default function PasswordInput(props){
    
    
    
    return <input type="password" name = {props.name} defaultValue={props.defaultvalue} className="form-control input-box"  maxLength={props.length} placeholder={props.place} required value={props.value} width={props.width}/>
}