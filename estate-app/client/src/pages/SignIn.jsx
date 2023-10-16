import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link , useNavigate} from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData]=useState({})
  const {error, loading} = useSelector((state)=> state.user)

  const handleChange =(e)=>{
    setFormData({...formData, [e.target.id] :  e.target.value})
    // console.log(formData)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
    dispatch(signInStart())
    const res = await fetch('/api/auth/signin',{
      method: 'POST',
      body: JSON.stringify(formData),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if(data.success === false){
        dispatch(signInFailure(data.message))
      return;
    }
    dispatch(signInSuccess(data))
    navigate('/')
    } catch (error) {
        dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input className='border p-3 rounded-lg' id='email' onChange={handleChange} type="text" placeholder='Email'/>
        <input className='border p-3 rounded-lg' id='password' onChange={handleChange} type="text" placeholder='Password'/>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Need to Craete an Account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error &&
        <p className='text-red-500'>{error}</p>
      }
    </div>
  )
}

export default SignIn