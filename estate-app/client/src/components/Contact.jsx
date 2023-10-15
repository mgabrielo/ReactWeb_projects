import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Contact = ({listing}) => {
  const [landlord, setLandlord] = useState(null);
  // const [message, setMessage] = useState('');

  useEffect(()=>{
      const fecthLandLord =async()=>{
        try {
          const res = await fetch(`/api/user/getId/${listing.userRef}`,{
            method: 'GET'
          })

          const data =await res.json();
          setLandlord(data)
          console.log('user-data:', data);
        } catch (error) {
          console.log(error)
        }
      }
      fecthLandLord()
  },[listing.userRef])

  // const onChangeMessage =(e)=>{
  //   setMessage(e.target.value);
  // }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_f52pd8r', 'template_r76tg2a', form.current, '4ECvU_tmOyNsabauq')
      .then((result) => {
          console.log(result.text);
          console.log('Msg Sent')
          // setMessage(null)
          set
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
          <form className='flex flex-col gap-3' ref={form} onSubmit={sendEmail}   >
              <input disabled type="email" className='w-full border border-slate-400 p-3 rounded-lg' name="to_name" placeholder='Enter Email' defaultValue={landlord.email}/>
              <textarea 
                name="message" 
                id="message" 
                rows="3" 
                placeholder='Enter Message...' 
                // defaultValue={message}
                // onChange={onChangeMessage}
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