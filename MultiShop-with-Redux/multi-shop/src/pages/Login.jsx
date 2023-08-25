import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col , Form, FormGroup, Label} from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate=useNavigate();
  const[email, setEmail]= useState('')
  const[password, setPassword]= useState('')
  const[Loading, setLoading]= useState(false)

  const signIn=async(e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const user = credentials.user;
      console.log(user)
      setLoading(false)
      toast.success(' Sign In Successful')
      navigate('/checkout')
    } catch (error) {
      setLoading(false)
      console.log(error)    
    }
  }
  return (
    <Helmet title={'Login'}>
      <section>
        <Container>
          <Row>
           {
            Loading ? (
              <Col className='text-center' lg='12'>
              <h2 style={{color:'teal', fontWeight:400}}>Loading....</h2>
            </Col>
            ) :(
              <Col lg='6' className='m-auto  '>
              <h3 className='fw-bold fs-4 text-center'>Login</h3>
              <Form className='auth__form mt-3' onSubmit={signIn}>
                <Label>Email</Label>
                <FormGroup className='form__group'>
                  <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Your Email'/>
                </FormGroup>
                <Label>Password</Label>
                <FormGroup className='form__group'>
                  <input type="password"  value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter Your Password'/>
                </FormGroup>
                <div className='text-center'>

                <button type='submit' className='buy__btn auth__btn mb-3'>
                  Login
                </button>
                </div>
                <p style={{color:'#a9a9a9'}}>Dont Have An Account ? &nbsp;<Link style={{color:'var(--primary-color)', fontWeight:600}} to='/signup'>Register</Link></p>
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
 
export default Login