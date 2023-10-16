import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';

const Contact = ({listing}) => {
  const [landlord, setLandlord] = useState(null);
  const {currentUser} = useSelector((state)=> state.user)

  useEffect(()=>{
      const fecthLandLord =async()=>{
        try {
          const res = await fetch(`/api/user/getId/${listing.userRef}`,{
            method: 'GET'
          })

          const data =await res.json();
          setLandlord(data)
          // console.log('user-data:', data);
        } catch (error) {
          console.log(error)
        }
      }
      fecthLandLord()
  },[listing.userRef])

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, import.meta.env.VITE_PUBLIC_URL)
      .then((result) => {
          // console.log(result.text);
          toast.success('Success Message Sent');
          var form = document.getElementById("myForm");
          form.reset();
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <main>
    {
      landlord && (
        <div className=' flex flex-col gap-2'>
          <p>Contact - <span className='font-semibold'>{landlord.username}</span>
            {" "} for <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <form id="myForm" className='flex flex-col gap-3' ref={form} onSubmit={sendEmail} >
              <input hidden type="text" name='to_name' defaultValue={landlord.username} />
              <input hidden type="text" className='w-full border border-slate-400 p-3 rounded-lg' name="to_email" placeholder='Enter name' defaultValue={currentUser.email} />
              <label>Landlord:</label>
              <input  type="email" className='w-full border border-slate-400 p-3 rounded-lg' name="from_email" placeholder='Enter Email' defaultValue={landlord.email}/>
              <label>Message:</label>
              <textarea 
                name="message" 
                id="message" 
                rows="3" 
                placeholder='Enter Message...' 
                className='w-full border border-slate-400 p-3 rounded-lg'
              >
              </textarea>
          <button className='bg-gray-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'> Send </button>
          </form>
        </div>
      )
    }
    </main>
  )
}

export default Contact