import React, {  useEffect, useRef, useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import products from '../assets/data/products'
import CommonSection from '../components/UI/CommonSection'
import '../styles/product-details.css';
import { motion } from 'framer-motion';
import ProductsList from '../components/UI/ProductsList'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'
const ProductDetails = () => {
    const reviewUser = useRef('')
    const reviewMsg = useRef('')
    const [tab, setTab]= useState('desc');
    const {id} = useParams();
    const [rating, setRating] = useState(0)
    const product = products.find(item =>item.id  === id);
    const {imgUrl,productName,price, avgRating, reviews, description, shortDesc, category }= product
    const relatedProducts =products.filter(item=> item.category === category)
    const dispatch = useDispatch();

    const  submitHandler =(e)=>{
         e.preventDefault();
       
         const reviewUserName=reviewUser.current.value
         const reviewUserMsg=reviewMsg.current.value;
         
         if(reviewUserMsg !== '' && reviewUserName !== ''){
            const reviewObj ={
            userName: reviewUserName,
            text: reviewUserMsg,
            rating: rating
            }
            console.log(reviewObj)
            toast.success('Message Sent Successfully')
         }else{
            toast.info('Enter Name and Message Before Submission')
         }

    }

    const addToCart =()=>{
        dispatch(cartActions.addItem({
            id: id,
            imgUrl:imgUrl,
            productName: productName,
            price: price
        }));
        toast.success('Product Added To Cart')
    }
    
 

    const handleDesc =(e)=>{
      e.preventDefault();
      if(tab !== null){
        setTab('desc')
      }
    //   console.log(tab)
    }
    const handleRev =(e)=>{
        e.preventDefault();
       
        if(tab !== null){
            setTab('rev')
          }
        //    console.log(tab)
    }
    
    const handleRating =(value)=>{
        if(value !== null){
            if(rating !==value){
                setRating(value)
            }else{
                setRating(0)
            }
        }
    }
    
    useEffect(()=>{
        window.scrollTo(0,320)
    },[product])

    return (
    <Helmet title={productName}>
        <CommonSection title={productName}/>
        <section className='pt-0'>
            <Container>
                <Row>
                    <Col lg='6'>
                        <img src={imgUrl} alt="" />
                    </Col>
                    <Col lg='6'>
                        <div className='product__details'>
                            <h2>{productName}</h2>
                            <div className='product__rating d-flex align-items-center gap-5 mb-3'>
                                <div className=''>
                                    <span><i className="ri-star-s-fill"></i></span>
                                    <span><i className="ri-star-s-fill"></i></span>
                                    <span><i className="ri-star-s-fill"></i></span>
                                    <span><i className="ri-star-s-fill"></i></span>
                                    <span><i className="ri-star-half-line"></i></span>
                                </div>
                                <p>(<span>{avgRating} </span> ratings)</p>
                            </div>
                            <div className='d-flex align-items-center gap-5'>
                            <span  className='product__price'>${price}</span>
                            <p>Category : {category.toUpperCase()}</p>
                            </div>
                            <p className='mt-3'>{shortDesc}</p>
                            <motion.button onClick={addToCart} whileTap={{scale:1.2}} className='buy__btn'>
                                Add to Cart
                            </motion.button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                       <div className='tab__wrapper d-flex align-items-center gap-5'>
                            <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`}  onClick={handleDesc}>Description</h6>
                            <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`}  onClick={handleRev}>Reviews({reviews.length})</h6>
                       </div>
                       {
                        tab === 'desc' &&
                        (
                            <div className="tab__content mt-4">
                            <p>{description}</p>
                           </div>
                        )
                        
                       }

                       {
                        tab === 'rev' && 
                        (
                            <h5 className='product__review mt-4'>
                                <div className="review__wrapper">
                                    <ul>
                                        {
                                            reviews.map((item, index)=>(
                                                <li key={index}><span>{item?.rating} (average ratings )</span>
                                                <p>{item?.text}</p>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                     <div className="review__form">
                                        <h4>Share Your Experience</h4>
                                         <form onSubmit={submitHandler}>
                                            <div className="form__group">
                                                <input type="text" required ref={reviewUser} placeholder='Enter Name' />
                                            </div>
                                            <div className="form__group d-flex align-items-center gap-5">
                                                <motion.span whileTap={{scale:1.2}} onClick={()=>handleRating(1)}>1
                                                <i className= {`${rating >= 1  ?  'ri-star-s-fill' : 'ri-star-s-line'} `}></i></motion.span>
                                                <motion.span whileTap={{scale:1.2}} onClick={()=>handleRating(2)}> 2 
                                                <i className= {`${rating >= 2  ?  'ri-star-s-fill' : 'ri-star-s-line'} `}></i></motion.span>
                                                <motion.span whileTap={{scale:1.2}} onClick={()=>handleRating(3)}> 3 
                                                <i className= {`${rating >= 3  ?  'ri-star-s-fill' : 'ri-star-s-line'} `}></i></motion.span>
                                                <motion.span whileTap={{scale:1.2}} onClick={()=>handleRating(4)}> 4 
                                                <i className= {`${rating >= 4  ?  'ri-star-s-fill' : 'ri-star-s-line'} `}></i></motion.span>
                                                <motion.span whileTap={{scale:1.2}} onClick={()=>handleRating(5)}> 5 
                                                <i className= {`${rating >= 5  ?  'ri-star-s-fill' : 'ri-star-s-line'} `}></i></motion.span>
                                            </div>
                                            <div className="form__group">
                                                <textarea rows={7} type="text" required ref={reviewMsg} placeholder='Enter Review Messaage' />
                                            </div>
                                            <button type='submit' className='buy__btn'>
                                                Submit
                                            </button>
                                         </form>
                                     </div>
                                </div>
                            </h5>
                         )
                       }
                      
                    </Col>
                    <Col lg='12' className='mt-3'>
                        <h2 className='related__title'>Related Products You Might Like</h2>
                    </Col>
                    <ProductsList data={relatedProducts}/>
                </Row>
            </Container>
        </section>
    </Helmet>
  )
}

export default ProductDetails