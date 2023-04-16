import React, { useEffect, useState, Suspense, useContext } from 'react'
import { commerce } from './lib/commerce'
// import { Products, Navbar } from './components'
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckOut from './components/CheckOutForm/CheckOut/CheckOut';

const App = () => {


    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({})


    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data)
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart)
    }

    const handleCartRemoval = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart)
    }

    useEffect(() => {
        fetchCart();
        fetchProducts();
    }, [])

    return (
        <Router>
            <div>
                {fetchCart() && <Navbar totalItems={cart?.total_items} />}
                <Routes>
                    <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart} />} />
                    <Route path='/cart' element={<Cart cart={cart} />} />
                    <Route path='/checkout' element={<CheckOut />} />
                </Routes>
            </div>
        </Router>
    )
}

const GlobalContext = React.createContext();


export const GlobalProvider = ({ children }) => {
    const [cart, setCart] = useState({})

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart)
    }

    const handleCartRemoval = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart)
    }

    return (<GlobalContext.Provider value={{ handleUpdateCartQty, handleEmptyCart, handleCartRemoval }}>
        {children}
    </GlobalContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
export default App