import React, { useEffect, useRef, useState } from 'react'
import './ProductDetail.css'
import { Footer } from '../Footer/Footer'
import { motion } from 'framer-motion'

import image1 from '../Assest/1.png'
import image2 from '../Assest/2.png'
import image3 from '../Assest/3.png'
import image4 from '../Assest/4.png'
import image5 from '../Assest/5.png'
import image6 from '../Assest/6.png'
import image7 from '../Assest/7.png'
import image8 from '../Assest/8.png'
import { CiHeart } from 'react-icons/ci';
import { IoBagOutline } from 'react-icons/io5';
import { Select, useToast } from '@chakra-ui/react';
import axios from 'axios'
import { useParams } from 'react-router-dom'

const assest = [image1, image2, image3, image4, image5, image6, image7, image8];

export const ProductDetail = () => {

  const [width, setwidth] = useState(0);
  const [Product, setProduct] = useState({});
  const { id } = useParams();
  const slide = useRef();
  const [cartItem, setcartItem] = useState({
    qty: "",
    size: ""
  });

  useEffect(() => {
    setwidth(slide.current.scrollWidth - slide.current.offsetWidth);
    axios.get(`http://localhost:8080/products/${id}`)
      .then((resp) => { setProduct(resp.data) })
      .catch((err) => { console.log(err) })
  }, [id, cartItem]);

  console.log(Product);
  const arr = [1, 2, 3];
  const toast = useToast();

  const handleAddtoCart = () => {
    axios.post('http://localhost:8080/cart', {
      CartImg: Product.img,
      CartName: Product.name,
      CartPrice: Product.price,
      CartQty: cartItem.qty || 1,
      CartSize: cartItem.size
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });


    toast({
      description: "Added to your Shopping cart.",
      status: 'success',
      duration: 2000
    })
  }

  console.log(cartItem)

  return (
    <div id='ProductDetail' >

      <div id='ProductDetailFirstDiv'  >
        <div id='ProductDetailImagesDiv' >

          {
            arr.map((ele, ind) => {
              return <img key={ind} src={Product.img} alt="" />
            })


          }

        </div>
        <div id='ProductDetailDiv' >
          <h1>{Product.name}</h1>
          <p>Men's {Product.category}</p>
          <p>MRP : $ {Product.price} </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, autem impedit. Architecto repellendus, molestias vitae officiis, sunt et optio magnam alias quia beatae necessitatibus delectus rem quibusdam itaque provident cupiditate!</p>
          <div id='ProductDetailSizeMainDiv' >
            <h2>Select Size :</h2>


            <div id='ProductDetailSizeDiv'>

              <p onClick={(e) => { setcartItem({ ...cartItem, size: 'S' }) }}
                className={cartItem.size === 'S' ? "ProductDetailSizeColor" : ""}
              >S</p>
              <p onClick={(e) => { setcartItem({ ...cartItem, size: 'M' }) }}
                className={cartItem.size === 'M' ? "ProductDetailSizeColor" : ""}
              >M</p>
              <p onClick={(e) => { setcartItem({ ...cartItem, size: 'L' }) }}
                className={cartItem.size === 'L' ? "ProductDetailSizeColor" : ""}
              >L</p>
              <p onClick={(e) => { setcartItem({ ...cartItem, size: 'XL' }) }}
                className={cartItem.size === 'XL' ? "ProductDetailSizeColor" : ""}
              >XL</p>
              <p onClick={(e) => { setcartItem({ ...cartItem, size: 'XXL' }) }}
                className={cartItem.size === 'XXL' ? "ProductDetailSizeColor" : ""}
              >XXL</p>
            </div>

          </div>
          <Select margin={"3% 0"} border={"1px solid"} onClick={(e) => { setcartItem({ ...cartItem, qty: e.target.value }) }}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
          <div id='ProductDetailButtons' >

            <button onClick={handleAddtoCart} >Add To Bag <IoBagOutline className='ProductDetailIcons' />  </button>
            <button>Favourite <CiHeart className='ProductDetailIcons' /> </button>

          </div>


        </div>
      </div>
      <div  >

      </div>
      <h1>You Might Also Like this</h1>
      <motion.div className='productDetailSliderDiv' ref={slide}>
        <motion.div className='productDetailSlider' drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {
            assest.map((image, ind) => {
              return (
                <motion.div className='images' key={ind}>
                  <img src={image} alt={ind} />
                </motion.div>
              )
            })
          }
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  )
}
