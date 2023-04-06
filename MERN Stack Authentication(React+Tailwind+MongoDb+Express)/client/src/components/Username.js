import React, { useEffect } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import avatar from '../assets/login_avatar.jpg'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import styles from '../styles/Username.module.css'
import {usernameValidate} from '../helper/validate'
import {useAuthStore} from '../store/store'

export default function Username() {

  const navigate = useNavigate();

  const setUsername = useAuthStore(state => state.setUsername)
  
  const formik = useFormik({
    initialValues: {
      username :'example123'
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit:async values =>{
     console.log(values)
      setUsername(values.username)
     navigate('/password')
    }
  })
  return (
    <div className='container mx-auto'>
       <div className='flex justify-center items-center h-screen'>

      <Toaster position='top-center' reverseOrder={false}></Toaster>
 
        <div className={styles.glass}>
            <div
             className="title flex flex-col items-center">
              <h3 className='text-5xl font-bold'>Hello Please Log In</h3>
              <span className='py-4 text-xl w-2/3 text-center text-gray-800'>
                explore more
              </span>
             </div>

             <form className='py-1'onSubmit={formik.handleSubmit}>
                <div className="profile flex justify-center py-4">
                   <img src={avatar} className= {styles.profile_img} style={{width: "10%",height:"10%", objectFit:"cover", borderRadius:"50%"}} alt="avatar" />
                </div>

                <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
                  <button className={styles.btn} type='submit'> Lets Go !</button>
                </div>
    
                  <div className="text-center py-4">
                    <span className='text-gray-800 '>Not a User?
                     <Link className='text-black px-4' to="/register">Register Now</Link></span>
                  </div>
             </form>
        </div> 
        
       </div>
    </div>
  )
}
