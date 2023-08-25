import React from 'react'
import '../styles/cart.css'
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row , Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems =useSelector((state) =>  state.cart.cartItems)
  const {totalAmount}=  useSelector((state) =>  state.cart)
  // console.log(totalAmount)
  return (
    <Helmet title='Cart'>
      <CommonSection title={'Shopping Cart'}/>
      <section>

      <Container>
        <Row>
          <Col lg='9'>
            {
              cartItems.length === 0 ?
              (
                <h2 className='fs-4 text-center'>No Cart Items Available</h2>
              ):(
                <table className='table bordered'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartItems.map((item, index)=>(
                        <CartTableRow key={index} item ={item}/>
                      ))
                    }
                  </tbody>
                </table>
              )
            }
          </Col>
          <Col lg='3'>
            {
              totalAmount > 0 ?
              (
                <>
                <div className='d-flex align-items-center justify-content-between'>
                <h6>SubTotal</h6>
                <span className='fs-4 fw-bold'>${totalAmount}</span>
              </div>
              <p className='fs-6 mt-2'>Taxes and Shipping calcuates in CheckOut</p>
              <div>
                <button className='buy__btn w-100'>
                  <Link to='/shop'>Continue Shopping</Link>
                </button>
                <button className='buy__btn w-100 mt-2'>
                  <Link to='/checkout'>CheckOut</Link>
                </button>
              </div>
                </>
              ) :(
                <div></div>
              )
            }
          </Col>
        </Row>
      </Container>
      </section>
    </Helmet>
  )
}


const CartTableRow =({item})=>{
  const dispatch = useDispatch();

  const  deleteProduct =()=>{
    dispatch(cartActions.deleteItem(item.id))
  }
  return(
    <tr >
      <td><img src={item.imgUrl} alt="" /></td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <motion.td onClick={deleteProduct} whileTap={{scale:1.05}}><i className="ri-delete-bin-line"></i></motion.td>
    </tr>
  )
}
export default Cart