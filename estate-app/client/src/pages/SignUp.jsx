import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData]=useState({})
  const [error, setError]=useState(null)
  const [loading, setLoading]=useState(false)

  const handleChange =(e)=>{
    setFormData({...formData, [e.target.id] :  e.target.value})
    console.log(formData)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      setLoading(true)
    const res = await fetch('/api/auth/signup',{
      method: 'POST',
      body: JSON.stringify(formData),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if(data.success === false){
      setError(data.message)
      setLoading(false)
      return;
    }
    setLoading(false)
    setError(null)
    navigate('/sign-in')
    } catch (error) {
     setLoading(false)
     setError(error.message) 
    }
    setLoading(false);
    // console.log(data)
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input className='border p-3 rounded-lg' id='username' onChange={handleChange} type="text" placeholder='Username'/>
        <input className='border p-3 rounded-lg' id='email' onChange={handleChange} type="text" placeholder='Email'/>
        <input className='border p-3 rounded-lg' id='password' onChange={handleChange} type="text" placeholder='Password'/>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-3'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error &&
        <p className='text-red-500'>{error}</p>
      }
    </div>
  )
}

export default SignUp