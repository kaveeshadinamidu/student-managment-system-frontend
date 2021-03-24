import React from "react"

export default function Button(props){
    return <button 
    className="btn btn-lg btn-outline-secondary btn-block" 
    
    type="submit">{props.text}
    </button>
}