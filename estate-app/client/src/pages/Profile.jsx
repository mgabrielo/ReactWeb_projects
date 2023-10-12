import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'

const Profile = () => {
    const fileRef= useRef(null)
    const {currentUser} = useSelector((state)=>state.user)
    const [file, setFile] = useState(undefined);
    const [filePercent, setFilePercent] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({})
        console.log(formData)
        console.log(filePercent+'% of file upload done')
    useEffect(()=>{
        if(file){
            handleFileUpload(file)
        }
    },[file])

    const handleFileUpload=(file)=>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef,file);
        uploadTask.on('state_changed', (snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePercent(Math.round(progress))
           
        },(error)=>{
            setFileUploadError(true)
        },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                console.log('url:', downloadURL)
                setFormData({...formData, avatar: downloadURL})
            })
        })
    }
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>
            Profile
        </h1>
        <form className='flex flex-col gap-4'>
            <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef}  hidden accept='image/*' />
            <img 
                onClick={()=>fileRef.current.click()}
                src={formData.avatar || currentUser.avatar} 
                className='rounded-full self-center mt-2 h-24 w-24 object-cover cursor-pointer'
                alt="profile-img"  
                referrerPolicy='no-referrer'
            />
            <p className='text-sm text-center'>
                {fileUploadError ? (
                        <span className='text-red-700'>Error in Image Uplaod - Image Must be Less than 2MB</span>
                    ): filePercent > 0 && filePercent < 100 ?(
                        <span className='text-slate-700'>{`Image Uploading at ${filePercent}%`}</span>
                    ): filePercent == 100 && !fileUploadError ?(
                        <span className='text-green-700'>Image Upload Successful</span>
                    ):(
                        ''
                    )
                }
            </p>
            <input 
                type="text" 
                id='username'
                placeholder='username'
                className='border p-3 rounded-lg'
            />
            <input 
                type="text" 
                id='email'
                placeholder='email'
                className='border p-3 rounded-lg'
            />
            <input 
                type="text" 
                id='password'
                placeholder='password'
                className='border p-3 rounded-lg'
            />
            <button type='button' className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
                Update
            </button>
        </form>
        <div className='flex justify-between mt-5'>
            <span className='text-red-700 cursor-pointer'>Delete Account</span>
            <span className='text-red-700 cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}

export default Profile