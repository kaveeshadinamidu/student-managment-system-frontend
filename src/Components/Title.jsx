import React from "react"

export default function Title(props){
    return <p className = {props.class}>
        {props.text1} <br/>{props.text2}
    </p>
}