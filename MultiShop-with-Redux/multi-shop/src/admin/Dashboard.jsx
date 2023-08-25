import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../customHooks/useGetData';

const Dashboard = () => {
    const {data: productsData, loading} = useGetData('products')
    const {data: userData} = useGetData('users')
    return (
   
    <section>
        <Container>
            <Row>
                <Col className='lg-3'>
                    <div className="revenue__box">
                        <h5>Total Sale</h5>
                        <span>$7890</span>
                    </div>
                </Col>
                <Col className='lg-3'>
                    <div className="order__box">
                        <h5>Orders</h5>
                        <span>7890</span>
                    </div>
                </Col>
                <Col className='lg-3'>
                    <div className="products__box">
                        <h5>Total Products</h5>
                        <span>{productsData.length}</span>
                    </div>
                </Col>
                <Col className='lg-3'>
                    <div className="users__box">
                        <h5>Total Users</h5>
                        <span>{userData.length}</span>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Dashboard