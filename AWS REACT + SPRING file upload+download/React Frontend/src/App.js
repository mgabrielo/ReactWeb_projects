import './App.css';
import axios from "axios"
import React, {useState, useEffect, useCallback} from "react";
import {useDropzone} from 'react-dropzone'
import Card from 'react-bootstrap/Button';

const UserProfile =()  =>{

  const [userProfiles, setUserProfiles] = useState([]);

   const fetchUserProfile =() =>{
    axios.get("http://localhost:8080/api/v1/userprofile")
    .then(res=>{
      console.log(res);
        setUserProfiles(res.data)
    })
   } 

   useEffect( ()=> {
      fetchUserProfile();
   }, []);

   return userProfiles.map( (userProfile, index) =>{

    return(
      <div key={index}>
         <br/>
         <br/>
            {userProfile.profile_id? (
            <img src={`http://localhost:8080/api/v1/userprofile/${userProfile.profile_id}/image/download`} alt=""/>)
             : null}
          <br/>
          <br/>
        <h1>{userProfile.username}</h1>
        <br/>
        <p>{userProfile.profile_id}</p>
        <br/>

       <Card> <TheDropzone {...userProfile}/></Card>
           
      </div>
    )
   } )
}

function TheDropzone({profile_id}) {
  const onDrop = useCallback(acceptedFiles => {
    // 
    const file  = acceptedFiles[0];
    console.log(file);
    const formData = new FormData();

    formData.append("file",file)

    axios.post(
      `http://localhost:8080/api/v1/userprofile/${profile_id}/image/upload`,
      formData,
      {
        headers:{
          "Content-Type": "multipart/form-data"
        }

       }
    ).then( ()=>{
      console.log("file uploaded successfully")
    }).catch(err => {
      console.log(err)
    })

  }, [profile_id])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop Profile Image or Click to Select Profile Pic</p>
      }
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <UserProfile/>
    </div>
  );
}

export default App;
