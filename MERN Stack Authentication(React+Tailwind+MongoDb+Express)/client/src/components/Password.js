import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/login_avatar.jpg'
import {toast, Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import styles from '../styles/Username.module.css'
import {passwordValidate} from '../helper/validate'
import useFetch from '../hooks/fetch.hooks';
import {useAuthStore} from '../store/store'
import { verifyPassword } from '../helper/helper';
 
export default function Password() {

  const navigate =  useNavigate()
 const {username} = useAuthStore(state=> state.auth)
 const [{isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
  const formik = useFormik({
    initialValues: {
      password :''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit:async values =>{
     let loginPromise = verifyPassword({username, password: values.password})
     toast.promise(loginPromise, {
      loading:'checking',
      success : <b> Login Successful</b>,
      error: <b> Password invalid</b>
     });

     loginPromise.then(res => {
        let {token} = res.data;
        localStorage.setItem('token', token)
        navigate('/profile')
     })
    }
  })

 if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
 if(serverError) return <h1 className='text-xl text-red-500'> {serverError.message}</h1>;
  return (
    <div className='container mx-auto'>
       <div className='flex justify-center items-center h-screen'>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className={styles.glass}>
            <div
             className="title flex flex-col items-center">
              <h3 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username}</h3>
              <span className='py-4 text-xl w-2/3 text-center text-gray-800'>
              Please Proivde Password
              </span>
             </div>

             <form className='py-1'onSubmit={formik.handleSubmit}>
                <div className="profile flex justify-center py-4">
                   <img src={apiData?.profile || avatar} className= {styles.profile_img} style={{width: "10%",height:"10%", objectFit:"cover", borderRadius:"50%"}} alt="avatar" />
                </div>

                <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password' />
                  <button className={styles.btn} type='submit'> Lets Go !</button>
                </div>
    
                  <div className="text-center py-4">
                    <span className='text-gray-800 font-bold'>Forgot Password?
                     <Link className='text-black px-4' to="/recovery">Recover Now</Link></span>
                  </div>
             </form>
        </div> 
        
       </div>
    </div>
  )
}

