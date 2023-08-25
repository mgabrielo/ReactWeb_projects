import React from 'react'
import { Container, Row, Col, Form , FormGroup, Label } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/checkout.css';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const totalQty =useSelector(state=> state.cart.totalQuantity)
  
  const totalAmount = useSelector(state => state.cart.totalAmount)

  return (
    <Helmet title='Checkout'>
      <CommonSection title={'Checkout'}/>
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 fw-bold'>Billing Information</h6>
              <Form className='billing__form'>
                <Label className='mb-2'>Name</Label>
                <FormGroup className="form__group">
                  <input type="text" placeholder='Enter Your Name'/>
                </FormGroup>
                <Label className='mb-2'>Email</Label>
                <FormGroup className="form__group">
                  <input type="email" placeholder='Enter Your Email'/>
                </FormGroup>
                <Label className='mb-2'>Phone Number</Label>
                <FormGroup className="form__group">
                  <input type="Number" placeholder='Enter Your Phone Number'/>
                </FormGroup>
                <Label className='mb-2'>Address</Label>
                <FormGroup className="form__group">
                  <input type="text" placeholder='Enter Your Address'/>
                </FormGroup>
                <Label className='mb-2'>City</Label>
                <FormGroup className="form__group">
                  <input type="text" placeholder='Enter Your City'/>
                </FormGroup>
                <Label className='mb-2'>Postal Code</Label>
                <FormGroup className="form__group">
                  <input type="text" placeholder='Enter Your Postal Code'/>
                </FormGroup>
                <Label className='mb-2'>Country</Label>
                <FormGroup className="form__group">
                  <input type="text" placeholder='Enter Your Country'/>
                </FormGroup>
              </Form>
            </Col>
            <Col lg='4'>
              <div className='checkout__cart'>
                <h6>Total Qty: <span>{totalQty} items</span></h6>
                <h6>SubTotal: <span>${totalAmount}</span></h6>
                <h6><span>Shipping: <br /> free-shipping</span>  <span>$10</span></h6>
                <h6>Total Cost: <span>${totalAmount}</span></h6>
              <button style={{border: '1px solid rgb(7, 148, 77)', color:'rgb(7, 148, 77)', backgroundColor:'#fff'}} className='buy__btn auth__btn w-100'>Place Order</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Checkout