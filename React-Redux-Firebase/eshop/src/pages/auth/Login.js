import styles from './auth.module.scss';
import loginImage from '../../assets/login.png'
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Card from '../../components/card/Card';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const loginUser=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setIsLoading(false)
            toast.success("Login Successful")
            navigate("/")
        })
        .catch((error) => {
            toast.error(error.message);
            setIsLoading(false)
        });

    }
    return (
        <>
        {isLoading && <Loader />}
        <section className={`container ${styles.auth}`}>
            <div className={styles.img} >
                <img src={loginImage} alt='login'width={'400'}/>
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Login</h2>
                        <form onSubmit={loginUser}>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required/>
                            <button className={'--btn --btn-primary --btn-block'}>Log In</button>
                            <div className={styles.links}>
                                <Link to={'/reset'}>Forgot Password</Link>
                            </div>
                            <p>---or---</p>
                        </form>
                    <button type='submit' className={'--btn --btn-danger --btn-block'}><FaGoogle color='#fff' style={{marginRight:5}}/>
                        Log In With Google
                    </button>
                    <span className={styles.register}>
                        <p>Don't Have An Account?</p>
                        <Link to={'/register'} style={{ marginLeft: 5 }}>Register</Link>
                    </span>
                </div>
            </Card>
        </section>
        </>
    )
}

export default Login