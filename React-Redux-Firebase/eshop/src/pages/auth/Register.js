import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '../../firebase/config';
import styles from './auth.module.scss';
import registerImage from '../../assets/register.png'
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const registerUser = (e) => {
        e.preventDefault();
        // console.log(email, password, cpassword)
        if (password !== cpassword) {
            toast.error("Passwords do not Match")
        }

        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                setIsLoading(false)
                toast.success('Registration Successful')
                navigate("/login")
            })
            .catch((error) => {
                toast.error(error.message)
                setIsLoading(false)
            });
    }
    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <h2>Register</h2>
                        <form onSubmit={registerUser}>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                            <input type="password" value={cpassword} onChange={(e) => setCPassword(e.target.value)} placeholder='Confirm Password' required />
                            <button type='submit' className={'--btn --btn-primary --btn-block'}>Register</button>
                        </form>
                        <span className={styles.register}>
                            <p>Already Have An Account?</p>
                            <Link to={'/login'} style={{ marginLeft: 5 }}>Log In</Link>
                        </span>
                    </div>
                </Card>
                <div className={styles.img} >
                    <img src={registerImage} alt='register' width={'400'} />
                </div>
            </section>
        </>
    )
}

export default Register