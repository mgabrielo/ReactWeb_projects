import { Container, Row, Col  } from 'reactstrap'
import useGetData from '../customHooks/useGetData';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { doc, deleteDoc } from 'firebase/firestore';

const AllProducts = () => {
    const {data: productsData, loading} =useGetData('products')
        console.log(productsData)

        const deleteProductData =async(id)=>{
            await deleteDoc(doc(db, 'products', id))
            toast.success('product removed')
        }
    return (
    <section>
        <Container>
            <Row>
                <Col lg='12'>
                    {
                        loading ? 
                        (
                            <Col className='text-center' lg='12'>
                             <h2 style={{color:'teal', fontWeight:400}}>Loading....</h2>
                            </Col>
                        ):(
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    productsData.map((item, index)=>(
                                        <tr key={index}>
                                            <td><img src={item.imgUrl} alt="" /></td>
                                            <td>{item.title}</td>
                                            <td>{item.category}</td>
                                            <td>${item.price}</td>
                                            <td><button  onClick={()=> deleteProductData(item.id)} className='btn btn-danger'>Delete</button></td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        )
                    }
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default AllProducts