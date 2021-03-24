import axios from 'axios'

const url = "http://localhost:5000/api/addactivity/";


export default function addActivity(id,description){
    const data = {
        id : id,
        description : description  
    }
    axios.post(url,data).then(function(response){
        if(!response)
            console.log("Error Occured");
    });

}
