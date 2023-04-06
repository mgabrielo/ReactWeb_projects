import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


const NotePage = () => {
  
    let [note, setNote] = useState(null)
    const params = useParams();

    const navigate = useNavigate()

    
   
    useEffect(() => {

        let getNote = async () => {
            if(params.id === 'new') return

            let response = await fetch(`/api/notes/${params.id}`);
            let data = await response.json();

            setNote(data)
        }

        getNote();
        

    }, [params])


    let addNote= async () => {
        fetch(`/api/notes/create/`, 
       {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(note)
       });
   }


    let updateNote= async () => {
         fetch(`/api/notes/${params.id}/update/`, 
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
        let response = await fetch(`/api/notes/${params.id}/`);
        let the_data = await response.json();
        setNote(the_data)
    }


    let handleSubmit=()=>{
        if(params.id !== 'new' && note.body === '' ){
            deleteNote()
        }else if(params.id !== 'new'){
            updateNote();
        }else if(params.id === 'new' && note !== null){
            addNote();
        }
       
        navigate('/');
    }


    let deleteNote= async () => {
        fetch(`/api/notes/${params.id}/delete/`
        ,{ method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }})

        navigate('/');
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to="/">
                <FontAwesomeIcon icon={faArrowLeft} onClick={handleSubmit}></FontAwesomeIcon>
               
                </Link>
                </h3>
                {params.id !== 'new' ?(
                     <button onClick={deleteNote}>Delete</button>
                ):(
                    <Link to="/">
                    <button onClick={handleSubmit}>Done</button>
                    </Link>
                )}
               
            </div>
            <textarea onChange={(e)=> {setNote({...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>
        </div>
    )
}
export default NotePage