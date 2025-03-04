import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import { UserProvider } from './services/state/UserContext'
import { ProductProvider } from './services/state/ProductsContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Route/ProtectedRoute'
import Login from './components/Login/Login'
import Register from './components/Register/Register';
import Shop from './components/Shop/Shop';
import Checkout from './components/Checkout/Checkout'
import ProductPage from './components/ProductPage/ProductPage'
import ProductCardProvider from './services/state/productCardContext'
import Cart from './components/Cart/Cart'

function App() {

  return (
    <>
    
      
      <UserProvider>
        <ProductProvider>
          <ProductCardProvider>
            <Router>
              <Routes>
                <Route path='/' element ={<Login/>}/>
                <Route path='/login' element ={<Login/>}/>
                <Route path='/register' element ={<Register/>}/>
                <Route path='/product-page' element ={<ProductPage/>}/>
                <Route path='/cart' element ={<Cart/>}/>
                <Route path='/shop' element ={<Shop/>}/>
                <Route path='/checkout' element ={<Checkout/>}/>
                <Route path='/home' element ={ 
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                  />
              </Routes>
            </Router>
          </ProductCardProvider>
        </ProductProvider>
      </UserProvider>
    </>
  )
}

export default App
