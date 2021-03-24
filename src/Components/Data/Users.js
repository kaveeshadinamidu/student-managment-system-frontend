import axios from 'axios'


const url = "http://localhost:5000/api/getusers/";

const userProfiles =(callback)=>{ axios.get(url).then(function(response){
    console.log(response.data.length);
    return callback(response.data);        
})};

module.exports = userProfiles;