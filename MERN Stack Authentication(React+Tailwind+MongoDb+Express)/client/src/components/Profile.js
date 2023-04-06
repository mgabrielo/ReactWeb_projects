import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/login_avatar.jpg'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import styles from '../styles/Username.module.css'
import extend from '../styles/Profile.module.css'
import {profileValidate} from '../helper/validate'
import convertToBase64 from '../helper/convert'

 
export default function Profile() {

  const [file,setFile]= useState();

  const formik = useFormik({
    initialValues: {
      firstName:'',
      lastname:'',
      email:'',
      mobile:'',
      address :''
    },
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit:async values =>{
      values = await Object.assign(values, {profile :file || ''})
      console.log(values) 
    }
  })

    const onUpload = async e=>{
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    }

  return (
    <div className='container mx-auto'>
       <div className='flex justify-center items-center h-screen'>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className={`${styles.glass} ${extend.glass}`}   style={{width:"40%", height:"80%", padding:"10px"}}>
            <div
             className="title flex flex-col items-center">
              <h3 className='text-5xl font-bold'>Profile</h3>
              <span className='py-2 text-xl w-2/3 text-center text-gray-800'>
                You can edit your profile details
              </span>
             </div>

             <form className='py-4'onSubmit={formik.handleSubmit}>
                <div className="profile flex justify-center py-2">
                  <label htmlFor="profile"  >
                  <img src={file || avatar} className= {styles.profile_img} alt="avatar" />
                  </label>
                  <input onChange={onUpload} type="file" id='profile' name='profile'/> 
                </div>

                <div className="textbox flex flex-col items-center gap-4">
                  <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('firstName')} className={styles.textbox} type="text" placeholder='First Name*' />
                  <input {...formik.getFieldProps('lastName')} className={styles.textbox} type="text" placeholder='Last Name*' />
                  </div>

                  <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('mobile')} className={styles.textbox} type="text" placeholder='Mobile No.*' />
                  <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*' />
                  </div>
                
                  <input {...formik.getFieldProps('address')} className={styles.textbox} type="text" placeholder='Address*' />
                 
                  <button className={styles.btn} type='submit'> Update </button>
                </div> 
    
                  <div className="text-center py-2">
                    <span className='text-gray-800 '>Ensure Details Are Correct !
                     <Link className='text-black px-4' to="/">Log out</Link></span>
                  </div>
             </form>
        </div> 
        
       </div>
    </div>
  )
}

