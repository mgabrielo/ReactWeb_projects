import { Container, Col, Row } from 'reactstrap'
import useGetData from '../customHooks/useGetData'
import { db } from '../firebase.config';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Users = () => {
    const {data: userData, loading}= useGetData('users');
    const deleteUser= async(id)=>{
        await deleteDoc(doc(db , 'users', id));
        toast.success('user deleted successfully')
    }
    return (
    <section>
        <Container>
            <Row>
                <Col lg='12'>
                    <h4 className='fw-bold'>Users</h4>
                </Col>
                <Col lg='12'  className='pt-5'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Image </th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? 
                                (
                                    <>
                                    <Col className='text-center' lg='12'>
                                     <h2 style={{color:'teal', fontWeight:400}}>Loading....</h2>
                                    </Col>
                                    </>
                                ):(
                                
                                    userData?.map((user, index)=>(
                                        <tr key={index}>
                                            <td><img src={user.photoURL} alt="" /></td>
                                            <td>{user.displayName}</td>
                                            <td>{user.email}</td>
                                            <td> <button onClick={()=>deleteUser(user.uid)} className='btn btn-danger'>Delete</button></td>
                                        </tr>
                                    ))

                                )
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Users