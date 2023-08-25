import {useState, useEffect} from 'react'
import Helmet from '../components/Helmet/Helmet'
import '../styles/home.css'
import { motion } from 'framer-motion'
import {Container , Row, Col} from 'reactstrap'
import heroImg from '../assets/images/hero-img.png'
import { Link } from 'react-router-dom'
import Clock from '../components/UI/Clock'
import products from '../assets/data/products'
import Services from '../services/Services'
import ProductsList from '../components/UI/ProductsList'
import counterImg from  '../assets/images/counter-timer-img.png';

const Home = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [bestSalesProducts, setBestSalesProducts] = useState([]);
    const [mobileProducts, setMobileProducts] = useState([]);
    const [wirelessProducts, setWirelessProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(()=>{
        const filteredTrendingProducts =products.filter((item)=> item.category === 'chair')
        
        const filteredBestSalesProducts =products.filter((item)=> item.category === 'sofa')
       
        const filteredMobileProducts =products.filter((item)=> item.category === 'mobile')
       
        const filteredWirelessProducts =products.filter((item)=> item.category === 'wireless')
        
        const filteredPopularProducts =products.filter((item)=> item.category === 'watch')
        
        setTrendingProducts(filteredTrendingProducts)
        setBestSalesProducts(filteredBestSalesProducts)
        setMobileProducts(filteredMobileProducts)
        setWirelessProducts(filteredWirelessProducts)
        setPopularProducts(filteredPopularProducts)
    },[])
    const year = new Date().getFullYear()
  return (
    <Helmet title={'Home'}>
        <section className='hero__section'>
            <Container>
                <Row>
                    <Col lg='6' md='6'>
                        <div className='hero__content'>
                            <p className="hero__subtitle">Trending Product in {year}</p>
                            <h2>Make Your Interior More Marvellous</h2>
                            <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
                            </p>
                            <motion.button whileTap={{scale:1.2}} className='buy__btn'>
                                <Link to='shop'>Shop Now</Link>
                            </motion.button>
                        </div>
                    </Col>
                    <Col lg='6' md='6'>
                        <div className='hero__img'>
                            <img src={heroImg} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <Services/>
        <section className="trending__products">
            <Container>
                <Row>
                    <Col lg='12' className='text-center'>
                        <h2 className="section__title">Trending Products</h2>
                    </Col>
                    <ProductsList data={trendingProducts}/>
                </Row>
            </Container>
        </section>
        <section className='best_sales'>
            <Container>
                <Row>
                    <Col lg='12' className='text-center'>
                        <h2 className="section__title">Best Sales</h2>
                    </Col>
                    <ProductsList data={bestSalesProducts}/>
                </Row>
            </Container>
        </section>
        <section className="timer__count">
            <Container>
                <Row>
                    <Col lg='6' md='6'>
                        <div className="clock__top-content">
                            <h3 className='text-white fs-6 mb-2'>Limited Offers</h3>
                            <h3  className='text-white fs-5 mb-2'>Quality ArmChair</h3>
                        </div>
                            <Clock/>

                            <motion.button whileTap={{scale:1.2}} className="buy__btn store__btn">
                                <Link to={'/shop'}>Visit Store</Link>
                            </motion.button>
                    </Col>
                    <Col lg='6' md='6' className='text-end counter__img'>
                        <img src={counterImg} alt="" />
                    </Col>
                </Row>
            </Container>
        </section>

        <section className='new__arrivals'>
        <Container>
                <Row>
                    <Col lg='12' className='text-center'>
                        <h2 className="section__title mb-3">New Arrivals</h2>
                    </Col>
                    <ProductsList data={mobileProducts}/>
                    <ProductsList data={wirelessProducts}/>
                </Row>
            </Container>
        </section>

        <section className='popular__category'>
            <Container>
                    <Row>
                        <Col lg='12' className='text-center'>
                            <h2 className="section__title mb-3">Popular In Category</h2>
                        </Col>
                        <ProductsList data={popularProducts}/>
                    </Row>
            </Container>
        </section>
    </Helmet>
  )
}

export default Home