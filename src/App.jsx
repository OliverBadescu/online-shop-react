import { useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import { UserProvider } from './services/state/UserContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Route/ProtectedRoute'
import Login from './components/Login/Login'
import Register from './components/Register/Register';

function App() {

  return (
    <>
    
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element ={<Login/>}/>
            <Route path='/login' element ={<Login/>}/>
            <Route path='/register' element ={<Register/>}/>
            <Route path='/home' element ={ 
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
              />
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}

export default App
