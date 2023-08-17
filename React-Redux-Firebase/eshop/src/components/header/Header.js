import React, { useEffect, useState } from "react";
import styles from './Header.module.scss'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { toast } from 'react-toastify';
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, selectUserName, selectIsLoggedIn } from "../../redux/slice/authSlice";

const Header = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(selectIsLoggedIn)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid)
        if (user.displayName == null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setUserName(uName)
        }
        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: userName,
          userId: userId,
        }))
      } else {
        dispatch(REMOVE_ACTIVE_USER())
        setUserName("")
      }
    });
  }, [userName, userId, dispatch])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  const hideMenu = () => {
    setShowMenu(false)
  }
  const logo = (
    <div className={styles.logo}>
      <Link to='/'>
        <h2>e<span>Shop</span>.</h2>
      </Link>
    </div>
  )
  const cart = (
    <span className={styles.cart}>
      <Link to={"/cart"}>
        Cart
        <FaShoppingCart size={20} />
        <p>0</p>
      </Link>
    </span>
  )
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "")

  const logOutUser = () => {
    setIsLoading(true)
    signOut(auth).then(() => {
      setIsLoading(false)
      toast.success('Logout Successful')
      navigate("/login")
    }).catch((error) => {
      toast.success(error.message)
      setIsLoading(false)
    });
  }

  return (
    <>
      {isLoading && <Loader />}
      <header>
        <div className={styles.header}>
          {logo}
          <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
            <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`}
              onClick={hideMenu}
            ></div>
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <NavLink className={activeLink} to='/'>Home</NavLink >
              </li>
              <li>
                <NavLink className={activeLink} to='/contact'>Contact Us</NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <div className={styles.links} style={{ flexDirection: 'row' }}>
                {!isLoggedIn && <NavLink className={activeLink} to={'/login'}>Login</NavLink>}
                {isLoggedIn &&

                  <a href="#home" className="d-flex" >
                    <FaUserCircle style={{ marginRight: 10, verticalAlign: 'middle' }} size={16} />
                    Hi {userName}
                  </a>

                }
                {!isLoggedIn && <NavLink className={activeLink} to={'/register'}>Register</NavLink>}
                <NavLink className={activeLink} to={'/order-history'}>My Orders</NavLink>
                <NavLink className={activeLink} to={''} onClick={logOutUser}>Logout</NavLink>
              </div>
              {cart}
            </div>

          </nav>
          <div className={styles["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
