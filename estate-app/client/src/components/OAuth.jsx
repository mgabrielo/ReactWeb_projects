import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const navigate = useNavigate()
    const dispatch= useDispatch();
    const handleGoogleClick= async ()=>{
        try {
            const provider =new GoogleAuthProvider();
            const auth  = getAuth(app)
            const result = await  signInWithPopup(auth, provider);
            // console.log(result)
            const res = await fetch('/api/auth/google',{
                method:'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            }).then(async (res)=>{
                const data = await res.json()
                console.log(data)
                dispatch(signInSuccess(data))
                navigate('/')
            }).catch((err)=>{
                console.log(err)
            })

        } catch (error) {
            console.log('could not sign in with google')
        }
    }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 hover:opacity-95 text-white p-3 rounded-lg uppercase'>
        Continue With Google
    </button>
  )
}

export default OAuth