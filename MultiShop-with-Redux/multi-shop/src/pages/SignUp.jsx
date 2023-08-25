import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col , Form, FormGroup, Label} from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/login.css';
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable , getDownloadURL} from 'firebase/storage';
import { auth } from '../firebase.config';
import { storage } from '../firebase.config';
import { toast } from 'react-toastify';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate()
  const[username, setUsername]= useState('')
  const[email, setEmail]= useState('')
  const[password, setPassword]= useState('')
  const[file, setFile]= useState(null)
  const[Loading, setLoading]= useState(false);

  const signup =async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const credentials =await createUserWithEmailAndPassword(auth, email, password);
      const user = credentials.user;
      const storageRef= await ref(storage, `images/${Date.now()}/${username}`);
      const uploadTask= uploadBytesResumable(storageRef, file).then(()=>{
        getDownloadURL(storageRef).then(async(downloadURL)=>{
            {/* update user profile*/}
          updateProfile(user,{
            displayName:username,
            photoURL:downloadURL 
          })

          {/*store user data */}
          await  setDoc(doc(db, 'users', user.uid),{
            uid: user.uid,
            displayName:username,
            email,
            photoURL:downloadURL
          })
        })
        
        console.log(user)
      }).catch(()=>{
        toast.error('Sign Up Error')
      })
      setLoading(false);
      toast.success('Your Account is Created Successfully')
      navigate('/login')
    } catch (error) {
      setLoading(false)
      toast.error('Error !! Could Not Complete Sign Up')
    }
  }
  return (
    <Helmet title='Sign Up'>
      <section>
        <Container>
          <Row>
            {
              Loading ?
              (
                  <Col className='text-center' lg='12'>
                    <h2 style={{color:'teal', fontWeight:400}}>Loading....</h2>
                  </Col>
              ) :(
                <Col lg='6' className='m-auto'>
                <h3 className='fw-bold fs-4 text-center'>Register</h3>
                <Form className='auth__form mt-3' onSubmit={signup}>
                  <Label>Username</Label>
                  <FormGroup className='form__group'>
                    <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='Enter Your Email'/>
                  </FormGroup>
                  <Label>Email</Label>
                  <FormGroup className='form__group'>
                    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Your Email'/>
                  </FormGroup>
                  <Label>Password</Label>
                  <FormGroup className='form__group'>
                    <input type="password"  value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter Your Password'/>
                  </FormGroup>
                  <FormGroup className='form__group d-flex' >
                  <Label style={{width:'80%'}}>Upload Profile Image</Label>
                    <input type="file" onChange={(e)=> setFile(e.target.files[0])} style={{border:'none',padding:0}}/>
                  </FormGroup>
                  <div className='text-center'>
  
                  <button type='submit' className='buy__btn auth__btn mb-3'>
                    Register
                  </button>
                  </div>
                  <p style={{color:'#a9a9a9'}}>Already Have An Account ? &nbsp;<Link style={{color:'var(--primary-color)', fontWeight:600}} to='/login'>Login</Link></p>
                </Form>
              </Col>
              )
            }
         
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}
 
export default SignUp