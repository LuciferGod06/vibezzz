import React, { useEffect } from 'react'
import { Routes,Route, useLocation } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Product } from '../ProductPage/Product'
import { ProductDetail } from '../ProductDetail/ProductDetail'
import { Cart } from 'Components/Cart/Cart'

export const AllRoutes = () => {
  const {pathname}  = useLocation();

  useEffect(()=>{
    window.scrollTo({top:0});
  },[pathname]);




  return (
    <Routes>
      <Route path='/' element={<Home/>} /> 
        <Route path='/product' element={<Product/>} />   
        <Route path='/product/:id' element={<ProductDetail/>}/>
        <Route path='/cart' element={<Cart/>}/>
     </Routes>
  )
}
