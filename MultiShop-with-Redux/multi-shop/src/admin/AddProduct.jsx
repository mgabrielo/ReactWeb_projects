import React, { useState } from 'react'
import { toast } from 'react-toastify'
import {Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { db, auth, storage } from '../firebase.config'
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { collection, addDoc, doc, } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom' 

const AddProduct = () => {
    const navigate = useNavigate()
    const [enterTitle, setEnterTitle]= useState('')
    const [enterShortDesc, setEnterShortDesc]= useState('')
    const [enterFullDesc, setEnterFullDesc]= useState('')
    const [enterPrice, setEnterPrice]= useState('')
    const [enterCategory, setEnterCategory]= useState('')
    const [enterProductImg, setEnterProductImg]= useState(null)
    const [loading, setLoading]= useState(false)

    const addProduct =async(e)=>{
        e.preventDefault();
        const product ={
            title:enterTitle,
            shortDesc:enterShortDesc,
            fullDesc:enterFullDesc,
            Category:enterCategory,
            price:enterPrice,
            imgUrl:enterProductImg
        }
        // console.log(product)

        setLoading(true)
        try {
            const docRef = await collection(db, 'products')
            const storageRef = await ref(storage, `productImage/${Date.now()}/${enterProductImg.name}`)
        
            const uploadTask= uploadBytesResumable(storageRef, enterProductImg).then(()=>{
                getDownloadURL(storageRef).then(async(downloadURL)=>{
                   
                  {/*store user data */}
                  await  addDoc(docRef,{
                    title:enterTitle,
                    shortDesc:enterShortDesc,
                    description:enterFullDesc,
                    category:enterCategory,
                    price:enterPrice,
                    imgUrl:downloadURL
                  })
                  toast.success('Product Added Successfully')
                })
            })    
            setLoading(false)
            navigate('/dashboard/all-products')
        } catch (error) {
            setLoading(false)
            toast.error('Error  in Adding Product ')
        }
    }
   return (
    <section>
        <Container>
            <Row>
                <Col lg='12'>
                  {
                    loading  ?
                    (
                    <Col className='text-center' lg='12'>
                        <h2 style={{color:'teal', fontWeight:400}}>Loading....</h2>
                    </Col>
                    ):
                    (
                        <>
                        <h4 className='mb-4'>Add Product</h4>
                        <Form onSubmit={addProduct}>
                            <FormGroup className='form__group'>
                                <span>Product Title</span>
                                <input type="text" value={enterTitle} required onChange={(e)=>setEnterTitle(e.target.value)} placeholder='Enter Product Name' />
                            </FormGroup>
                            <FormGroup className='form__group'>
                                <span>Short Description</span>
                                <input type="text" value={enterShortDesc} required onChange={(e)=>setEnterShortDesc(e.target.value)} placeholder='Enter Product Summary' />
                            </FormGroup>
                            <FormGroup className='form__group'>
                                <span>Product Description</span>
                                <input type="text" value={enterFullDesc} required onChange={(e)=>setEnterFullDesc(e.target.value)} placeholder='Enter Product Full Description' />
                            </FormGroup>
                            <div className='d-flex align-items-center gap-5 justify-content-between'>
                            <FormGroup className='form__group w-100'>
                                <span>Price</span>
                                <input type="text" value={enterPrice} required onChange={(e)=>setEnterPrice(e.target.value)} placeholder='$1000' />
                            </FormGroup>
                            <FormGroup className='form__group w-50'>
                                <span>Category</span>
                                <select className='w-100 p-2' value={enterCategory} required onChange={(e)=>setEnterCategory(e.target.value)}>
                                    <option>---Select category ---</option>
                                    <option value="chair">Chair</option>
                                    <option value="sofa">Sofa</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="watch">Watch</option>
                                    <option value="wireless">Wireless</option>
                                </select>
                            </FormGroup>
                            </div>
    
                            <div>
                            <FormGroup className='form__group'>
                                <span>Upload Product Image</span>
                                <input type="file" style={{border:'none'}}  onChange={(e)=>setEnterProductImg(e.target.files[0])} className='px-0' />
                            </FormGroup>
                            </div>
                            <button className='buy__btn' type='submit'>
                                Add Product
                            </button>
                        </Form>
                        </>
                    )
                  }
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default AddProduct