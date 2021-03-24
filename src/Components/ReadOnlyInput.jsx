import React from "react"

export default function ReadOnly(props){
    return <input className="form-control input-box" type="text" value={props.value} readOnly disabled></input>
}