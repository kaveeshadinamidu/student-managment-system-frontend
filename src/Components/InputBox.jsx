import React from "react"



export default function InputBox(props){

    function change(event){
        props.callback(event.target.value);
    }
    
    
     return <div>
        {props.callAvailable? <input autoComplete="off" type="text" onChange = {change} name = {props.name} defaultValue={props.defaultvalue} className="form-control input-box"  maxLength={props.length} placeholder={props.place} required value={props.value} width={props.width}/>:
        <input autoComplete="off" type="text"  name = {props.name} defaultValue={props.defaultvalue} className="form-control input-box"  maxLength={props.length} placeholder={props.place} required value={props.value} width={props.width}/> }
     </div>
}