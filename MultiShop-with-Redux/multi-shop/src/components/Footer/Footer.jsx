import React from 'react'
import './footer.css';
import logo from '../../assets/images/eco-logo.png'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year =new Date().getFullYear()
  return (
    <footer className='footer'>
        <Container>
            <Row>
                <Col lg='4'>
                    <div className="logo">
                            <div>
                                <h1 className='text-white'>MultiShop</h1>
                            </div>
                    </div>
                    <p className="footer__text mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                    </p>
                </Col>
                <Col lg='3' className='footer__quick-links'>
                    <div className='footer__quick-links'>
                        <h4 className='quick__links-title'> Top Categories</h4>
                        <ListGroup className='mb-3'>
                            <ListGroupItem className='ps-0 border-0 mt-0'>
                                <Link to='#'>Marvel Phones</Link>
                            </ListGroupItem>
                            
                            <ListGroupItem className='ps-0 border-0 mt-0'>
                                <Link to='#'>Marvel Sofa</Link>
                            </ListGroupItem>

                            <ListGroupItem className='ps-0 border-0 mt-0'>
                                <Link to='#'>Marvel Arm Chairs</Link>
                            </ListGroupItem>
                            
                            <ListGroupItem className='ps-0 border-0 mt-0'>
                                <Link to='#'>Marvel Watches</Link>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </Col>
                <Col lg='2'>
                    <div className='footer__quick-links'>
                        <h4 className='quick__links-title'>Useful Links</h4>
                        <ListGroup className='mb-3'>
                            <ListGroupItem className='ps-0 border-0 mt-0'>
                                <Link to='/shop'>Shop</Link>
                            </ListGroupItem>
                            
                            <ListGroupItem className='ps-0 border-0 mt-0'>
                                <Link to='/cart'>Cart</Link>
                            </ListGroupItem>

                            <ListGroupItem className='ps-0 border-0 mt-0'>
                                <Link to='/login'>Login</Link>
                            </ListGroupItem>
                            
                            <ListGroupItem className='ps-0 border-0 mt-0'>
                                <Link to='#'>Privacy Policy</Link>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </Col>
                <Col lg='3'>
                <div className='footer__quick-links'>
                        <h4 className='quick__links-title'>Contact</h4>
                        <ListGroup className='footer__contact'>
                            <ListGroupItem className='ps-0 border-0 mt-0 d-flex align-items-center gap-2'>
                                <span><i className="ri-map-pin-line"></i></span>
                                <p>123 Madgascar Street, New City</p>
                            </ListGroupItem>
                            
                            <ListGroupItem  className='ps-0 border-0 mt-0 d-flex align-items-center gap-2'>
                               <span><i className="ri-phone-line"></i></span>
                               <p>+034-5932-0349</p>
                            </ListGroupItem>

                            <ListGroupItem  className='ps-0 border-0 mt-0 d-flex align-items-center gap-2'>
                               <span><i className="ri-mail-line"></i></span>
                               <p>divElement@html.com</p>
                            </ListGroupItem>
            
                        </ListGroup>
                    </div>
                </Col>

                <Col lg='12'>
                    <p className='footer__copyright'>Copyright &copy; {year} developed by Grey. All Rights Reserved</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer