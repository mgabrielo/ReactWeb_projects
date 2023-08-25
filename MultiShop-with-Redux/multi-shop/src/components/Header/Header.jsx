import {useEffect, useRef} from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './header.css';
import {motion} from 'framer-motion';
import logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/user-icon.png'
import { Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import useAuth from '../../customHooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';
const nav__links =[
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: 'cart',
        display: 'Cart'
    },
]

const Header = () => {
    const navigate = useNavigate();
    const headerRef =useRef(null);
    const menuRef =useRef(null);
    const totalQuantity = useSelector(state=> state.cart.totalQuantity)
    const {currentUser} =useAuth();
    const profileActions= useRef(null)
    const stickyHeader  =()=>{
        window.addEventListener("scroll", ()=>{
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
                headerRef.current.classList.add('sticky__header')
            }else{
                headerRef.current.classList.remove('sticky__header')
            }
        })
    } 
    useEffect(()=>{
        stickyHeader()
        return ()=>window.removeEventListener("scroll", stickyHeader)
    },[])
    
    const menuToggle=()=>{
        menuRef.current.classList.toggle('active__menu')
    }
    const navigateToCart =(e)=>{
        e.preventDefault();
        navigate('/cart')
    }
    const toggleProfileAction =()=>{ profileActions.current.classList.toggle('show__profileActions');}
    const logOut =()=>{
        signOut(auth).then(()=>{
            toast.success('Logout Successful')
            navigate('/login')
        }).catch((error)=>{
            toast.error(error.message)
        })
    }
  return (
    <header className='header' ref={headerRef}>
        <Container>
            <Row>
                <div className='nav__wrapper'>
                    <div className="logo">
                        <img src={logo} alt="" />
                        <div>
                            <h1>MultiShop</h1>
                        </div>
                    </div>
                    <div className="navigation" ref={menuRef} onClick={menuToggle}>
                        <ul className="menu">
                            {nav__links.map((item, index)=>(
                                <li className='nav__item' key={index}>
                                    <NavLink className={(navclass)=> navclass.isActive ? 'nav__active' : ''} to={item.path}>{item.display}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="nav__icons">
                        
                        <span className='fav__icon'>
                            <i className="ri-heart-line"></i>
                            <span className='badge'>1</span>
                        </span>
                        <span className='cart__icon cursor-pointer' onClick={navigateToCart}>
                        <i className="ri-shopping-bag-line"></i>
                        <span className='badge'>{totalQuantity}</span>
                        </span>
                        <div className='profile'>
                            <motion.img 
                                style={{borderRadius:'50%'}} 
                                whileTap={{scale:1.2}}
                                src={currentUser ? currentUser.photoURL : userIcon} 
                                alt="" onClick={toggleProfileAction} 
                            />
                        </div>
                       <div className='profile__actions' ref={profileActions} onClick={()=>toggleProfileAction}>
                            {
                                currentUser ? 
                                (
                                    <span style={{cursor:'pointer'}} onClick={logOut}>Log Out</span> 
                                ):(
                                    <div>
                                        <Link to='/signup'>Sign Up &nbsp;</Link>
                                        <Link to='/login'>Log In</Link>
                                    </div>
                                )
                            }
                       </div>
                        {/* mobile */}
                        
                        <div className='mobile__menu'>
                        <span onClick={menuToggle}><i className="ri-menu-line"></i></span>
                        </div>

                    </div>

                   
                </div>
            </Row>
        </Container>
    </header>
  )
}

export default Header