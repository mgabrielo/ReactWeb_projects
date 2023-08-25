import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import ProtectedRoutes from './ProtectedRoutes';
import AddProduct from '../admin/AddProduct'
import AllProducts from '../admin/AllProducts'
import Dashboard from '../admin/Dashboard';
import Users from '../admin/Users'

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to={'home'} />} />
            <Route path='home' element={<Home />} />
            <Route path='shop' element={<Shop />} />
            <Route path='shop/:id' element={<ProductDetails />} />
            <Route path='cart' element={<Cart />} />
            <Route path='/*' element={<ProtectedRoutes />}>
                <Route path='checkout' element={<Checkout />}></Route>
                <Route path='dashboard/all-products' element={<AllProducts />}></Route>
                <Route path='dashboard/add-product' element={<AddProduct />}></Route>
                <Route path='dashboard' element={<Dashboard />}></Route>
                <Route path='dashboard/users' element={<Users />}></Route>
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
        </Routes>
    )
}

export default Routers