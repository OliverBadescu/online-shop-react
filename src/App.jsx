
import './App.css'
import Home from './components/client/Home/Home'
import { UserProvider } from './services/state/UserContext'
import { ProductProvider } from './services/state/ProductsContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Route/ProtectedRoute'
import Login from './components/Login/Login'
import Register from './components/Register/Register';
import Shop from './components/client/Shop/Shop';
import Checkout from './components/client/Checkout/Checkout'
import ProductPage from './components/client/ProductPage/ProductPage'
import ProductCardProvider from './services/state/productCardContext'
import Cart from './components/client/Cart/Cart'
import Account from './components/client/Account/Account'
import AdminPage from './components/admin/AdminPage/AdminPage'
import ProductPageAdmin from './components/admin/ProductPageAdmin/ProductPageAdmin';
import UsersPageAdmin from './components/admin/UserPage/UserPage';

function App() {

  return (
    <>
    
      
      
      <Router>
        <UserProvider>
          <ProductProvider>
            <ProductCardProvider>
                <Routes>
                  <Route path='/' element ={<Login/>}/>
                  <Route path='/login' element ={<Login/>}/>
                  <Route path='/register' element ={<Register/>}/>
                  <Route path='/product-page' element ={<ProductPage/>}/>
                  <Route path='/cart' element ={<Cart/>}/>
                  <Route path='/shop' element ={<Shop/>}/>
                  <Route path='/checkout' element ={<Checkout/>}/>
                  <Route path='/account' element ={<Account/>}/>
                  <Route path='/admin-page' element ={<AdminPage/>}/>
                  <Route path='/product-page-admin' element ={<ProductPageAdmin/>}/>
                  <Route path='/user-page-admin' element ={<UsersPageAdmin/>}/>
                  <Route path='/home' element ={ 
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                    />
                </Routes></ProductCardProvider>
          </ProductProvider>
        </UserProvider>
      </Router>
          
    </>
  )
}

export default App
