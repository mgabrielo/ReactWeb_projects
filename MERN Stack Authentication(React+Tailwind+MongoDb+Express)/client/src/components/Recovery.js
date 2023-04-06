import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/login_avatar.jpg'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import styles from '../styles/Username.module.css'
import {passwordValidate} from '../helper/validate'

 
export default function Recovery() {

  const formik = useFormik({
    initialValues: {
      password :''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit:async values =>{
      console.log(values) 
    }
  })
  return (
    <div className='container mx-auto'>
       <div className='flex justify-center items-center h-screen'>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className={styles.glass}>
            <div
             className="title flex flex-col items-center">
              <h3 className='text-5xl font-bold'>Recovery</h3>
              <span className='py-4 text-xl w-2/3 text-center text-gray-800'>
                Enter OTP to Recover Password
              </span>
             </div>

             <form className='py-15'onSubmit={formik.handleSubmit}>
               
                <div className="textbox flex flex-col items-center gap-6">

                  <span className='py-2 text-sm text-left text-grey-800'>
                    Enter 6 digit OTP sent to your email address
                  </span>
                  <input  className={styles.textbox} type="text" placeholder='OTP' />
                  <button className={styles.btn} type='submit'> Lets Go !</button>
                </div>
    
                  <div className="text-center py-4">
                    <span className='text-gray-800 '>Cant Get OTP?
                     <button className='text-black px-4' >Resend</button></span>
                  </div>
             </form>
        </div> 
        
       </div>
    </div>
  )
}


