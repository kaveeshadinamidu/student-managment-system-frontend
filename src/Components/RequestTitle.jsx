import React from "react"

export default function RequestTitle(props){
    return <p className = "request-title">
        {props.textOne} <br/>{props.textTwo}
    </p>
}