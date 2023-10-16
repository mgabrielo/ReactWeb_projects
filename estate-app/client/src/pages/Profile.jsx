import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice'
import { app } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify'

const Profile = () => {
    const fileRef= useRef(null)
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const {currentUser,error, loading} = useSelector((state)=>state.user)
    const [file, setFile] = useState(undefined);
    const [filePercent, setFilePercent] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [formData, setFormData] = useState({})
    const [showListingsError, setShowListingsError]= useState(false)
    const [userListings, setUserListings]= useState([])

        // console.log(formData)
        // console.log(filePercent+'% of file upload done')
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
                // console.log('url:', downloadURL)
                setFormData({...formData, avatar: downloadURL})
            })
        })
    }

    const handleChange=(e)=>{
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res= await fetch(`/api/user/update/${currentUser._id}`,{
                method: 'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(formData)
            }).then(async(res)=>{
                const data = await res.json()
                if(data.success == false){
                    dispatch(updateUserFailure(data.message))
                    setUpdateSuccess(false)
                    return;
                }
                dispatch(updateUserSuccess(data))
                setUpdateSuccess(true)
            })
        } catch (error) {
            dispatch(error.message)
            setUpdateSuccess(false)
        }
    }

    const handleDeleteUser=async ()=>{
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                method:'delete',
            })
            const data = await res.json();
            if(data.success == false){
                dispatch(deleteUserFailure(data.message))
                return
            }
            dispatch(deleteUserSuccess(data))

            navigate('/sign-in')
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }
    const handleSignOut=async()=>{
        try {
            dispatch(signOutUserStart())
            const res = await fetch('/api/user/signout',{
            })
            const data = res.json()
            if(data.success == false){
                dispatch(signOutUserFailure(data.message))
                return
            }
            dispatch(signOutUserSuccess(data))
        } catch (error) {
            dispatch(signOutUserFailure(error.message))
        }
    }
    
    const handleShowListings=async()=>{
        try {
            setShowListingsError(false)
            const res= await fetch(`api/user/listings/${currentUser._id}`,{
                method:'GET'
            })
            const data = await res.json();

            if(data.success === false){
                setShowListingsError(true)
                return
            }
            if (data.length === 0){
                toast.error('No listing Available');
            }
            setUserListings(data)
            
            // console.log('user-listing-data:',data)            
        } catch (error) {
            setShowListingsError(true)
        }
    }

    const handleListingDelete=async(id)=>{
        try {
            const res = await fetch(`/api/listing/delete/${id}`,{
                method:'DELETE'
            })

            const data= await res.json()
            if(data.success === false){
                console.log(data.message)
                return ;
            } 

            setUserListings((prev)=> prev.filter((listing)=>listing._id !== id))
        } catch (error) {
            console.log(error)
        }
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
                src={formData?.avatar || currentUser.avatar} 
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
                defaultValue={currentUser?.username}
                placeholder='username'
                className='border p-3 rounded-lg'
                onChange={handleChange}
            />
            <input 
                type="text" 
                id='email'
                defaultValue={currentUser?.email}
                placeholder='email'
                className='border p-3 rounded-lg'
                onChange={handleChange}
            />
            <input 
                type="password" 
                id='password'
                placeholder='password'
                className='border p-3 rounded-lg'
                onChange={handleChange}
            />
            <button disabled={loading} type='button' onClick={handleSubmit} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
                {loading ? 'Loading...' : 'Update'}
            </button>
            <Link 
                to={'/create-listing'}
                className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
            >
                Create Listing
            </Link>
        </form>
        <div className='flex justify-between mt-5'>
            <span className='text-red-700 cursor-pointer' onClick={handleDeleteUser}>Delete Account</span>
            <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign Out</span>
        </div>
        <p className='text-red-700 mt-3 text-center'>{error ? error : ''}</p>
        <p className='text-green-700 mt-3 text-center'>{updateSuccess ? 'User Updated Successfully' : ''}</p>
        <button className='text-green-700 w-full' onClick={handleShowListings}>Show Listings</button>
    
        <p className='text-center w-full mt-3'>{showListingsError ? 'Error Showing Lisitngs': ''}</p>
        
        {
            userListings && userListings.length > 0 && 
            
            <div className='flex flex-col gap-4'>
                <h1 className='text-center mt-3 text-2xl font-semibold'>Your Listings</h1>
                {
                     userListings.map((listing)=>(
                        <div className='border border-slate-300 gap-3 rounded-lg p-3 flex justify-between items-center' key={listing._id}>
                            <Link to={`/listing/${listing._id}`}>
                                <img className='h-16 w-16 object-contain' src={listing.imageUrls[0]} alt="listing-cover" />
                            </Link>
                            <Link to={`/listing/${listing._id}`} className='flex-1 text-slate-700 font-semibold hover:underline truncate'>
                                <p>{listing.name}</p>
                            </Link>
                            <div className='flex flex-col items-center'>
                                 <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>
                                 <Link to={`/update-listing/${listing._id}`}>
                                    <button onClick={()=>{}} className='text-green-700 uppercase'>Edit</button>
                                 </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
           
        }
    </div>
  )
}

export default Profile