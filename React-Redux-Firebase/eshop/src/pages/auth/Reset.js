import styles from './auth.module.scss';
import forgotImage from '../../assets/forgot.png'
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { auth } from '../../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';

const Reset = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const resetPassword = (e) => {
        e.preventDefault();
        setIsLoading(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false)
                toast.success('Password Reset Email Sent')
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)
            });
    }
    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img} >
                    <img src={forgotImage} alt='reset-password' width={'400'} />
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2>Reset Password</h2>
                        <form onSubmit={resetPassword}>
                            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <button type='submit' className={'--btn --btn-primary --btn-block'}>Reset Password</button>
                            <span className={styles.links}>
                                <p>
                                    <Link to={'/login'} >Login</Link>
                                </p>
                                <p>
                                    <Link to={'/register'} >Register</Link>
                                </p>
                            </span>
                        </form>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default Reset