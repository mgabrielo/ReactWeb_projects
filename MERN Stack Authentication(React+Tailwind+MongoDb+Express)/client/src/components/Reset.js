import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/login_avatar.jpg'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import styles from '../styles/Username.module.css'
import {resetPasswordValidate} from '../helper/validate'

 
export default function Reset() {

  const formik = useFormik({
    initialValues: {
      password :'',
      confirm_pass: '',
    },
    validate: resetPasswordValidate,
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

        <div className={styles.glass} style={{ width :"50%"}}>
            <div
             className="title flex flex-col items-center">
              <h3 className='text-5xl font-bold'>Reset</h3>
              <span className='py-4 text-xl w-2/3 text-center text-gray-800'>
              Enter new Password
              </span>
             </div>

             <form className='py-15'onSubmit={formik.handleSubmit}>

                <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='New Password' />
                  <input {...formik.getFieldProps('confirm_pass')} className={styles.textbox} type="text" placeholder='Re-Enter New Password' />
                  <button className={styles.btn} type='submit'> Reset !</button>
                </div>
             </form>
        </div> 
        
       </div>
    </div>
  )
}

