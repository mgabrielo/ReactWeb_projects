import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

function AddButton() {
    return (
        <Link className='floating-button' to="/note/new" >
            <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
        </Link>
    )
}

export default AddButton