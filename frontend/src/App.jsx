import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Home from './pages/Home'
import ProductDetails from './pages/productDetails'
import CartDetails from './pages/CartDetails'
import AddProduct from './pages/admin/AddProduct'
import CategoryHome from './pages/admin/CategoryHome'
import AddCategory from './pages/admin/AddCategory'
import EditCategory from './pages/admin/EditCategory'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/productdetails/:id' element={<ProductDetails/>}/>
          <Route exact path='/cartdetails' element={<CartDetails/>}/>
          <Route exact path='/add/product' element={<AddProduct/>}/>
          <Route exact path='/categories' element={<CategoryHome/>}/>
          <Route exact path='/add/category' element={<AddCategory/>}/>
          <Route exact path='/edit/category/:id' element={<EditCategory/>}/>
        </Routes>      
      </BrowserRouter>
    </>
  )
}

export default App
