import React from 'react';
import Title from "./Title"
export default function fileShower(props){

    return <div className="file-shower-box">
        <Title
            class = "recent-request"
            text1 = {props.original_Name}
        />
    </div>
} 