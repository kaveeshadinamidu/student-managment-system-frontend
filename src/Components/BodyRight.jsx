import React, { useState } from "react"
import Title from "./Title"
import axios from "axios"
import ContactCard from "./ContactsCard"
import {useSelector} from "react-redux"

const url = "http://localhost:5000/api/getcontacts";
const searchUrl = "http://localhost:5000/api/getcontacts/search/";



export default function BodyRight(props){

  const user = useSelector(state => state.User);
  const id = user.id;

  function createContact(contact){
    if (contact.ID !== id){
      return <ContactCard
          id = {contact.ID}
          key = {contact.ID}
          mail = {contact.email}
          name = {contact.first_name +" "+contact.second_name }
        />
    }
    return null;
    
  }
    const [contacts,getContacts] = useState([]);

    React.useEffect(()=>{
      if (id){
        axios.get(url).then(function(response){
          getContacts(response.data)
        });}
    },[id]);
    function searchInput(event){
      
      const val = event.target.value;
      if (val.length === 0){
        axios.get(url).then(function(response){
          getContacts(response.data);         
      });
      }else{
      axios.get(searchUrl+val).then(function(response){
        getContacts(response.data);
              
    });
  }
    }

    
    return <div className="col contact-column">
    <div className="container-fluid">
      <div className="row">
          <div className="col">
          <Title
          text1 = "Contacts"
          class = "contacts-title"
      />
          </div>
          <div className="col">
          <input type="text" name="searchbar" onChange={searchInput} className="search-input" autoFocus placeholder="Search"/>
          </div>
      </div>
    </div>
      
      {contacts.map(createContact)}
    </div>
}